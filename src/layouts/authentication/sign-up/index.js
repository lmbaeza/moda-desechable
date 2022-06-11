/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link, Navigate, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import axios from "axios";

import { HOST_BACKEND } from "../../../config"

function Cover() {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const user = localStorage.getItem("user");
  if (user !== null) {
    const userJson = JSON.parse(user);
    if (userJson.role === "USER") {
      return <Navigate replace to="/dashboard" />;
    }
    if (userJson.role === "ADMIN") {
      return <Navigate replace to="/dashboard-admin" />;
    }
    return <Navigate replace to="/dashboard" />;
  }

  let navigate = useNavigate();

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeUserName = (e) => {
    setUserName(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = async () => {
    console.log(firstName);
    console.log(lastName);
    console.log(username);
    console.log(password);

    var userObj = {
      "first_name": firstName,
      "last_name": lastName,
      "id_type": "CC",
      "id": random(0, 1000000000),
      "incentive": [{
        "point": 10,
        "weight": 0
      }],
      "username": username,
      "password": password
    };

    console.log(userObj);

    const response = await axios.post(HOST_BACKEND + "/user", userObj);
    const { data } = response;

    console.log(response);
    console.log(data);

    if(response.status !== 201 || data === null) {
      alert("El usuario no se registró correctamente");
      return;
    }

    navigate('/authentication/sign-in');
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Únete a Nosotros
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Ingresa tu usuario y contraseña
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                variant="standard"
                fullWidth
                onChange={changeFirstName}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Apellido"
                variant="standard"
                fullWidth
                onChange={changeLastName}
              />
            </MDBox>

            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Usuario"
                variant="standard"
                fullWidth
                onChange={changeUserName}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                variant="standard"
                fullWidth
                onChange={changePassword}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={submit}>
                Registrar usuario
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Ya tienes una Cuenta?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

function random(min, max) {
  return parseInt(Math.random() * (max - min) + min)
}

export default Cover;
