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

import { Navigate, useParams } from "react-router-dom";
// Material Dashboard 2 React components
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import CardBlog from "examples/Cards/BlogCards/SimpleBlogCard";
import Footer from "examples/Footer";
import {useEffect, useState} from 'react';

import { HOST_BACKEND } from "../../config";
import axios from "axios";

// Authentication layout components

function IncentiveCodeFromQR() {
  const { code } = useParams();
  const [was_sucessfull, seWasSucessfull] = useState(true);


  const user = localStorage.getItem("user");
  if (user === null) {
    return <Navigate replace to="/authentication/sign-in" />;
  }
  var userJson = JSON.parse(user);

  useEffect(() => {
    const codeFromQR = async () => {
      if(typeof code == 'undefined' || code == null || code.length == 0){
        seWasSucessfull(false);
      } else {
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
          seWasSucessfull(false);
          return;
        }
    
        if(was_sucessfull && !data.used) {
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
            seWasSucessfull(false);
          } else {
            const updateCodeResponse = await axios.put(HOST_BACKEND + "/code/" + data._id, { used: true });
            console.log(updateResponse);
            if(updateCodeResponse.status !== 200 || updateCodeResponse.data === null) {
              seWasSucessfull(false);
            }
          }
        } else {
          seWasSucessfull(false);
        }
      }
    };
    codeFromQR();
  }, [was_sucessfull]);

  let img = "/img/ok.png";
  let title = "Se agregó Satisfactoriamente";
  let description = (
    <>
      El codigó de Incentivo se agregó Correctamente
    </>
  );

  if(!was_sucessfull) {
    img = "/img/error.png";
    title = "NO Se Agregó Satisfactoriamente";
    description = <>El codigó de Incentivo NO se agregó Correctamente</>;
  }

  console.log(was_sucessfull);

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

export default IncentiveCodeFromQR;
