import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useState, useEffect, memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillChatFill } from 'react-icons/bs'
import { db, auth } from '../firebase'
import { getDocs, collection, doc, getDoc } from 'firebase/firestore'

/**
 * The boundary class for user's list of chats.
 * @returns The HTML elements to be displayed on the website.
 */
const MyChatUI = () => {
    const uid = auth.currentUser.uid
    const navigate = useNavigate()

    const fetched = useRef(false)

    /**
     * type : Array of chat objects.
     * chats : The user's non-empty chat list.
     * setChats : Update the chats array.
     */
    const [chats, setChats] = useState([])

    /**
     * Fetch the chat data from database.
     */
    const fetchChats = async() => {

        const user = auth.currentUser;
        if (!user) return;
        let friends = []; //friend Object 

        try {
            const chatRef = collection(db, "chats");
            const chatSnap = await getDocs(chatRef); 
            var friendsUIDList = [];

            //Search through Chat Objects to find user's UID, return friends UIDs & last message 
            chatSnap.forEach((doc) => {
                let data = doc.data()
                if (data.Users.user1 == uid) {
                    //push UID and last message
                    friendsUIDList.push({user: data.Users.user2, sentBy: data.messages[data.messages.length-1].uid, _lastMessage: data.messages[data.messages.length-1].text, read: data.read})
                }
                if (data.Users.user2 == uid) {
                    friendsUIDList.push({user: data.Users.user1, sentBy: data.messages[data.messages.length-1].uid, _lastMessage: data.messages[data.messages.length-1].text, read: data.read})
                }
            })

            //For each UID, get User object 
            for (const counter in friendsUIDList) {
                const friendRef = doc(db, "users", friendsUIDList[counter].user);
                const friendSnap = await getDoc(friendRef);
                // console.log("friend is", friendSnap.data().name);
                let data = friendSnap.data()
                
                var lastMessageViewed = friendsUIDList[counter].read; 
                //If last message IS sent by me, mark as read regardless
                if (friendsUIDList[counter].sentBy == uid) {
                    lastMessageViewed = true
                }

                friends.push({
                    id: data.uid,
                    name: data.name,
                    imageURL: data.image_url,
                    lastMessageViewed: lastMessageViewed,
                    lastMessage: friendsUIDList[counter]._lastMessage
                })
            }
        
        } catch (err) {console.log("Error is", err)}

        fetched.current = true
        setChats(friends)
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchChats()
    }, [])

    /**
     * Chat with a user/friend.
     * @param {String} recipientUID The user ID whom the current user will chat with.
     */
    const Chat = (recipientUID) => {
        console.log("In FriendUI, IDs are", uid, recipientUID);
        navigate('/chat', {state:{
            uid: uid,
            recipientUID: recipientUID}});
            
        console.log('finished navigate');
    }

    /**
     * Open a user's profile.
     * @param {String} userID The user ID.
     */
    const OpenProfile = (userID) => {
        navigate('/userprofile', {state:{uid: userID}})
    }

    if(fetched.current)
        return(
            <div className='mcWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>Chat List</h2>
                </div>

                {chats.length === 0 &&
                    <p id='nochat'>No chat</p>
                }
    
                {chats.length > 0 && <h3 id='title'>Current Chats</h3> }
                {chats.map((user, index) => {
                        return <div key={index} className='chatCard'>
                            <div className='userWrapper'>
                                <div className='userInfo' onClick={() => OpenProfile(user.id)}>
                                    <img id='profileImg' src={user.imageURL} alt='' />
                                    <p id='name'>{user.name}</p>
                                </div>
                                <BsFillChatFill onClick={() => Chat(user.id)} />
                            </div>
                            <p className={user.lastMessageViewed ? 'lastMessage viewed' : 'lastMessage new'}>
                                {user.lastMessage}
                            </p>
                        </div>
                })}

                <div className='space'></div>
            <NavBar />
            </div>
        )
}

export default memo(MyChatUI)