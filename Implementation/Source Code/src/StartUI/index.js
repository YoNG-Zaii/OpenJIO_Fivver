import './index.css'
import OpenJioLogo from '../Images/OpenJioLogo'
import { memo } from 'react'
import { Link } from 'react-router-dom'

/**
 * The boundary class for start page.
 * @returns The HTML elements to be displayed on the website.
 */
const StartUI = () => {
    return (
        <div className='startPageWrapper'>
            <div className='logotitle'>
                <OpenJioLogo />
                <h2 id='title'>OPENJIO</h2>
                <p id='descpt'>Discover upcoming social activities around you</p>
            </div>
            <div className='startButtons'>
                <Link to='/login'><button id='login'>Login</button></Link>
                <Link to='/registration'><button id='create'>Create Account</button></Link>
            </div>
        </div>
    )
}

export default memo(StartUI)