/**
 * The control class for Activity data requests.
 */
const ActivityController = () => {

    /**
     * Create a new activity.
     * @param {String} activityID Activity ID.
     * @param {DateTime} creationDate Creation date.
     * @param {String} description Description.
     * @param {String} location Location.
     * @param {int} maxCapacity Maximum number of capacity.
     * @param {User} organiser Organiser.
     * @param {User[]} participants Array of participants.
     * @param {DateTime} timeOfActivity Time of activity.
     * @param {String} photo URL of photo.
     */
    const createActivity = (activityID, creationDate, description, location, maxCapacity, organiser,
                            participants, timeOfActivity, photo) => { }

    /**
     * Update the attribute value inside Activity object.
     * @param {String} activityID Activity ID.
     * @param {String} type Type of attribute to be updated.
     * @param {*} value The new value for the attribute to be updated.
     */
    const setAttribute = (activityID, type, value) => { }

    /**
     * Update the attribute value inside Activity object.
     * @param {String} activityID Activity ID.
     * @param {String} type Type of attribute.
     */
    const getAttribute = (activityID, type) => { }
    
    /**
     * The activity action that can be performed by a general user/participant.
     * such as join, leave and save activity.
     * @param {String} type Type of action.
     * @param {String} activityID Activity ID.
     * @param {String} userID User ID performing the action.

     */
    const activityActionByParticipant = (type, activityID, userID) => { }

    /**
     * The activity action that can be performed by the organiser.
     * such as update, approve, reject, and delete activity.
     * @param {String} type Type of action.
     * @param {String} activityID Activity ID.
     * @param {String} organiserID Organiser's user ID.
     */
    const activityActionByOrganiser = (type, activityID, organiserID) => { }
}

export default ActivityController