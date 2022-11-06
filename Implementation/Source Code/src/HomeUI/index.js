import './index.css'
import { useState, useEffect, useRef, memo, useReducer, createContext } from 'react'
import { BsSearch } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { db, auth } from '../firebase'
import { MdLocationOn, MdAccessTimeFilled } from 'react-icons/md'
import { query, onSnapshot, orderBy, collection, where, getDoc, doc } from 'firebase/firestore'
import NavBar from '../NavBar'
import OpenJioLogo from '../Images/OpenJioLogo'
import Map, { calcDistanceBetween, getMapData } from '../Map'
import ActivityCard from './ActivityCard'
import location from '../Map/MapData'

export const ActivityContext = createContext([])

/**
 * The boundary class for home page.
 * @returns The HTML elements to be displayed on the website.
 */
const HomeUI = () => {
    const [fetched, setFetched] = useState(false)
    const locationPermission = useRef(false)
    const [loading, setLoading] = useState(true)

    const [userLocation, setLocation] = useState({lat: 1.3460889784772103, lng: 103.68187497964944})
    
    /**
     * type : Array of activity objects.
     * activities : The user's activities list.
     * setActivities : Update the activities array.
     */
    const [activities, setActivities] = useState([])

    /**
     * type : String.
     * sortBy : The type on how activities are be sorted such as time or distance.
     * setSort : Update the sort type.
     */    
    const [sortBy, setSort] = useState('')

    const [searchValue, setSearchValue] = useState('')
    const navigate = useNavigate()
    const [saved, setSaved] = useState(false)

    /**
     * Compare two values by distance.
     * @param {Float} a First value.
     * @param {Float} b Second value.
     * @returns The difference between two values.
     */
    const compareDistance = (a, b) => {
        console.log('distance')
        return a.diff - b.diff
    }

    /**
     * Compare two values by time.
     * @param {Float} a First value.
     * @param {Float} b Second value.
     * @returns The difference between two values.
     */
    const compareTime = (a, b) => {
        console.log("time")
        return new Date(a.time) - new Date(b.time)
    }

    /**
     * If the user grants location permission, 
     * then get the current location's coordinates.
     */
    const checkLocationAsync = () => {
        return new Promise((resolve, reject) => {
            const success = (position) => {
                locationPermission.current = true
                setLocation(() => { return { lat: position.coords.latitude, lng: position.coords.longitude } })
                resolve()
            }
            const error = (err) => {
                switch (err.code) {
                    case 1:
                        locationPermission.current = false
                        reject()
                        break;
                    default:
                        console.log(err.message)
                        navigator.geolocation.getCurrentPosition(success, error);
                        break;
                }
            }
            navigator.geolocation.getCurrentPosition(success, error);
        })
    }

    /**
     * Fetch the activities from the database.
     */
    const fetchActivities = async () => {

        await checkLocationAsync()

        const me = auth.currentUser
        const meRef = doc(db, "users", me.uid)
        const meSnap = await getDoc(meRef)
        const mySavedActivities = meSnap.get('saved_activities')

        var q = query(collection(db, 'activities'), orderBy('Created', 'desc'))

        const unsubscribe = onSnapshot(q, async (querySnapshot) => {

            var dateToday = new Date()
            const getDocuments = () => {
                var queriedActivities = []
                querySnapshot.forEach((doc) => {
                    let data = doc.data()
                    if (dateToday > new Date(data.Time)) return;
                    // var actLocation = getMapData(data.Location).then(res => {return res})
                    var actLocation = location[data.Location]
                    //getMapData(data.Location).then((res) => {})
                    var difference = 0;
                    
                    
                    //difference = calcDistanceBetween(actLocation.LATITUDE, actLocation.LONGITUDE, userLocation.lat, userLocation.lng)
                    difference = calcDistanceBetween(actLocation.lat, actLocation.lng, userLocation.lat, userLocation.lng)

                    if(mySavedActivities.includes(data.ID)){
                        queriedActivities.push({
                            uid: data.ID,
                            title: data.Title,
                            organiser: data.OrganiserName,
                            id: data.id,
                            location: actLocation,
                            bgImage: data.ImageUrl,
                            userImage: data.OrganiserPic,
                            diff: difference,
                            time: new Date(data.Time).toLocaleString(),
                            saved: !saved
                        })
                    }
                    else {
                        queriedActivities.push({
                            uid: data.ID,
                            title: data.Title,
                            organiser: data.OrganiserName,
                            id: data.id,
                            location: actLocation,
                            bgImage: data.ImageUrl,
                            userImage: data.OrganiserPic,
                            diff: difference,
                            time: new Date(data.Time).toLocaleString(),
                            saved: saved
                        })
                    }
                    

                })
                return queriedActivities
            }
            setActivities(getDocuments().sort(compareTime))
            setFetched(true)

        })
        return () => unsubscribe()

    }

    /**
     * Sort activities either by time or distance.
     * @param {String} type The type on how activities are to be sorted.
     */
    const sortActivities = (sortBy) => {
        switch (sortBy) {
            case 'distance':
                setActivities((prev) => [...prev].sort(compareDistance));
                break;
            case 'time':
                setActivities((prev) => [...prev].sort(compareTime));
                break;
            default:
                break;
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchActivities()
    }, [])

    useEffect(() => {
        if (fetched) {
            sortActivities(sortBy)
        }
    }, [sortBy, fetched])

    /**
     * Search users/activities.
     * @param {HTMLEvent} e The HTML event containing the text to be searched.
     */
    const handleSearch = (e) => {
        e.preventDefault()
        if (e.target[0].value === '') return
        setSearchValue(e.target[0].value)
        navigate('/search', { state: { input: e.target[0].value, type: e.target[1].value } })
    }

    if (loading === false)
        return (
            <div className='HomeUI'>
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

                <ActivityContext.Provider value={{ activities, userLocation }}>
                    <div className='map'>
                        <Map pos={userLocation[0]} />
                    </div>
                </ActivityContext.Provider>
                <div className='numberNfilter'>
                    <p>Showing {activities.length} activities</p>
                    {sortBy === 'distance' ? 
                    <MdLocationOn onClick={() => setSort('time')} /> : 
                    <MdAccessTimeFilled onClick={() => setSort('distance')} />}
                </div>
                {activities?.map((activity, index) =>
                    <ActivityCard key={index}
                        uid={activity.uid}
                        name={activity.title}
                        bgImage={activity.bgImage}
                        userImage={activity.userImage}
                        organiser={activity.organiser}
                        time={activity.time}
                        rerender= {() => fetchActivities()}
                        saved = {activity.saved}
                    />
                )}
                <div className='space'></div>
                <NavBar />
            </div>

        )
}


export default memo(HomeUI)
