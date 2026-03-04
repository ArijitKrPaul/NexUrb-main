import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import LoginComponent from "../src/components/login.jsx";
import DashboardComponent from "../src/components/dashboard.jsx";
import RegistrationComponent from "../src/components/registration.jsx";
import DepartmentsPage from "../src/components/contacts.jsx";
import AdminComponent from "./components/superAdmin.jsx";
import InventoryComponent from "./components/inventory.jsx";
import ProjectComponent from "./components/project.jsx";
import HomeComponent from "./components/home.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
