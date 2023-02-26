/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState } from 'react'

/**
 * The boundary class for create activity page.
 * @returns The HTML elements to be displayed on the website.
 */
const CreateActivityUI = () => {
    
    /**
     * type : string.
     * imageURL : The background image of the activity to be created.
     * setImageURL : Update the imageURL field.
     */
    const [imageURL, setImageURL] = useState('')

    /**
     * Upload the image to the website locally but not yet sent to the database.
     * @param {HTMLEvent} e The HTML event containing the image to be uploaded by the user.
     */
    const uploadPhoto = (e) => { }

    /**
     * Send activity details including background image to be created to the database.
     * @param {HTMLEvent} e The HTML event containing the activity details entered by the user.
     */
    const createActivitySubmit = async (e) => { }

    return (
        <>
        </>
    )
}

export default CreateActivityUI