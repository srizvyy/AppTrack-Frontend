import React from 'react'
import CommunicationForm from './CommunicationForm';
import JobForm from './JobForm';
import NewUserForm from './NewUserForm';

function Modal({modal, handleModal, addJob, updateJob, removeJob, addCommunication, updateCommunication, removeCommunication, handleUserIdUpdate}) {
    // const modalClose = () => {
    //     setModalOpen(false)
    // }

    let content = null;
    if (modal.name === 'jobForm') {
        content = <JobForm handleModal={handleModal} addJob={addJob} updateJob={updateJob} removeJob={removeJob} job={modal.job} />
    } else if (modal.name === 'communicationForm') {
        content = <CommunicationForm handleModal={handleModal} addCommunication={addCommunication} updateCommunication={updateCommunication} removeCommunication={removeCommunication} job={modal.job} communication={modal.communication} />
    } else if (modal.name === 'newUserForm') {
        content = <NewUserForm  handleModal={handleModal} handleUserIdUpdate={handleUserIdUpdate} />
    }
    return (
        <>
            <div className="modal-background" onClick={() => handleModal({})}>
            </div>
            <div className="modal-content">
                {content}
            </div>
                {/* <div className="modal-container"></div>
                        <button onClick={modalClose}> X </button>
                    <div className="time">
                        <p>{data.time}</p>
                    </div>
                    <div className="received">{data.received}</div>
                    <div className="comment">{data.comment}</div>
            </div> */}
        </>
    )
}

export default Modal
