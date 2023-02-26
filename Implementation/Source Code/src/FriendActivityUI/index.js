import './index.css'
import OpenJioLogo from '../Images/OpenJioLogo'
import ActivityCard from '../HomeUI/ActivityCard'
import NavBar from '../NavBar'
import { useState, useEffect, useRef, memo } from 'react'
import { useLocation } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

/**
 * The boundary class for friend's list of upcoming activities.
 * @returns The HTML elements to be displayed on the website.
 */
const FriendActivityUI = () => {

    const location = useLocation()
    const { uid, name } = location.state

    const [userImage, setUserImage] = useState('https://firebasestorage.googleapis.com/v0/b/openjio-560ed.appspot.com/o/1665579245306prof_pic%20Small.jpeg?alt=media&token=c3bb8c03-d66a-4bc5-b6a0-e8e9eb7f1af3')
    
    /**
     * type : Array of activity objects.
     * activities : The friend's activities list.
     * setActivities : Update the activities array.
     */    
    const [activities, setActivities] = useState([])
    const fetched = useRef(false)    
    const [saveStatus, setSaveStatus] = useState(false)

    /**
     * Fetch the friend's participated activities from the database.
     */
    const fetchUserActivities = async () => {
        const friendRef = doc(db, "users", uid)
        const friendSnap = await getDoc(friendRef)
        
        const friendPhoto = friendSnap.get('image_url')
        setUserImage(friendPhoto)

        const friendActivities = friendSnap.get('upcoming_activities')

        const user = auth.currentUser
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        const saved_activities = docSnap.get('saved_activities')
        let activities = []

        for (const activity of friendActivities) {

            const activityRef = doc(db, "activities", activity)
            const activitySnap = await getDoc(activityRef)
            const activityUid = activitySnap.get('ID')
            if(saved_activities.includes(activityUid)){
                activities.push({
                    uid: activityUid,
                    title: activitySnap.get('Title'),
                    organiser: activitySnap.get('OrganiserName'),
                    bgImage: activitySnap.get('ImageUrl'),
                    userImage: activitySnap.get('OrganiserPic'),
                    time: activitySnap.get('Time'),
                    saved: !saveStatus
                })
            }
            else{
                activities.push({
                    uid: activityUid,
                    title: activitySnap.get('Title'),
                    organiser: activitySnap.get('OrganiserName'),
                    bgImage: activitySnap.get('ImageUrl'),
                    userImage: activitySnap.get('OrganiserPic'),
                    time: activitySnap.get('Time'),
                    saved: saveStatus
                })
            }
        }
        setActivities(activities)
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchUserActivities()
    }, [])

    if(fetched)
        return (
            <div className='faWrapper'>
                <div className='header'>
                    <OpenJioLogo />
                    <h2 className='title'>User Activities</h2>
                </div>
                <div className='profileHeader'>
                    <img src={userImage} alt='' />
                    <h2 className='name'>{name}</h2>
                </div>

                {activities.map((activity, index) => {
                        return (
                            <ActivityCard key={index}
                            uid={activity.uid}
                            name={activity.title}
                            bgImage={activity.bgImage}
                            userImage={activity.userImage}
                            organiser={activity.organiser}
                            time={activity.time}
                            saved={activity.saved}
                            rerender={fetchUserActivities} />
                        )
                })}
                
                <div className='space'></div>
                <NavBar />
            </div>
        )
}

export default memo(FriendActivityUI)