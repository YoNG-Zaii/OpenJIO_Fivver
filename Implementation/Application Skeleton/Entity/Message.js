/**
 * The entity class for a message.
 */
class Message{
    /**
     * Message ID field.
     */
    #messageID

    /**
     * Text field.
     */
    #text

    /**
     * Time stamp field.
     */
    #timeStamp

    /**
     * User ID field.
     */
    #userID

    /**
     * Update message ID field.
     * @param {String} messageID New messageID.
     */
    setMessageID(messageID){
        this.#messageID = messageID
    }

    /**
     * Get the value stored in messageID field.
     * @returns  messageID value.
     */
    getMessageID(){
        return this.#messageID
    }

    /**
     * Update text field.
     * @param {String} text New text
     */
    setText(text){
        this.#text = text
    }

    /**
     * Get the value stored in text field.
     * @returns text value.
     */
    getText(){
        return this.#text
    }

    /**
     * Update time stamp field.
     * @param {DateTime} timeStamp New time stamp.
     */
    setTimeStamp(timeStamp){
        this.#timeStamp = timeStamp
    }

    /**
     * Get the value stored in timeStamp field.
     */
    getTimeStamp(){
        return this.#timeStamp
    }

    /**
     * Update the user ID field.
     * @param {String} userID New user ID.
     */
    setUserID(userID){
        this.#userID = userID
    }

    /**
     * Get the value stored in userID field.
     * @returns userID field.
     */
    getUserID(){
        return this.#userID
    }

    /**
     * Save all updated field values inside the database.
     */
    saveInDB() { }

    /**
     * Retrieve data from the database.
     */
    retrieveFromDB() { }
}