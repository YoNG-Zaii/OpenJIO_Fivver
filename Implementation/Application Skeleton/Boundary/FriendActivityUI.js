/**
 * Import the neccessary methods from 'react' libraries.
 */
 import { useState, useEffect } from 'react'

/**
 * The activity component used by FriendActivityUI to be displayed on the website.
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
 * The boundary class for friend's list of upcoming activities.
 * @returns The HTML elements to be displayed on the website.
 */
 const FriendActivityUI = () => {

    /**
     * type : Array of activity objects.
     * activities : The friend's activities list.
     * setActivities : Update the activities array.
     */
    const [activities, setActivities] = useState([])

    /**
     * Fetch the friend's participated activities from the database.
     * @param {String} friendID The friend's ID.
     */
    const fetchFriendActivities = async (friendID) => { }

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

export default FriendActivityUI