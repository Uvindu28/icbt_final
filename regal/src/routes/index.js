import { BrowserRouter, createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../components/Login";
import Sidebar from "../components/Sidebar";
import Movies from "../pages/Movies";
import UMovies from "../pages/UMovies";
import Food from "../pages/Food";
import MDates from "../pages/MDates";
import Bookings from "../pages/Bookings";
import FoodCategory from "../pages/FoodCategory";
import Home from "../pages/Home";
import SignUp from "../components/SignUp";

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children: [
            {
                path: "",
                element: <Login/>
            },
            {
                path: "/signup",
                element: <SignUp/>
            },
            {
                path: "sidebar",
                element: <Sidebar/>,
                children:[
                    {
                        index: true,
                        element: <Home/>
                    },
                    {
                        path: "home",
                        element: <Home/>
                    },
                    {
                        path: "movies",
                        element: <Movies/>
                    },
                    {
                        path: "umovies",
                        element: <UMovies/>
                    },
                    {
                        path: "movieDates",
                        element: <MDates/>
                    },
                    {
                        path: "food",
                        element: <Food/>
                    },
                    {
                        path: "foodCategories",
                        element: <FoodCategory/>
                    },
                    {
                        path: "booking",
                        element: <Bookings/>
                    }
                ]

            }
        ]
    }
]);

export default router;