import './index.css'
import PhoneFooter from '../PhoneFooter'
import OpenJioLogo from '../Images/OpenJioLogo'
import { memo } from 'react'
import { sendPasswordReset } from '../firebase'

/**
 * The boundary class for reset password page.
 * @returns The HTML elements to be displayed on the website.
 */
const ResetPwdUI = () => {

    /**
     * Send verification email to the user to reset password.
     * @param {HTMLEvent} e The HTML event containing the email entered by the user.
     */
    const resetSubmit = (e) => {
        e.preventDefault()
        sendPasswordReset(e.target[0].value)
        console.log(e.target[0].value)
    }

    return (
        <div className='forgotWrapper'>
            <OpenJioLogo />
            <div className='formWrapper'>
                <h2 id='title'>Forgot Password</h2>
                    <form className='resetForm' onSubmit={resetSubmit}>
                        <div className='label'><label htmlFor='email'>Enter your registered email</label></div>
                        <input type='email' name='email' placeholder='Email' required></input>
                        <button type='submit' id='confirm'>Send confirmation code</button>
                    </form>
            </div>
        <PhoneFooter />
        </div>
    )
}

export default memo(ResetPwdUI)