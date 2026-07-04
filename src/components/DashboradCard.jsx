import {
  AddressBookTabsIcon,
  CameraPlusIcon,
  ClipboardTextIcon,
  DotsNineIcon,
} from "@phosphor-icons/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const DashboardCard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      key: "projects",
      iconBg: "bg-blue-50",
      icon: <ClipboardTextIcon size={44} color="#3d49c7" />,
      title: "PROJECTS",
      description:
        "Track milestones, deliverables, and timeline compliance across all urban developments.",
      cta: "View Projects",
      ctaClass: "bg-blue-50",
      cardClass: "bg-white",
      path: "/home/project",
    },
    {
      key: "directory",
      iconBg: "bg-green-50",
      icon: <AddressBookTabsIcon size={44} color="#14870c" />,
      title: "ORGANISATION DIRECTORY",
      description:
        "Centralized access to independent organizations and inter-agency stakeholders.",
      cta: "Open Directory",
      ctaClass: "bg-green-50",
      cardClass: "bg-white",
      path: "/home/contacts",
    },
    {
      key: "complaint",
      iconBg: "bg-orange-50",
      icon: <CameraPlusIcon size={44} color="#d86e18" />,
      title: "LODGE COMPLAINT",
      description:
        "Directly report infrastructure issues or service disruptions to the relevant organization with photo evidence.",
      cta: "File Complaint",
      ctaClass: "bg-orange-50",
      cardClass: "bg-white",
      path: "/home/complaint",
    },
    {
      key: "registration",
      iconBg: "bg-gray-500",
      icon: <DotsNineIcon size={44} color="#fefbfb" weight="bold" />,
      title: "REGISTRATION",
      description:
        "Complete your organisation onboarding to unlock full access to executive tools and cross-agency reporting.",
      cta: "Register Now",
      ctaClass: "bg-white text-black",
      cardClass: "bg-black text-white justify-center",
      path: "/home/register",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-6 py-10 auto-rows-fr">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`${card.cardClass} w-full rounded-2xl p-5 flex flex-col hover:shadow-xl`}
        >
          <div
            className={`${card.iconBg} w-20 h-20 flex justify-center items-center rounded mb-5`}
          >
            {card.icon}
          </div>
          <p className="font-extrabold text-2xl text-left">{card.title}</p>
          <p className="mt-3.5 font-light text-left text-xl">
            {card.description}
          </p>
          <button
            className={`${card.ctaClass} uppercase active:scale-95 mt-7.5 p-2.5 rounded self-start`}
            onClick={() => navigate(card.path)}
          >
            {card.cta}
          </button>
        </div>
      ))}
    </div>
  );
};

export default DashboardCard;
