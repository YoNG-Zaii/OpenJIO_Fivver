/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for searched activities/usernames page.
 * @returns The HTML elements to be displayed on the website.
 */
const SearchListUI = () => {

    /**
     * type : Array of Activity objects.
     * activities : The searched activities list.
     * setActivities : Update the activities array.
     */
    const [activities, setActivities] = useState([])

    /**
     * type : Array of User objects.
     * activities : The searched usernames list.
     * setActivities : Update the users array.
     */
    const [users, setUsers] = useState([])

    /**
     * Search users/activities.
     * @param {HTMLEvent} e The HTML event containing the text to be searched.
     */
    const search = (e) => { }

    /**
     * Open an activity page.
     */
    const ActivityProfile = () => { }

    /**
     * Open a user's profile.
     * @param {String} userID The user ID.
     */
    const OpenProfile = (userID) => { }

    /**
     * Fetch list of users matching the search result.
     * @param {String} input The searched value.
     */
    const fetchUsers = (input) => { }

    /**
     * Fetch list of users matching the search result.
     * @param {String} input The searched value.
     */
    const fetchActivities = (input) => { }

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

export default SearchListUI