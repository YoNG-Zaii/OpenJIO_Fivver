import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useState, useEffect, memo }  from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db, logout } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

/**
 * The boundary class for the current logged-in user's profile page.
 * @returns The HTML elements to be displayed on the website.
 */
const ProfileUI = () => {

    /**
     * type : User profile's object.
     * myProfile : The user profile's details.
     * setMyProfile : Update user profile's details.
     * id : The user ID.
     * imageURL : The profile photo of the user.
     * name : The name of the user.
     * numPost : The number of activities posted by the user.
     * numParticipate : The number of participated activities posted by the user.
     * numFriends : The number of friends of the user.
     */
    const [myProfile, setMyProfile] = useState({
        id: '',
        imageURL: 'https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/1665579245306prof_pic%20Small.jpeg?alt=media&token=c3bb8c03-d66a-4bc5-b6a0-e8e9eb7f1af3',
        name: 'User',
        numPost: 0,
        numParticipate: 0,
        numFriends: 0
    })

    /**
     * Fetch the user profile's data from database.
     */
    const fetchCurrentUserInfo = async () => {
        const user = auth.currentUser;
        if (!user) return;
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        setMyProfile({
            id: docSnap.get('uid'),
            imageURL: docSnap.get('image_url'),
            name: docSnap.get('name'),
            numPost: docSnap.get('numActivitiesPosted'),
            numParticipate: docSnap.get('numActivitiesParticipated'),
            numFriends: docSnap.get('numFriends')
        })
    }
    
    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchCurrentUserInfo();
    }, [])

    const navigate = useNavigate();

    /**
     * Sign out of the current user account.
     */
    const signOut = () => {
        logout();
        navigate("/login");
    }
    
    if(myProfile.id !== '')
        return (
            <div className='pfWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>My Profile</h2>
                </div>
                <div className='profile'>
                    <img id='profileImg' src={myProfile.imageURL} alt='Profile'/>
                    <h2 className='name'>{myProfile.name}</h2>
                </div>
                <div className='count'>
                    <div className='posted'>
                        <h3>{myProfile.numPost}</h3>
                        <p>Activities posted</p>
                    </div>
                    <div className='participated'>
                        <h3>{myProfile.numParticipate}</h3>
                        <p>Activities participated</p>
                    </div>
                    <div className='friend'>
                        <h3>{myProfile.numFriends}</h3>
                        <p>Friends</p>
                    </div>
                </div>
                <div className='content'>
                    <Link to='/editprofile'><button id='edit'>Edit profile</button></Link>
                    <Link to='/friend'><button id='friend'>My Friends</button></Link>
                    <Link to='/myactivity'><button id='activities'>My Activities</button></Link>
                    <Link to='/mychat'><button id='chat'>My Chats</button></Link>
                    <button id='Logout' onClick={signOut}>Logout</button>
                </div>
                <NavBar />
            </div>
        )
}

export default memo(ProfileUI)