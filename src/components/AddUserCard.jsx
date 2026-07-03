import { PlusCircleIcon } from "@phosphor-icons/react";
import React from "react";

const AddNewUserToDepartmentCard = ({ props, onAdd }) => {
  return (
    <div className="grid grid-cols-[1fr_1fr_80px] gap-4 items-center px-6 py-3 border-b border-[#F1EEF8] last:border-b-0 hover:bg-[#F8F6FC] transition">
      <p className="text-sm font-medium text-[#211C2B] truncate">
        {props.name}
      </p>
      <p className="text-sm text-[#7A7188] truncate">{props.email}</p>
      <div className="flex justify-end">
        <button
          onClick={() => onAdd(props.user_id)}
          className="text-[#6b46a6] hover:text-[#5a3a8c] transition"
          aria-label={`Add ${props.name} to department`}
        >
          <PlusCircleIcon size={26} weight="thin" />
        </button>
      </div>
    </div>
  );
};

export default AddNewUserToDepartmentCard;
