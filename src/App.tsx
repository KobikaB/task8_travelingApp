import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PassengerHome from "./pages/passengerhome/PassengerHome";
import VehicleOwnerHome from "./pages/vehicleowner/VehicleOwnerHome";
import RootLayout from "./layout/RootLayout";

import VehicleAddForm from "./pages/vehicleowner/VehicleAddForm";

import PassengerForm from "./pages/passengerhome/PassengerForm";
import AllavailableVehicle from "./pages/passengerhome/AllavailableVehicle";

import Profile from "./pages/Profile";

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayout />}>
          <Route element={<ProtectedRoute allowedRoles={["passenger"]} />}>
            <Route path="/phome" element={<PassengerHome />} />
            <Route
              path="passenger/book/:vehicleId"
              element={<PassengerForm />}
            />

            <Route path="/allvehicle" element={<AllavailableVehicle />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["vowner"]} />}>
            <Route path="/vhome" element={<VehicleOwnerHome />} />
          </Route>
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/addvehicle" element={<VehicleAddForm />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
