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
import AllavailableVehicle from "./pages/vehicleowner/AllavailableVehicle";

import VehicleAddForm from "./pages/vehicleowner/VehicleAddForm";
import NotFound from "./pages/NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route element={<RootLayout />}>
          <Route path="phome" element={<PassengerHome />} />
          <Route path="vhome" element={<VehicleOwnerHome />} />
          <Route path="allvehicle" element={<AllavailableVehicle />} />
        </Route>

        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addvehicle" element={<VehicleAddForm />} />
         <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
