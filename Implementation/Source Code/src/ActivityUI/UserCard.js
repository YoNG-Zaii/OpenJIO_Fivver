import './UserCard.css'
import { MdAddCircle, MdCancel, MdRemoveCircle } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { db, auth, updateNumbers, updateActivityNumbers } from '../firebase'

/**
 * The participant info to be displayed on the ActivityUI component.
 * @param {name} The name of the user.
 * @param {index} The index of the card.
 * @param {userImage} The user's profile photo.
 * @param {activityUID} The activity ID.
 * @param {organiser} The organiser's user ID.
 * @returns The HTML elements of a participant card to be displayed on the website.
 */
const ParticipantCard = ({ name, index, userImage, userID, activityUID, organiser }) => {
    const navigate = useNavigate()

    /**
     * Open a user's profile.
     * @param {String} userID The user ID.
     */
    const OpenProfile = (userID) => {
        const user = auth.currentUser;
        if (!user) return;
        if(userID === user.uid){
            navigate('/profile')
        }
        else {
            navigate('/userprofile', {state:{uid: userID}})
        }
    }

    /**
     * Remove the participant.
     * @param {String} userID The user ID.
     */
    const Remove = async (userID) => {
        const activityRef = doc(db, 'activities', activityUID)
        const activitySnap = await getDoc(activityRef)

        const userRef = doc(db, "users", userID)
        const userSnap = await getDoc(userRef)

        await updateDoc(activityRef, {
            Participants: arrayRemove(userID),
        })
        await updateDoc(userRef, {
            upcoming_activities: arrayRemove(activityUID),
        })
        updateNumbers(userID)
        updateActivityNumbers(activityUID)

        console.log('Remove: '+userID)
    }

    // First index is the organiser
    if(index === 0)
    return (
        <div className='participant'>
            <div className='userInfo' onClick={() => OpenProfile(userID)}>
                <img id='profileImg' src={userImage} alt='' />
                <p>{name+' (Organiser)'}</p>
            </div>
        </div>
    )

    else
    return (
        <div className='participant'>
            <div className='userInfo' onClick={() => OpenProfile(userID)}>
                <img id='profileImg' src={userImage} alt='' />
                <p>{name}</p>
            </div>
            {organiser && <MdCancel onClick={() => Remove(userID)}/> }
        </div>
    )
}

/**
 * The user's info to be displayed on the ActivityUI component.
 * @param {name} The name of the user.
 * @param {userImage} The user's profile photo.
 * @param {userID} The user ID.
 * @param {activityUID} The activity ID.
 * @returns The HTML elements of a requester's card to be displayed on the website.
 */
const RequestCard = ({ name, userImage, userID, activityUID }) => {
    const navigate = useNavigate()

    /**
     * Open a user's profile.
     * @param {String} userID The user ID.
     */
    const OpenProfile = (userID) => {
        navigate('/userprofile', {state:{uid: userID}})
    }

    /**
     * Approve the join request by other user.
     * @param {String} userID The user ID.
     */
    const Approve = async (userID) => {
        const activityRef = doc(db, 'activities', activityUID)
        const activitySnap = await getDoc(activityRef)

        const userRef = doc(db, "users", userID)
        const userSnap = await getDoc(userRef)

        if(activitySnap.get('NumParticipants') >= activitySnap.get('MaxCap')){
            await updateDoc(activityRef, {
                PendingUsers: arrayRemove(userID)
            })
            await updateDoc(userRef, {
                pending_activities:arrayRemove(activityUID),
            })
            console.log("Maximum number of participants reached, please remove partipants before adding new ones")
        }
        else{
            await updateDoc(activityRef, {
                Participants: arrayUnion(userID),
                PendingUsers: arrayRemove(userID)
            })
            await updateDoc(userRef, {
                upcoming_activities: arrayUnion(activityUID),
                pending_activities:arrayRemove(activityUID),
            })
        }
        
        updateNumbers(userID)
        updateActivityNumbers(activityUID)
    }

    /**
     * Rejeect the join request by other user.
     * @param {String} userID The user ID.
     */
    const Reject = async (userID) => {
        const activityRef = doc(db, 'activities', activityUID)
        const activitySnap = await getDoc(activityRef)

        const userRef = doc(db, "users", userID)
        const userSnap = await getDoc(userRef)

        await updateDoc(activityRef, {
            PendingUsers: arrayRemove(userID)
        })
        await updateDoc(userRef, {
            pending_activities:arrayRemove(activityUID),
        })
        console.log('Reject: '+userID)
        updateNumbers(userID)
        updateActivityNumbers(activityUID)
    }
    
    return (
        <div className='request'>
            <div className='userInfo' onClick={() => OpenProfile(userID)}>
                <img id='profileImg' src={userImage} alt='' />
                <p>{name}</p>
            </div>
            <MdAddCircle onClick={() => Approve(userID)}/>
            <MdRemoveCircle onClick={() => Reject(userID)}/>
        </div>
    )
}

export {
    ParticipantCard,
    RequestCard
}