import './index.css'
import PhoneFooter from '../PhoneFooter'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useEffect, memo } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, logInWithEmailAndPassword } from '../firebase'

/**
 * The boundary class for login page.
 * @returns The HTML elements to be displayed on the website.
 */
const LoginUI = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    /**
     * Send login details by the user to be authenticated by the database.
     * @param {HTMLEvent} e : The HTML event containing the login details entered by the user.
     */
    const loginSubmit = async(e) => {
        e.preventDefault()
        logInWithEmailAndPassword(e.target[0].value, e.target[1].value)
    }  

    /**
     * Immediately executes upon the rendering of the page.
     */
    useEffect(() => {
        if (loading) {
            // maybe trigger a loading screen
            return;
        }
        //CHANGE to home page 
        if (user) navigate("/home")
    }, [user, loading])
    
    return (
        <div className='loginWrapper'>
            <OpenJioLogo />
            <div className='formWrapper'>
                <h2 id='title'>Login</h2>
                    <form className='loginForm' onSubmit={loginSubmit}>
                        <input type='email' name='email' placeholder='Email' required></input>
                        <input type='password' name='password' placeholder='Password' required></input>
                        <div className='Forgot'><Link to='/resetpassword'><span id='forgotPs'>Forgot Password?</span></Link></div>
                        <button type='submit' id='login'>Login</button>
                    </form>
                <p id='signup'>Don't have an account? <Link to='/registration'><span id='signUpText'>Sign up</span></Link></p>
            </div>
            <PhoneFooter />
        </div>
    )
}

export default memo(LoginUI)