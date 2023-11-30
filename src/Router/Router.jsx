import { createBrowserRouter } from "react-router-dom";
import Home from "../Pages/Home/Home/Home";
import MainLayout from "../MainLayout/MainLayout";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Registration from "../Pages/Registration/Registration";
import Login from "../Pages/Login/Login";
import ManageUser from "../Pages/Dashboard/Admin/ManageUser/ManageUser";
import AddContest from "../Pages/Dashboard/Creator/AddContest/AddContest";
import MyCreatedContest from "../Pages/Dashboard/Creator/MyCreatedContest/MyCreatedContest";
import ManageContest from "../Pages/Dashboard/Admin/ManageContest/ManageContest";
import Admin from "./Admin";
import Creator from "./Creator";
import Dashboard from "../MainLayout/Dashboard";
import AllContestPage from "../Pages/AllContestPage/AllContestPage";
import ContestDetails from "../Pages/ContestDetails/ContestDetails";
import { getSingleContest } from "../api/creator";
import ContestSubmittedPage from "../Pages/Dashboard/Creator/ContestSubmittedPage/ContestSubmittedPage";
import MyParticipatedContest from "../Pages/Dashboard/Users/MyParticipatedContest/MyParticipatedContest";
import PrivateRoute from "./PrivateRoute";
import MyWinningContest from "../Pages/Dashboard/Users/MyWinningContest/MyWinningContest";
import MyProfile from "../Pages/Dashboard/Users/MyProfile/MyProfile";
import Leaderboard from "../Pages/Leaderboard/Leaderboard";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: '/registration',
                element: <Registration />
            },
            {
                path: '/allcontestpage',
                element: <AllContestPage />
            },
            {
                path:'/contest-details/:id',
                element: <PrivateRoute><ContestDetails /></PrivateRoute>,
                loader: ({ params }) => getSingleContest(params.id)
            },
            {
                path: '/leaderboard',
                element: <Leaderboard />
            }
           
            
        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            {
                path: 'manageUsers',
                element: <PrivateRoute><Admin><ManageUser /></Admin></PrivateRoute>
            },
            {
                path: 'manageContest',
                element: <PrivateRoute><Admin><ManageContest /></Admin></PrivateRoute>
            },
            {
                path: 'addContest',
                element: <PrivateRoute><Creator><AddContest /></Creator></PrivateRoute>
            },
            {
                path: 'mycreatedContest',
                element: <PrivateRoute><Creator><MyCreatedContest /></Creator></PrivateRoute>
            },
            {
                path: 'contestSubmittedPage',
                element: <PrivateRoute><Creator><ContestSubmittedPage /></Creator></PrivateRoute>
            },
            {
                path: 'myParticipatedContest',
                element: <PrivateRoute><MyParticipatedContest /> </PrivateRoute>
            },
            {
                path: 'myWinnigContest',
                element: <PrivateRoute><MyWinningContest /> </PrivateRoute>
            },
            {
                path: 'myProfile',
                element: <PrivateRoute><MyProfile /> </PrivateRoute>
            }
        ]
    }
])








