import React from 'react';

const UserProfile = () => {
  //get the image, name (first name + last name), email, and user name from firebase and replace the placeholders
  return (
    <div className="profileContainer">
      <div className="topProfile">
        <div>
          <img className="userProfilePic"
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Windows_10_Default_Profile_Picture.svg/512px-Windows_10_Default_Profile_Picture.svg.png?20221210150350'/>
        </div>
        <div>
          <h4 className='profileName'>Firstname Lastname</h4>
          <div className='userProfileDetails'>
            <h6>Email:</h6>
            <h6>Username:</h6>
            <h6>Password: ******</h6>
            <h6>Reset Password</h6>
          </div>

        </div>
      </div>
    </div>
  )
}
export default UserProfile;