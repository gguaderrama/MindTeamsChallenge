import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import users from "../data/users.json";
import account from "../data/accounts.json";
import {
  Table,
  TableContainer,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Modal,
  Button,
  TextField,
} from "@mui/material";


import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "../style/users.css";

import Box from "@mui/material/Box";

import Alert from "@mui/material/Alert";

const baseUrl = "https://pokeapi.co/api/v2/pokemon/ditto";

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




function ShowUser() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [, updateState] = React.useState();

  const [error, setError] = useState(false);

  const [formData, getFormData] = useState({
    id: Math.random(),
    email: "",
    password: "",
  });

  const handleClick = useCallback(() => {
    updateState({});
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;

    console.log(name, "dvdvdsv");
    getFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(formData);
  };

  const peticionPost = async () => {
    let formatAllData = [...data, formData];

    setData(formatAllData);
    abrirCerrarModalInsertar();

    await axios
      .post(baseUrl, formData)
      .then((response) => {
        setData(data.concat(response.data));
        abrirCerrarModalInsertar();
        setError(false);
      })
      .catch((error) => alert(error.message));
  };
  const peticionPut = async () => {
    data.forEach((element, index) => {
      if (element.id === formData.id) {
        data[index] = formData;
      }
    });
    setData(data);
    handleClick();

    abrirCerrarModalEditar();
    await axios
      .put(baseUrl + formData.id, formData)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((response) => {
          if (formData.id === response.id) {
            response.name = formData.name;
            response.email = formData.email;
            response.password = formData.password;
          }
        });
        // setData(dataNueva);
        abrirCerrarModalEditar();
      })
      .catch((error) => alert(error.message));
    handleClick();

    setData(data);
  };

  const peticionDelete = async () => {
    let filteredArray = data.filter((item) => item.id !== formData.id);
    setData(filteredArray);
    abrirCerrarModalEliminar();

    await axios
      .delete(baseUrl + formData.id)
      .then((response) => {
        setData(data.filter((consola) => consola.id !== formData.id));
        abrirCerrarModalEliminar();
      })
      .catch((error) => alert(error.message));
  };

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  };

  const seleccionarConsola = (consola, caso) => {
    getFormData(consola);
    caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
  };

  //   const peticionGet=async()=>{
  //     await axios.get(baseUrl)
  //     .then(response=>{
  //       setData(response.data);
  //     })
  // }

  useEffect(() => {
    async function petitionGet() {
      let response = await axios.get(baseUrl);
      response = await response.data.forms;
      console.log(response, "responsee");
      setData(account);
    }

    petitionGet();
  }, []);

  const bodyInsertar = (
    <div style={{ width: "100%" }}>
      <TextField
        name="name_account"
        className="inputMaterial"
        label="Name Account"
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <br /> <br />
      <TextField
        name="name_client"
        className="inputMaterial"
        label="Name Client"
        onChange={handleChange}
        style={{ width: "100%" }}
      />
      <br /> <br />
      <TextField
        name="responsible_name"
        className="inputMaterial"
        label="Responsible Name"
        onChange={handleChange}
        style={{ width: "100%" }}
      />
          <br />    <br />
      <TextField
        name="equipment"
        className="inputMaterial"
        label="Equipment"
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

  const bodyEditar = (
    <div className="modal">
      <TextField
        name="name_account"
        className="inputMaterial"
        label="Name"
        onChange={handleChange}
        style={{ width: "100%" }}
        value={formData && formData.name_account}
      />
      <br /> <br />
      <TextField
        style={{ width: "100%" }}
        name="name_client"
        className="inputMaterial"
        label="Email"
        onChange={handleChange}
        value={formData && formData.name_client}
      />
      <br /> <br />
      <TextField
        style={{ width: "100%" }}
        name="responsible_name"
        className="inputMaterial"
        label="Password"
        onChange={handleChange}
        value={formData && formData.responsible_name}
      />
      <br />
      <br />
            <TextField
        style={{ width: "100%" }}
        name="equipment"
        className="inputMaterial"
        label="Equipment"
        onChange={handleChange}
        value={formData && formData.equipment}
      />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  const bodyEliminar = (
    <div className="modal">
      <p>
        Are you sure you want to delete? <b>{formData && formData.name}</b> ?{" "}
      </p>
      <div align="right">
        <Button color="secondary" onClick={() => peticionDelete()}>
          Sí
        </Button>
        <Button onClick={() => abrirCerrarModalEliminar()}>No</Button>
      </div>
    </div>
  );
  return (
    <div className="App">
      <br />
      <div>
        {" "}
        <h3 style={{ textAlign: "center", color: "rgba(0, 0, 0, 0.87)" }}>
          Account Module
        </h3>
      </div>
      <Button onClick={() => abrirCerrarModalInsertar()}>Insertar</Button>
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

          <h2 id="child-modal-title">Register User</h2>
          {bodyInsertar}
        </Box>
      </Modal>

      <br />
      <br />

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name Account</TableCell>
              <TableCell>Name Client</TableCell>
              <TableCell>Responsible</TableCell>
              <TableCell>Equipment</TableCell>
                 <TableCell></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((consola) => (
              <TableRow key={consola.id}>
                <TableCell>{consola.name_account}</TableCell>
                <TableCell>{consola.name_client}</TableCell>
                <TableCell>{consola.responsible_name}</TableCell>
                   <TableCell>{consola.equipment}</TableCell>
                <TableCell>
                  <EditIcon
                    className="iconos"
                    onClick={() => seleccionarConsola(consola, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <DeleteIcon
                    className="iconos"
                    onClick={() => seleccionarConsola(consola, "Eliminar")}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          {error !== false ? (
            <Alert severity="error">There was an error! Check this out</Alert>
          ) : null}

          <h2 id="child-modal-title">Edit User</h2>
          {bodyEditar}
        </Box>
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 500 }}>
          {error !== false ? (
            <Alert severity="error">There was an error! Check this out</Alert>
          ) : null}

          <h2 id="child-modal-title">Delete User</h2>
          {bodyEliminar}
        </Box>
      </Modal>
    </div>
  );
}

export default ShowUser;

