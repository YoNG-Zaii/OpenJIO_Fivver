/**
 * Import the neccessary methods from 'react' libraries.
 */
 import { useState, useEffect } from 'react'

 /**
 * The boundary class for user's list of chats.
 * @returns The HTML elements to be displayed on the website.
 */
const MyChatUI = () => {

    /**
     * type : Array of chat objects.
     * chats : The user's non-empty chat list.
     * setChats : Update the chats array.
     */
    const [chats, setChats] = useState([])

    /**
     * Fetch the chat data from database.
     */
    const fetchChats = async () => { }

    /**
     * Chat with a user/friend.
     * @param {String} recipientUID The user ID whom the current user will chat with.
     */
    const chat = (recipientUID) => { }

    /**
     * Open a user's profile.
     * @param {String} userID The user ID.
     */
     const OpenProfile = (userID) => { }

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

export default MyChatUI