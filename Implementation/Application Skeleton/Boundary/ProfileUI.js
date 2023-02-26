/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for the current logged-in user's profile page.
 * @returns The HTML elements to be displayed on the website.
 */
const ProfileUI = () => {

    /**
     * type : User profle's object.
     * myProfile : The user profile's details.
     * setMyProfile : Update user profile's details.
     * uid : The user ID.
     * imageURL : The profile photo of the user.
     * name : The name of the user.
     * numPost : The number of activities posted by the user.
     * numParticipate : The number of participated activities posted by the user.
     * numFriends : The number of friends of the user.
     */
    const [myProfile, setMyProfile] = useState({
        uid: '',
        imageURL: '',
        name: '',
        numPost: 0,
        numParticipate: 0,
        numFriends: 0
    })

    /**
     * Fetch the user profile's data from database.
     */
    const fetchCurrentUserInfo = async () => { }

    /**
     * Sign out of the current user account.
     */
    const signOut = () => { }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => { }, []);

    return (
        <>
        </>
    )
}

export default ProfileUI