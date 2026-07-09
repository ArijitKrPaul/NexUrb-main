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
  FormHelperText,
  Select,
  MenuItem,
  InputLabel,
  Alert,
  Tooltip,
  IconButton,
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
  const [addPermission, setAddPermission] = React.useState(false);
  const [updatePermission, setUpdatePermission] = React.useState(false);
  const [deletePermission, setDeletePermission] = React.useState(false);

  // ----- validation state -----
  const [nameError, setNameError] = React.useState("");
  const [amountError, setAmountError] = React.useState("");
  const [priceError, setPriceError] = React.useState("");
  const [unitError, setUnitError] = React.useState("");
  const [quantityError, setQuantityError] = React.useState("");

  const clearAddErrors = () => {
    setNameError("");
    setAmountError("");
    setPriceError("");
    setUnitError("");
  };

  const handleOpen = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role == "Inventory Manager") {
      setOpen(true);
      setRowId(e);
      setQuantity(0);
      setQuantityError("");
    } else {
      setUpdatePermission(true);
      setTimeout(() => {
        setUpdatePermission(false);
      }, 2000);
    }
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

  // ----- validators -----
  const validateAddForm = () => {
    let valid = true;

    if (!name || !name.trim()) {
      setNameError("Item name is required");
      valid = false;
    } else {
      setNameError("");
    }

    const amountNum = Number(amount);
    if (amount === "" || amount === null || isNaN(amountNum)) {
      setAmountError("Quantity is required");
      valid = false;
    } else if (amountNum <= 0) {
      setAmountError("Quantity must be greater than 0");
      valid = false;
    } else {
      setAmountError("");
    }

    const priceNum = Number(price);
    if (price === "" || price === null || isNaN(priceNum)) {
      setPriceError("Price is required");
      valid = false;
    } else if (priceNum <= 0) {
      setPriceError("Price must be greater than 0");
      valid = false;
    } else {
      setPriceError("");
    }

    if (!unit) {
      setUnitError("Please choose a unit");
      valid = false;
    } else {
      setUnitError("");
    }

    return valid;
  };

  const validateQuantity = () => {
    const qtyNum = Number(quantity);
    if (quantity === "" || quantity === null || isNaN(qtyNum)) {
      setQuantityError("Quantity is required");
      return false;
    }
    if (qtyNum < 0) {
      setQuantityError("Quantity cannot be negative");
      return false;
    }
    setQuantityError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateAddForm()) {
      return;
    }

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
    setQuantity(0);
    setOpen(false);
    setOpen1(false);
    setCount(count + 1);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!validateQuantity()) {
      return;
    }

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
    setQuantity(0);
    setOpen(false);
    setOpen1(false);
    setCount(count + 1);
  };

  const handleAdd = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role == "Inventory Manager") {
      setOpen1(true);
      setName("");
      setAmount("");
      setPrice("");
      setUnit(""); // <-- this was missing, causing the dropdown to look "stuck"
      clearAddErrors();
    } else {
      setAddPermission(true);
      setTimeout(() => {
        setAddPermission(false);
      }, 2000);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setDel("");
    setOpen2(false);
    setQuantityError("");
    clearAddErrors();
    if (errorp) errorp.classList.remove("error");
  };

  const handleDelete = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.role == "Inventory Manager") {
      console.log(e);
      setOpen2(true);
      setRowId(e);
      if (errorp) {
        errorp.classList.remove("error");
        errorp.innerText = "";
      }
    } else {
      setDeletePermission(true);
      setTimeout(() => {
        setDeletePermission(false);
      }, 2000);
    }
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
      if (errorp) {
        errorp.innerText = "Wrong Text!";
        errorp.classList.add("error");
      }
    }
  };

  const columns = [
    {
      field: "displayId",
      headerName: "Ref. No.",
      width: 130,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Typography
          sx={{
            fontFamily: "'IBM Plex Mono', monospace",
            fontSize: "13px",
            color: "#7A7188",
          }}
        >
          INV-{String(params.value).padStart(4, "0")}
        </Typography>
      ),
    },
    {
      field: "name",
      headerName: "Item name",
      width: 220,
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
      width: 90,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Update stock">
          <IconButton
            size="small"
            className="Icon"
            onClick={() => handleOpen(params.row.product_id)}
            sx={{
              color: "#B7ADC9",
              "&:hover": { color: "#6b46a6", backgroundColor: "#F1EAFB" },
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} size="sm" />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: "trashicon",
      headerName: "",
      width: 90,
      align: "center",
      headerAlign: "center",
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Tooltip title="Delete item">
          <IconButton
            size="small"
            className="Icon"
            onClick={() => handleDelete(params.row.product_id)}
            sx={{
              color: "#B7ADC9",
              "&:hover": { color: "#C0392B", backgroundColor: "#FDEDEC" },
            }}
          >
            <FontAwesomeIcon icon={faTrash} size="sm" />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  return (
    <div>
      {/* ---------- Header ---------- */}
      <Toolbar
        id="ProjectNavbar"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: { xs: 2, sm: 4 },
          py: 2,
          borderBottom: "1px solid #E4DFEE",
          backgroundColor: "#FFFFFF",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontFamily: "'IBM Plex Mono', monospace",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "2.5px",
              color: "#6b46a6",
              mb: "2px",
            }}
          >
            INVENTORY REGISTRY
          </Typography>
          <Typography
            sx={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontSize: "26px",
              fontWeight: 600,
              color: "#211C2B",
              lineHeight: 1,
            }}
          >
            Nex<span style={{ color: "#6b46a6" }}>Urb</span>
          </Typography>
        </Box>

        <Tooltip title="Add new item">
          <IconButton
            id="addButton"
            onClick={handleAdd}
            sx={{
              border: "1.5px solid #6b46a6",
              borderRadius: "10px",
              px: 2,
              py: 0.75,
              color: "#6b46a6",
              gap: 1,
              "&:hover": { backgroundColor: "#F1EAFB" },
            }}
          >
            <FontAwesomeIcon icon={faCirclePlus} size="sm" />
            <Typography
              component="span"
              sx={{
                fontFamily: "'IBM Plex Sans', sans-serif",
                fontWeight: 600,
                fontSize: "13px",
              }}
            >
              New Item
            </Typography>
          </IconButton>
        </Tooltip>
      </Toolbar>

      <div className="flex justify-center mt-2.5">
        {addPermission && (
          <Alert severity="warning">
            Not sufficient Permission to add items
          </Alert>
        )}
        {updatePermission && (
          <Alert severity="warning">
            Not sufficient Permission to update items
          </Alert>
        )}
        {deletePermission && (
          <Alert severity="warning">
            Not sufficient Permission to delete itmes
          </Alert>
        )}
      </div>

      {/* ---------- Table ---------- */}
      <Box
        className="inventory-container"
        sx={{
          m: { xs: 2, sm: 4 },
          p: 1.5,
          borderRadius: "16px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E4DFEE",
          boxShadow: "0 10px 30px -18px rgba(33,28,43,0.25)",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <DataGrid
          id="inventory-table"
          rows={rows}
          columns={columns}
          pageSize={10}
          pageSizeOptions={[10, 15]}
          getRowClassName={(params) =>
            params.indexRelativeToCurrentPage % 2 === 0 ? "row-even" : "row-odd"
          }
          sx={{
            border: "none",
            fontFamily: "'IBM Plex Sans', sans-serif",
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#F8F6FC",
              borderBottom: "1px solid #E4DFEE",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontFamily: "'IBM Plex Mono', monospace",
              fontWeight: 600,
              fontSize: "11px",
              letterSpacing: "1px",
              color: "#6b46a6",
              textTransform: "uppercase",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "1px solid #F1EEF8",
              fontSize: "14px",
              color: "#211C2B",
            },
            "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
              outline: "none",
            },
            "& .row-even": { backgroundColor: "#FFFFFF" },
            "& .row-odd": { backgroundColor: "#FCFBFE" },
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "#F1EAFB !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "1px solid #E4DFEE",
              fontFamily: "'IBM Plex Sans', sans-serif",
            },
          }}
        />
      </Box>

      {/* Update Quantity modal */}
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
          sx={{ backgroundColor: "white", p: 3, borderRadius: 2 }}
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
            error={!!quantityError}
            helperText={quantityError}
            inputProps={{ min: 0 }}
          />
          <Button className="inventory-form-button" onClick={handleUpdate}>
            Submit
          </Button>
        </Stack>
      </Backdrop>

      {/* Add New Item modal */}
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
          sx={{ backgroundColor: "white", p: 3, borderRadius: 2 }}
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
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            id="filled-basic"
            label="Enter Quantity"
            variant="filled"
            type="number"
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
            error={!!amountError}
            helperText={amountError}
            inputProps={{ min: 0, step: "any" }}
          />
          <TextField
            id="filled-basic"
            label="Price per Unit"
            variant="filled"
            type="number"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
            error={!!priceError}
            helperText={priceError}
            inputProps={{ min: 0, step: "any" }}
          />
          <FormControl fullWidth error={!!unitError} required>
            <InputLabel id="unit-select-label">Choose Unit</InputLabel>
            <Select
              labelId="unit-select-label"
              id="unit-select"
              name="unit"
              value={unit}
              label="Choose Unit"
              onChange={(e) => {
                setUnit(e.target.value);
                setUnitError("");
              }}
            >
              <MenuItem value={"per kg"}>Per Kg</MenuItem>
              <MenuItem value={"per ton"}>Per Ton</MenuItem>
              <MenuItem value={"per quintal"}>Per Quintal</MenuItem>
              <MenuItem value={"per litre"}>Per Litre</MenuItem>
              <MenuItem value={"per metre"}>Per Metre</MenuItem>
              <MenuItem value={"per piece"}>Per Piece</MenuItem>
            </Select>
            {unitError && <FormHelperText>{unitError}</FormHelperText>}
          </FormControl>
          <Button className="inventory-form-button" onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Backdrop>

      {/* Delete Item modal */}
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
          sx={{ backgroundColor: "white", p: 3, borderRadius: 2 }}
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
