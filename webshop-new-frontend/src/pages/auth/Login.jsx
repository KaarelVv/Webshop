import React, { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../store/AuthContext';
import { useNavigate } from 'react-router-dom';
import config from "../../data/config.json";


function Login() {

  const {setLoggedIn, setLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [message, setMessage] = useState();

  const login = () => {
    const payLoad = {
      "email": emailRef.current.value,
      "password": passwordRef.current.value,

    }

    fetch(config.backendUrl + "/login", {
      method: "POST",
      body: JSON.stringify(payLoad),
      headers: {
        "Content-Type": "application/json"
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        //  õige kuju, aga tühi       //ei tae mis kuju olema peaks
        // vale parool
        if (data.token !== null && data.token !== undefined) {
          setLoggedIn(true);
          fetch(config.backendUrl + "/person-account", {
            headers: { Authorization: "Bearer " + data.token },
          })
            .then((res) => res.json())
            .then((data) => {
              setLoggedInUser(data);
            });
          navigate('/profile');
          sessionStorage.setItem("token", data.token); //salvesta ära sessionstorage
        } else {
          setMessage(data.message);
        }
      });

  }

  return (
    <div>
      <div>{message}</div>
      <label>E-mail</label> <br />
      <input ref={emailRef} type="text" /> <br />
      <label>Parool</label> <br />
      <input ref={passwordRef} type="text" /> <br />

      <button onClick={login}>Logi sisse</button>

    </div>
  )
}

export default Login