import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import Chat from './components/Chat'
import { useState, useEffect, memo } from 'react'
import { useLocation} from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db } from "../firebase"

/**
 * The boundary class for chat page.
 * @returns The HTML elements to be displayed on the website.
 */
const ChatUI = () => {
  const [user]= useAuthState(auth);
  const [friend, setFriend] = useState('')
  const [photo, setPhoto] = useState()

  const location = useLocation();
  const recipientID = location.state.recipientUID;

  /**
   * Immediately executes upon the rendering of the page.
   * To fetch data from the database/entity class.
   */
  useEffect(() => {
    fetchUserInfo()
  }, []);

  /**
   * Fetch the user's name and profile photo from the database.
   */
  const fetchUserInfo = async() => {

    const docRef = await doc(db, 'users', recipientID);
    const docSnap = await getDoc(docRef);
    // console.log("docSnap is: ", docSnap.data().name);
    const friendName = docSnap.data().name;
    const friendPhoto = docSnap.data().image_url;
    // console.log("friend name is", friendName);
    setFriend(friendName);
    setPhoto(friendPhoto);
  }

  return (
    <div className='ChatUI'>
        <div className='header'>
            <OpenJioLogo />
            <h2 className='title'>Chat</h2>
        </div>
      <div className='profileHeader'>
        <img src={photo} alt='' />
        <h2 className='name'> {friend} </h2>
      </div>
        {user && < Chat prop = {recipientID}/>}
      <NavBar />
    </div>
  );
}

export default memo(ChatUI)
