/**
 * The entity class for an activity.
 */

class Activity{
    /**
     * Activity ID field.
     */
    #activityID

    /**
     * Creation date field.
     */
    #creationDate

    /**
     * Description field.
     */
    #description

    /**
     * Location field.
     */
    #location

    /**
     * Maximum capacity field.
     */
    #maxCapacity

    /**
     * Organiser field.
     */
    #organiser

    /**
     * Array of participants (User) field.
     */
    #participants

    /**
     * Time of activity field.
     */
    #timeOfActivity

    /**
     * Title field.
     */
    #title

    /**
     * Photo field containing photo URL.
     */
    #photo

    /**
     * Update the activityID field.
     * @param {String} activityID New activity ID.
     */
    setActivityID(activityID){
        this.#activityID = activityID
    }

    /**
     * Get the value stored in activityID field.
     * @returns activityID value.
     */
    getActivityID(){
        return this.#activityID
    }

    /**
     * Update the creationDate field.
     * @param {DateTime} creationDate New creation date.
     */
    setCreationDate(creationDate){
        this.#creationDate = creationDate
    }

    /**
     * Get the value stored in creationDate field.
     * @returns creationDate value.
     */
    getCreationDate(){
        return this.#creationDate
    }

    /**
     * Update the description field.
     * @param {String} description New description.
     */
    setDescription(description){
        this.#description = description
    }

    /**
     * Get the value stored in description field.
     * @returns description value.
     */
    getDescription(){
        return this.#description
    }

    /**
     * Update the location field.
     * @param {String} location New location.
     */
    setLocation(location){
        this.#location = location
    }

    /**
     * Get the value stored in location field.
     * @returns location value.
     */
    getLocation(){
        return this.#location
    }

    /**
     * Update the maxCapacity field.
     * @param {int} maxCapacity New maximum capacity.
     */
    setMaxCapacity(maxCapacity){
        this.#maxCapacity = maxCapacity
    }

    /**
     * Get the value stored in maxCapacity field.
     * @returns maxCapacity value.
     */
    getMaxCapacity(){
        return this.#maxCapacity
    }

    /**
     * Update the organiser field.
     * @param {User} organiser New organiser.
     */
    setOrganiser(organiser){
        this.#organiser = organiser
    }

    /**
     * Get the value stored in organiser field.
     * @returns organiser value.
     */
    getOrganiser(){
        return this.#organiser
    }

    /**
     * Update the participants field.
     * @param {User[]} participants New array of User objects.
     */
    setParticipants(participants){
        this.#participants = participants
    }

    /**
     * Get the value stored in participants field.
     * @returns participants value containing an array of User objects.
     */
    getParticipants(){
        return this.#participants
    }

    /**
     * Update the timeOfActivity field.
     * @param {DateTime} timeOfActivity New time of activity.
     */
    setTimeOfActivty(timeOfActivity){
        this.#timeOfActivity = timeOfActivity
    }

    /**
     * Get the value stored in timeOfActivity field.
     * @returns 
     */
    getTimeOfActivity(){
        return this.#timeOfActivity
    }

    /**
     * Update the title field.
     * @param {String} title New title of the activity.
     */
    setTitle(title){
        this.#title = title
    }

    /**
     * Get the value stored in title field.
     * @returns title value.
     */
    getTitle(){
        return this.#title
    }

    /**
     * Update the  photo field.
     * @param {String} photo New photo URL.
     */
    setPhoto(photo){
        this.#photo = photo
    }

    /**
     * Get the value stored in photo field.
     * @returns photoURL stored in photo field.
     */
    getPhoto(){
        return this.#photo
    }

    /**
     * The action to be performed on activity.
     * @param {String} type The type of activity-related action.
     * @param {String} userID The user ID.
     */
    activityAction(type, userID) { }

    /**
     * Save all updated field values inside the database.
     */
    saveInDB() { }

    /**
     * Retrieve data from the database.
     */
    retrieveFromDB() { }
}