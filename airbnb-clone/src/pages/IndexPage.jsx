import { useEffect } from "react"
import axios from 'axios'
import { useState } from "react"
import { Link } from "react-router-dom"


export default function IndexPage(){
  const [places,setPlaces] = useState([])
  useEffect(()=>{
    axios.get('/allplaces').then(res=>{
      setPlaces(res.data)
    })
  },[])

    return (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {places.length > 0 && places.map(p=>(
            <Link to={'/place/'+p._id} className="rounded-2xl hover:shadow-2xl hover:opacity-80 transition duration-300 ease-in-out">
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                {p.photos?.[0] && (
                  <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:4000/uploads/'+p.photos?.[0]}/>
                )}
              </div>
              <h3 className="font-bold">{p.address}</h3>
              <h2 className="text-sm">{p.title}</h2>
              <div className="mt-1 my-2">
                <span className="font-bold">${p.price}</span> per night
              </div>
            </Link>
          ))}
      </div>
    )
}