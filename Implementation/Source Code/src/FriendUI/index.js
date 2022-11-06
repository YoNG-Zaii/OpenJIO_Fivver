import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useState, useEffect, memo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { BsFillChatFill } from 'react-icons/bs'
import { MdAddCircle, MdRemoveCircle } from 'react-icons/md'
import { onSnapshot, getDocs, query, collection, where, arrayRemove, doc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore'
import { db, auth, updateNumbers } from '../firebase'

/**
 * The boundary class for friend page.
 * @returns The HTML elements to be displayed on the website.
 */
const FriendUI = () => {
    const uid = auth.currentUser.uid
    const navigate = useNavigate()

    const fetched = useRef(false)

    /**
     * type : Array of friend object.
     * The list of friends of the current logged-in user.
     * setFriends : Update the friends array.
     */
    const [friends, setFriends] = useState([])

    /**
     * type : Array of request object.
     * The list of friend request of the current logged-in user.
     * setRequests : Update the requests array.
     */    
    const [requests, setRequests] = useState([])

    /**
     * Fetch the friend and friend requests data from database.
     */
    const fetchUsers = async() => {

        const user = auth.currentUser
        const unsub = onSnapshot(doc(db, "users", user.uid), async (doc) => {
        
            const friendsUIDList = doc.data().friends 
            const requestsUIDList = doc.data().friendReqs
            let requests = []
            let friends = []

            if(requestsUIDList.length !== 0 ){
                const requestsList = query(collection(db, 'users'), where('uid', 'in', requestsUIDList))
                const requestsListSnapshot = await getDocs(requestsList)
                
                requestsListSnapshot.forEach((doc) => {
                    let data = doc.data()
                    requests.push({
                        id: data.uid,
                        name: data.name,
                        imageURL: data.image_url
                    })
                })
            }

            if(friendsUIDList.length !== 0){
                const friendsList = query(collection(db, 'users'), where('uid', 'in', friendsUIDList))
                const friendsListSnapshot = await getDocs(friendsList)
                
                friendsListSnapshot.forEach((doc) => {
                    let data = doc.data()
                    friends.push({
                        id: data.uid,
                        name: data.name,
                        imageURL: data.image_url
                    })
                })
            }

            fetched.current = true
            setFriends(friends)
            setRequests(requests)
        })
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchUsers()
    }, [])

    /**
     * Chat with a friend.
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
     * Remove a friend.
     * @param {String} friendUID The user ID whom the current user intends to remove.
     */
    const RemoveFriend = async (friendUID) => {
        const friendRef = doc(db, 'users', friendUID);
        const friendSnap = await getDoc(friendRef);
        const user = auth.currentUser;
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        await updateDoc(friendRef, {
            friends: arrayRemove(user.uid),
        })
        await updateDoc(userRef, {
            friends: arrayRemove(friendUID),
        })
        updateNumbers(friendUID)
        updateNumbers(user.uid)
        fetchUsers()
    }

    /**
     * Approves friend's request.
     * @param {String} userID The user ID.
     */
    const Approve = async (userID) => {
        const friendRef = doc(db, 'users', userID);
        const friendSnap = await getDoc(friendRef);
        const user = auth.currentUser;
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        //add friend into current user friend list
        await updateDoc(userRef, {
            friends: arrayUnion(userID),
        })
        //remove friend request from current user friend request list
        await updateDoc(userRef, {
            friendReqs: arrayRemove(userID),
        })
        //add current user into other user's friend list
        await updateDoc(friendRef, {
            friends: arrayUnion(user.uid),
        })
        updateNumbers(userID)
        updateNumbers(user.uid)
        fetchUsers()
    }

    /**
     * Reject a friend's request.
     * @param {String} userID The user ID.
     */
    const Reject = async (userID) => {
        const user = auth.currentUser;
        if (!user) return;
        const userRef = doc(db, "users", user.uid);
        //remove friend request from current user friend request list
        await updateDoc(userRef, {
            friendReqs: arrayRemove(userID),
        })
        //may need some kind of reject notification
        fetchUsers()
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
            <div className='frWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>Friends List</h2>
                </div>

                {friends.length === 0 && requests.length === 0 && 
                    <p id='nofriend'>No friends yet</p>
                }

                {friends.length > 0 && <h3 id='title'>Current Friends</h3> }
                {friends.map((friend, index) => {
                        return <div key={index} className='friend'>
                            <div className='userInfo' onClick={() => OpenProfile(friend.id)}>
                                <img id='profileImg' src={friend.imageURL} alt='' />
                                <p id='name'>{friend.name}</p>
                            </div>
                            <BsFillChatFill onClick={() => Chat(friend.id)} />
                            <MdRemoveCircle onClick={() => RemoveFriend(friend.id)}/>
                        </div>
                })}

                {requests.length > 0 && <h3 id='title'>Friend Requests</h3> }
                {requests.map((request, index) => {
                        return <div key={index} className='request'>
                            <div className='userInfo' onClick={() => OpenProfile(request.id)}>
                                <img id='profileImg' src={request.imageURL} alt='' />
                                <p id='name'>{request.name}</p>
                            </div>
                            <MdAddCircle onClick={() => Approve(request.id)}/>
                            <MdRemoveCircle onClick={() => Reject(request.id)}/>
                        </div>
                })}

                <div className='space'></div>
            <NavBar />
            </div>
        )
}

export default memo(FriendUI);