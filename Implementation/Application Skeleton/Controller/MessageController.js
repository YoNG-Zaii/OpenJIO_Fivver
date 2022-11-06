/**
 * The control class for Message data requests.
 */
const MessageController = () => {

    /**
     * Create a new message.
     * @param {String} messageID Message ID.
     * @param {String} text Text.
     * @param {DateTime} timeStamp Time stamp.
     * @param {String} userID User ID.
     */
    const createMessage = (messageID, text, timeStamp, userID) => { }

    /**
     * Update the attribute value inside Message object.
     * @param {String} messageID Message ID.
     * @param {String} type Type of attribute to be updated.
     * @param {*} value The new value for the attribute to be updated.
     */
    const setAttribute = (messageID, type, value) => { }

    /**
     * Update the attribute value inside Message object.
     * @param {String} messageID Message ID.
     * @param {String} type Type of attribute.
     */
    const getAttribute = (messageID, type) => { }
}

export default MessageController