import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '70%',
    transform: 'translate(-50%,-50%)',
  },
};

import { get, getDatabase, ref, update } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';

export default function CreateNewMessage({ isOpen, onClose, otherId, userId }) {
  const [user, setUser] = useState('');

  const [email, setEmail] = useState('');
  const [messageContext, setMessageContext] = useState('');
  const [errorStatus, setErrorStatus] = useState(false);

  const db = getDatabase();

  const navigate = useNavigate();

  const emailHandler = (event) => {
    setEmail(event.target.value);
  };

  const messageHandler = (event) => {
    setMessageContext(event.target.value);
  };

  const buttonHandler = (event) => {
    event.preventDefault();
    if (email.length < 1 || messageContext.length < 1) {
      setErrorStatus(true);
      return;
    }
    const timestamp = Date.now();

    if (otherId !== null) {
      get(ref(db, 'Users')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());

          // Creating new message from single product

          // gets users email
          const filteredUserData = data.filter((element) => {
            if (element.id === user.uid) {
              return element;
            }
          });
          console.log(filteredUserData);
          update(ref(db, `Messages2/${user.uid}/${timestamp}`), {
            message: messageContext,
            sentBy: user.uid,
            receiveBy: otherId,
            otherEmail: email,
            userEmail: filteredUserData[0].email,
          });

          update(ref(db, `Messages2/${otherId}/${timestamp}`), {
            message: messageContext,
            sentBy: user.uid,
            receiveBy: otherId,
            otherEmail: email,
            userEmail: filteredUserData[0].email,
          });

          navigate('/chat', {
            state: {
              userId: user.uid,
              otherId: otherId,
            },
          });
        }
      });
    } else {
      // otherId does not equal null. Creating new message from Chatlist
      get(ref(db, 'Users')).then((snapshot) => {
        if (snapshot.exists()) {
          const data = Object.values(snapshot.val());

          // get ID from user inputting email
          const filteredData = data.filter((element) => {
            if (element.email === email) {
              return element;
            }
          });

          if (filteredData.length < 1) {
            toast.warning('The Email you have inputted does not exist');
            return;
          }

          // gets user Email
          const filteredUserData = data.filter((element) => {
            if (element.id === userId) {
              return element;
            }
          });

          update(ref(db, `Messages2/${userId}/${timestamp}`), {
            message: messageContext,
            sentBy: userId,
            receiveBy: filteredData[0].id,
            otherEmail: email,
            userEmail: filteredUserData[0].email,
          });

          update(ref(db, `Messages2/${filteredData[0].id}/${timestamp}`), {
            message: messageContext,
            sentBy: userId,
            userEmail: filteredUserData[0].email,
            receiveBy: filteredData[0].id,
            otherEmail: email,
          });

          navigate('/chat', {
            state: {
              userId: userId,
              otherId: filteredData[0].id,
            },
          });
        }
      });
    }
  };

  const exitHandler = (event) => {
    event.preventDefault();
    onClose();
  };

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      }
    });
    return () => {
      listen();
    };
  }, []);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <button onClick={exitHandler}> X </button>
      <h1> Create New Message </h1>
      {errorStatus === true ? (
        <p className="errorMessage"> The following textbox cannot be blank</p>
      ) : null}
      <form onSubmit={buttonHandler}>
        <input
          type="email"
          placeholder="Email of user you wish to contact"
          name="email"
          value={email}
          onChange={emailHandler}></input>
        <input
          name="message"
          type="text"
          placeholder="Enter your message here!"
          value={messageContext}
          onChange={messageHandler}></input>
        <button onClick={buttonHandler}> Submit </button>
      </form>
    </Modal>
  );
}
