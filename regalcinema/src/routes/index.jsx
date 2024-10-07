import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MovieDetail from "../Components/MovieDetail";
import BuyTickets from "../Components/BuyTickets";
import SeatBooking from "../Components/SeatBooking";
import Shop from "../Components/Shop";
import Login from "../Components/Login";
import SignUp from "../Components/SignUp"
import PayPage from "../Components/PayPage";


const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
    },{
        path:"login/:id",
        element: <Login/>
    },{
        path:"/signup",
        element: <SignUp/>
    },{
        path:"movieDetail/:id",
        element: <MovieDetail/>
    },{
        path:"buyTickets/:id",
        element: <BuyTickets/>
    },{
        path:"seatbooking/:id",
        element: <SeatBooking/>
    },{
        path:"shop/:id",
        element: <Shop/>
    },{
        path:"paypage/:id",
        element: <PayPage/>
    }
]);

export default router;