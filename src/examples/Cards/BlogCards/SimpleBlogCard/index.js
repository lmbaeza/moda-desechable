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

// react-router components
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import MuiLink from "@mui/material/Link";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function SimpleBlogCard({ image, title, description, qr, action }) {
  let QR;
  if (qr) {
    QR = (
      <p align="center">
        <img width={128} height={128} alt="QR Code" src={qr} />
      </p>
    );
  }
  return (
    <Card>
      <Grid container spacing={1}>
        <Grid item xs={18} lg={18}>
          <p
            position="relative"
            align="center"
            justifyContent="center"
            borderRadius="lg"
            mt={-3}
            mx={2}
          >
            <MDBox
              component="img"
              src={image}
              alt={title}
              justifyContent="center"
              borderRadius="lg"
              shadow="md"
              width="30%"
              height="30%"
              position="relative"
              zIndex={3}
            />
          </p>
          <MDBox p={6}>
            <p align="center">
              <MDTypography
                display="inline"
                variant="h3"
                textTransform="capitalize"
                fontWeight="bold"
              >
                {title}
              </MDTypography>
            </p>
            {QR}
            <p mt={2} mb={3} align="center">
              <MDTypography justifyContent="center" variant="body2" component="p" color="text">
                {description}
              </MDTypography>
            </p>
            {action.type === "external" ? (
              <p align="center">
                <MuiLink href={action.route} target="_blank" rel="noreferrer">
                  <MDButton color={action.color ? action.color : "dark"}>{action.label}</MDButton>
                </MuiLink>
              </p>
            ) : (
              <p align="center">
                <Link to={action.route}>
                  <MDButton color={action.color ? action.color : "dark"}>{action.label}</MDButton>
                </Link>
              </p>
            )}
          </MDBox>
        </Grid>
      </Grid>
    </Card>
  );
}

// Typechecking props for the SimpleBlogCard
SimpleBlogCard.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  qr: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]).isRequired,
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "dark",
      "light",
      "default",
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default SimpleBlogCard;
