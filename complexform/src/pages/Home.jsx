import React, { useState , useEffect } from 'react';
import Navbar from '../components/Navbar';
import Grid from "@mui/material/Grid";
import Box from '@mui/material/Box';
import { Button, Typography, IconButton } from '@mui/material';
import heroimage from "../assets/heroimage.png";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import Stepperform from '../components/stepperform/Stepperform';
import OurSuccess from '../components/OurSuccess';
import HowWorks from '../components/HowWorks';
import { ToastContainer } from "react-toastify";
import UserCard from "../components/Card";
import Support from '../components/Support.jsx';
import Footer from "../components/Footer.jsx";
import ImageWithPlaceholder from '../components/imagewithplaceholder/ImageWithPlaceholder.jsx';

function Home() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const [users, setUsers] = useState([]);

  const handleClose = () => setOpen(false);


   // Load saved data once
  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("submitedData")) || [];
    setUsers(storedUsers);
  }, []);
      // Add a new user
  const handleUserSubmit = (newUser) => {
  const updatedUsers = [...users, newUser];
  localStorage.setItem("submitedData", JSON.stringify(updatedUsers));
  setUsers(updatedUsers);
  handleClose();
};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        overflowX: 'hidden',
        maxWidth: '100vw',
      }}
    >
      {/* Main Content */}
      <Box sx={{ flex: 1 }}>
        <Box sx={{ position: "relative", minHeight: "440px" }}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              height: "100%",
              width: "100%",
              bgcolor: "#EDF2F8",
              zIndex: 0,
              display: { md: "block", xs: "none" },
            }}
          />
          <Box sx={{ zIndex: 2, display: "flex", flexDirection: "column" }}>
            <Navbar />
            <Grid
              container
              sx={{
                width: "100%",
                display: { md: "flex" },
                mx: { xs: 0 , sm:0,lg:"4%" },
                flexDirection: { md: "row", xs: "column" },
                justifyContent: { md: "space-between", xs: "center" },
                alignItems: "center",
                pt: 1,
              }}
              rowSpacing={0}
            >
              <Grid item xs={12} md={6} sx={{ flex: 1, zIndex: 2, ml: { xs:0 , sm:0,lg: 12 } ,  mx: { xs: 3, sm: 4, md: 0 },textAlign:{xs:"center" , md:"left"}}}>
                <Typography
                  variant="h4"
                  component="h5"
                   
                  sx={{ fontWeight: "bold", marginBottom: "16px" ,fontSize: { xs: "20px", sm: "24px", md: "32px" },}}
                >
                  Take{" "}
                  <Box component="span" sx={{ color: "#479CBB" }}>
                    student experience
                  </Box>{" "}
                  <br />
                  to the next level
                </Typography>
                <Typography
  variant="subtitle1"
  sx={{
    color: "#666",
    mb: "28px",
    fontSize: { xs: "14px", sm: "16px", md: "18px" },
    lineHeight: { xs: "1.6", md: "1.75" },
    }}>
  Lorem Ipsum is simply dummy text of the printing and typesetting
  industry. Lorem Ipsum has been the industry's standard dummy.
</Typography>
           <Button
                  variant="contained"
                  sx={{
                    padding: "10px 24px",
                    transform: 'none',
                    borderRadius: "8px",
                    mb: { xs: 4, md: 1 },
                  }}
                  onClick={handleOpen}
                >
                  Join Now
                </Button>
              </Grid>
              <Grid item xs={12} md={6} sx={{ zIndex: 2, flex: 1 }}>
                <Box sx={{ position: "relative" }}>
                  <ImageWithPlaceholder
                  blurhash="LSNTds?w.8Vs%ixvxvMx%gVsM_bc"
                    src={heroimage}
                    alt="hero section image"
                    width= "100%"
                    height= "100%"
                    style={{
                      objectFit: "cover", // or "contain" if you prefer full image with padding
                      display: "block",
                       mx: "auto",
                       borderRadius: 2,
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "0",
                      transform: "translate(-50%, -50%)",
                      backgroundColor: "#EDF2F8",
                      width: "64px",
                      height: "64px",
                      borderRadius: "50%",
                      display: { xs: "none", md: "flex" },
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconButton
                      sx={{ backgroundColor: "#fff", width: "45px", height: "45px" }}
                    >
                      <PlayArrowIcon sx={{ color: "#2C66B8" }} />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Stepperform open={open} handleClose={() => setOpen(false)} onFinalSubmit={handleUserSubmit}  />
        <ToastContainer position="top-right" autoClose={3000} />

        <Box>
          <OurSuccess />
        </Box>
        <Box width="100%">
          <HowWorks />
        </Box>
        <UserCard users={users}/>
        <Support />
      </Box>
      <Box >
  <Footer />
</Box>
    </Box>
  );
}

export default Home;
