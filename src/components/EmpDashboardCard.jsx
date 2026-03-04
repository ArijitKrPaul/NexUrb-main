import {
  AddressBookTabsIcon,
  ArchiveBoxIcon,
  ArchiveIcon,
  CameraPlusIcon,
  ClipboardTextIcon,
  DotsNineIcon,
} from "@phosphor-icons/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const EmpDashboardCard = () => {
  const navigate = useNavigate();

  const project = () => {
    navigate("/home/project");
  };
  const contact = () => {
    navigate("/home/contacts");
  };

  const inventory = () => {
    navigate("/Edashboard/empinventory");
  };

  return (
    <div className="grid grid-cols-2 gap-6 py-10 auto-rows-fr">
      <div className="bg-white w-full rounded-2xl p-5 hover:shadow-xl ">
        <div className="bg-blue-50 p-1.5 w-15 flex justify-center rounded h-20 items-center mb-5 ">
          <ClipboardTextIcon size={44} color="#3d49c7 " />
        </div>
        <p className="font-extrabold text-2xl text-left">PROJECTS</p>
        <p className="mt-3.5 font-light text-left text-xl">
          Track milestones, deliverables, and timeline compliance across all
          urban developments.
        </p>
        <button
          className="uppercase active:scale-95 mt-7.5 p-2.5 bg-blue-50 rounded"
          onClick={project}
        >
          View Projects{" "}
        </button>
      </div>
      <div className="bg-white  w-full rounded-2xl p-5 hover:shadow-xl">
        <div className="bg-green-50 p-1.5 w-15 flex justify-center rounded h-20 items-center mb-5">
          <AddressBookTabsIcon size={44} color="#14870c" />
        </div>
        <p className="font-extrabold text-2xl text-left">
          ORGANISATION DIRECTORY
        </p>
        <p className="mt-3.5 font-light text-left text-xl">
          Centralized access to independent organizations and inter-agency
          stakeholders.
        </p>
        <button
          className="uppercase active:scale-95 mt-7.5 p-2.5 bg-green-50 rounded "
          onClick={contact}
        >
          open directory{" "}
        </button>
      </div>

      <div className="bg-black text-white  w-full rounded-2xl p-5 flex flex-col justify-center hover:shadow-xl/30">
        <div className="bg-gray-500 p-1.5 w-15 flex justify-center rounded h-20 items-center mb-5">
          <ArchiveIcon size={44} color="#fefbfb" weight="bold" />
        </div>
        <p className="font-extrabold text-2xl text-left">INVENTORY</p>
        <p className="mt-3.5 font-light text-left text-xl">
          Monitor and manage urban infrastructure assets, stock levels, and
          equipment distribution.
        </p>
        <button
          className="uppercase active:scale-95 mt-7.5 p-2.5 bg-white text-black
             rounded"
          onClick={inventory}
        >
          Manage Assets
        </button>
      </div>
    </div>
  );
};

export default EmpDashboardCard;
