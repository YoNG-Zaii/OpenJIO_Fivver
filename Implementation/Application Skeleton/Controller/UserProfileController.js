/**
 * The control class for UserProfile data requests.
 */
const UserProfileController = () => {

    /**
     * Create a new user profile.
     * @param {String} userID User ID.
     * @param {String} profilePhoto URL of profile photo.
     * @param {String} name Name.
     * @param {String} description Description.
     * @param {int} numFriends Number of friends.
     * @param {int} numParticipate Number of participated activities.
     * @param {int} numPost Number of posted activities.
     */
    const createUserProfile = (userID, profilePhoto, name, description, numFriends, numParticipate, numPost) => { }

    /**
     * Update the attribute value inside UserProfile object.
     * @param {String} userProfileID User Profile ID.
     * @param {String} type Type of attribute to be updated.
     * @param {*} value The new value for the attribute to be updated.
     */
    const setAttribute = (userProfileID, type, value) => { }

     /**
      * Update the attribute value inside UserProfile object.
      * @param {String} userProfileID User Profile ID.
      * @param {String} type Type of attribute.
      */
    const getAttribute = (userProfileID, type) => { }
}

export default UserProfileController