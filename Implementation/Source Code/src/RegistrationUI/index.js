import './index.css'
import PhoneFooter from '../PhoneFooter'
import OpenJioLogo from '../Images/OpenJioLogo'
import { useEffect, memo } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { auth, registerWithEmailAndPassword } from "../firebase"
import { useAuthState } from "react-firebase-hooks/auth"

/**
 * The boundary class for registration page.
 * @returns The HTML elements to be displayed on the website.
 */
const RegistrationUI = () => {
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()

    /**
     * Send registration details by the user to the database.
     * @param e : The HTML event containing the registration details entered by the user.
     */
    const registerSubmit = async(e) => {
        e.preventDefault()
        registerWithEmailAndPassword(e.target[0].value, e.target[1].value, e.target[2].value, e.target[3].value, e.target[4].value)
    }

    /**
     * Immediately executes upon the rendering of the page.
     */
    useEffect(() => {
        if (loading) return;
        //CHANGE to home page 
        if (user) navigate('/home')
    }, [user, loading])

    return (
        <div className='registrationWrapper'>
            <OpenJioLogo />
            <div className='formWrapper'>
                <h2 id='title'>Create Account</h2>
                    <form className='registrationForm' onSubmit={registerSubmit}>
                        <div className='label'><label htmlFor='name'>Name</label></div>
                        <input type='text' name='name' maxlength='15' required></input>

                        <div className='label'><label htmlFor='username'>Username</label></div>
                        <input type='text' name='username' maxlength='15' required></input>

                        <div className='label'><label htmlFor='email'>Email</label></div>
                        <input type='email' name='email' required></input>

                        <div className='label'><label htmlFor='password'>Password</label></div>
                        <input type='password' name='password' required></input>

                        <div className='label'><label htmlFor='Date of Birth'>Date of Birth</label></div>
                        <input type='date' name='dob' placeholder='Date of Birth' max="2017-12-31" required></input>
                        
                        <button type='submit' id='create'>Create Account</button>
                    </form>
                <p id='login'>Already have an account? <Link to='/login'><span id='loginText'>Login</span></Link></p>
            </div>
            <PhoneFooter />
        </div>
    );
}

export default memo(RegistrationUI);