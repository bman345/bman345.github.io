import React, { useState } from 'react';
import './App.css';
import Nav from './components/Nav';
import Tasks from './components/Task';
import Login from './components/Login';
import Logout from './components/Logout';
import Registration from './components/Registration';
import Boards from './components/Boards';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth'
import { scrum_auth, scrum_db } from './Database'
import { useListVals } from 'react-firebase-hooks/database';
import Account from './Account';

function App() {

  const [user, loading, error] = useAuthState(scrum_auth);
  //console.log(user);
  const [snapshot, loading_db, error_db] = useListVals(user ? scrum_db.getReference(`users/${user.uid}`) : null);
  //console.log(snapshot);

  if (user && snapshot && !loading_db) {
    //console.log(new Account(snapshot, user.uid));

    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Tasks user={new Account(snapshot, user.uid)}/>} />
        </Routes>
        <Routes>
          <Route path='/logout' element={<Logout />} />
        </Routes>
        <Routes>
          <Route path='/registration' element={<Registration />} />
        </Routes>
        <Routes>
          <Route path='/boards' element={<Boards user={new Account(snapshot, user.uid)} />} />
        </Routes>
      </Router>
    );
  } else {
    return (
      <Router>
        <Nav />
        <Routes>
          <Route path='/' element={<Login />} />
        </Routes>
        <Routes>
          <Route path='/logout' element={<Logout />} />
        </Routes>
        <Routes>
          <Route path='/registration' element={<Registration />} />
        </Routes>
      </Router>
    );
  }

}

export default App;
