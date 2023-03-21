import React, {useState, useEffect} from "react";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridToolbarQuickFilter,
  GridLogicOperator,
} from "@mui/x-data-grid";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


import movements from "../data/movements.json";

import {
  Modal,
  Button,
  TextField,
} from "@mui/material";

import axios from 'axios'
import Alert from "@mui/material/Alert";

function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 0.5,
        pb: 0,
      }}
    >
      <GridToolbarQuickFilter
        quickFilterParser={(searchInput) =>
          searchInput
            .split(",")
            .map((value) => value.trim())
            .filter((value) => value !== "")
        }
      />
    </Box>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const VISIBLE_FIELDS = ["name", "rating", "country", "dateCreated", "isAdmin"];

export default function LogMovements() {

  const [modalInsertar, setModalInsertar] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const baseUrl = "https://pokeapi.co/api/v2/pokemon/ditto";
  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const [formData, getFormData] = useState({
    id: Math.random(),
    start_date: "",
    enddate: "",
  });

  const peticionPost = async () => {
    let formatAllData = [...data, formData];
       console.log(formatAllData, formData)
    setData(formatAllData);
    abrirCerrarModalInsertar();

    await axios
      .post(baseUrl, formData)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
      })
      .catch((error) => alert(error.message));
  };
  let columns = [
    { field: "user", headerName: "User" },
    { field: "start_date", headerName: "Start Date" },
    { field: "enddate", headerName: "End Date" },
  ];


  useEffect(() => {
    setData(movements);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    getFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  };


  const bodyInsertar = (
    <div style={{ width: "100%" }}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        name="start_date"
        className="inputMaterial"
        label="Start Date"
        onChange={date => handleChange({ target: { value: date, name: 'start_date' } })}
        style={{ width: "100%" }}
      />
      <br /> <br />
      <DatePicker
        name="enddate"
        className="inputMaterial"
        label="End Date"
        onChange={date => handleChange({ target: { value: date, name: 'enddate' } })}
        style={{ width: "100%" }}
      />
      <br /> <br />
      </LocalizationProvider>
      <TextField
        name="user"
        className="inputMaterial"
        label="User"
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <br /> <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPost()}>
          Insertar
        </Button>
        <Button onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
      </div>
    </div>
  );

  return (
    <div>
            <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          {error !== false ? (
            <Alert severity="error">There was an error! Check this out</Alert>
          ) : null}

          <h2 id="child-modal-title">Register Equipment Movement</h2>
          {bodyInsertar}
        </Box>
      </Modal>
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button> <br/><br/>
    <Box sx={{ height: 400, width: 1 }}>
      
      <DataGrid
        rows={data}
        columns={columns}
        slots={{ toolbar: QuickSearchToolbar }}
      />
    </Box>

    </div>
  );
}
