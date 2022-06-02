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

// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
// import MasterCard from "examples/Cards/MasterCard";
// import DefaultInfoCard from "examples/Cards/InfoCards/DefaultInfoCard";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartDataSirTex";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Billing page components
// import PaymentMethod from "layouts/billing/components/PaymentMethod";
// import Invoices from "layouts/billing/components/Invoices";
import BillingInformation from "layouts/billing/components/BillingInformation";
import Transactions from "layouts/billing/components/Transactions";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";

function Billing() {
  const { sirtex, pointsSpent } = reportsLineChartData;
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} xl={6}>
                  <MDBox mb={3}>
                    <ReportsLineChart
                      color="success"
                      title="Peso de Ropa Donada"
                      description={
                        <>
                          (<strong>+100%</strong>) de incremento en el actual mes con respecto al
                          mes pasado
                        </>
                      }
                      date="Hace 2 Dias"
                      chart={sirtex}
                    />
                  </MDBox>
                </Grid>
                <Grid item xs={12} md={6} xl={6}>
                  <MDBox mb={3}>
                    <ComplexStatisticsCard
                      icon="radio_button_checked"
                      title="Incentivos"
                      count="+ 55"
                      percentage={{
                        color: "success",
                        amount: "+3%",
                        label: "Mas de puntos que el ultimo mes",
                      }}
                    />
                  </MDBox>
                  <MDBox mb={3}>
                    <ComplexStatisticsCard
                      color="success"
                      icon="leaderboard"
                      title="Total peso de textiles dados"
                      count="700 Gr"
                      percentage={{
                        color: "success",
                        amount: "+7%",
                        label: "Que el ultimo mes",
                      }}
                    />
                  </MDBox>
                </Grid>
                {/*
                <Grid item xs={12}>
                  <PaymentMethod />
                </Grid>
                    */}
              </Grid>
            </Grid>
            {/*
            <Grid item xs={12} lg={4}>
              <Invoices />
            </Grid>
                  */}

            <Grid item xs={12} xl={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Puntos Redimidos"
                  description="Numero de puntos refimidos en tiendas aliadas"
                  date="Hace 2 dias"
                  chart={pointsSpent}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={7}>
              <BillingInformation />
            </Grid>
            <Grid item xs={12} md={5}>
              <Transactions />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Billing;
