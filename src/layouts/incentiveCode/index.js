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

// import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React example components
// import axios from "axios";

import { Navigate } from "react-router-dom";
import { useState } from "react";

// @mui material components
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import MDSnackbar from "components/MDSnackbar";

import { HOST_BACKEND } from "../../config";
import axios from "axios";

import "./IncentiveCode.css";

// Authentication layout components

function IncentiveCode() {
  const [code, setCode] = useState();

  const [successSB, setSuccessSB] = useState(false);
  const [errorSB, setErrorSB] = useState(false);

  const openSuccessSB = () => setSuccessSB(true);
  const closeSuccessSB = () => setSuccessSB(false);
  const openErrorSB = () => setErrorSB(true);
  const closeErrorSB = () => setErrorSB(false);
  var option = true;

  const user = localStorage.getItem("user");
  console.log(user);
  if (user === null) {
    return <Navigate replace to="/authentication/sign-in" />;
  }
  var userJson = JSON.parse(user);

  const changeCode = (e) => {
    setCode(e.target.value);
    console.log(code);
    option = !option;
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Codigo Validado"
      content="El codigó se cargó satisfactoriamente"
      dateTime="less than 1 min"
      open={successSB}
      onClose={closeSuccessSB}
      close={closeSuccessSB}
      bgWhite
    />
  );

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title={`Codigo Incorrecto`}
      content="El codigo ingresado es incorrecto o ya expiró"
      dateTime="less than 1 min"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const validator = async (event) => {
    if(typeof code == 'undefined' || code == null || code.length == 0) return;

    const decryptCode = DEC(code);
    const codes = decryptCode.split("-");
    
    const codeHash = codes[0];
    const peso = codes[1];
    const puntos = codes[2];

    console.log(codes);

    const answer = await axios.get(HOST_BACKEND + "/code/" + codeHash);
    const { data }  = answer;
    
    console.log(answer);

    if(answer.status !== 200 || data === null) {
      openErrorSB();
      return;
    }

    if(!data.used) {
      var incentive = userJson.incentive;
      console.log(incentive);
      incentive.push({
        point: puntos,
        weight: peso
      });

      const userUpdate = { incentive };

      const updateResponse = await axios.put(HOST_BACKEND + "/user/" + userJson._id, userUpdate);
      console.log(updateResponse);
      if(updateResponse.status !== 200 || updateResponse.data === null) {
        openErrorSB();
        return;
      }
      const updateCodeResponse = await axios.put(HOST_BACKEND + "/code/" + data._id, { used: true });
      console.log(updateResponse);
      if(updateCodeResponse.status !== 200 || updateCodeResponse.data === null) {
        openErrorSB();
        return;
      }
      openSuccessSB();
    } else {
      openErrorSB();
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={18} lg={8}>
            <Card>
              <MDBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Ingrese su código de incentivo
                </MDTypography>
                <img src="/img/planet-earth.png" width="18%" height="18%" />
              </MDBox>
              <MDBox pt={4} pb={3} px={3}>
                <MDBox component="form" role="form">
                  <MDBox mb={2}>
                    <MDInput type="text" label="Codigo" fullWidth onChange={changeCode} />
                  </MDBox>
                  <MDBox mt={4} mb={1}>
                    <MDButton variant="gradient" color="info" onClick={validator} fullWidth>
                      Validar Codigo
                    </MDButton>
                    {renderSuccessSB} {renderErrorSB}
                  </MDBox>
                </MDBox>
              </MDBox>
            </Card>
          </ Grid>
        </ Grid>
      </ MDBox>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </ DashboardLayout>
  );
}

const secret = 33;

function ENC(str) {
  var encrypt = '';
  for(let i = 0; i < str.length; i += 1) {
    let ascii = str.charCodeAt(i);
    ascii = ascii + secret;
    encrypt = encrypt + String.fromCharCode(ascii);
  }
  return encrypt;
}

function DEC(encrypt) {
  var decrypt = '';
  for(let i = 0; i < encrypt.length; i += 1) {
    let ascii = encrypt.charCodeAt(i);
    ascii = ascii - secret;
    decrypt = decrypt + String.fromCharCode(ascii);
  }
  return decrypt;
}

export default IncentiveCode;

/*
MDBox p={2}>
<Grid container spacing={3}>
  <Grid item xs={12} sm={6} lg={3}>
    <MDButton variant="gradient" color="success" onClick={openSuccessSB} fullWidth>
      success notification
    </MDButton>
    {renderSuccessSB}
  </Grid>
 */
