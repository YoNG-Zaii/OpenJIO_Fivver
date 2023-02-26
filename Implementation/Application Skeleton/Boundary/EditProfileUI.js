/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for edit profile page.
 * @returns The HTML elements to be displayed on the website.
 */
const EditProfileUI = () => {

    /**
     * type : User's profile object.
     * profile : The user profile's details.
     * setProfile : Update user profile's details.
     * imageURL : The profile photo of the user.
     * name : The name of the user.
     * username : The username of the user.
     * description : The description of the user.
     */
    const [profile, setProfile] = useState({
        imageURL: '',
        name: '',
        username: '',
        description: ''
    })

    /**
     * Send updated profile details entered by the user to the database.
     * @param {HTMLEvent} e The HTML event containing the updated profile details by the user.
     */
    const updateProfile = (e) => { }

    /**
    * Upload the image to the website locally but not yet sent to the database.
    * @param {HTMLEvent} e The HTML event containing the profile photo to be uploaded by the user.
    */
    const uploadPhoto = (e) => { }

    /**
     * Fetch the user profile's data from database.
    */
    const fetchCurrentUserProfile = async () => { }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => { }, [])

    return(
        <>
        </>
    )
}

export default EditProfileUI