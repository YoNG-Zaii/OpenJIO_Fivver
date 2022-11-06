/**
 * The control class for User data requests.
 */
const UserController = () => {
    
    /**
     * Create a new user.
     * @param {String} userID User ID.
     * @param {String} username Username.
     * @param {String} password Password.
     * @param {String} email Email.
     * @param {DateTime} birthDate Birthdate. 
     * @param {UserProfile} profile UserProfile object.
     * @param {User[]} friends Array of User objects.
     * @param {Activity[]} activities Array of upcoming/saved activities joined by a user.
     */
    const createUser = (userID, username, password, email, 
                        birthDate, profile, friends, activities) => { }

    /**
     * Update the attribute value inside User object.
     * @param {String} userID User ID.
     * @param {String} type Type of attribute to be updated.
     * @param {*} value The new value for the attribute to be updated.
     */
    const setAttribute = (userID, type, value) => { }

     /**
      * Update the attribute value inside User object.
      * @param {String} userID User ID.
      * @param {String} type Type of attribute.
      */
    const getAttribute = (userID, type) => { }

    /**
     * Add a new User as a friend.
     * @param {String} approverUserID The user ID to approve the request.
     * @param {String} requesterUserID The user ID which sends the friend request.
     */
    const addFriend = (approverUserID, requesterUserID) => { }

    /**
     * Remove a friend.
     * @param {String} initiateUserID The user ID to remove a friend.
     * @param {String} deleteUserID The userID to be deleted from friend list.
     */
    const removeFriend = (initiateUserID, deleteUserID) => { }
}

export default UserController