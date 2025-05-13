import React,{useState}from 'react'
import {Box , Typography , TextField , TextareaAutosize ,Button , useMediaQuery} from "@mui/material"
import support from "../assets/support.jpg"
import { useTheme } from '@mui/material/styles';
import ImageWithPlaceholder from './imagewithplaceholder/ImageWithPlaceholder';

function Support() {
    const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md')); // md and up = overlap
  return (
    <Box sx={{mx:"auto" , width:"100%", maxWidth:"100vw" , position:"relative"  }}>
  <Box sx={{
    width: { xs: "100%", md: "1000px" },
    height: { xs: "250px", md: "420px" },
    mx: "auto",
    position: "relative",
    backgroundColor: "#f5f5f5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden", // Important for cover to work
    borderRadius: 2
  }}> 
    <ImageWithPlaceholder blurhash ="LUL|[hD*IV-p?w%1xuW?~p%NRPIU" src={support} width={{ xs:"100%" ,md:"100%"}} height={{ xs: "250px", md: "420px" }} style={{
    objectFit: "cover", // or "contain" if you prefer full image with padding
    display: "block",
    mx: "auto",
    borderRadius: 2,}}/>
    {isLargeScreen && (<Box sx={{
            p: 4,
            bgcolor: 'white',
            opacity: 0.95,
            position: 'absolute',
            top: 30,
            right: 40,
            width: 380,
            borderRadius: 2,
            boxShadow: 3
          }}>
            <SupportForm />
          </Box>)}
  </Box>
    

    {/* <Box sx={{p:4 , bgcolor:"white" ,opacity:0.7, position:"absolute" , top:{ xs:280 , sm:280 ,md:30 , } , right:{xs:"38px",md:"180px"} ,  px:{xs:"4px",  md:2} ,width:{ xs:"80%", md:"380px"}}}>
     <Typography variant="h4">Need Support</Typography>
     <Typography variant="subtitle2" sx={{mb:2}}>Contact professionals for guidance</Typography>
     <TextField  fullWidth  value="" onChange="" placeholder='yourName' sx={{"& .MuiInputBase-root":{height:40},mb:"4px"}}/>
     <TextField fullWidth   value="" onChange="" placeholder='Email Address' sx={{"& .MuiInputBase-root":{height:40},mb:"4px"}}/>
     <TextField fullWidth  value="" onChange="" placeholder='phone' sx={{"& .MuiInputBase-root":{height:40} ,mb:"4px"}}/>
     <TextareaAutosize minRows={3} placeholder='Your Query' style={{width:"98%" , marginBottom:"4px"}}/>
     <Button variant="contained">Submit</Button>
    </Box> */}
    {!isLargeScreen && (
        <Box sx={{
          p: 2,
          bgcolor: 'white',
          opacity: 0.95,
          width: '80%',
          mx: 'auto',
          mb: 4,
          borderRadius: 2,
          boxShadow: 2
        }}>
          <SupportForm />
        </Box>
      )}
    </Box>
  );
}
   
 const SupportForm = () => (
  <>
    <Typography variant="h4">Need Support</Typography>
    <Typography variant="subtitle2" sx={{ mb: 2 }}>
      Contact professionals for guidance
    </Typography>
    <TextField fullWidth placeholder="yourName" sx={{ "& .MuiInputBase-root": { height: 40 }, mb: "4px" }} />
    <TextField fullWidth placeholder="Email Address" sx={{ "& .MuiInputBase-root": { height: 40 }, mb: "4px" }} />
    <TextField fullWidth placeholder="phone" sx={{ "& .MuiInputBase-root": { height: 40 }, mb: "4px" }} />
    <TextareaAutosize minRows={3} placeholder="Your Query" style={{ width: "98%", marginBottom: "4px" }} />
    <Button variant="contained">Submit</Button>
  </>
);

export default Support