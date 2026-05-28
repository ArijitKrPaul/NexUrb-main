import { InputLabel, MenuItem, Select } from "@mui/material";
import { PlusCircleIcon } from "@phosphor-icons/react";
import React from "react";

const AddNewUserToDepartmentCard = (props) => {
  return (
    <div className="columns-3 gap-5 h-15 bg-[#f8f9fab6] rounded-2xl justify-between items-center p-2.5 mb-3">
      <p className="font-bold text-xl">{props.props.name}</p>

      <p className="font-bold text-xl mr-20">{props.props.email}</p>

      <PlusCircleIcon
        size={30}
        weight="thin"
        className="ml-20 pt-1.5 cursor-pointer"
        onClick={() => props.onAdd(props.props.user_id)}
      />
    </div>
  );
};

export default AddNewUserToDepartmentCard;
