import React from "react";

import DashboardCard from "./DashboradCard";
// import {
//   faCircleArrowRight,
//   faCircleArrowLeft,
// } from "@fortawesome/free-solid-svg-icons";

// import viewproject from "../assets/view_project.png"; // Assuming assets are in src/assets
// import contactImage from "../assets/contacts.jpg";

// import registrationImage from "../assets/registration.jpg";

export default function DashboardComponent() {
  return (
    <div className="bg-[#F8F9FA] h-[125vh] w-full p-5">
      <div className="bg-[#F8F9FA] h-[118vh] w-full px-45 py-10">
        <div className="border-b border-black pb-10">
          <p className=" text-left text-5xl font-extrabold mb-15 font-sans">
            NEXURB
          </p>
          <p className=" text-left text-7xl font-extrabold font-sans">
            INVENTORY IN LINE,
          </p>
          <p className=" text-left text-7xl font-extrabold font-sans">
            PROJECTS ON TIME.
          </p>
        </div>
        <DashboardCard />
      </div>
    </div>
  );
}
