import './Chat.css'
import { useState, useEffect, useRef } from 'react'
import { Timestamp, query, collection, arrayRemove, where, 
    getDoc, getDocs, setDoc, doc, updateDoc, arrayUnion, onSnapshot 
} from 'firebase/firestore'
import { RiSendPlaneFill } from 'react-icons/ri'
import { TiTick } from 'react-icons/ti'
import { auth, db } from '../../firebase'

const Chat = (recipientUID) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const scroll = useRef();

    // Create chatID using spliced UIDs (first 4 digits)
    var chatID = '';
    const {uid, displayName} = auth.currentUser;
    const tempFriendUID = JSON.stringify(recipientUID.prop);
    const friendUID = tempFriendUID.slice(1,5);
    const tempMyUID = JSON.stringify(uid);
    const myUID = tempMyUID.slice(1,5);
    if (friendUID > myUID) {
        chatID = `${friendUID}${myUID}`;
    } else {
        chatID = `${myUID}${friendUID}`;
    }
    //console.log("In ChatUI, chatID is:", chatID);

    /**
     * Fetch the list of messages in a chat.
     */
    const fetchMessages = async() => {

        const unsub = onSnapshot(doc(db, "chats", chatID), async(temp) => {

            let messages = []
            const messageArray = await temp.data().messages

            if (messageArray.length != 0) {
                for (const _message of messageArray) {
                    messages.push({
                        text: _message.text, 
                        uid: _message.uid, 
                        timestamp: _message.timestamp, 
                        id: _message.id, 
                        chatID: _message.chatID,
                        });
                }

                //Mark chat as read
                //If last message is not sent by me, then mark as read
                if (messageArray[messageArray.length-1].uid != uid) {

                    console.log("last message is", messageArray[messageArray.length-1].text)

                    const chatRef = doc(db, "chats", chatID);
                    await updateDoc(chatRef, {
                        read: true,
                    })

                    console.log("Marked chat as read")
                    // console.log(messageArray[messageArray.length-1].uid)
                }
                
                messages = messages.sort((a,b) => a.timestamp > b.timestamp ? 1 : -1);

            }

            // console.log("last message is", messageArray[messageArray.length-1].uid)
 
            // const sortedMessages = messages.sort((a,b) => a.timestamp > b.timestamp ? 1 : -1);
            setMessages(messages);
        })
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        console.log('Use effect is called');
        fetchMessages();
    },[])

    /**
     * Send message to the other user.
     * @param {HTMLEvent} e The HTML event containing the text to be sent.
     */
    const sendMessage = async (e) => {        
        e.preventDefault();

        if(input === ''){
            return;
        }

        const chatRef = doc(db, 'chats', chatID); 
        const chatSnap = await getDoc(chatRef);

        //Create message object 
        const created_at = Timestamp.now(); 
        const messageID = `${created_at.seconds}${created_at.nanoseconds}`;
        const newMessage = {uid: uid, 
            timestamp: created_at,
            text: input,
            chatID: chatID, 
            // read: false, 
            id: messageID
        }
        
        //Creates new chat if it doesn't exist
        const q = query(collection(db, "chats"), where("chatID", "==", chatID))
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            try {
                await setDoc(chatRef, {
                    chatID: chatID,
                    read: false, 
                    Users: {user1: uid, user2: recipientUID.prop}, 
                    messages: newMessage
                });
            } catch(err){console.log("setDoc error is", err)}
        } 
        //Else just appends to existing chat
        try {
            await updateDoc(chatRef, {
                chatID: chatID, 
                read: false, 
                Users: {user1: uid, user2: recipientUID.prop},
                messages: arrayUnion(newMessage)
            });
        } catch(err){console.log("updateDoc error is",err);}

        setInput('');
        //To force re-render
        fetchMessages();
        scroll.current.scrollIntoView({behaviour: 'smooth'});
    }

    return (
        <div className='chatWindow'>
            
            {messages && messages.map((message) => 
                <Message key={message.id} message={message}/> 
            )}

            <form onSubmit={sendMessage} className='messageInput'>
                <input 
                    type='text' 
                    value={input}
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder='Message' 
                />
                <button type='submit'><RiSendPlaneFill /></button>
            </form>

            <span ref={scroll}></span>
        </div>
    )
}

/**
 * The message in a chat.
 * @param {Message} message Message object.
 * @returns 
 */
const Message = ({ message }) => {
    const messageClass = message.uid === auth.currentUser.uid
    ? 'messageWrapper sent'
    : 'messageWrapper received'

    /**
     * Delete a message.
     * @param {String} messageID The message ID.
     */
    const deleteMessage = async(messageUID) => {
        if (message.uid == auth.currentUser.uid) {            
            const chatRef = doc(db, "chats", message.chatID);
            const chatSnap = await getDoc(chatRef);
            const data = chatSnap.data()

            for (const _message in data.messages) {
                if (data.messages[_message].id == message.id) {
                    await updateDoc(chatRef, {
                        chatID: message.chatID, 
                        messages: arrayRemove(data.messages[_message])
                    });
                    alert('Message is deleted')
                    break;
                }
            }
        } else {
            console.log("Not your message")
        }
    }

    if(messageClass === 'messageWrapper sent')
    return (
        <div className={messageClass}>
            <div className='message' onClick={() => deleteMessage(message.uid)}>
                <p>{message.text}</p>
                {message.read ? <TiTick id='read' /> : <TiTick id='unread' />}
            </div>
        </div>
    )

    else
    return (
        <div className={messageClass}>
            <div className='message' onClick={() => deleteMessage(message.uid)}>
                <p>{message.text}</p>
            </div>
        </div> 
    )
}

export default Chat;