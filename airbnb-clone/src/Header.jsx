import { useState } from "react"
import { useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserContext"

export default function Header(){
  const {user}=useContext(UserContext)
  const [visible,setVisible] = useState(false)
  const [search,setSearch] = useState("")
  
    return(
        <header className=" flex justify-between items-center">
        <Link to={'/'} className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl">Journey</span>
        </Link>
        <div className="relative flex gap-2 items-center border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300">
          
          {visible && 
                    <div className="absolute flex top-0 left-0 z-10 h-full" >
                    <input  type="text"  className="!rounded-full !w-[300px] h-full !m-0" onChange={(e) => setSearch(e.target.value)}/>
                    <button className="-ml-8 " onClick={()=>setVisible(false)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                    </div>
          }
          <div>Anywhere</div>
          <div className="w-4">
            <hr className="rotate-90" />
          </div>
          <div>Any week</div>
          <div className="w-4">
            <hr className="rotate-90 text-gray-400" />
          </div>
          <div>Add guests</div>
          <button className=" bg-red-500 rounded-full flex justify-center items-center p-2 text-white " onClick={visible ? "" :()=>setVisible(true)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-2  border border-gray-300 rounded-full py-2 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
          <Link to={user?"/account":"/login"} className="p-1 overflow-hidden flex items-center">
            <div>            
              <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            </div>
            {!!user &&(
              <div className="ml-4">
                {user.name}
              </div>
            )}
          </Link>
        </div>
      </header>
    )
}