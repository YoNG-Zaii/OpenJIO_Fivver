import './index.css'
import OpenJioLogo from '../Images/OpenJioLogo'
import NavBar from '../NavBar'
import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, collection, serverTimestamp, getDoc, updateDoc,arrayUnion } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { auth, updateNumbers, db, storage } from '../firebase'

/**
 * The boundary class for create activity page.
 * @returns The HTML elements to be displayed on the website.
 */
const CreateActivityUI = () => {
    const [imageURL, setImageURL] = useState("https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/sports.jpeg?alt=media&token=c1edcc95-1d45-4d46-a1c5-05f599c81e5b")
    const navigate = useNavigate()
    const [file, setFile] = useState('')
    const uid = auth.currentUser.uid

    /**
     * Upload a photo to the database.
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
                await updateDoc(docRef, {
                    ImageUrl: downloadURL
                })
            })
        })
    }

    /**
     * Send activity details including background image to be created to the database.
     * @param {HTMLEvent} e The HTML event containing the activity details entered by the user.
     */
    const createActivitySubmit = async(e) => {
        e.preventDefault()
        console.log(e.target[0].files[0]) // Photo
        console.log(e.target[1].value) // Title
        console.log(e.target[2].value) // Description
        console.log(e.target[3].value) // Location
        console.log(e.target[4].value) // Time
        console.log(e.target[5].value) // Max number of people
        const CAP = parseInt(e.target[5].value, 10)
        console.log(CAP)

        const newActRef = doc(collection(db, 'activities')) // Auto-generate an activity ID
        
        const userRef = doc(db, "users", uid)
        const userSnap = await getDoc(userRef)
        const numOrganised = userSnap.get('organised_activities').length
        await updateDoc(userRef, {
            organised_activities: arrayUnion(newActRef.id),
            numActivitiesPosted: numOrganised,
            upcoming_activities: arrayUnion(newActRef.id),
        })

        await setDoc(newActRef, {
            ID: newActRef.id,
            Created: serverTimestamp(),
            Title: e.target[1].value,
            Description: e.target[2].value,
            Location: e.target[3].value.toLowerCase(),
            Time: e.target[4].value,
            MaxCap: CAP,
            Organiser: uid,
            Participants:[],
            PendingUsers:[],
            NumParticipants:1,
            NumPendingUsers:0,
            OrganiserPic: userSnap.get('image_url'),
            OrganiserName: userSnap.get('name'),
            difference: 0,
            ImageUrl: "https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/sports.jpeg?alt=media&token=c1edcc95-1d45-4d46-a1c5-05f599c81e5b"
        })

        const docRef = doc(db, 'activities', newActRef.id)
        if(file !== null)
            uploadPhoto(docRef)

        updateNumbers(uid)    
        navigate('/home')
    }
    
    /**
     * Upload the image to the website locally but not yet sent to the database.
     * @param {HTMLEvent} e The HTML event containing the image to be uploaded by the user.
     */    
    const upload = (e) => {
        setImageURL(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0])
    }
  
    return (
        <div className='caWrapper'>
            <div className='header'>
                <OpenJioLogo />
                <h2 className='title'>Create Activity</h2>
            </div>
            <div className='formWrapper'>
                    <form className='caForm' onSubmit={createActivitySubmit} >
                        <label htmlFor='activityPhoto'>
                            <img id='activityImg' src={imageURL} alt='Activity'/>
                            <input onChange={upload} type='file' id='activityPhoto' name='activityPhoto' accept='image/*'></input>
                        </label>

                        <div className='label'><label htmlFor='title'>Title</label></div>
                        <input type='text' id='title' maxlength='15' required></input>

                        <div className='label'><label htmlFor='description'>Description</label></div>
                        <textarea id='description' rows="2" cols="2" wrap="soft" 
                        maxLength="100" spellCheck='false'></textarea>

                        <div className='label'><label htmlFor='location'>Location</label></div>
                        <input type='text' id = 'location' maxlength='100' required></input>

                        <div className='label'><label htmlFor='time'>Time</label></div>
                        <input type='datetime-local' id='time' min={new Date().toISOString().slice(0, -8)} required></input>

                        <div className='label'><label htmlFor='capacity'>Maximum capacity</label></div>
                        <input type='number' id='capacity' min='1' required></input>
                        <button type='submit' id='post' >Post Activity</button>
                    </form>
            </div>

            <NavBar />
        </div>
    )
}

export default memo(CreateActivityUI)