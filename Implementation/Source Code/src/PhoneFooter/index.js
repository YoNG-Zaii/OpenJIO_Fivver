import './index.css'
import { Link } from 'react-router-dom'

/**
 * The HTML containing back button to go back to the StartUI page.
 * @returns The back button.
 */
const PhoneFooter = () => {
    return (
        <Link to='/'><button id='back'>Back</button></Link>
    )
}

export default PhoneFooter