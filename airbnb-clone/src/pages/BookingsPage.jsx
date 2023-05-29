import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingsDate from "../BookingsDate";

export default function BookingsPage(){
    const [bookings,setBookings] = useState([])
    useEffect(()=>{
        axios.get('/bookings').then(response=>{
            setBookings(response.data)
        })
    },[])
    return(
        <div>
            <AccountNav/>
            <div>
                {bookings?.length > 0 && bookings.map(booking =>(
                    <Link to={`/account/bookings/${booking._id}`} className="flex gap-4 bg-gray-200/70 my-2 rounded-2xl overflow-hidden transition ease-in-out  hover:opacity-70 ">
                        <div className="w-48">
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-2 grow pr-3">
                            <h2 className="text-2xl">{booking.place.title}</h2>
                            <BookingsDate booking={booking}/>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}