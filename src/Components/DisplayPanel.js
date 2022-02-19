import React from 'react';
import JobCard from './JobCard';
 function DisplayPanel ({title, jobData, status, communicationData, updateJob, handleModal}){
const filteredJobs= jobData.filter((job)=>(
    job.status === status
))
const jobCard = filteredJobs.map((job)=>(
    <JobCard key={job.id} job={job} updateJob={updateJob} handleModal={handleModal} communicationData={communicationData.filter((communication) => {return communication.application_id === job.id} )} />
))
    return(
        <div className= "displayPanels">
        <h3>{title}</h3>
         {jobCard}
        </div>
    )

}
export default DisplayPanel