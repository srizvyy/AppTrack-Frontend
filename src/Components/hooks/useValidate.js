import { useEffect, useState } from "react";

function useValidate(userId) {
  const [status, setStatus] = useState('idle');
  const [username, setUsername] = useState('');

  const loginToken = localStorage.getItem('login_token');
  // const userId = localStorage.getItem('user_id');

  useEffect(() => {
    setStatus('pending');
    if (userId === null || loginToken === null) {
      setStatus('rejected');
    } else {
      fetch(`http://localhost:9292/users/${userId}?login_token=${loginToken}`)
        .then(resp => resp.json())
        .then(data => {
          if (data.success) {
            setStatus('success');
            setUsername(data.username);
          } else {
            setStatus('rejected');
          }
        })
        .catch(err => {
          console.error(err);
          setStatus('rejected');
        })
    }
  }, [loginToken, userId]);

  return {status, username};
}

export default useValidate;