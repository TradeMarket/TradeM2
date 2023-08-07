import React from 'react';
import { getDatabase, ref } from 'firebase/database';

const db = getDatabase();
//get user from users table, how do I know which user to get
//I need to get the info of the user that is logged in right now
const userRef = ref(db, 'Users/' + 1);
const UserProfile = () => {
  //get the image, name (first name + last name), email, and user name from firebase and replace the placeholders
  return (
    <div className="profileContainer">
      <div className="topProfile">
        <div>
          <img className="userProfilePic"
          src={userRef['Profile Image']}/>
        </div>
        <div>
          <h4 className='profileName'>{userRef['FirstName']} {userRef['LastName']}</h4>
          <div className='userProfileDetails'>
            <h6>Email: {userRef['Email']}</h6>
            <h6>Username:{userRef['Username']}</h6>
            <h6>Password: ******</h6>
            <h6>Reset Password</h6>
          </div>

        </div>
      </div>
    </div>
  )
}
export default UserProfile;