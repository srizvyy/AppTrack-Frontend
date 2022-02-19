import {useState} from 'react';
import Star from '@mui/icons-material/Star';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ListItemIcon from '@mui/material/ListItemIcon';
import CallMadeIcon from '@mui/icons-material/CallMade';
import CallReceivedIcon from '@mui/icons-material/CallReceived';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';

function JobCard({job, communicationData, updateJob, handleModal}) {
    const [dropdownDisabled, setDropdownDisabled] = useState(false);
    // const [likeStar, setLikeStar] = useState(false);

    const handleChange = (e) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user_id'),
                login_token: localStorage.getItem('login_token'),
                status: e.target.value
            })
        };
        setDropdownDisabled(true);
        fetch(`http://localhost:9292/applications/${job.id}`, options)
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    updateJob(data.data);
                } else {
                    console.log(data);
                }
                setDropdownDisabled(false);
            });
    };
  
      const [displayCommunication, setDisplayCommunication] = useState(false)

    function handleCommunication () {
        setDisplayCommunication(!displayCommunication)
    }

     const handleLikeClick = (e) => {
        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: localStorage.getItem('user_id'),
                login_token: localStorage.getItem('login_token'),
                favorite: !job.favorite
            })
        };
        // setLikeStar(true);
        fetch(`http://localhost:9292/applications/${job.id}`, options)
            .then(resp => resp.json())
            .then(data => {
                if (data.success) {
                    updateJob(data.data);
                } else {
                    console.log(data);
                }
                // setLikeStar(false);
            });
    }


    return (
        <div className="jobCards">
            <img src={job.logo_url === '' ? 'https://static.thenounproject.com/png/2043816-200.png' : job.logo_url} alt="Company logo" className="cardImage"  onClick={handleCommunication} />
            <div className="job-card-header">
                <ListItemIcon className="star">
                    {<Star onClick={handleLikeClick} className={ job.favorite ? "star-color" : null}/>} 
                </ListItemIcon>
                <h3 className="jobText">{job.company} <EditIcon className="job-card-edit" onClick={() => handleModal({name: 'jobForm', job: job})} /></h3>
                <h4>{job.position}</h4>
                <button className="comment-btn"><AddCommentIcon onClick={() => handleModal({name: 'communicationForm', job: job, modal: null})} /></button>
                <select onChange={handleChange} id="select-button" value={job.status} disabled={dropdownDisabled}>
                    <option value="wishlist" className="dropdownitem">Wishlist</option>
                    <option value="pending" className="dropdownitem">Applied</option>
                    <option value="interviewing" className="dropdownitem">Interviewing</option>
                    <option value="offer made" className="dropdownitem">Offer Made</option>
                    <option value="rejected" className="dropdownitem">Rejected</option>
                </select>
            </div>
            {displayCommunication ? (
                <div className="job-card-communications">
                {communicationData.map((data) => (
                    <div key={data.id} className="communication">
                        {data.received ? <CallReceivedIcon /> : <CallMadeIcon />}
                        <h4>
                            {data.comment}<EditIcon onClick={() => handleModal({name: 'communicationForm', job: job, communication: data})} />
                        </h4>
                        <CalendarTodayIcon />
                        <span>{data.time.split("T")[0]}</span>
                    </div>
                ))}
                </div>
            ) : (null)}
        </div>
    )
}

export default JobCard;