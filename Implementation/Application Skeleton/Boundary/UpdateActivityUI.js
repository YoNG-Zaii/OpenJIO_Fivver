/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for update activity page.
 * @returns The HTML elements to be displayed on the website.
 */
const UpdateActivityUI = () => {

    /**
     * type : Activity profile object.
     * activityProfile : The activity's profile.
     * setActivityProfile : Update activity's profile.
     * ImageURL : The activity's photo.
     * Title : The title of the activity.
     * Description : The description of the activity.
     * Time : The time of the activity.
     */
    const [activityProfile, setActivityProfile] = useState({
        ImageURL: '',
        Title: '',
        Description: '',
        Location: '',
        Time: ''
    })

    /**
     * Send updated details including new image to the database.
     * @param {HTMLEvent} e The HTML event containing the updated details entered by the user.
     */
    const updateActivity = async (e) => { }

    /**
     * Upload the image to the website locally but not yet sent to the database.
     * @param {HTMLEvent} e The HTML event containing the image to be uploaded by the user.
     */
    const uploadPhoto = (e) => { }

    /**
     * Cancel the update of the activity.
     */
    const cancelUpdate = () => { }

    /**
     * Fetch the activity's info from the database.
     */
    const fetchActivityInfo = async () => { }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => { }, [])

    return (
        <>
        </>
    )
}

export default UpdateActivityUI