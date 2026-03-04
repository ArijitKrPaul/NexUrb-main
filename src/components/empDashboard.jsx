import React from "react";

// import { useNavigate } from "react-router-dom";
import DashboardCard from "./DashboradCard";
import EmpDashboardCard from "./EmpDashboardCard";

export default function EmployeeDashboardComponent() {
  return (
    <div className="bg-[#F8F9FA] h-[125vh] w-full p-5">
      <div className="bg-[#F8F9FA] h-[118vh] w-full px-45 py-10">
        <div className="border-b border-black pb-10">
          <p className=" text-left text-5xl font-extrabold mb-15 font-sans">
            NEXURB
          </p>
          <p className=" text-left text-7xl font-extrabold font-sans">
            OPERATIONS
          </p>
          <p className=" text-left text-7xl font-extrabold font-sans">
            DASHBOARD.
          </p>
        </div>
        <EmpDashboardCard />
      </div>
    </div>
  );
}
