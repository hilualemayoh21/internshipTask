import React from 'react'
import {Typography , Box , Grid , Button} from "@mui/material"
import howitwork from "../assets/howitwork.png" 

function HowWorks() {
    const boxTextStyle ={
        '&:hover':{backgroundColor:"#2C66B8" ,  color:"white"} , display:"flex" , flexDirection:"column" ,borderRadius:2 ,px:2,
    };
  return (  
 <Box sx={{backgroundColor:"#EDF1F8" , width:"100%" ,py:8 ,  overflowX: "hidden"}}>
        <Typography textAlign="center" variant="h4" sx={{pb:2}}>How it works</Typography>
        <Box sx={{display:"flex" , gap:{xs:4 , md:0} , flexDirection:{xs:"column" , md:"row"}  ,mx: "auto",
          alignItems: "center", // vertically align on desktop
          justifyContent: "center", }}>
            <Box sx={{display:"flex" , flexDirection:"column" ,backgroundColor:"white" ,p:3,  maxWidth:{xs:"500px" ,md:"350px" },  gap:2 , borderRadius:4 ,}}>
             <Box sx={boxTextStyle}>
              <Typography variant="h6">Sign Up</Typography>
              <Typography variant="body2">Montes vivamus curve quisque et primis pretium nullam.</Typography>
             </Box>
             <Box sx={boxTextStyle}>
              <Typography variant="h6">Get access</Typography>
              <Typography variant="body2">Montes vivamus curve quisque et primis pretium nullam.</Typography>
             </Box>
              <Box sx={boxTextStyle}>
              <Typography variant="h6">Practice questions</Typography>
              <Typography variant="body2">Prepare for the MLA exam in multiple modes of revision and track your progress with your personalised dashboard</Typography>
             </Box>
             <Box sx={boxTextStyle}>
              <Typography variant="h6">Get Result</Typography>
              <Typography variant="body2">compare your results with your peers' with advanced analytics</Typography>
             </Box>
            </Box>
      <Box sx={{flex:1 ,  maxWidth:{xs:"540px",md:"600px"}, position:"relative" }}><img src={howitwork} style={{width:"100%" ,heigth:"auto" , display:"block" ,   borderRadius:4}}/>
      <Button sx={{position:"absolute" ,bottom:"10%" , left:"40%" , height:"40px", width:"150px" , transform:"" }} variant="contained" size="">Start Now </Button></Box>
        </Box>
    </Box>
  )
}

export default HowWorks