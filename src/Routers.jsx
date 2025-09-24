import { Route, Routes } from 'react-router'
// import LandingPage from '../Components/LandingPage'
// import RentalsPage from '../Components/RentalsPage'
// import RentalDetailsPage from '../Components/RentalDetailsPage'
// import BookingPage from '../Components/BookingPage'
// import ScrollToTop from '../Components/ScrollToTop'
// import Wishlist from '../Components/Wishlist'
import VitalsRecord from './components/VitalsRecord'
import Dashboard from './components/Dashboards'

export const Router = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/vitalsRecord' element={<VitalsRecord/>}></Route>
            {/* <Route path='/rentalDetailsPage/:id' element={<RentalDetailsPage/>}></Route>
            <Route path='/bookingPage/:guests/:price/:nights/:dates/:date2' element={<BookingPage/>}></Route>
            <Route path='/wishlist' element={<Wishlist/>}></Route> */}
        </Routes>
    </div>
  )
}
