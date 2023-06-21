import { useState, useEffect } from "react"
import {differenceInCalendarDays} from "date-fns"
import axios from "axios"
import { Navigate } from "react-router-dom"
import { useContext } from "react"
import {UserContext} from "./UserContext"

export default function BookingWidget({place}){
    const [checkIn, setCheckIn] = useState('')
    const [checkOut,setCheckOut] = useState('')
    const [numberOfGuests, setNumberOfGuests] = useState(1)
    const [name,setName] = useState('')
    const [phone, setPhone] = useState('')
    const [redirect, setRedirect] = useState('')
    const {user} = useContext(UserContext)

    let numberOfDays = 0
    useEffect(() => {
        if(user){
            setName(user.name)
        }
    }, [user])
    async function bookThisPlace(){
        const response = await axios.post('/bookings',{
            checkIn,checkOut,numberOfGuests,name,phone,
            place:place._id,
            price:numberOfDays*place.price
        }) 
        const bookingId = response.data._id
        setRedirect(`/account/bookings/${bookingId}`)
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut),new Date(checkIn))
    }
    return(
        <div>
        <div className="shadow shadow-sm shadow-black p-4 rounded-2xl">
            <div className="text-2xl text-center">
                    Price: ${place.price}/ per night
            </div>                        
            <div className="border border-gray-300 rounded-2xl mt-4">
                <div className="flex justify-between">
                 <div className=" py-3  rounded-2xl px-4">
                    <label >Check in:</label>
                    <input type="date" value={checkIn} onChange={e=> setCheckIn(e.target.value)} />
                 </div>
                 <div className=" py-3  rounded-2xl px-4 border-l border-gray-300">
                    <label >Check out:</label>
                    <input type="date" value={checkOut} onChange={e=> setCheckOut(e.target.value)}/>
                 </div>
                </div>
                <div className=" py-3  px-4 border-t border-gray-300">
                    <label >Number of guests:</label>
                    <input type="number" value={numberOfGuests} onChange={e=> setNumberOfGuests(e.target.value)} />
                 </div>
            </div>
                {numberOfDays > 0 && (
                <div className=" py-3  px-4 border-t border-gray-300">
                <label >Your name:</label>
                <input type="text" value={name} onChange={e=> setName(e.target.value)} />
                <label >Phone number:</label>
                <input type="tel" value={phone} onChange={e=> setPhone(e.target.value)} />
                </div>

                )}
                <button onClick={bookThisPlace} className="primary mt-4">
                    Book this place
                    {numberOfDays > 0 &&(
                        <span> ${numberOfDays * place.price}</span>
                    )}
                </button>
        </div>
    </div>
    )
}