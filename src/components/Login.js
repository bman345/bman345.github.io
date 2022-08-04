import './Login.css';
import { useSignInWithEmailAndPassword, useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth } from '../Database'
import { useState } from 'react';

function Login() {

    const [user, loading, error] = useAuthState(scrum_auth);
    const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [
            signInWithEmailAndPassword,
            user_signin,
            loading_signin,
            error_signin,
        ] = useSignInWithEmailAndPassword(scrum_auth);

    if (user) {
        return (
            <div>
                <p>Signed In User: {user.email}</p>
                <a href='/logout' className='smallText'> Logout</a>
                    <br />
            </div>
        );
    } else if (loading) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        );
    } else if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
            </div>
        );
    } else {
        if (error_signin) {
            return (
                <div>
                    <p>Error: {error.message}</p>
                </div>
            );
        } if (user_signin) {
            return (
                <div>
                    <p>Logged in....</p>
                </div>
            );
        } else if (loading_signin) {
            return (
                <div>
                    <p>Loading....</p>
                </div>
            );
        }

        return (
            <div className='loginMain'>
                <form className='loginForm'>
                    <div className='loginHeader'>
                        Login
                    </div>
                    <div className='input'>
                        <input type='email' name='user' placeholder='Email' onChange={(e) => setEmail(e.target.value)}>
                        </input>
                    </div>
                    <div className='input'>
                        <input type='password' name='pass' placeholder='Password' onChange={(e) => setPassword(e.target.value)}>
                        </input>
                    </div>

                    <a href='/Registration' className='smallText'> Sign Up</a>
                    <br />
                    <button className='loginButton' type='button' onClick={() => signInWithEmailAndPassword(email, password)}>
                        Login
                    </button>
                </form>
            </div>
        );
    }

}

export default Login;