/**
 * Import the neccessary methods from 'react' libraries.
 */
import { useState, useEffect } from 'react'

/**
 * The boundary class for chat page.
 * @returns The HTML elements to be displayed on the website.
 */
const ChatUI = () => {

    /**
     * type : Array of Message objects.
     * messages : The list of messages history in the chat.
     * setMessages : Update the messages field.
     */
    const [messages, setMessages] = useState([])

    /**
     * Send message to the other user.
     * @param {HTMLEvent} e The HTML event containing the text to be sent.
     */
    const sendMessage = async (e) => { }

    /**
     * Delete a message.
     * @param {String} messageID The message ID.
     */
     const deleteMessage = async (messageID) => { }

    /**
     * Fetch the user's name and profile photo from the database.
     * @param {String} userID The user ID.
     */
    const fetchUserInfo = async (userID) => { }

    /**
     * Fetch the chat's messages from the database.
     * @param {String} chatID The chat ID.
     */
    const fetchMessages = async (chatID) => { }

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

export default ChatUI