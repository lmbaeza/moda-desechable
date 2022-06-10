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

import Legend from "./Legend"

// Authentication layout components

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from "leaflet";

function ContainerMap() {
  const [map, setMap] = useState(null);

  const user = localStorage.getItem("user");
  console.log(user);
  if (user === null) {
    return <Navigate replace to="/authentication/sign-in" />;
  }
  var userJson = JSON.parse(user);
  console.log(userJson);

  const iconContainer = L.icon({
    iconUrl: "/img/container.png",
    iconSize: new L.Point(45, 45),
  });

  const iconClothes = L.icon({
    iconUrl: "/img/clothes.png",
    iconSize: new L.Point(45, 45),
  });

  const containerPositions = [
    {
      position: [4.63597, -74.083257],
      description: "Contenedor UNAL 0001",
      icon: iconContainer
    },
    {
      position: [4.6507264, -74.0808796],
      description: "Contanedor Nicolas de Federman 0002",
      icon: iconContainer

    },
    {
      position: [4.6184599,-74.0866112],
      description: "H&M Calima",
      icon: iconClothes
    }
  ];
  /*
  var Legend = L.control({
    position: "bottomleft",
    legends: [{
      label: "Marker1",
      type: "image",
      url: "/img/clothes.png",
    }]
  });
*/

  /*
  legend.onAdd = () => {
    const div = L.DomUtil.create("div", "info legend");
    div.innerHTML =
      "<h4>This is the legend</h4>" +
      "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
    return div;
  };
  */
  
  // console.log(Legend);
  
  // legend.addTo(map);
  console.log(map);

  var containers = [];

  for(let container of containerPositions) {
    containers.push(
      (
        <Marker position={container.position} icon={container.icon} >
          <Popup>
            {container.description}
          </Popup>
        </Marker>
      )
    )
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mt={6} mb={3}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={18} lg={8}>
          <MapContainer center={[4.63597, -74.083257]} zoom={16} whenCreated={setMap} style={{width: "100wh", height: "100vh"}}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {containers}
            <Legend map={map} />
          </MapContainer>
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

export default ContainerMap;
