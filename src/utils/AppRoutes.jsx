import { Navigate } from "react-router-dom";
import Create from "../components/Create";
import Home from "../components/Home";
import Login from "../components/Login";
import Status from "../components/Status";
import Dashboard from "../components/Dashboard";
import Users from "../components/Users";
import Task from "../components/Task";
import User from "../components/user";
import Profile from "../components/Profile";
import CreateUser from "../components/CreateUser";

const AppRoutes = [
    {
        path: "/",
        element : <Home/>
    },
    {
        path: "/profile",
        element : <Profile/>
    },
    {
        path: "/create",
        element : <Create/>
    },
    {
        path: "/status",
        element : <Status/>
    },
    {
        path: "/login",
        element : <Login/>
    },
    {
        path: "/dashboard",
        element : <Dashboard/>
    },
    {
        path: "/createUser",
        element : <CreateUser/>
    },
    {
        path: "/users",
        element : <Users/>
    },
    {
        path: "/users/:userId",
        element : <User/>
    },
    {
        path: "/tasks/:taskNo",
        element : <Task/>
    },
    {
        path: "*",
        element : <Navigate to = '/'/>
    }
] 

export default AppRoutes;