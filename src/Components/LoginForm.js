import { useState } from "react";
import useValidate from "./hooks/useValidate";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar'





function LoginForm({ userId, handleUserIdUpdate, handleModal }) {
  
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const [message, setMessage] = useState();
  const [disableForm, setDisableForm] = useState(false);
  
  const resetLoginData = () => {
    setLoginData({username: '', password: '', passwordConfirm: ''})
  };

  const setLoggedInUser = (data) => {
    localStorage.setItem('login_token', data.login_token);
    localStorage.setItem('user_id', data.user_id);
    handleUserIdUpdate(data.user_id);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    };
    setDisableForm(true);
    fetch('http://localhost:9292/users/login', options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          resetLoginData();
          setMessage('Successfully logged in!');
          setLoggedInUser(data);
        } else {
          setMessage('Invalid login credentials.');
        }
        setDisableForm(false);
      });
  };

  const handleLogout = () => {
    setDisableForm(true);
    fetch(`http://localhost:9292/users/${localStorage.getItem('user_id')}/logout?login_token=${localStorage.getItem('login_token')}`)
      .then(resp => resp.json())
      .then(data => {
        localStorage.removeItem('login_token');
        localStorage.removeItem('user_id');
        resetLoginData();
        setMessage(null);
        handleUserIdUpdate(null);
        setDisableForm(false);
      });
  };

  const handleFormChange = (e) => {
    setLoginData(currentLoginData => Object.assign({...currentLoginData, [e.target.name]: e.target.value}))
  };

  
  let form = <></>;
  const userValidation = useValidate(userId);
  if (userValidation.status === "rejected") {
    form = (
      <>
         {/* <Button id="new-account" onClick={() => handleModal({name: 'newUserForm'})}>
          Need an account?
        </Button> */}
        <form onSubmit={handleLogin}>
          {message ? <div>{message}</div> : null}
          <label htmlFor="username"> </label>
          <input type="text" id="username" name="username" placeholder="username" value={loginData.username} onChange={handleFormChange} disabled={disableForm} />
          <label htmlFor="password"> </label>
          <input type="password" id="password" name="password" placeholder="password" value={loginData.password} onChange={handleFormChange} disabled={disableForm} />
          <Button id="login-btn" type="submit" disabled={disableForm} color="inherit" >Login</Button>

        </form>
        
      </>
    );
  } else if (userValidation.status === "success") {
    form = (
      <>
        Welcome, {userValidation.username} 
        <Avatar src='' />
        {/* <button onClick={handleLogout} disabled={disableForm}>Log Out</button> */}
        <Button onClick={handleLogout} disabled={disableForm} color="inherit">Log out</Button>
      </>
    );
  }
  
  

  return (
    form
  );
  
}

export default LoginForm;