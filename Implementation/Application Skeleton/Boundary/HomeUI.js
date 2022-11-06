/**
 * Import the neccessary methods from 'react' libraries.
 */
 import { useState, useEffect } from 'react'

/**
 * The activity component used by HomeUI to be displayed on the website.
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
 * The boundary class for home page.
 * @returns The HTML elements to be displayed on the website.
 */
const HomeUI = () => {

    /**
     * type : Array of activity objects.
     * activities : The user's activities list.
     * setActivities : Update the activities array.
     */
    const [activities, setActivities] = useState([])

    /**
     * type : String.
     * sortType : The type on how activities are be sorted such as time or distance.
     * setSortType : Update the sort type.
     */
    const [sortType, setSortType] = useState('')

    /**
     * If the user grants location permission, 
     * then get the current location's coordinates.
     */
    const checkLocation = async () => { }

    /**
     * Sort activities either by time or distance.
     * @param {String} type The type on how activities are to be sorted.
     */
    const sortActivities = (type) => { }

    /**
     * Search users/activities.
     * @param {HTMLEvent} e The HTML event containing the text to be searched.
     */
    const search = (e) => { }

    /**
     * Fetch the activities from the database.
     */
    const fetchActivities = () => { }

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

export default HomeUI