import React from "react";

const ProjectCard = (props) => {
  console.log(props.data);

  return (
    <div className="h-75 w-[75vh] bg-white rounded-2xl p-2.5 hover:bg-blue-100">
      <h1 className="text-black font-bold text-4xl mb-2">{props.data.Name}</h1>
      <p className="font-bold mb-2.5">{props.data.type}</p>
      <p className="text-2xl mb-2">Undertaken by:{props.data.dept_name}</p>
      <p className="flex px-5 text-xl">Date:26/07/26</p>
      <p className="text mt-2 mb-4.5">{props.data.description}</p>
      <div className="flex justify-between px-5">
        <p className="text-xl">State:{props.data.state}</p>
        <p className="text-xl">City:{props.data.city}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
