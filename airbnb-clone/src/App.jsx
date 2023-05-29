import axios from "axios";
import {Route, Routes} from "react-router-dom"
import Layout from "./Layout";
import BookingPage from "./pages/BookingPage";
import BookingsPage from "./pages/BookingsPage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import PlacePage from "./pages/PlacePage";
import PlacesFormPage from "./pages/PlacesFormPage";
import PlacesPages from "./pages/PlacesPages";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage"
import {UserContextProvider} from "./UserContext"


axios.defaults.baseURL='http://127.0.0.1:4000'
axios.defaults.withCredentials=true

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>      
          <Route path="/register" element={<RegisterPage/>}/> 
          <Route path="/account/" element={<ProfilePage/>}/> 
          <Route path="/account/places" element={<PlacesPages/>}/>
          <Route path="/account/places/new" element={<PlacesFormPage/>}/>
          <Route path="/account/places/:id" element={<PlacesFormPage/>}/>
          <Route path="/place/:id" element={<PlacePage/>}/>
          <Route path="/account/bookings" element={<BookingsPage/>}/>
          <Route path="/account/bookings/:id" element={<BookingPage/>}/>
        </Route>
      </Routes>      
    </UserContextProvider>
  );
}

export default App;
