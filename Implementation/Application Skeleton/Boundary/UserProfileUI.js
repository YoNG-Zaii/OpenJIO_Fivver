/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for user profile page.
 * @returns The HTML elements to be displayed on the website.
 */
const UserProfileUI = () => {
    
    /**
     * type : user object.
     * myProfile : The user profile's details.
     * setMyProfile : Update user profile's details.
     * uid : The user ID.
     * imageURL : The profile photo of the user.
     * name : The name of the user.
     * numPost : The number of activities posted by the user.
     * numParticipate : The number of participated activities posted by the user.
     * numFriends : The number of friends of the user.
     */
    const [userProfile, setUserProfile] = useState({
        uid: '',
        imageURL: '',
        name: '',
        numPost: 0,
        numParticipate: 0,
        numFriends: 0
    })

    /**
     * The current user performs an action related to this profile of another user.
     * such as add, remove and approve.
     * @param {String} type The type of action
     * @param {String} userID The user ID.
     * @param {String} currentUserID The current user ID viewing the profile.
     */
    const friendAction = async (type, userID, currentUserID) => { }

    /**
     * Chat with a user/friend.
     * @param {String} recipientUID The user ID whom the current user will chat with.
     */
     const chat = (recipientUID) => { }
     
    /**
     * Fetch the data on how the current user is related to this profile of another user.
     * @param {String} userID The user ID.
     */
    const fetchFriendStatus = async (userID) => { }

    /**
     * Fetch the user profile's data from database.
     * @param {String} userID The user ID.
     */
     const fetchUserInfo = async (userID) => { }

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

export default UserProfileUI