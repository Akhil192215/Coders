import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import Authenticate from "./pages/Authenticate/Authenticate";
import GuestRoutes from "./pages/GuestRoutes/GuestRoutes";
import SemiProtected from "./pages/SemiProtected/SemiProtected";
import Activate from "./pages/Activate/Activate";
import ProtectedRoutes from "./pages/ProtectedRoutes/ProtectedRoutes";
import Rooms from "./pages/Rooms/Rooms";
import { useLoadingWithrefresh } from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader/Loader";
import Room from "./pages/Room/Room";
import { ChakraProvider } from "@chakra-ui/react";
import SideDrawer from "./components/shared/SideDrawer/SideDrawer";
import theme from "./config/theme";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import { useSelector } from "react-redux";
import AdminRoutes from "./pages/AdminRoutes/AdminRoutes";
import NewUsersChart from "./Charts/NewUsersChart"; 
function App() {
  const  admin = useSelector((state) => state?.adminAuth?.admin);

  const user = useSelector((state) => state.auth.user);

  const { Loading } = useLoadingWithrefresh();
  return Loading ? (
    <Loader message={"Loading please wait . . ."} />
  ) : (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
      {user?.isUser === "user" ? <SideDrawer /> : admin?.isUser === "admin" ? <Navigation /> : ""}


        <Routes>
          <Route element={<GuestRoutes />}>
            <Route element={<Authenticate />} path="/authenticate" />
            <Route path="/" exact element={<Home />} />
          </Route>
          <Route element={<SemiProtected />}>
            <Route element={<Activate />} path="/activate" />
          </Route>
          <Route element={<ProtectedRoutes />}>
            <Route element={<Rooms />} path="/rooms" />
            <Route element={<Room />} path="/room/:id" />
          </Route>
          <Route element={<AdminRoutes />} >
          <Route element={<NewUsersChart />} path="/dashboard" />
          </Route>
          <Route  element={<AdminLogin/>} path="/login/admin" />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

// const GuestRoutes = () => {
//   return (
//       auth ?  <Navigate to='/room' /> :  <Outlet />
//   )
// }

// const ProtectedRoutes = () => {
//   return !auth?(
//     <Navigate to='/' />) : auth && !user.activate
//   ?( <Navigate to='/new' />)
//    :( <Outlet/> )
//   }

// const SemiProtected = () => {
//   let auth = true
//   let user = {
//       activate: true
//   }
//   return !auth ? (
//       <Navigate to='/' />) : auth && !user.activate ? (
//           <Outlet />
//       ) : (<Navigate to='/rooms' />)

// }

export default App;
