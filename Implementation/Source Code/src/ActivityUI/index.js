import './index.css'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import ActivityMap from './ActivityMap'
import { ParticipantCard, RequestCard } from './UserCard'
import { getMapData } from '../Map'
import { useState, useEffect, memo, createContext, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db, auth, updateNumbers, updateActivityNumbers } from '../firebase'

export const LocationContext = createContext({})

/**
 * The boundary class for an activity page.
 * @returns The HTML elements to be displayed on the website.
 */
const ActivityUI = () => {
    const location = useLocation()
    const me = auth.currentUser

    // Activity ID
    const { uid } = location.state
    const [userStatus, setUserStatus] = useState('')
    const [activityLocation, setActivityLocation] = useState('ntu')
    const [locationCoords, setLocationCoords] = useState({lat: 1.3488247404966633, lng: 103.68304886667806})
    const isLoading = useRef(true)
    const [loadingData, setLoadingdata] = useState(true)
    
    const navigate = useNavigate()

    /**
     * type : Activity profile object.
     * activityProfile : The activity's profile.
     * setActivityProfile : Update activity's profile.
     * name : The title/name of the activity.
     * description : The description of the activity.
     * location : The location of the activity.
     * datetime : The datetime of the activity.
     * organiser : The organiser's ID.
     * participants : The list of participant's names.
     * participantsID : The list of participant's IDs.
     * photos : The list of participant's image URLs.
     * pending_participants : The list of pending participant's names.
     * pending_participantsID : The list of pending participant's IDs.
     * pending_photos : The list of pending participant's image URLs.
     */
    const [activityProfile, setActivityProfile] = useState({
        name: '',
        description: '',
        location: '',
        datetime: '',
        organiser: '',
        participants:[],
        participantsID:[],
        photos:[],
        pending_participants:[],
        pending_participantsID:[],
        pending_photos: [],
    })

    /**
     * Fetch the activity's info from the database.
     * @param {String} uid The activity ID.
     */
    const fetchActivityInfo = async (uid) => {
        const docSnap = await getDoc(doc(db, 'activities', uid))
        const participants = docSnap.get('Participants')
        const organiser = docSnap.get('Organiser')
        const pending_participants = docSnap.get('PendingUsers')
        setActivityLocation(docSnap.get('Location'))

        var temp_participants = []
        var temp_participantsID = []
        var temp_photos = []

        var temp_pending_participants = []
        var temp_pending_participantsID = []
        var temp_pending_photos = []

        const organiserRef = doc(db, "users", organiser)
        const organiserSnap = await getDoc(organiserRef)
        
        if (!me) return
        const meRef = doc(db, "users", me.uid)
        const meSnap = await getDoc(meRef)
        const myName = meSnap.get('name')

        if (myName === organiserSnap.get('name')){
            temp_participants.push('You')
            temp_participantsID.push(me.uid)
        }
        else{
            temp_participants.push(organiserSnap.get('name'))
            temp_participantsID.push(organiserSnap.get('uid'))
        }
        temp_photos.push(organiserSnap.get('image_url'))

        for (const participant of participants) {
            const userRef = doc(db, "users", participant)
            const userSnap = await getDoc(userRef)

            if (myName === userSnap.get('name')){
                temp_participants.push('You')
                temp_participantsID.push(me.uid)
            }
            else{
                temp_participants.push(userSnap.get('name'))
                temp_participantsID.push(userSnap.get('uid'))
            }
            temp_photos.push(userSnap.get('image_url'))
        }
        for (const pending_participant of pending_participants) {
            const userRef = doc(db, "users", pending_participant)
            const userSnap = await getDoc(userRef)
            temp_pending_participants.push(userSnap.get('name'))
            temp_pending_participantsID.push(userSnap.get('uid'))
            temp_pending_photos.push(userSnap.get('image_url'))
        }

        setActivityProfile({
            name:docSnap.get('name'),
            description: docSnap.get('Description'),
            location: docSnap.get('Location'),
            datetime: new Date(docSnap.get('Time')).toLocaleString(),
            organiser: docSnap.get('Organiser'),
            participants:temp_participants,
            participantsID:temp_participantsID,
            photos:temp_photos,
            pending_participants:temp_pending_participants,
            pending_participantsID:temp_pending_participantsID,
            pending_photos: temp_pending_photos,
        })
        setLoadingdata(false)
    }

    /**
     * Fetch the user status in the activity from the database.
     */
    const fetchUserStatus = async () => {

        const unsub = onSnapshot(doc(db, 'activities', uid), async (doc) => {
            //console.log("Current data: ", doc.data());
            // const unsubSnap = await getDoc(doc)
            const organiser = doc.data().Organiser
            const participants = doc.data().Participants
            const pending_users = doc.data().PendingUsers

            console.log("Current Organiser: ", organiser);
            console.log("Current Participants: ", participants);
            console.log("Current pendingUser: ", pending_users);
            const user = auth.currentUser
            if (!user) return;

            //if user is organiser, change to update
            if(user.uid === organiser){
                setUserStatus('Update')
            }
            else if(participants.includes(user.uid)){
                setUserStatus('Quit')
            }
            //if friend request sent, change to Requested
            else if(pending_users.includes(user.uid)){
                setUserStatus('Pending')
            }
            //if no friend request and not friends, remain as add friend
            else{
                setUserStatus('Join')
            }

            fetchActivityInfo(uid)
        });
    }

    /**
     * Fetch the coordinates of the location from a Map API.
     * @param {String} location The location of the activity.
     */
    const fetchCoordinates = async (location) => {
        const loc = await getMapData(location)
        console.log(loc)
        setLocationCoords({lat: loc.LATITUDE, lng: loc.LONGITUDE})
        isLoading.current = false
    }
    
    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        fetchActivityInfo(uid)
        fetchUserStatus()
    }, [])

    useEffect(() => {
        if(loadingData === false)
            fetchCoordinates(activityLocation)
    }, [loadingData])

    /**
     * The organiser/participant performs an action related to this activity.
     * such as join, leave, approve, reject
     */
    const activityAction = async () => {
        const activityRef = doc(db, 'activities', uid)
        const user = auth.currentUser
        if (!user) return;
        const userRef = doc(db, "users", user.uid)

        if(userStatus === 'Update'){
            navigate('/updateactivity', {state:{uid: uid}})
        }
        //if user quits
        else if(userStatus === 'Quit'){
            await updateDoc(activityRef, {
                Participants: arrayRemove(user.uid),
            })
            await updateDoc(userRef, {
                upcoming_activities: arrayRemove(uid),
            })
        }
        //if user intends to join
        else if(userStatus === 'Pending'){
            await updateDoc(activityRef, {
                PendingUsers: arrayRemove(user.uid),
            })
            await updateDoc(userRef, {
                pending_activities: arrayRemove(uid),
            })
        }
        //Others
        else{
            await updateDoc(activityRef, {
                PendingUsers: arrayUnion(user.uid),
            })
            await updateDoc(userRef, {
                pending_activities: arrayUnion(uid),
            })
        }
        updateNumbers(user.uid)
        updateActivityNumbers(uid)
        fetchActivityInfo(uid)
        fetchUserStatus()
    }

    /**
     * Deletes the activity.
     * @param {String} activityID The activity ID.
     */
    const deleteActivity = async () =>{
        const docSnap = await getDoc(doc(db, 'activities', uid))
        const participants = docSnap.get('Participants')
        const organiser = docSnap.get('Organiser')
        const pending_participants = docSnap.get('PendingUsers')
        
        //remove from participants' upcoming activities
        for (const participant of participants){
            const userRef = doc(db, "users", participant)
            await updateDoc(userRef, {
                upcoming_activities: arrayRemove(uid),
            })
            updateNumbers(participant);
        }
        //remove from own upcoming activities
        const user = auth.currentUser
        const selfRef = doc(db, "users", user.uid);
        await updateDoc(selfRef, {
            upcoming_activities: arrayRemove(uid),
        })
        updateNumbers(user.uid);
        for (const participant of pending_participants){
            const userRef = doc(db, "users", participant)
            await updateDoc(userRef, {
                pending_activities: arrayRemove(uid),
            })
        }
        const userRef = doc(db, "users", organiser)
        await updateDoc(userRef, {
            organised_activities: arrayRemove(uid),
        })
        await deleteDoc(doc(db, 'activities', uid));
        navigate('/home')
    }

    // If the current user opening this page is the organiser
    if(me.uid === activityProfile.organiser)
    return(
        <div className='atWrapper'>
            <div className='header'>
                <OpenJioLogo />
                <h2 className='title'>Activity</h2>
            </div>
            <div className='content'>
                <h2 id='actTitle'>{activityProfile.name}</h2>

                <h3>Description</h3>
                <p id='desp'>{activityProfile.description}</p>

                <h3>Location</h3>
                <div className='map'>
                    <ActivityMap pos={locationCoords} />
                </div>

                <h3>Time</h3>
                <h3 id='datetime'>{activityProfile.datetime}</h3>
                
                <h3>People Attending</h3>
                {activityProfile.participants.map((name, index) => 
                    <ParticipantCard key={name+index}
                    name={name}
                    index={index}
                    userImage={activityProfile.photos[index]}
                    userID={activityProfile.participantsID[index]}
                    activityUID = {uid} 
                    organiser = {true} />
                )}
                
                {activityProfile.pending_participants.length > 0 && <h3>Join Requests</h3> }
                {activityProfile.pending_participants.map((name, index) => 
                    <RequestCard key={name+index}
                    name={name}
                    index={index}
                    userImage={activityProfile.pending_photos[index]}
                    userID={activityProfile.pending_participantsID[index]} 
                    activityUID = {uid}/>
                )}

            </div>
            <div className='buttons'>
                <button onClick={activityAction} id='act'>Update</button>
                <button onClick={deleteActivity} id='act'>Cancel</button>
            </div>
            <div className='space'></div>
            <NavBar />
        </div>
    )

    // If the user opening this page is not the organiser
    else
    return(
        <div className='atWrapper'>
            <div className='header'>
                <OpenJioLogo />
                <h2 className='title'>Activity</h2>
            </div>
            <div className='content'>
                <h2 id='actTitle'>{activityProfile.name}</h2>

                <h3>Description</h3>
                <p id='desp'>{activityProfile.description}</p>

                <h3>Location</h3>
                <div className='map'>
                    <ActivityMap pos={locationCoords} />
                </div>

                <h3>Time</h3>
                <h3 id='datetime'>{activityProfile.datetime}</h3>
                
                <h3>People Attending</h3>
                {activityProfile.participants.map((name, index) => 
                    <ParticipantCard key={name+index}
                    name={name}
                    index={index}
                    userImage={activityProfile.photos[index]}
                    userID={activityProfile.participantsID[index]} 
                    activityUID = {uid}
                    organiser = {false} />
                )}

            </div>
            <div className='buttons'>
                <button onClick={activityAction} id='act'>{userStatus}</button>
            </div>
            <div className='space'></div>
            <NavBar />
        </div>
    )
}

export default memo(ActivityUI)