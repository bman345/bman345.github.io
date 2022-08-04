import './Nav.css';
import { Link } from 'react-dom';
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_app } from '../Database'

function logoutNav() {
    window.location.href = "/logout";
}

function boardNav() {
    window.location.href = "/boards";
}

function tasksNav() {
    window.location.href = "/tasks";
}

function Nav () {

    const [user, loading, error] = useAuthState(scrum_auth);


    if (user)
    {
        return (
            <div className='navbar'>
                <img className='navbarLogo' src='./scrum_logo.png'/>
                <div className='navbarLeft'>
                    <div className='navButton' onClick={() => boardNav() }> Boards </div>
                    <div className='navButton' onClick={() => tasksNav() }> Tasks </div>
                </div> 
                <div className='navbarRight'>
                    <div className='navButton' onClick={() => logoutNav() }> Logout </div>
                </div> 
            </div>
           
        );
    }
    else {
        return (
            <div className='navbar'>
                <div className='navbarMid'>
                    <img className='logo' src='./scrum_logo.png'/>
                </div>
             </div> 
         );
    }

    
}

export default Nav;