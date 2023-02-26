/**
 * The entity class for a user profile.
 */
class UserProfile{
    /**
     * Profile photo field storing image URL.
     */
    #profilePhoto

    /**
     * Name field.
     */
    #name

    /**
     * Description field.
     */
    #description

    /**
     * Number of friends field.
     */
    #numFriends

    /**
     * Number of participated activites field.
     */
    #numParticipate

    /**
     * Number of posted activites field.
     */
    #numPost

    /**
     * User ID field.
     */
    #userID

    /**
     * Update the profile photo field
     * @param {String} profilePhoto New URL to the profile photo.
     */
    setProfilePhoto(profilePhoto){
        this.#profilePhoto = profilePhoto
    }

    /**
     * Get the value stored in profilePhoto field.
     * @returns URL to the profile photo.
     */
    getProfilePhoto(){
        return this.#profilePhoto
    }

    /**
     * Update the name field.
     * @param {String} name New name.
     */
    setName(name){
        this.#name = name
    }

    /**
     * Get the value stored in name field.
     * @returns name value.
     */
    getName(){
        return this.#name
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
     * Update the number of friends.
     * @param {int} numFriends New number of friends.
     */
    setNumFriends(numFriends){
        this.#numFriends = numFriends
    }

    /**
     * Get the value stored in numFriends field.
     * @returns numFriends value.
     */
    getNumFriends(){
        return this.#numFriends
    }

    /**
     * Update the number of participate activities.
     * @param {int} numParticipate New number of participated activities.
     */
    setNumParticipate(numParticipate){
        this.#numParticipate = numParticipate
    }

    /**
     * Get the value stored in numParticipate value.
     * @returns numParticipate value.
     */
    getNumParticipate(){
        return this.#numParticipate
    }

    /**
     * Update the number of posted activites.
     * @param {int} numPost New number of posted activites.
     */
    setNumPost(numPost){
        this.#numPost = numPost
    }

    /**
     * Get the value stored in numPost field.
     * @returns numPost value.
     */
    getNumPost(){
        return this.#numPost
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
    getuserID(){
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