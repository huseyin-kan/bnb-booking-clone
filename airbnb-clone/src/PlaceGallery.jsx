import { useState } from "react"
export default function PlaceGallery({place}){
    const [showAllPhotos,setShowAllPhotos] = useState(false)
    
    
    if(showAllPhotos){
        return(
            <div className="absolute bg-black text-white inset-0 min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={()=>setShowAllPhotos(false)} className="fixed right-12 top-8 shadow shadow-md shadow-black flex gap-1 py-2 px-4 rounded-2xl bg-white text-black">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                            Close Photos
                        </button>
                    </div>
                {place?.photos?.length>0 && place.photos.map(photo=>(
                    <div>
                        <img className="w-full" src={'http://localhost:4000/uploads/'+photo} key={photo._id} />
                    </div>
                ))}
                </div>
            </div>
        )
    }

    return(
        <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-2xl overflow-hidden ">
                <div>
                    {place.photos?.[0] &&(
                        <div>
                            <img onClick={()=>setShowAllPhotos(true)} className=" hover:opacity-80  duration-300  ease-in-out cursor-pointer aspect-square object-cover" src={"http://localhost:4000/uploads/"+place.photos[0]} />
                        </div>
                    )}
                </div>
                <div className="grid">
                    {place.photos?.[1] &&(
                        <img onClick={()=>setShowAllPhotos(true)} className="hover:opacity-80  duration-300  ease-in-out cursor-pointer aspect-square object-cover rounded-xl" src={"http://localhost:4000/uploads/"+place.photos[1]} />
                    )}
                    <div className="overflow-hidden rounded-xl">
                        {place.photos?.[2] &&(
                        <img onClick={()=>setShowAllPhotos(true)} className="hover:opacity-80  duration-300  ease-in-out cursor-pointer aspect-square object-cover relative top-2 rounded-xl" src={"http://localhost:4000/uploads/"+place.photos[2]} />
                        )}
                    </div>

                </div>
                <button onClick={()=>setShowAllPhotos(true)} className="absolute bottom-3 right-4 rounded-xl py-2 px-4 bg-white shadow shadow-md shadow-gray-500 flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                    Show More Photos
                    </button>
            </div>
            </div>
    )
}