/**
 * The entity class for a chat.
 */
class Chat{
    /**
     * Chat ID field.
     */
    #chatID

    /**
     * Array of Message field.
     */
    #messages

    /**
     * Array of User inside the chat.
     */
    #users

    /**
     * Update the chatID field.
     * @param {String} chatID New chat ID.
     */
    setChatID(chatID){
        this.#chatID = chatID
    }

    /**
     * Get the value stored in the field chatID.
     * @returns chatID value.
     */
    getChatID(){
        return this.#chatID
    }

    /**
     * Update the messages field.
     * @param {Message[]} messages New array of Message objects.
     */
    setMessages(messages){
        this.#messages = messages
    }

    /**
     * Get the value stored in messages field.
     * @returns messages value.
     */
    getMessages(){
        return this.#messages
    }

    /**
     * Updaate the users field.
     * @param {User[]} users New array of User objects. 
     */
    setUsers(users){
        this.#users = users
    }

    /**
     * Get the value stored in users field.
     * @returns Array of User objects.
     */
    getUsers(){
        return this.#users
    }

    /**
     * The action to be performed on chat.
     * @param {String} type The type of chat-related action.
     */
    chatAction(type) { }

    /**
     * Delete specific Message object in the messages field.
     * @param {String} messageID Message ID.
     */
    deleteMessage(messageID) { }

    /**
     * Save all updated field values inside the database.
     */
    saveInDB() { }

    /**
     * Retrieve data from the database.
     */
    retrieveFromDB() { }
}