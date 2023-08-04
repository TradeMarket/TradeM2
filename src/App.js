//import './App.css';
import db from './firebase';
import React from 'react';
import LoginPage from './Forms/LoginPage'
import UserProfile from './userProfile';

function App() {
  return (
    <div className="App">
      <UserProfile/>
    </div>
  );
}

export default App;
