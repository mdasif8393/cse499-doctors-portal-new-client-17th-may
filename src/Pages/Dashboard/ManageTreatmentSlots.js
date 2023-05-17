import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import Loading from '../Shared/Loading';
import DeleteConfirmModal from './DeleteConfirmModal';
import ManageTreatmentSlot from './ManageTreatmentSlot';

const ManageTreatmentSlots = () => {
    const [updateSlotStatus, setUpdateSlotStatus] = useState({});
    if(updateSlotStatus.available === "true"){
        fetch(`http://localhost:5000/slot/true/${updateSlotStatus._id}`,{
                method: 'PUT',
                headers: {
                    'content-type': 'application/json',
                },
            })
            .then(res => res.json())
            .then(data => {
                window.location.reload()
            })
        }
    else if(updateSlotStatus.available === "false"){
            fetch(`http://localhost:5000/slot/false/${updateSlotStatus._id}`,{
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                    },
                })
                .then(res => res.json())
                .then(data => {
                    window.location.reload()
                })
            }

    // fetch(`http://localhost:5000/booking/${_id}`,{
    //             method: 'PATCH',
    //             headers: {
    //                 'content-type': 'application/json',
    //                 'authorization': `Bearer ${localStorage.getItem('accessToken')}`
    //             },
    //             body: JSON.stringify(payment)
    //         })
    //         .then(res => res.json())
    //         .then(data => {
    //             setProcessing(false);
    //             console.log(data);
    //         })
    //     }
    const { data: timeSlots, isLoading, refetch } = useQuery(['timeSlots'], () => fetch('http://localhost:5000/service', {
        headers: {
            authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Loading></Loading>
    }

    
    return (
        <div>
            <h2 className="text-2xl">Manage Treatment Slots: {timeSlots.length}</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Doctor Available</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            timeSlots.map((slot, index) => <ManageTreatmentSlot key={slot._id} slot={slot} index={index} refetch={refetch} setUpdateSlotStatus={setUpdateSlotStatus}></ManageTreatmentSlot>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageTreatmentSlots;