import './Register.css';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_db } from '../Database'
import { useState } from 'react';

function Registration() {

    const [user, loading, error] = useAuthState(scrum_auth);
    const [
        createUserWithEmailAndPassword,
        userReg,
        loadingReg,
        errorReg,
    ] = useCreateUserWithEmailAndPassword(scrum_auth);

    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordCheck, setPassswordCheck] = useState('');

    const handleSubmit = (e, p1, p2) => {
        if (p1 == p2)
            createUserWithEmailAndPassword(e, p1);
    };

    const passwordVerify = (p1, p2) => {
        if (p1 != p2)
            setPassswordCheck("Passwords do not match!");
        else
            setPassswordCheck('');
    };

    if (user && !userReg) {
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
                <br />
            </div>
        );
    } else if (error) {
        return (
            <div>
                <p>Error: {error.message}</p>
                <br />
            </div>
        );
    } else if (userReg) {
        scrum_db.createUser(firstName, lastName, email, userReg.user.uid);
        scrum_db.createBoard(userReg.user.uid, "test_board");
        return (
            <div>
                <p>Registered user: {userReg.user.email}</p>
                <br />
            </div>);
    } else {
        if (loadingReg) {
            return (
                <div>
                    <p>Loading...</p>
                    <br />
                </div>
            );
        } else if (errorReg) {
            return (
                <div>
                    <p>Error: {errorReg.message}</p>
                    <br />
                </div>
            );
        } else {
            return (
                <div className='registerMain'>
                    <form className='registerForm'>
                        <div className='registerHeader'>
                            Registration
                        </div>

                        <div className='input'>
                            <input type='text' name='firstName' placeholder='First Name' onChange={(e) => setFirstName(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='text' name='lastName' placeholder='Last Name' onChange={(e) => setLastName(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='text' name='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='password' name='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
                        </div>

                        <div className='input'>
                            <input type='password' name='passwordVerify' placeholder='Re-Enter Password' onChange={(e) => { setPassword2(e.target.value); passwordVerify(password, e.target.value); }}></input>
                            <p>{passwordCheck}</p>
                            <br />
                        </div>

                        <button className='registerButton' type='button' onClick={() => { handleSubmit(email, password, password2) }}>
                            Register
                        </button>
                    </form>
                </div>
            );
        }
    }
}

export default Registration;