import './index.css'
import OpenJioLogo from '../Images/OpenJioLogo'
import ActivityCard from '../HomeUI/ActivityCard'
import NavBar from '../NavBar'
import { useState, useEffect, useRef, memo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { BsSearch } from 'react-icons/bs'
import { collection, query, getDocs, where, doc, getDoc } from 'firebase/firestore'
import { db, auth } from '../firebase'

/**
 * The boundary class for searched activities/username page.
 * @returns The HTML elements to be displayed on the website.
 */
const SearchListUI = () => {
    
    // To obtain the values passed from HomeUI or SearchListUI
    const location = useLocation()
    const navigate = useNavigate()
    const {input, type} = location.state

    /**
     * type : Array of Activity objects.
     * activities : The searched activities list.
     * setActivities : Update the activities array.
     */
    const [activities, setActivities] = useState([])

    /**
     * type : Array of User objects.
     * activities : The searched usernames list.
     * setActivities : Update the users array.
     */
    const [users, setUsers] = useState([])
    const [saveStatus, setSaveStatus] = useState(false)
    const fetched = useRef(false)

    /**
     * Search users/activities.
     * @param {HTMLEvent} e The HTML event containing the text to be searched.
     */
    const handleSearch = (e) => {
        e.preventDefault()
        if(e.target[0].value === '') return
        navigate('/search', {state:{input: e.target[0].value, type: e.target[1].value}})
        if(e.target[1].value === 'activity')
            fetchActivities(e.target[0].value)
        else
            fetchUsers(e.target[0].value)
    }
    
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
     * Fetch list of users matching the search result.
     * @param {String} input The searched value.
     */
    const fetchActivities = async (searchInput) => {
        const search = searchInput.toLowerCase().replace(/\s/g, '')
        const q = query(collection(db, 'activities'))

        const querySnapshot = await getDocs(q)
        let allActivities = []
        let searchedActivities = [] 
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            allActivities.push({
                name: data.Title.toLowerCase().replace(/\s/g, ''),
                uid: data.ID
            })
        })

        const me = auth.currentUser
        const meRef = doc(db, "users", me.uid)
        const meSnap = await getDoc(meRef)
        const saved_activities = meSnap.get('saved_activities')

        for(const activity of allActivities){
            if (activity.name.includes(search)){
                const docSnap = await getDoc(doc(db, 'activities', activity.uid))

                if(saved_activities.includes(activity.uid)){
                    searchedActivities.push({
                        uid: docSnap.get('ID'),
                        title: docSnap.get('Title'),
                        organiser: docSnap.get('OrganiserName'),
                        bgImage: docSnap.get('ImageUrl'),
                        userImage: docSnap.get('OrganiserPic'),
                        time: new Date(docSnap.get('Time')).toLocaleString(),
                        saved: !saveStatus
                    })
                }
                else{
                    searchedActivities.push({
                        uid: docSnap.get('ID'),
                        title: docSnap.get('Title'),
                        organiser: docSnap.get('OrganiserName'),
                        bgImage: docSnap.get('ImageUrl'),
                        userImage: docSnap.get('OrganiserPic'),
                        time: new Date(docSnap.get('Time')).toLocaleString(),
                        saved: saveStatus
                    })
                }
                
            }
        }
        
        fetched.current = true
        setActivities(searchedActivities)
    }

    /**
     * Fetch list of users matching the search result.
     * @param {String} input The searched value.
     */
    const fetchUsers = async (searchInput) => {
        const q = query(collection(db, 'users'))
        const querySnapshot = await getDocs(q)
        let allUsers = []
        let searchedUsers = [] 
        const search = searchInput.toLowerCase().replace(/\s/g, '')
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            allUsers.push({
                name: data.name.toLowerCase().replace(/\s/g, ''),
                uid: data.uid
            })
        })
        for(const user of allUsers){
            if (user.name.includes(search)){
                const docSnap = await getDoc(doc(db, 'users', user.uid))
                searchedUsers.push({
                    id: docSnap.get('uid'),
                    name: docSnap.get('name'),
                    imageURL: docSnap.get('image_url')
                    })
                
            }
        }
        fetched.current = true
        setUsers(searchedUsers)
    }

    /**
     * Immediately executes upon the rendering of the page.
     * To fetch data from the database/entity class.
     */
    useEffect(() => {
        if(type === 'activity')
            fetchActivities(input)
        else
            fetchUsers(input)
    }, [])

    if(fetched.current)
    return(
        <div className='slWrapper'>
            <div className='header'>
                <div className='logo'><OpenJioLogo /></div>
                <div className='content'>
                    <form onSubmit={handleSearch}>
                        <div className='searchBar'>
                            <input id='search' type='search' placeholder='Search'></input>
                            <select>
                                <option value='activity'>By Activity</option>
                                <option value='user'>By User</option>
                            </select>
                        </div>
                        <div className='searchLogoWrap'><button type='submit'><BsSearch className='searchLogo' /></button></div>
                    </form>
                </div>
            </div>
            <h3 id='type'>Showing results by {type}</h3>

            { type === 'activity' ? 

            activities.map((activity, index) =>
                <ActivityCard key={index}
                    uid={activity.uid}
                    name={activity.title}
                    bgImage={activity.bgImage}
                    userImage={activity.userImage}
                    organiser={activity.organiser}
                    time={activity.time}
                    saved={activity.saved}
                    rerender={() => fetchActivities(input)} />
            ) :

            users.map((user, index) => {
                return <div key={index} onClick={() => OpenProfile(user.id)} className='user'>
                    <img id='profileImg' src={user.imageURL} alt='' />
                    <p>{user.name}</p>
                </div>
            })}
            
            <div className='space'></div>
            <NavBar />
        </div>
    )
}

export default memo(SearchListUI)