import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../css/inventory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTrash,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  Stack,
  Backdrop,
  Typography,
  Button,
  Toolbar,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function InventoryComponent() {
  const [open, setOpen] = React.useState(false);
  const [quantity, setQuantity] = React.useState(0);
  const [open1, setOpen1] = React.useState(false);
  const [name, setName] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [price, setPrice] = React.useState(0);
  const [open2, setOpen2] = React.useState(false);
  const [del, setDel] = React.useState("");
  const errorp = document.getElementsByTagName("p")[3];
  const [rows, setRows] = React.useState([]);
  const [rowId, setRowId] = React.useState();
  const [count, setCount] = React.useState(0);
  const [unit, setUnit] = React.useState("");

  const handleOpen = (e) => {
    setOpen(true);
    setRowId(e);
  };

  React.useEffect(
    function () {
      const user = JSON.parse(localStorage.getItem("user"));
      const dept_id = user.dept_id;
      const fetchData = async () => {
        try {
          const q = await axios.get(`http://localhost:5000/product/${dept_id}`);
          console.log(q.data);
          const withId = q.data.map((elem, index) => ({
            ...elem,
            id: elem.product_id,
            displayId: index + 1,
          }));
          console.log(withId);
          setRows(withId);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    },
    [count],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(unit);
    try {
      const user = localStorage.getItem("user");
      const dept_id = JSON.parse(user).dept_id;
      const q = await axios.post("http://localhost:5000/addItem", {
        dept_id: dept_id,
        name: name,
        quantity: amount,
        price: price,
        unit: unit,
      });
      console.log(q);
    } catch (error) {
      console.log(error);
    }
    console.log(quantity);
    setQuantity();
    setOpen(false);
    setOpen1(false);
    setCount(count + 1);
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const user = localStorage.getItem("user");
      const dept_id = JSON.parse(user).dept_id;
      const q = await axios.put("http://localhost:5000/updateItem", {
        product_id: rowId,
        quantity: quantity,
        dept_id: dept_id,
      });
      console.log(q);
    } catch (error) {
      console.log(error);
    }
    setQuantity();
    setOpen(false);
    setOpen1(false);
    setCount(count + 1);
  };

  const handleAdd = () => {
    setOpen1(true);
    setName("");
    setAmount(0);
    setPrice(0);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setDel("");
    setOpen2(false);
    errorp.classList.remove("error");
  };

  const handleDelete = (e) => {
    console.log(e);
    setOpen2(true);
    setRowId(e);
    errorp.classList.remove("error");
    errorp.innerText = "";
  };

  const handleDelSubmit = async () => {
    if (del === "Permanentlydelete") {
      const user = localStorage.getItem("user");
      const dept_id = JSON.parse(user).dept_id;
      try {
        const q = await axios.delete("http://localhost:5000/deleteItem", {
          data: {
            product_id: rowId,
            dept_id: dept_id,
          },
        });
        setRows((prev) => prev.filter((row) => row.id !== rowId));
        console.log(q.data);
      } catch (error) {
        console.log(error);
      }
      setOpen2(false);
      setDel("");
    } else {
      errorp.innerText = "Wrong Text!";
      errorp.classList.add("error");
    }
  };

  const columns = [
    {
      field: "displayId",
      headerName: "ID",
      width: 150,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: "Item name",
      width: 200,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "unit",
      headerName: "Unit",
      type: "text",
      width: 150,
      editable: true,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "addicon",
      headerName: "",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="2x"
          color="grey"
          className="Icon"
          onClick={() => handleOpen(params.row.product_id)}
        />
      ),
    },
    {
      field: "trashicon",
      headerName: "",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <FontAwesomeIcon
          icon={faTrash}
          size="2x"
          color="grey"
          className="Icon"
          onClick={() => handleDelete(params.row.product_id)}
        />
      ),
    },
  ];
  return (
    <div>
      <Toolbar id="ProjectNavbar">
        <p>NexUrb</p>
        <FontAwesomeIcon
          icon={faCirclePlus}
          size="1x"
          id="addButton"
          onClick={handleAdd}
        />
      </Toolbar>
      <div className="inventory-container">
        <DataGrid
          id="inventory-table"
          rows={rows}
          columns={columns}
          pageSize={10}
          pageSizeOptions={[10, 15]}
        />
      </div>
      <Backdrop
        sx={(theme) => ({ color: "black", zIndex: theme.zIndex.drawer + 1 })}
        open={open}
      >
        <Stack
          id="updateItem"
          gap={2}
          width={450}
          alignContent={"center"}
          textAlign={"center"}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
              Update Quantity
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
            label="Enter new Quantity"
            variant="filled"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <Button className="inventory-form-button" onClick={handleUpdate}>
            Submit
          </Button>
        </Stack>
      </Backdrop>
      <Backdrop
        sx={(theme) => ({ color: "black", zIndex: theme.zIndex.drawer + 1 })}
        open={open1}
      >
        <Stack
          id="updateItem"
          gap={2}
          width={450}
          alignContent={"center"}
          textAlign={"center"}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
              Add New Item
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
            label="Enter Item Name"
            variant="filled"
            type="text"
            value={name}
            required
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Enter Amount"
            variant="filled"
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            id="filled-basic"
            label="Price per Item"
            variant="filled"
            type="number"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Unit</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={unit}
              label="Choose Unit"
              onChange={(e) => setUnit(e.target.value)}
            >
              <MenuItem value={"per kg"}>Per Kg</MenuItem>
              <MenuItem value={"per ton"}>Per Ton</MenuItem>
              <MenuItem value={"per quintol"}>Per Quintal</MenuItem>
            </Select>
          </FormControl>
          <Button className="inventory-form-button" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Backdrop>
      <Backdrop
        sx={(theme) => ({ color: "black", zIndex: theme.zIndex.drawer + 1 })}
        open={open2}
      >
        <Stack
          id="DelItem"
          gap={2}
          width={450}
          alignContent={"center"}
          textAlign={"center"}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            mb={2}
          >
            <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "left" }}>
              Delete Item
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
          <p>Do you want to permanently delete this item?</p>
          <TextField
            id="filled-basic"
            label="Enter 'Permanentlydelete'"
            variant="filled"
            type="text"
            value={del}
            onChange={(e) => setDel(e.target.value)}
          />
          <p></p>
          <Button className="inventory-form-button" onClick={handleDelSubmit}>
            Submit
          </Button>
        </Stack>
      </Backdrop>
    </div>
  );
}
