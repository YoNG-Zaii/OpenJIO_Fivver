import './ActivityCard.css'
import { useNavigate } from 'react-router-dom'
import { FaRegBookmark } from 'react-icons/fa';
import { db, auth } from '../firebase'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore'

/**
 * The activity component used by HomeUI to be displayed on the website.
 * @param uid : The activity ID
 * @param name : The name of the activity.
 * @param bgImage : The background image of the activity.
 * @param userImage : The organiser's and participant's profile photos.
 * @param organiser : The name of the organiser.
 * @param time : The time of the activity being held.
 * @param saved : Whether the activity is saved by the current user.
 * @param rerender : The function to cause rerender of a component.
 * @returns The ActivityCard component.
 */
const ActivityCard = ({ uid, name, bgImage, userImage, organiser, time, saved, rerender }) => {
    const userID = auth.currentUser.uid

    /**
     * Save this activity in the user's list of activites.
     */
    const save = async () => {
        const userRef = doc(db, "users", userID)
        const userSnap = await getDoc(userRef)
        const saved_activities = userSnap.get('saved_activities')　
        const activityRef = doc(db, "activities", uid)
        const activitSnap = await getDoc(activityRef)
        if(saved_activities.includes(uid)){
            await updateDoc(userRef, {
                saved_activities: arrayRemove(uid),

            })
            await updateDoc(activityRef, {
                saved_participants: arrayRemove(userID),
            })
            saved = false
        }
        else{
            await updateDoc(userRef, {
                saved_activities: arrayUnion(uid),
            })
            await updateDoc(activityRef, {
                saved_participants: arrayUnion(userID),
            })
            saved = true
        }
        rerender()
    }

    const navigate = useNavigate()

    /**
     * Open this activity page.
     */
    const openActivity = () => {
        navigate('/activity', {state:{uid:uid}})
    }

    return (
        <div className='ActivityCard'>
            <div className='nameWithPicture' onClick={openActivity}>
                <div><h2>{name}</h2></div>
                <img src={bgImage}
                    alt='' />
            </div>
            <div className='userWithFunction'>
                <div className='userInfo' onClick={openActivity}>
                    <img src={userImage} alt='' />
                    <div className='text'>
                        <p>{organiser}</p>
                        <p>{time}</p>
                    </div>
                </div>
                <div className={saved ? 'savedLogo' : 'logo'} onClick={save}>
                    <FaRegBookmark id='save' />
                </div>
            </div>
        </div>
    )
}

export default ActivityCard