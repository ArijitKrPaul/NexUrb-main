import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import "../css/inventory.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Stack, Backdrop, Typography, Button, Toolbar } from "@mui/material";
import TextField from "@mui/material/TextField";
import axios from "axios";

export default function EmployeeInventoryComponent() {
  const [rows, setRows] = React.useState([]);

  React.useEffect(function () {
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
  }, []);

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
      field: "unit",
      headerName: "Unit",
      type: "text",
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
  ];

  return (
    <div>
      <Toolbar id="ProjectNavbar">
        <p>NexUrb</p>
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
    </div>
  );
}
