import React from 'react';
import { getDatabase, ref, child, get } from 'firebase/database';


//get user from users table, how do I know which user to get
//I need to get the info of the user that is logged in right now
const dbRef = ref(getDatabase());
let user = null;
get(child(dbRef, `Users/1`)).then((snapshot) => {
  if (snapshot.exists()) {
    user = snapshot.val();
    console.log(snapshot.val());
    
  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});

const UserProfile = () => {
  //get the image, name (first name + last name), email, and user name from firebase and replace the placeholders
  return (
    <div className="profileContainer">
      <div className="topProfile">
        <div>
          <img className="userProfilePic"
          src={user['Profile Image']}/>
        </div>
        <div>
          <h4 className='profileName'>{user['FirstName']} {user['LastName']}</h4>
          <div className='userProfileDetails'>
            <h6>Email: {user['Email']}</h6>
            <h6>Username:{user['Username']}</h6>
            <h6>Password: ******</h6>
            <h6>Reset Password</h6>
          </div>

        </div>
      </div>
    </div>
  )
}
export default UserProfile;