import { TrashIcon } from "@phosphor-icons/react";
import React from "react";

function ExistingUserCard(props) {
  console.log(props);

  return (
    <div className="flex h-15 bg-[#f8f9fa] rounded-2xl justify-between items-center mb-2.5  p-5">
      <p className="font-bold text-xl">{props.props.name}</p>
      <p className="font-bold text-xl mr-20">{props.props.email}</p>
      <TrashIcon size={24} weight="thin" />
    </div>
  );
}

export default ExistingUserCard;
