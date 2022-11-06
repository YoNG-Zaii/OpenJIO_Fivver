import './App.css'
import PhoneHeader from './PhoneHeader'
import StartUI from './StartUI'
import LoginUI from './LoginUI'
import RegistrationUI from './RegistrationUI'
import ResetPwdUI from './ResetPwdUI'
import HomeUI from './HomeUI'
import SearchListUI from './SearchListUI'
import ProfileUI from './ProfileUI'
import EditProfileUI from './EditProfileUI'
import UserProfileUI from './UserProfileUI'
import CreateActivityUI from './CreateActivityUI'
import ActivityUI from './ActivityUI'
import UpdateActivityUI from './UpdateActivityUI'
import MyActivityUI from './MyActivityUI'
import FriendActivityUI from './FriendActivityUI'
import FriendUI from './FriendUI'
import ChatUI from './ChatUI'
import MyChatUI from './MyChatUI'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from './firebase'

/**
 * The application's different pages.
 * @returns Routes to different pages.
 */
const App = () => {
  const [user]= useAuthState(auth);

  return (
    <div className='Wrapper'>
      <div className="App">
          <PhoneHeader />
          <Router basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path='/' element={<StartUI />} />
                <Route path='/login' element={<LoginUI />} />
                <Route path='/registration' element={<RegistrationUI />} />
                <Route path='/resetpassword' element={<ResetPwdUI />} />
                <Route path='/home' element={user ? <HomeUI /> : <LoginUI />} />
                <Route path='/search' element={user ? <SearchListUI /> : <LoginUI />} />
                <Route path='/profile' element={user ? <ProfileUI /> : <LoginUI />} />
                <Route path='/editprofile' element={user ? <EditProfileUI /> : <LoginUI />} />
                <Route path='/userprofile' element={user ? <UserProfileUI /> : <LoginUI />} />
                <Route path='/createactivity' element={user ? <CreateActivityUI /> : <LoginUI />} />
                <Route path='/activity' element={user ? <ActivityUI /> : <LoginUI />} />
                <Route path='/updateactivity' element={user ? <UpdateActivityUI /> : <LoginUI />} />
                <Route path='/myactivity' element={user ? <MyActivityUI /> : <LoginUI />} />
                <Route path='/friendactivity' element={user ? <FriendActivityUI /> : <LoginUI />} />
                <Route path='/friend' element={user ? <FriendUI /> : <LoginUI />} />
                <Route path='/chat' element={user ? <ChatUI /> : <LoginUI />} />
                <Route path='/mychat' element={user ? <MyChatUI /> : <LoginUI />} />
            </Routes>
          </Router>
      </div>
    </div>

  );
}

export default App;
