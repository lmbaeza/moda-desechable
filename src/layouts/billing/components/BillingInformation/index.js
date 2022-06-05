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
import axios from "axios";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Billing page components
import Bill from "layouts/billing/components/Bill";
import { Navigate } from "react-router-dom";
import { HOST_BACKEND } from "../../../../config";

function BillingInformation() {
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

  console.log(userJson);

  const historyFilter = userJson.incentive.filter((value) => !value.redeemed);

  console.log(historyFilter);

  const history = historyFilter.map((value) => (
    <Bill
      name="15/May/2022"
      peso={`${value.weight} Gr`}
      puntos={`+ ${value.point}`}
      qr={value.qr}
      idContenedor="Contenedor UNAL 0001"
    />
  ));

  return (
    <Card id="delete-account">
      <MDBox pt={3} px={2}>
        <MDTypography variant="h6" fontWeight="medium">
          Información de las Donaciones
        </MDTypography>
      </MDBox>
      <MDBox pt={1} pb={2} px={2}>
        <MDBox component="ul" display="flex" flexDirection="column" p={0} m={0}>
          {history}
          {/*
          <Bill
            name="15/May/2022"
            peso="234 Gr"
            puntos="+ 75"
            idContenedor="Contenedor ACD123 UNAL"
          />
          <Bill
            name="14/May/2022"
            peso="20 Gr"
            puntos="+ 22"
            idContenedor="Contenedor ACD123 UNAL"
          />
          <Bill
            name="13/May/2022"
            peso="35 Gr"
            puntos="+ 30"
            idContenedor="Contenedor ACD123 UNAL"
            noGutter
          />
          */}
        </MDBox>
      </MDBox>
    </Card>
  );
}

export default BillingInformation;
