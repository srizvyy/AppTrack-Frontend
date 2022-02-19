import { useState } from "react";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function JobForm({ handleModal, addJob, updateJob, removeJob, job }) {
  const [jobFormData, setJobFormData] = useState({
    company: job ? job.company : '',
    position: job ? job.position : '',
    status: job ? job.status : 'wishlist',
    logo_url: job ? job.logo_url : '',
    favorite: job ? job.favorite : false
  });
  const [message, setMessage] = useState();
  const [disabled, setDisabled] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: job ? 'PATCH' : 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...jobFormData,
        user_id: localStorage.getItem('user_id'),
        login_token: localStorage.getItem('login_token')
      })
    };
    setDisabled(true);
    const patchSuffix = job ? `/${job.id}` : '';
    fetch(`http://localhost:9292/applications${patchSuffix}`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          job ? updateJob(data.data) : addJob(data.data);
          handleModal({});
        } else {
          setMessage(data.message);
          setDisabled(false);
        }
      });
  };

  const handleDeleteJob = () => {
    const options = {
      method: 'DELETE'
    };
    setDisabled(true);
    fetch(`http://localhost:9292/applications/${job.id}?user_id=${localStorage.getItem('user_id')}&login_token=${localStorage.getItem('login_token')}`, options)
      .then(resp => resp.json())
      .then(data => {
        if (data.success) {
          removeJob(data.data);
          handleModal({});
        } else {
          setMessage(data.message);
          setDisabled(false);
        }
      })
  };

  const handleFormChange = (e) => {
    setJobFormData(currentJobFormData => Object.assign({
      ...currentJobFormData,
      [e.target.name]: e.target.type === 'checkbox' ? e.target.checked : e.target.value
    }))
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <h4>{job ? 'Edit' : 'Add'} Job Posting</h4>
      {message ? <div>{message}</div> : null}
      <fieldset disabled={disabled}>
        <label htmlFor="company">Company:</label>
        <input type="text" id="company" name="company" placeholder="company" value={jobFormData.company} onChange={handleFormChange} />
        {/* <br /> */}
        <label htmlFor="logo_url">Logo URL:</label>
        <input type="text" id="logo_url" name="logo_url" placeholder="logo URL" value={jobFormData.logo_url} onChange={handleFormChange} />
        {/* <br /> */}
        <label htmlFor="position">Position:</label>
        <input type="text" id="position" name="position" placeholder="position" value={jobFormData.position} onChange={handleFormChange} />
        {/* <br /> */}
        <label htmlFor="status">Status:</label>
        <select id="status" name="status" value={jobFormData.status} onChange={handleFormChange}>
          <option value="wishlist">Wishlist</option>
          {/* <option value="applied">Applied</option> */}
          <option value="pending">Applied</option>
          <option value="interviewing">Interviewing</option>
          <option value="offer made">Offer Made</option>
          {/* <option value="accepted">Accepted</option> */}
          <option value="rejected">Rejected</option>
        </select>
        <label htmlFor="favorite">Favorite:</label>
        <input type="checkbox" id="favorite" name="favorite" checked={jobFormData.favorite} onChange={handleFormChange} />
        <br />
        <span className="form-actions">
          <input type="submit" value={job ? "Edit Posting" : "Add Posting"} />
          {job && <DeleteForeverIcon onClick={handleDeleteJob} />}
        </span>
      </fieldset>
    </form>
  );
}

export default JobForm;