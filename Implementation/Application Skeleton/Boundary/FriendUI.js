/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for friend page.
 * @returns The HTML elements to be displayed on the website.
 */
const FriendUI = () => {
    /**
     * type : Array of friend object.
     * The list of friends of the current logged-in user.
     * setFriends : Update the friends array.
     */
    const [friends, setFriends] = useState([])

    /**
     * type : Array of request object.
     * The list of friend request of the current logged-in user.
     * setRequests : Update the requests array.
     */    
    const [requests, setRequest] = useState([])

    /**
     * Chat with a user/friend.
     * @param {String} recipientUID The user ID whom the current user will chat with.
     */
    const chat = (recipientUID) => { }

    /**
     * Approves friend's request.
     * @param {String} userID The user ID.
     */
    const approve = (userID) => { }

    /**
     * Reject a friend's request.
     * @param {String} userID The user ID.
     */
    const reject = (userID) => { }

    /**
     * Remove a friend.
     * @param {String} friendUID The user ID whom the current user intends to remove.
     */
    const removeFriend = (friendUID) => { }

    /**
     * Open a user's profile.
     * @param {String} userID The user ID.
     */
    const OpenProfile = (userID) => { }

    /**
     * Fetch the friend and friend requests data from database.
     */
    const fetchUsers = async () => { }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => { })

    return (
        <>
        </>
    )
}

export default FriendUI