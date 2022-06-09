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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import CardBlog from "examples/Cards/BlogCards/SimpleBlogCard";
import axios from "axios";

import { useParams, Navigate } from "react-router-dom";
import { useEffect } from "react";

import { HOST_BACKEND } from "../../config";

function Notifications() {
  const { IDIncentive } = useParams();
  const user = localStorage.getItem("user");
  console.log(user);
  if (user === null) {
    return <Navigate replace to="/authentication/sign-in" />;
  }
  const userJson = JSON.parse(user);
  const incentiveID = IDIncentive;

  let incentiveObj;

  for (let i = 0; i < userJson.incentive.length; i += 1) {
    if (userJson.incentive[i]._id === IDIncentive) {
      incentiveObj = userJson.incentive[i];
    }
  }

  let QR;
  let img = "/img/ok.png";
  let title = "Se Redimió Satisfactoriamente";
  let description = (
    <>
      El codigó de Incentivo con <code>56</code> Puntos se Redimió Correctamente
    </>
  );

  if (incentiveObj === undefined) {
    img = "/img/error.png";
    title = "NO Se Redimió Satisfactoriamente";
    description = <>El codigó de Incentivo NO se Redimió Correctamente</>;
  } else {
    description = (
      <>
        El codigó de Incentivo con <code>{incentiveObj.point}</code> Puntos se Redimió Correctamente
      </>
    );
    QR = incentiveObj.qr;
  }

  useEffect(async () => {
    const userID = userJson._id;
    const HOST = `${HOST_BACKEND}/user/${userID}/incentive/${incentiveID}`;
    const { data } = await axios.get(HOST);
    if (data.status !== "OK") {
      img = "/img/error.png";
      title = "NO Se Redimió Satisfactoriamente";
      description = <>El codigó de Incentivo NO se Redimió Correctamente</>;
    }
  });
  return (
    <DashboardLayout>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={18} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography align="center" variant="h5">
                  Codigo de Incentivo
                </MDTypography>
              </MDBox>
              <MDBox pt={4} px={4}>
                <CardBlog
                  image={img}
                  title={title}
                  qr={QR}
                  description={description}
                  justifyContent="center"
                  action={{
                    color: "success",
                    label: "Ir al Inicio",
                    route: "/dashboard",
                  }}
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Notifications;
