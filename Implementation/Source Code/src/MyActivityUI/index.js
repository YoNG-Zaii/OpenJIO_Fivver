import './index.css'
import OpenJioLogo from '../Images/OpenJioLogo'
import ActivityCard from '../HomeUI/ActivityCard'
import NavBar from '../NavBar'
import { useState, useEffect, useRef, memo } from 'react'
import { doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

/**
 * The boundary class for user's list of upcoming/saved activities.
 * @returns The HTML elements to be displayed on the website.
 */
const MyActivityUI = () => {

    const me = auth.currentUser
    const meRef = doc(db, "users", me.uid)

    /**
     * type : Array of activity objects.
     * savedActivities : The user's saved activities list.
     * setSavedActivities : Update the savedActivities array.
     */
    const [savedActivities, setSavedActivities] = useState([])

    /**
     * type : Array of activity objects.
     * joinedActivities : The activities list joined by the user.
     * setJoinedActivities : Update the joinedActivities array.
     */
    const [joinedActivities, setJoinedActivities] = useState([])

    /**
     * type : Array of activity objects.
     * joinedActivities : The organised activities list  by the user.
     * setOrganisedActivities : Update the organisedActivities array.
     */
    const [organisedActivities, setOrganisedActivities] = useState([])
    const [saveStatus, setSaveStatus] = useState(false)
    const fetched = useRef(false)

    /**
     * Fetch the saved activities from the database.
     */
    const fetchSavedActivities = async () => {
        const meSnap = await getDoc(meRef)
        const mySavedActivities = meSnap.get('saved_activities')
        let saved_activities = []
        for (const activity of mySavedActivities) {
            const activityRef = doc(db, "activities", activity)
            const activitySnap = await getDoc(activityRef)
            saved_activities.push({
                uid: activitySnap.get('ID'),
                title: activitySnap.get('Title'),
                organiser: activitySnap.get('OrganiserName'),
                bgImage: activitySnap.get('ImageUrl'),
                userImage: activitySnap.get('OrganiserPic'),
                time: activitySnap.get('Time'),
                saved: !saveStatus
            })
        }
        setSavedActivities(saved_activities)
    }

    /**
     * Fetch the joined activities from the database.
     */
    const fetchJoinedActivities = async () => {     
        const meSnap = await getDoc(meRef)
        const myJoinedActivities = meSnap.get('upcoming_activities')
        let joined_activities = []
        for (const activity of myJoinedActivities) {
            const activityRef = doc(db, "activities", activity)
            const activitySnap = await getDoc(activityRef)
            joined_activities.push({
                uid: activitySnap.get('ID'),
                title: activitySnap.get('Title'),
                organiser: activitySnap.get('OrganiserName'),
                bgImage: activitySnap.get('ImageUrl'),
                userImage: activitySnap.get('OrganiserPic'),
                time: activitySnap.get('Time'),
                saved: saveStatus
            })
        }
        setJoinedActivities(joined_activities)
    }

    /**
     * Fetch the organised activities from the database.
     */
    const fetchOrganisedActivities = async () => {
        const meSnap = await getDoc(meRef)
        const myOrganisedActivities = meSnap.get('organised_activities')     
        let organised_activities = []
        for (const activity of myOrganisedActivities) {
            const activityRef = doc(db, "activities", activity)
            const activitySnap = await getDoc(activityRef)
            organised_activities.push({
                uid: activitySnap.get('ID'),
                title: activitySnap.get('Title'),
                organiser: activitySnap.get('OrganiserName'),
                bgImage: activitySnap.get('ImageUrl'),
                userImage: activitySnap.get('OrganiserPic'),
                time: activitySnap.get('Time'),
                saved: saveStatus
            })
        }
        fetched.current = true
        setOrganisedActivities(organised_activities)
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        const fetchMyActivities = async () => {
            fetchSavedActivities()
            fetchJoinedActivities()
            fetchOrganisedActivities()
        }

        fetchMyActivities()
    }, [])

    if(fetched.current)
    return (
        <div className='maWrapper'>
            <div className='header'>
                <OpenJioLogo />
                <h2 className='title'>My Activities</h2>
            </div>

            {savedActivities.length > 0 && <h3 id='subtitle'>Saved Activities</h3>}
            {savedActivities.map((activity, index) => {
                return (
                    <ActivityCard key={index}
                    uid={activity.uid}
                    name={activity.title}
                    bgImage={activity.bgImage}
                    userImage={activity.userImage}
                    organiser={activity.organiser}
                    time={activity.time}
                    saved={activity.saved}
                    rerender={fetchSavedActivities} />
                )
            })}

            {joinedActivities.length > 0 && <h3 id='subtitle'>Joined Activities</h3>}
            {joinedActivities.map((activity, index) => {
                return (
                    <ActivityCard key={index}
                    uid={activity.uid}
                    name={activity.title}
                    bgImage={activity.bgImage}
                    userImage={activity.userImage}
                    organiser={activity.organiser}
                    time={activity.time}
                    saved={activity.saved}
                    rerender={() => {
                        fetchJoinedActivities()
                        fetchSavedActivities()
                    }} />
                )
            })}

            {organisedActivities.length > 0 && <h3 id='subtitle'>Organised Activities</h3>}
            {organisedActivities.map((activity, index) => {
                return (
                    <ActivityCard key={index}
                    uid={activity.uid}
                    name={activity.title}
                    bgImage={activity.bgImage}
                    userImage={activity.userImage}
                    organiser={activity.organiser}
                    time={activity.time}
                    saved={activity.saved}
                    rerender={() => {
                        fetchOrganisedActivities()
                        fetchSavedActivities() 
                    }} />
                )
            })}
            
            <div className='space'></div>
            <NavBar />
        </div>
    )
}

export default memo(MyActivityUI)