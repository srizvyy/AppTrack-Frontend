import React from 'react'
import Modal from './Modal'

function ModalContainer({communicationData, setModalOpen}) {
    
    return (
        <div>
             <div>
            {communicationData.map((data) => <Modal key={data.id} data={data} setModalOpen={setModalOpen} />)}
            
            </div>
        </div>
    )
}

export default ModalContainer