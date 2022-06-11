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
import { Link /* , useNavigate */, Navigate, useNavigate } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
// import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
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

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

import axios from "axios";
import sha256 from "js-sha256";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
// import { Password } from "@mui/icons-material";

import { HOST_BACKEND } from "../../../config";

function Basic() {
  // const [rememberMe, setRememberMe] = useState(false);
  // const navigate = useNavigate();

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

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  let navigate = useNavigate();

  // const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const getUser = async () => {
    const HOST = `${HOST_BACKEND}/user/${username}`;
    console.log(HOST);
    const { data } = await axios.get(HOST);
    const passwordSha256 = await sha256(password).toString();
    if (data.password === passwordSha256) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate('/dashboard');
    }
  };

  const handleKeyPress = async (e) => {
    if (e.key === "Enter") {
      await getUser();
    }
  };

  return (
    <BasicLayout image={bgImage}>
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
            Sign in {username}
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                fullWidth
                onChange={changeUsername}
                onKeyPress={handleKeyPress}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                fullWidth
                onChange={changePassword}
                onKeyPress={handleKeyPress}
              />
            </MDBox>
            {/* <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox> */}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={getUser}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
