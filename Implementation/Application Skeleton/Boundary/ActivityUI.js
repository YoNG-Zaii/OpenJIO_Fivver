/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for an activity page.
 * @returns The HTML elements to be displayed on the website.
 */
const ActivityUI = () => {

    /**
     * type : Activity profile object.
     * activityProfile : The activity's profile.
     * setActivityProfile : Update activity's profile.
     * name : The title/name of the activity.
     * description : The description of the activity.
     * location : The location of the activity.
     * datetime : The datetime of the activity.
     * organiser : The organiser's ID.
     * participants : The list of participant's names.
     * participantsID : The list of participant's IDs.
     * participantsPhotos : The list of participant's image URLs.
     * pending_participants : The list of pending participant's names.
     * pending_participantsID : The list of pending participant's IDs.
     * pending_participantsPhotos : The list of pending participant's image URLs.
     */
    const [activityProfile, setActivityProfile] = useState({
        name: '',
        description: '',
        location: '',
        datetime: '',
        organiser: '',
        participants: [],
        participantsID: [],
        participantsPhotos: [],
        pending_participants: [],
        pending_participantsID: [],
        pending_participantsPhotos: [],
    })

    /**
     * The organiser/participant performs an action related to this activity.
     * @param {String} type The type of activity's action.
     * @param {String} userID The user ID.
     * @param {String} activityID The activity ID
     * such as join, leave, approve, reject
     */
    const activityAction = async (type, userID, activityID) => { }

    /**
     * Deletes the activity.
     * @param {String} activityID The activity ID.
     */
    const deleteActivity = async (activityID) => { }

    /**
     * Fetch the user status in the activity from the database.
     * @param {String} activityID The activity ID.
     */
    const fetchUserStatus = async (activityID) => { }

    /**
     * Fetch the activity's info from the database.
     * @param {String} activityID The activity ID.
     */
    const fetchActivityInfo = async (activityID) => { }

    /**
     * Fetch the coordinates of the location from a Map API.
     * @param {String} location The location of the activity.
     */
    const fetchCoordinates = async (location) => { }

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

export default ActivityUI