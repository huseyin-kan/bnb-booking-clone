import { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import axios from 'axios'
import { useState } from "react"
import BookingWidget from "../BookingWidget"
import PlaceGallery from "../PlaceGallery"
import AddressLink from "../AddressLink"

export default function PlacePage(){
    const {id}=useParams()
    const [place,setPlace] = useState(null)
    
    useEffect(()=>{

        if(!id){
            return
        }
        
        axios.get(`/places/${id}`).then(response=>{
            setPlace(response.data)
        })
    },[id])

    if(!place) return ''
    
    return(
        <div className="mt-4 py-8 bg-gray-100 -mx-8 px-8 ">
            <h1 className="text-3xl ">{place.title}</h1>
            <AddressLink place={place} />
            <PlaceGallery place={place} />
            <div className="my-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                <div className="my-2">
                <h2 className="font-semibold text-2xl mb-2">Description</h2>
                <div className="text-justify mb-4">
                    {place.description}
                </div>
                </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}   
                </div>
                <div>
                <BookingWidget place={place}/>
                </div>

            </div>
            <div className="bg-white border-t border-gray-100 -mx-8 px-8">
            <div className="mt-2">
                <h2 className="font-semibold text-2xl mb-2">Extra Info</h2>
            </div>
            <div className="text-sm text-gray-700 leading-4 mb-4 mt-1 text-justify leading-5">
                        {place.extraInfo}
            </div>
            </div>
        </div>
    )
}