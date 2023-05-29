import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink"
import BookingsDate from "../BookingsDate"
import PlaceGallery from "../PlaceGallery"

export default function BookingPage(){
    const id = useParams()
    const [booking,setBooking] = useState(null)

    useEffect(()=>{

        if(id){
            axios.get('/bookings').then(response=>{
                const foundBooking = response.data.find(({_id})=> _id === id.id)
                if(foundBooking){
                    setBooking(foundBooking)
                }
            })
        }

    },[id.id])

    if(!booking){
        return ''
    }

    return(
        <div className="my-8">
            <h1 className="text-3xl ">{booking.place.title}</h1>
            <AddressLink place={booking.place}/>
            <div className="bg-gray-200/70 p-4 mb-4 rounded-2xl">
                <h2 className="text-2xl">Date info:</h2>
                dates
                <BookingsDate booking={booking}/>
            </div>
            <PlaceGallery place={booking.place} />
        </div>
    )
}