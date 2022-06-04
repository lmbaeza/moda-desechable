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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import reportsLineChartDataSirTexAdmin from "layouts/dashboard/data/reportsLineChartDataSirTexAdmin";

// Dashboard components
// import Projects from "layouts/dashboard/components/Projects";
// import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { pesoPorMes, puntosPorMes, usuariosNuevosPorMes } = reportsLineChartDataSirTexAdmin;

  const user = localStorage.getItem("user");
  if (user === null) {
    console.log(null);
    return <Navigate replace to="/authentication/sign-in" />;
  }
  const userJson = JSON.parse(user);
  if (userJson.role === "USER") {
    console.log("USER");
    return <Navigate replace to="/dashboard" />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="ad_units"
                title="Textil recolectado"
                count="1543 Gr"
                percentage={{
                  color: "success",
                  amount: "+100%",
                  label: "Que el último mes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="account_box"
                title="N° de usuarios"
                count="2"
                percentage={{
                  color: "success",
                  amount: "+100%",
                  label: "Que el último mes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="takeout_dining"
                title="N° Contenedores"
                count="1 Cont"
                percentage={{
                  color: "success",
                  amount: "+1",
                  label: "Que el último mes",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="business"
                title="N° de Empresas"
                count="1 Empresa"
                percentage={{
                  color: "success",
                  amount: "+1",
                  label: "Nueva el último mes",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Peso recolectado por Mes"
                  date="Ultima Actualización hoy"
                  chart={pesoPorMes}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Puntos dados en el Mes"
                  date="Ultima Actualización hoy"
                  chart={puntosPorMes}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="N° de usuarios nuevos"
                  date="Ultima Actualización hoy"
                  chart={usuariosNuevosPorMes}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        {/*
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
