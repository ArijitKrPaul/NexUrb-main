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
import AddUSerComponent from "./components/addNewUser.jsx";
import ProtectedRoute from "./components/protectedRoute.jsx";

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
      element: (
        <ProtectedRoute>
          <DashboardComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/register",
      element: <RegistrationComponent />,
    },
    {
      path: "/home/project",
      element: (
        <ProtectedRoute>
          <ProjectComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/contacts",
      element: (
        <ProtectedRoute>
          <DepartmentsPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Superadmin",
      element: (
        <ProtectedRoute>
          <AdminComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Edashboard/empinventory",
      element: (
        <ProtectedRoute>
          <InventoryComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Edashboard/empProject",
      element: (
        <ProtectedRoute>
          <ProjectComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/inventory",
      element: (
        <ProtectedRoute>
          <InventoryComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/addUsers",
      element: (
        <ProtectedRoute>
          <UsersComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/addUsers/add",
      element: (
        <ProtectedRoute>
          <AddUSerComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/Edashboard",
      element: (
        <ProtectedRoute>
          <EmployeeDashboardComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/register",
      element: (
        <ProtectedRoute>
          <DeptReg />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <DeptAdmin />
        </ProtectedRoute>
      ),
    },
    {
      path: "/admin/project",
      element: (
        <ProtectedRoute>
          <ProjectComponent />
        </ProtectedRoute>
      ),
    },
    {
      path: "/home/complaint",
      element: (
        <ProtectedRoute>
          <ComplaintComponent />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
