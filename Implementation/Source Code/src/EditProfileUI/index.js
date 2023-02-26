import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useState, useEffect, useRef, memo }  from 'react'
import { useNavigate } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { auth, db, storage } from '../firebase'

/**
 * The boundary class for edit profile page.
 * @returns The HTML elements to be displayed on the website.
 */
const EditProfileUI = () => {
    const user = auth.currentUser
    const navigate = useNavigate();
    const fetched = useRef(false)

    /**
     * type : User's profile object.
     * profile : The user profile's details.
     * setProfile : Update user profile's details.
     * name : The name of the user.
     * username : The username of the user.
     * description : The description of the user.
     */
    const [profile, setProfile] = useState({name:'Enter new name',
                                            username: 'Enter new username',
                                            description: 'Enter new description'})
    /**
     * imageURL : The profile photo of the user.
     */
    const [imageURL, setImageURL] = useState('https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/1665579245306prof_pic%20Small.jpeg?alt=media&token=c3bb8c03-d66a-4bc5-b6a0-e8e9eb7f1af3')

    const [file, setFile] = useState('')

    /**
     * Upload a photo to the database and update user's profile photo.
     * @param {String} docRef Reference to the document in the database.
     * @param {String} name The name of the picture to be saved.
     */
    const uploadPhoto = async (docRef, name) => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        const pic_name = new Date().getTime() + file.name;
        const storageRef = ref(storage, pic_name);
        uploadBytes(storageRef, file, metadata).then(() => {
            getDownloadURL(storageRef).then(async (downloadURL) => {
                fetched.current = false
                await updateDoc(docRef, {
                    image_url: downloadURL
                })
                fetchUserData()
                console.log(name, downloadURL)
                updateActivities(downloadURL, name)
                navigate('/profile')
            })
        })
    }

    /**
     * Send updated profile details entered by the user to the database.
     * @param {HTMLEvent} e The HTML event containing the updated profile details by the user.
     */
    const updateProfile = async (e) => {
        e.preventDefault()
        // Save the updated user's info
        const docRef = doc(db, "users", user.uid)
        console.log(docRef)
        
        await updateDoc(docRef, {
            name: e.target[1].value,
            username: e.target[2].value,
            description: e.target[3].value,
        })

        if(file !== null)
            uploadPhoto(docRef, e.target[1].value)
        setTimeout(() => navigate('/profile'), 1000)
        //navigate('/profile')
    }

    /**
     * Update user's name and profile photo in activities organised by the user.
     * @param {String} downloadURL The new image URL.
     * @param {String} name The new name.
     */
    const updateActivities = async(downloadURL, name) => {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        const organised_activities = docSnap.get('organised_activities')
        console.log(organised_activities)
        for (const activity of organised_activities){
            const activityRef = doc(db, 'activities', activity)
            console.log(activityRef)
            await updateDoc(activityRef, {
                OrganiserName: name,
                OrganiserPic: downloadURL,
            })
        }
    }

    /**
    * Upload the image to the website locally but not yet sent to the database.
    * @param {HTMLEvent} e The HTML event containing the profile photo to be uploaded by the user.
    */
    const upload = (e) => {
        setImageURL(URL.createObjectURL(e.target.files[0]))
        setFile(e.target.files[0])
    }

    /**
     * Store the name entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the name entered by the user. 
     */
    const handleName = (e) => {
        setProfile({...profile, name:e.target.value})
    }

    /**
     * Store the username entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the username entered by the user. 
     */
    const handleUsername = (e) => {
        setProfile({...profile, username:e.target.value})
    }

    /**
     * Store the description entered by the user in the state.
     * @param {HTMLEvent} e The HTML event containing the description entered by the user. 
     */
    const handleDescription = (e) => {
        setProfile({...profile, description:e.target.value})
    }

    /**
     * Fetch the user profile's data from database.
    */
    const fetchUserData = async () => {
        const d = await getDoc(doc(db, "users", user.uid))
        const data = d.data()
        setProfile({
            name:data.name, 
            username:data.username, 
            description:data.description
        })
        setImageURL(data.image_url)
        fetched.current = true
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchUserData()
    }, [])

    if(fetched.current)
        return (
            <div className='epWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>Edit Profile</h2>
                </div>
                <div className='formWrapper'>
                        <form className='epForm' onSubmit={updateProfile}>
                            <label htmlFor='profilePhoto'>
                                <img id='profileImg' src={imageURL} alt='Profile'/>
                                <input onChange={upload} type='file' id='profilePhoto' name='profilePhoto' accept='image/*'></input>
                            </label>
                            <h2 id='photoTitle'>Profile Photo</h2>

                            <div className='label'><label htmlFor='name'>Name</label></div>
                            <input type='text' id='name' onChange={handleName} value={profile.name} required></input>

                            <div className='label'><label htmlFor='username'>Username</label></div>
                            <input type='text' id='username' onChange={handleUsername} value={profile.username} required></input>

                            <div className='label'><label htmlFor='description'>Description</label></div>
                            <textarea id='description' rows='2' cols='2' wrap='soft' 
                            maxLength='100' onChange={handleDescription} value={profile.description} spellCheck='false'></textarea>

                            <button type='submit' id='save'>Save Changes</button>
                        </form>
                </div>
                <NavBar />
            </div>
        )
}

export default memo(EditProfileUI);