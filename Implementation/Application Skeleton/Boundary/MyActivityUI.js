/**
 * Import the neccessary methods from 'react' libraries.
 */
 import { useState, useEffect } from 'react'

/**
 * The activity component used by MyActivityUI to be displayed on the website.
 * @param uid : The activity ID
 * @param name : The name of the activity.
 * @param bgImage : The background image of the activity.
 * @param userImage : The organiser's and participant's profile photos.
 * @param organiser : The name of the organiser.
 * @param time : The time of the activity being held.
 * @param saved : Whether the activity is saved by the current user.
 * @returns The ActivityCard component.
 */
 const ActivityCard = ({ uid, name, bgImage, userImage, organiser, time, saved }) => {
    
    /**
     * Save this activity in the user's list of activites.
     */
    const save = async () => { }

    /**
     * Open this activity page.
     */
    const openActivity = () => { }

    return (
        <>
        </>
    )
}

/**
 * The boundary class for user's list of upcoming/saved activities.
 * @returns The HTML elements to be displayed on the website.
 */
 const MyActivityUI = () => {

    /**
     * type : Array of activity objects.
     * savedActivities : The user's saved activities list.
     * setSavedActivities : Update the savedActivities array.
     */
    const [savedActivities, setSavedActivities] = useState([])

    /**
     * type : Array of activity objects.
     * joinedActivities : The activities list joined by the user.
     * setJoinedActivities : Update the joinedActivities array.
     */
     const [joinedActivities, setJoinedActivities] = useState([])

    /**
     * type : Array of activity objects.
     * joinedActivities : The organised activities list  by the user.
     * setOrganisedActivities : Update the organisedActivities array.
     */
    const [organisedActivities, setOrganisedActivities] = useState([])

    /**
     * Fetch the saved activities from the database.
     */
    const fetchSavedActivities = async () => { }

    /**
     * Fetch the joined activities from the database.
     */
    const fetchJoinedActivities = async () => { }

    /**
     * Fetch the organised activities from the database.
     */
    const fetchOrganisedActivities = async () => { }

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

export default MyActivityUI