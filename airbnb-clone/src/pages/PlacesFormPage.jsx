import PhotosUploader from "../PhotosUploader"
import Perks from "../Perks"
import { useState } from "react"
import AccountNav from "../AccountNav"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"
import { useEffect } from "react"

export default function PlacesFormPage(){
    const {id} = useParams()
    const [title, setTitle] = useState('')
    const [address, setAddress] = useState('')
    const [addedPhotos, setAddedPhotos] = useState([])
    const [description, setDescription] = useState('')
    const [perks, setPerks] = useState([])
    const [extraInfo, setExtraInfo] = useState('')
    const [checkIn, setCheckIn] = useState(0)
    const [checkOut, setCheckOut] = useState(0)
    const [maxGuests, setMaxGuests] = useState(1)
    const [price,setPrice] = useState(0)
    const [redirect,setRedirect] = useState(false)

    useEffect(()=>{
      if(id===undefined){
        return;
      }else{
        axios.get('/places/'+id).then(response=>{
          const {data}=response
          setTitle(data.title)
          setAddress(data.address)
          setAddedPhotos(data.photos)
          setDescription(data.description)
          setPerks(data.perks)
          setExtraInfo(data.extraInfo)
          setCheckIn(data.checkIn)
          setCheckOut(data.checkOut)
          setMaxGuests(data.maxGuests)
          setPrice(data.price)
        })
      }
    },[id])

    function inputHeader(text){
        return(
          <h2 className="text-2xl mt-4">{text}</h2>
        )
      }
    
      function inputDescription(text){
        return(
          <p className="text-gray-500 text-sm">{text}</p>
        )
      }
    
      function preInput(header,description){
        return(
          <div>
            {inputHeader(header)}
            {inputDescription(description)}
          </div>
        )
      }
    
      async function savePlace(e){
        e.preventDefault()
        const placeData = {          
          title,address,addedPhotos,
          description,perks,extraInfo,
          checkIn,checkOut,maxGuests,
          price
        }
        if(id){          
        await axios.put('/places',{
          id,
          ...placeData
        })
        setRedirect(true)
        }
        else{
          await axios.post('/places',{placeData})
          setRedirect(true)
        }

      }
      if(redirect){
        return <Navigate to={'/account/places'}/>
      }
    
    return(
        <div>
        <AccountNav/>
          <form onSubmit={savePlace}>
            {preInput('Title','Title for your place. It should be short and catchy as in advertisement')}
            <input type={"text"} value={title} onChange={e=>setTitle(e.target.value)} placeholder="Apartment, Hotels, etc..." />
            {preInput('Address','Addres to this place')}
            <input type={"text"} value={address} onChange={e=>setAddress(e.target.value)} placeholder="Address" />
            {preInput('Photos','More = Better')}
            <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos}/>
            {preInput('Description','Description about this place')}
            <textarea value={description} onChange={e=>setDescription(e.target.value)} />
            {preInput('Perks','Select perks that you want for place')}
            <Perks selected={perks} onChange={setPerks}/>
            {preInput('Extra Info','House rules, etc..')}
            <textarea  value={extraInfo} onChange={e=>setExtraInfo(e.target.value)}/>
            {preInput('CheckIN & CheckOut Times', 'Add check in and check out and guests')}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">Check In</h3>
                <input type="text" value={checkIn} onChange={e=>setCheckIn(e.target.value)} placeholder="14.00"/>
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Check Out</h3>
                <input type="text" value={checkOut} onChange={e=>setCheckOut(e.target.value)} placeholder="20.00"/>
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Max Guests</h3>
                <input type="number" value={maxGuests} onChange={e=>setMaxGuests(e.target.value)} placeholder="10"/>
              </div>
              <div>
              <h3 className="mt-2 -mb-1">Price per night</h3>
                <input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="10"/>
              </div>
            </div>
            <div className="my-4">
              <button className="primary">Save</button>
            </div>
          </form>
        </div>
    )
}