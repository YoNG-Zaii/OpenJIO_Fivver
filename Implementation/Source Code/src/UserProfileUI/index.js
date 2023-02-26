import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useState, useEffect, memo }  from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { db, auth, updateNumbers } from '../firebase'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

/**
 * The boundary class for user profile page.
 * @returns The HTML elements to be displayed on the website.
 */
const UserProfileUI = () => {

    const location = useLocation()
    const { uid } = location.state
    const navigate = useNavigate()
    const [friendStatus, setFriendStatus] = useState('')
    const [numFriends, setNumFriends] = useState(0)

    /**
     * type : user object.
     * myProfile : The user profile's details.
     * setMyProfile : Update user profile's details.
     * id : The user ID.
     * imageURL : The profile photo of the user.
     * name : The name of the user.
     * numPost : The number of activities posted by the user.
     * numParticipate : The number of participated activities posted by the user.
     * numFriends : The number of friends of the user.
     */
    const [userProfile, setUserProfile] = useState({
        id: '',
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/1665579245306prof_pic%20Small.jpeg?alt=media&token=c3bb8c03-d66a-4bc5-b6a0-e8e9eb7f1af3',
        name: 'User',
        numPost: 0,
        numParticipate: 0,
        numFriends: 0
    })

    /**
     * Fetch the user profile's data from database.
     * @param {String} uid The user ID.
     */
    const fetchUserInfo = async (uid) => {
        const docSnap = await getDoc(doc(db, 'users', uid))
        setNumFriends(docSnap.get('numFriends'))
        console.log('number of friends', numFriends)

        setUserProfile({
            id:docSnap.get('uid'),
            name:docSnap.get('name'),
            imageURL: docSnap.get('image_url'),
            numPost:docSnap.get('numActivitiesPosted'),
            numParticipate:docSnap.get('numActivitiesParticipated'),
            numFriends:docSnap.get('numFriends')
        })
    }

    /**
     * Fetch the data on how the current user is related to this profile of another user.
     * @param {String} uid The user ID.
     */
    const fetchFriendStatus = async (uid) => {
        const friendRef = doc(db, 'users', uid)
        const friendSnap = await getDoc(friendRef)
        const user = auth.currentUser
        if (!user) return;
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        const request = friendSnap.get('friendReqs')
        const friend = friendSnap.get('friends')
        const requestedBy = userSnap.get('friendReqs')
        //if already friends, change to Delete
        if(friend.includes(user.uid)){
            setFriendStatus('Remove')
        }
        else if(requestedBy.includes(uid)){
            setFriendStatus('Accept')
        }
        //if friend request sent, change to Requested
        else if(request.includes(user.uid)){
            setFriendStatus('Requested')
        }
        //if no friend request and not friends, remain as add friend
        else{
            setFriendStatus('Add Friend')
        }
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchUserInfo(uid)
        fetchFriendStatus(uid)
    }, [uid])

    /**
     * The current user performs an action related to this profile of another user
     * such as add, remove and approve.
     */
    const friendAction = async () => {
        const friendRef = doc(db, 'users', uid)
        const friendSnap = await getDoc(friendRef)
        const user = auth.currentUser
        if (!user) return
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        //if already friends, change to Delete
        if(friendStatus === 'Remove'){
            await updateDoc(friendRef, {
                friends: arrayRemove(user.uid),
            })
            await updateDoc(userRef, {
                friends: arrayRemove(uid),
            })
            setNumFriends(numFriends-1)
        }
        //if friend request received, change to accept
        else if(friendStatus === 'Accept'){
            await updateDoc(friendRef, {
                friends: arrayUnion(user.uid),
            })
            await updateDoc(userRef, {
                friends: arrayUnion(uid),
            })
            await updateDoc(userRef, {
                friendReqs: arrayRemove(uid),
            })
            setNumFriends(numFriends+1)
        }
        //if friend request sent, change to remove request
        else if(friendStatus === 'Requested'){
            await updateDoc(friendRef, {
                friendReqs: arrayRemove(user.uid),
            })
        }
        //if no friend request and not friends, remain as add friend
        else{
            await updateDoc(friendRef, {
                friendReqs: arrayUnion(user.uid),
            })
        }
        updateNumbers(uid)
        updateNumbers(user.uid)
        fetchFriendStatus(uid)
    }

    /**
     * Update the number of friends in the user database.
     * @param {String} uid The user ID.
     */
    const updateFriendsNum = async (uid) => {
        const userRef = doc(db, "users", uid)
        const userSnap = await getDoc(userRef)
        const userNumFriends = userSnap.get('friends').length
        await updateDoc(userRef, {
            numFriends: userNumFriends,
        })
        console.log("friend", userNumFriends)
    }
       
    /**
     * Chat with a user/friend.
     * @param {String} recipientUID The user ID whom the current user will chat with.
     */
    const Chat = (recipientUID) => {
        const me = auth.currentUser
        navigate('/chat', {state:{
            uid: me.uid,
            recipientUID: recipientUID}});
    }

    /**
     * View friend's activities.
     * @param {String} uid The user ID.
     * @param {String} name The name of the user.
     */
    const viewActivity = (uid, name) => {
        navigate('/friendactivity', {state:{uid: uid, name: name}})
    }
    
    if(friendStatus !== '')
        return (
            <div className='upWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>User Profile</h2>
                </div>
                <div className='profile'>
                    <img id='profileImg' src={userProfile.imageURL} alt='Profile'/>
                    <h2 className='name'>{userProfile.name}</h2>
                </div>
                <div className='count'>
                    <div className='posted'>
                        <h3>{userProfile.numPost}</h3>
                        <p>Activities posted</p>
                    </div>
                    <div className='participated'>
                        <h3>{userProfile.numParticipate}</h3>
                        <p>Activities participated</p>
                    </div>
                    <div className='friend'>
                        <h3>{numFriends}</h3>
                        <p>Friends</p>
                    </div>
                </div>
                <div className='content'>
                    <button id='friendAction' onClick={friendAction}>{friendStatus}</button>
                    <button id='chat' onClick={() => Chat(userProfile.id)}>Chat</button>
                    {friendStatus === 'Remove' &&
                        <button id='viewActivityAction' onClick={() => viewActivity(userProfile.id, userProfile.name)}>
                            View Activity
                        </button>
                    }
                </div>
                <NavBar />
            </div>
        )
}

export default memo(UserProfileUI)