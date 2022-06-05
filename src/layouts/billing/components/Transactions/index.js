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

// @mui material components
import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Billing page components
import Transaction from "layouts/billing/components/Transaction";
import { Navigate } from "react-router-dom";
import { HOST_BACKEND } from "../../../../config";

function Transactions() {
  const user = localStorage.getItem("user");
  if (user === null) {
    return <Navigate replace to="/authentication/sign-in" />;
  }

  const userJson = JSON.parse(user);

  const getUser = async () => {
    const { username } = userJson;
    const HOST = `${HOST_BACKEND}/user/${username}`;
    const { data } = await axios.get(HOST);
    localStorage.setItem("user", JSON.stringify(data));
  };

  getUser();

  const history = userJson.incentive.map((value) => {
    if (value.redeemed) {
      return (
        <Transaction
          color="error"
          icon="expand_more"
          name={value.company_redeemed.name}
          description="10 Junio 2022, at 12:30 PM"
          value={`- ${value.point} Puntos`}
        />
      );
    }
    return (
      <Transaction
        color="success"
        icon="expand_more"
        name="Contenedor UNAL 0001"
        description="10 Junio 2022, at 12:30 PM"
        value={`+ ${value.point} Puntos`}
      />
    );
  });

  return (
    <Card sx={{ height: "100%" }}>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium" textTransform="capitalize">
          Información de tus puntos
        </MDTypography>
        <MDBox display="flex" alignItems="flex-start">
          <MDBox color="text" mr={0.5} lineHeight={0}>
            <Icon color="inherit" fontSize="small">
              date_range
            </Icon>
          </MDBox>
          <MDTypography variant="button" color="text" fontWeight="regular">
            01 - 30 Jun 2022
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox pt={3} pb={2} px={2}>
        <MDBox mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Ultima Semana
          </MDTypography>
        </MDBox>
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          {history}
          {/* <Transaction
            color="error"
            icon="expand_more"
            name="H&M"
            description="10 Junio 2022, at 12:30 PM"
            value="- 28 Puntos"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Contenedor UNAL"
            description="27 March 2020, at 04:30 AM"
            value="+ 75 Puntos"
          /> */}
        </MDBox>
        {/*
        <MDBox mt={1} mb={2}>
          <MDTypography variant="caption" color="text" fontWeight="bold" textTransform="uppercase">
            Semana Pasada
          </MDTypography>
        </MDBox>
        
        <MDBox
          component="ul"
          display="flex"
          flexDirection="column"
          p={0}
          m={0}
          sx={{ listStyle: "none" }}
        >
          <Transaction
            color="error"
            icon="expand_more"
            name="H&M"
            description="10 Junio 2022, at 12:30 PM"
            value="- 28 Puntos"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Contenedor UNAL"
            description="27 March 2020, at 04:30 AM"
            value="+ 22 Puntos"
          />
          <Transaction
            color="success"
            icon="expand_less"
            name="Contenedor UNAL"
            description="27 March 2020, at 04:30 AM"
            value="+ 30 Puntos"
          />
        </MDBox>
        */}
      </MDBox>
    </Card>
  );
}

export default Transactions;
