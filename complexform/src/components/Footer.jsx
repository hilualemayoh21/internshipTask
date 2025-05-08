import React from 'react';
import { Box, Grid, Button, Typography, TextField } from "@mui/material";
import logo from '../assets/logo.jpg';

export default function Footer() {
  return (
    // Outer full-width Box with background color
    <Box sx={{ width: "100%", bgcolor: "#29323F", color: "white", py: { xs: 5, sm: 6, md: 4 }  }}>
      {/* Inner container to center content and apply horizontal padding */}
      <Box sx={{ maxWidth: "1440px", mx: "auto", px: { xs: 2, sm: 12, md: 6 } ,mx:{xs:0 , sm:0, md:0}}}>
        <Grid
          container
          spacing={4}
          alignItems="flex-start"
          justifyContent="space-between"
          flexWrap="wrap"
        >
          {/* Logo */}
          <Grid
            item
            xs={12}
            md={3}
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              mb: { xs: 3, md: 0 }
            }}
          >
            <Box
              component="img"
              src={logo}
              alt="logo"
              sx={{
                width: 48,
                height: 48,
                borderRadius: "50%",
              }}
            />
          </Grid>

          {/* Footer Items */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={4}>
              {/* My Account */}
              <Grid item xs={12} sm={6} md={3} sx={{px:{xs:0,sm:3 , md:0 }}}>
                <Typography variant="subtitle1" sx={{ color: "#A9A9A9", mb: 1 }}>My Account</Typography>
                {["Sign in", "Dashboard", "Monitor Progress", "Compare Success", "My Topics"].map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>{item}</Typography>
                ))}
              </Grid>

              {/* About SBA */}
              <Grid item xs={12} sm={6} md={3} sx={{px:{xs:0,sm:3 , md:0 }}}>
                <Typography variant="subtitle1" sx={{ color: "#A9A9A9", mb: 1 }}>About SBA</Typography>
                {["Company Information", "Resources", "Our Success", "Meet The Experts"].map((item, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>{item}</Typography>
                ))}
              </Grid>

              {/* Support */}
              <Grid item xs={12} sm={6} md={3} >
                <Typography variant="subtitle1" sx={{ color: "#A9A9A9", mb: 1 }}>Support</Typography>
                <Typography variant="body2" sx={{ mb: 2 }}>Contact Us</Typography>
              </Grid>

              {/* Newsletter */}
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1" sx={{ color: "#A9A9A9", mb: 1 }}>Newsletter</Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  Join our mailing list to stay up to date.
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Email Address"
                    sx={{
                      bgcolor: "white",
                      borderRadius: 1,
                      flexGrow: 1,
                      "& .MuiInputBase-root": {
                        height: 40,
                        fontSize: 14,
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    sx={{
                      height: 40,
                      bgcolor: "#2C66B8",
                      color: "white",
                      textTransform: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Subscribe
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
