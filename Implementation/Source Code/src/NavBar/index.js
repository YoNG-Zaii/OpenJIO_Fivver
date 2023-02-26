import './index.css'
import HomeLogo from '../Images/HomeLogo'
import MyActivityLogo from '../Images/MyActivityLogo'
import CreateActivityLogo from '../Images/CreateActivityLogo'
import ProfileLogo from '../Images/ProfileLogo'
import { memo } from 'react'
import { Link } from 'react-router-dom'

/**
 * The navigation bar at the bottom of all pages once user signs in.
 * @returns The HTML elements to be displayed on the website.
 */
const NavBar = () => {
    return (
        <div className='NavBar'>
            <Link to='/home'><HomeLogo /></Link>
            <Link to='/myactivity'><MyActivityLogo /></Link>
            <Link to='/createactivity'><CreateActivityLogo /></Link>
            <Link to='/profile'><ProfileLogo /></Link>
        </div>
    )
}

export default memo(NavBar)