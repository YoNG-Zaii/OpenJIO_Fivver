/**
 * The entity class for a user.
 */
class User{
    /**
     * User ID field.
     */
    #userID

    /**
     * Username field.
     */
    #username

    /**
     * Password field.
     */
    #password

    /**
     * Email field.
     */
    #email

    /**
     * Birthdate field.
     */
    #birthDate

    /**
     * Profile field containing a UserProfile object.
     */
    #profile

    /**
     * Friends field containing an array of User objects.
     */
    #friends

    /**
     * Activities field containing upcoming/saved activities by the user.
     */
    #activities

    /**
     * Update the userID field.
     * @param {String} userID New user ID.
     */
    setUserID(userID) { 
        this.#userID = userID
    }

    /**
     * Get the value stored in userID field.
     * @returns userID value.
     */
    getUserID() {
        return this.#userID
    }

    /**
     * Update the username field.
     * @param {String} username New username.
     */
    setUsername(username) { 
        this.#username = username
    }

    /**
     * Get the value stored in username field.
     * @returns username value.
     */
    getUsername() {
        return this.#username
     }

    /**
     * Update the password field.
     * @param {String} password New password.
     */
    setPassword(password) {
        this.#password = password
     }

    /**
     * Get the value stored in password field.
     * @returns password value.
     */
    getPassword() { 
        return this.#password
    }

    /**
     * Update the email field.
     * @param {String} email New email.
     */
    setEmail(email) { 
        this.#email = email
    }

    /**
     * Get the value stored in email field.
     * @returns email value.
     */
    getEmail() { 
        return this.#email
    }

    /**
     * Update the birthDate field.
     * @param {DateTime} birthDate New birth date
     */
    setBirthDate(birthDate) { 
        this.#birthDate = birthDate
    }

    /**
     * Get the value stored in the birthDate field.
     * @returns birthDate value.
     */
    getBirthDate() { 
        return this.#birthDate
    }

    /**
     * Update the profile field.
     * @param {UserProfile} userProfile New user profile details.
     */
    setProfile(profile) {
        this.#profile = profile
    }

    /**
     * Get the value stored in the profile field.
     * @returns UserProfile object.
     */
    getProfile() {
        return this.#profile
    }

    /**
     * Update the friend list for this user.
     * @param {User[]} friends User object.
     */
    setFriends(friends) {
        this.#friends = friends
    }

    /**
     * Get the value stored in the friends field.
     * @returns 
     */
    getFriends() {
        return this.#friends
    }

    /**
     * Update the array of upcoming/saved activities joined by this user.
     * @param {Activity[]} activities Array of Activity objects.
     */
    setActivities(activities) {
        this.#activities = activities
    }

    /**
     * Get the value stored in the activities field.
     * @returns activities Array of Activity objects.
     */
    getActivities() {
        return this.#activities
    }

    /**
     * The action to be performed on user.
     * @param {String} type The type of user-related action.
     * @param {String} userID The user ID.
     */   
    friendAction(type, userID) { }

    /**
     * Save all updated field values inside the database.
     */
    saveInDB() { }

    /**
     * Retrieve data from the database.
     */
    retrieveFromDB() { }
}