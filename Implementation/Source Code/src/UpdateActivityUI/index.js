import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useState, useEffect, useRef, memo }  from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db, storage } from '../firebase'

/**
 * The boundary class for update activity page.
 * @returns The HTML elements to be displayed on the website.
 */
const UpdateActivityUI = () => {
    const location = useLocation()
    const { uid } = location.state
    const fetched = useRef(false)

    /**
     * type : Activity profile object.
     * activityProfile : The activity's profile.
     * setActivityProfile : Update activity's profile.
     * Title : The title of the activity.
     * Description : The description of the activity.
     * Time : The time of the activity.
     */   
    const [activityProfile, setActivityProfile] = useState({
        Title: '',
        Description: '',
        Location: '',
        Time: '',})

    /**
     * imageURL : The activity's photo.
     */
    const [imageURL, setImageURL] = useState('https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/1665579245306prof_pic%20Small.jpeg?alt=media&token=c3bb8c03-d66a-4bc5-b6a0-e8e9eb7f1af3')
    const [file, setFile] = useState('')
    const navigate = useNavigate();

    /**
     * Upload a photo to the database and update activity's profile photo.
     * @param {String} docRef Reference to the document in the database.
     */
    const uploadPhoto = async (docRef) => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        const pic_name = new Date().getTime() + file.name;
        const storageRef = ref(storage, pic_name);
        uploadBytes(storageRef, file, metadata).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                fetched.current = false
                await updateDoc(docRef, {
                    ImageUrl: downloadURL
                })
                fetchActivityData()
                // navigate('/profile')
            })
        })
    }

    /**
     * Send updated details including new image to the database.
     * @param {HTMLEvent} e The HTML event containing the updated details entered by the user.
     */
    const updateActivity = async(e) => {
        e.preventDefault();
        // Save the updated user's info
        const docRef = doc(db, "activities", uid)
        console.log(docRef)
        await updateDoc(docRef, {
            Title: activityProfile.Title,
            Description: activityProfile.Description,
            Location: activityProfile.Location,
            Time: activityProfile.Time
        })        
        /* await updateDoc(docRef, {
            Title: e.target[1].value,
            Description: e.target[2].value,
            Location: e.target[3].value,
            Time: e.target[4].value,
        }) */

        if(file !== null)
            uploadPhoto(docRef)
        navigate('/activity', {state:{uid:uid}})
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchActivityData()
    }, []);

    /**
     * Upload the image to the website locally but not yet sent to the database.
     * @param {HTMLEvent} e The HTML event containing the image to be uploaded by the user.
     */
    const upload = (e) => {
        setImageURL(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    /**
     * Store the title entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the title entered by the user. 
     */
    const handleTitle = (e) => {
        setActivityProfile({...activityProfile, Title:e.target.value})
    }

    /**
     * Store the description entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the description entered by the user. 
     */
    const handleDescription = (e) => {
        setActivityProfile({...activityProfile, Description:e.target.value})
    }

    /**
     * Store the location entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the location entered by the user. 
     */
    const handleLocation = (e) => {
        setActivityProfile({...activityProfile, Location:e.target.value})
    }

    /**
     * Store the time entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the time entered by the user. 
     */
    const handleTime = (e) => {
        setActivityProfile({...activityProfile, Time:e.target.value})
    }

    /**
     * Fetch the activity's info from the database.
     */
    const fetchActivityData = async () => {
        const d = await getDoc(doc(db, "activities", uid))
        const data = d.data()
        setActivityProfile({
            Title: data.Title,
            Description: data.Description,
            Location: data.Location,
            Time: data.Time
        })
        setImageURL(data.ImageUrl)
        fetched.current = true
    }

    /**
     * Cancel the update of the activity.
     */
    const cancelUpdate = () => {
        navigate('/activity', {state:{uid:uid}})
    }

    if(fetched.current)
        return (
            <div className='uaWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>Update Activity</h2>
                </div>
                <div className='formWrapper'>
                        <form className='uaForm' onSubmit={updateActivity}>
                            <label htmlFor='activityPhoto'>
                                <img id='activityImg' src={imageURL} alt='Activity'/>
                                <input onChange={upload} type='file' id='activityPhoto' name='activityPhoto' accept='image/*'></input>
                            </label>

                            <div className='label'><label htmlFor='title'>Title</label></div>
                            <input type='text' id='title' onChange={handleTitle} value={activityProfile.Title}required></input>

                            <div className='label'><label htmlFor='description'>Description</label></div>
                            <textarea id='description' onChange={handleDescription} value={activityProfile.Description}rows="2" cols="2" wrap="soft" 
                            maxLength="100" spellCheck='false'></textarea>

                            <div className='label'><label htmlFor='location'>Location</label></div>
                            <input type='text' id = 'location' onChange={handleLocation} value={activityProfile.Location}required></input>

                            <div className='label'><label htmlFor='time'>Time</label></div>
                            <input type='datetime-local' id='time' onChange={handleTime} value={activityProfile.Time}required></input>

                            <div className='buttons'>
                                <button onClick={cancelUpdate} id='cancel'>Cancel</button>
                                <button type='submit' id='update'>Update</button>
                            </div>
                            
                        </form>
                </div>
                <NavBar />
            </div>
        )
}

export default memo(UpdateActivityUI)