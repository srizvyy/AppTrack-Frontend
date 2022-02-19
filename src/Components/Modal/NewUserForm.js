import { useState } from "react";


function NewUserForm({ handleModal, handleUserIdUpdate }) {
  const [userFormData, setUserFormData] = useState({
    username: '',
    password: '',
    passwordConfirm: ''
  });
  const [message, setMessage] = useState();
  const [disabled, setDisabled] = useState(false);

  // const resetFormData = () => {
  //   setUserFormData({
  //     username: '',
  //     password: '',
  //     passwordConfirm: '',
  //     image_url: ''
  //   });
  // };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (userFormData.password !== userFormData.passwordConfirm) {
      setMessage('Passwords do not match.');
      return null;
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userFormData)
    };
    setDisabled(true);
    fetch('http://localhost:9292/users', options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          // resetFormData();
          // setMessage('Successfully created account!');
          setLoggedInUser(data);
          handleModal({});
        } else {
          setMessage(data.message);
          setDisabled(false);
        }
      })
  }

  const setLoggedInUser = (data) => {
    localStorage.setItem('login_token', data.login_token);
    localStorage.setItem('user_id', data.user_id);
    handleUserIdUpdate(data.user_id);
  };

  const handleFormChange = (e) => {
    setUserFormData(currentFormData => Object.assign({...currentFormData, [e.target.name]: e.target.value}))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>Create User</h4>
      {message ? <div>{message}</div> : null}
      <fieldset disabled={disabled}>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" placeholder="username" value={userFormData.username} onChange={handleFormChange} />
        <label htmlFor="image_url">Avatar Image:</label>
        <input type="text" id="image_url" name="image_url" placeholder="image URL" value={userFormData.image_url} onChange={handleFormChange} />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="password" value={userFormData.password} onChange={handleFormChange} />
        <label htmlFor="passwordConfirm">Confirm:</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder="confirm password" value={userFormData.passwordConfirm} onChange={handleFormChange} />
        <br />
        <input type="submit" value="Create User" />
      </fieldset>
    </form>
  )
}

export default NewUserForm;