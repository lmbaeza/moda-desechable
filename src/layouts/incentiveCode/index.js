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

import { Link, Navigate } from "react-router-dom";
import { useState } from "react";

// @mui material components
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import MDAlert from "components/MDAlert";
import MDSnackbar from "components/MDSnackbar";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import { Password } from "@mui/icons-material";

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
  // const userJson = JSON.parse(user);

  const changeCode = (e) => {
    setCode(e.target.value);
    console.log(code);
    option = !option;
  };

  const renderSuccessSB = (
    <MDSnackbar
      color="success"
      icon="check"
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
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
      title="Material Dashboard"
      content="Hello, world! This is a notification message"
      dateTime="11 mins ago"
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const validator = (event) => {
    if(code === undefined || code.length % 2 == 0) {
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
                  Inserte su Codigo de Incentivo
                </MDTypography>
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
    </ DashboardLayout>
  );
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
