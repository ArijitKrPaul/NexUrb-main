import "./App.css";
import LoginComponent from "../src/components/login.jsx";
import DashboardComponent from "../src/components/dashboard.jsx";
import RegistrationComponent from "../src/components/registration.jsx";
import DepartmentsPage from "../src/components/contacts.jsx";
import AdminComponent from "./components/superAdmin.jsx";
import InventoryComponent from "./components/inventory.jsx";
import ProjectComponent from "./components/project.jsx";
import HomeComponent from "./components/home.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmployeeDashboardComponent from "./components/empDashboard.jsx";
import EmployeeInventoryComponent from "./components/empInventory.jsx";
import DeptReg from "./components/DeptReg.jsx";
import DeptAdmin from "./components/DeptAdmin.jsx";
import EmployeeProjectComponent from "./components/empProject.jsx";
import ComplaintComponent from "./components/ComplaintForm.jsx";
import UsersComponent from "./components/AddUsers.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeComponent />,
    },
    {
      path: "/login",
      element: <LoginComponent />,
    },
    {
      path: "/home",
      element: <DashboardComponent />,
    },
    {
      path: "/register",
      element: <RegistrationComponent />,
    },
    {
      path: "/home/project",
      element: <EmployeeProjectComponent />,
    },
    {
      path: "/home/contacts",
      element: <DepartmentsPage />,
    },
    {
      path: "/Superadmin",
      element: <AdminComponent />,
    },
    {
      path: "/Edashboard/empinventory",
      element: <EmployeeInventoryComponent />,
    },
    {
      path: "/Edashboard/empProject",
      element: <EmployeeProjectComponent />,
    },
    {
      path: "/admin/inventory",
      element: <InventoryComponent />,
    },
    {
      path: "/admin/addUsers",
      element: <UsersComponent />,
    },
    {
      path: "/Edashboard",
      element: <EmployeeDashboardComponent />,
    },
    {
      path: "/home/register",
      element: <DeptReg />,
    },
    {
      path: "/admin",
      element: <DeptAdmin />,
    },
    {
      path: "/admin/project",
      element: <ProjectComponent />,
    },
    {
      path: "/home/complaint",
      element: <ComplaintComponent />,
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
