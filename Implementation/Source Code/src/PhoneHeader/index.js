import './index.css'
import { useState } from 'react'
import { FaWifi, FaSignal, FaBatteryFull } from 'react-icons/fa'

/**
 * The header of every page.
 * @returns The header of the UI.
 */
const PhoneHeader = () => {
    
    /**
     * The current time once the webpage is first loaded.
     * @returns The current time.
     */
    const currentTime = () => {
        let curT = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        curT = curT.replace("AM","").replace("PM","");
        return curT;
    }

    const [current, setCurrent] = useState(currentTime);

    return(
        <div className='headerWrapper'>
            <div className='time'>{current}</div>
            <div className='icons'>
                <FaSignal id='SignalIcon' />
                <FaWifi id='WifiIcon' />
                <FaBatteryFull id='BatteryIcon' />
            </div>
        </div>
    )
}

export default PhoneHeader