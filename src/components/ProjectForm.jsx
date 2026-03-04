import React from "react";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ProjectForm = () => {
  const [dept, setDept] = React.useState("");
  const [project, setProject] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [addState, setAddState] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [name, setName] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const handleForm = async () => {
    console.log(dept, project, location, desc, addState, date);
    setDept("");
    setProject("");
    setLocation("");
    setAddState("");
    setDesc("");
    setDate(null);

    const q = await axios.post("http://localhost:5000/project", {
      name: name,
      type: project,
      dept_name: dept,
      description: desc,
      state: addState,
      city: location,
    });

    console.log(q);

    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Stack
      gap={2}
      width={450}
      alignContent={"center"}
      textAlign={"center"}
      className="addForm"
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width="100%"
        mb={2}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
          Add New Project
        </Typography>
        <FontAwesomeIcon
          icon={faCircleXmark}
          size="2x"
          color="red"
          className="xMark"
          onClick={handleClose}
          style={{ cursor: "pointer" }}
        />
      </Box>

      <TextField
        id="filled-basic"
        label="Department Name"
        variant="filled"
        value={dept}
        onChange={(e) => setDept(e.target.value)}
        required
      />
      <TextField
        id="filled-basic"
        label="Project Name"
        variant="filled"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextField
        id="filled-basic"
        label="Project Type"
        variant="filled"
        value={project}
        onChange={(e) => setProject(e.target.value)}
        required
      />
      <TextField
        id="filled-multiline-flexible"
        label="Project Description"
        multiline
        maxRows={4}
        variant="filled"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <TextField
        id="filled-basic"
        label="State"
        variant="filled"
        value={addState}
        onChange={(e) => setAddState(e.target.value)}
        required
      />
      <TextField
        id="filled-basic"
        label="City"
        variant="filled"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />

      <Button
        variant="contained"
        className="addFormButton"
        sx={{ backgroundColor: "#6b46a6" }}
        onClick={handleForm}
      >
        ADD
      </Button>
    </Stack>
  );
};

export default ProjectForm;
