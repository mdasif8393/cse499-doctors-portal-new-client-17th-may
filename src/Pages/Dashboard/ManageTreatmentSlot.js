import React from 'react';
import { toast } from 'react-toastify';

const ManageTreatmentSlot = ({ slot, index, refetch, setUpdateSlotStatus }) => {
    const { _id, name, price, slots, available } = slot;
    return (
        <div>
            <tr>
                <th>{index + 1}</th>
                <td>{name}</td>
                <td>{available}</td>
                <td><label onClick={() => setUpdateSlotStatus(slot)} htmlFor="delete-confirm-modal" className="btn btn-xs btn-error">Change Status</label>
                </td>
            </tr>
        </div>
    );
};

export default ManageTreatmentSlot;