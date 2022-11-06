/**
 * The control class for Chat data requests.
 */
const ChatController = () => {
    
    /**
     * Create a new chat.
     * @param {String} chatID chat ID.
     * @param {Message[]} messages Array of Message objects.
     * @param {User[]} users Array of User objects.
     */
    const createChat  = (chatID, messages, users) => { }

    /**
     * Update the attribute value inside Chat object.
     * @param {String} chatID Chat ID.
     * @param {String} type Type of attribute to be updated.
     * @param {*} value The new value for the attribute to be updated.
     */
    const setAttribute = (chatID, type, value) => { }

    /**
     * Update the attribute value inside Chat object.
     * @param {String} chatID Chat ID.
     * @param {String} type Type of attribute.
     */
    const getAttribute = (chatID, type) => { }

    /**
     * The activity action that can be performed by the user
     * such as join, leave, save, and delete.
     * @param {String} type Type of action.
     * @param {String} chatID Chat ID.
     * @param {Message} message Message object.
     */
     const chatAction = (type, chatID, message) = () => { }
}

export default ChatController