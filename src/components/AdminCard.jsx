import React from "react";

const AdminCard = (props) => {
  console.log(props.e);

  return (
    <div className=" h-[25vh] w-[25vw] p-2.5 bg-[#f9fafa] border border-gray-300 flex flex-col gap-1.5 rounded-xl">
      <div>
        <p>
          <b>Name:</b>
          {props.e.dept_name}
        </p>
        <p>
          <b>State:</b>
          {props.e.state}
        </p>
        <p>
          <b>City</b>:{props.e.city}
        </p>
        <p>
          <b>location:</b> {props.e.location}
        </p>
      </div>
      <div className="flex justify-center gap-5 ">
        <button
          className="bg-green-500 p-2.5 rounded-xl active:scale-95"
          onClick={() =>
            props.onAccept(
              props.e.id,
              props.e.dept_name,
              props.e.state,
              props.e.city,
              props.e.location,
            )
          }
        >
          Accept
        </button>
        <button
          className="bg-red-500 p-2.5 rounded-xl active:scale-95"
          onClick={() => props.onDecline(props.e.id)}
        >
          Decline
        </button>
      </div>
    </div>
  );
};

export default AdminCard;
