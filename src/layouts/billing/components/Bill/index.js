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

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

import Switch from "@mui/material/Switch";
import { useState } from "react";

// @mui material components
// import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDButton from "components/MDButton";

// Material Dashboard 2 React context
import { useMaterialUIController } from "context";

function Bill({ name, peso, puntos, idContenedor, qr, noGutter }) {
  const [showQR, setetShowQR] = useState(false);
  const [controller] = useMaterialUIController();
  const { darkMode } = controller;

  const handleSetShowQR = () => setetShowQR(!showQR);

  let QRCode;
  if (showQR) {
    QRCode = (
      <MDBox
        display="flex"
        justifyContent="center"
        alignItems={{ xs: "flex-start", sm: "center" }}
        flexDirection={{ xs: "column", sm: "row" }}
        mb={2}
      >
        <MDBox mb={2} lineHeight={0}>
          <img width={128} height={128} src={qr} alt="Qr Code" />
        </MDBox>
      </MDBox>
    );
  }

  return (
    <MDBox
      component="li"
      display="flex"
      justifyContent="space-between"
      alignItems="flex-start"
      bgColor={darkMode ? "transparent" : "grey-100"}
      borderRadius="lg"
      p={3}
      mb={noGutter ? 0 : 1}
      mt={2}
      style={{ "margin-bottom": "0px", "padding-bottom": "0px" }}
    >
      <MDBox width="100%" display="flex" flexDirection="column">
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          mb={2}
        >
          <MDTypography variant="button" fontWeight="medium" textTransform="capitalize">
            {name}
          </MDTypography>
          {/*
          <MDBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
            <MDBox mr={1}>
              <MDButton variant="text" color="error">
                <Icon>delete</Icon>&nbsp;delete
              </MDButton>
            </MDBox>
            <MDButton variant="text" color={darkMode ? "white" : "dark"}>
              <Icon>edit</Icon>&nbsp;edit
            </MDButton>
          </MDBox>
          */}
        </MDBox>
        <MDBox display="flex" alignItems="center" ml={-1}>
          <Switch checked={showQR} onChange={handleSetShowQR} />
          <MDTypography
            variant="button"
            fontWeight="regular"
            color="text"
            onClick={handleSetShowQR}
            sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
          >
            &nbsp;&nbsp;Show QR
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Peso Total:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium" textTransform="capitalize">
              {peso}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDBox mb={1} lineHeight={0}>
          <MDTypography variant="caption" color="text">
            Puntos Ganados:&nbsp;&nbsp;&nbsp;
            <MDTypography variant="caption" fontWeight="medium">
              {puntos}
            </MDTypography>
          </MDTypography>
        </MDBox>
        <MDTypography variant="caption" color="text">
          ID Contenedor:&nbsp;&nbsp;&nbsp;
          <MDTypography variant="caption" fontWeight="medium">
            {idContenedor}
          </MDTypography>
        </MDTypography>
      </MDBox>
      {QRCode}
    </MDBox>
  );
}

// Setting default values for the props of Bill
Bill.defaultProps = {
  noGutter: false,
};

// Typechecking props for the Bill
Bill.propTypes = {
  name: PropTypes.string.isRequired,
  peso: PropTypes.string.isRequired,
  puntos: PropTypes.string.isRequired,
  idContenedor: PropTypes.string.isRequired,
  qr: PropTypes.string.isRequired,
  noGutter: PropTypes.bool,
};

export default Bill;
