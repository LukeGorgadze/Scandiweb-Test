import React from 'react'
import { useDispatch } from 'react-redux'
import {addCustomer} from '../features/customerSlice'
import { removeReservation } from '../features/reservationSlice'
import {v4 as uuid} from 'uuid'


const ReservationCard = ({ name, index }) => {
    const dispatch = useDispatch()
    return (
        <div className="reservation-card-container"
            onClick={() => {
            dispatch(removeReservation(index))
            dispatch(addCustomer({
                id: uuid(),
                name:name,
                food:[]
            }))
            }}>{name}</div>
    )
}

export default ReservationCard
