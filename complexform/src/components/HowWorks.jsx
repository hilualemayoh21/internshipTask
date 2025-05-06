import React from 'react'
import {Typography , Box , Grid} from "@mui/material"
import howitwork from "../assets/howitwork.png" 

function HowWorks() {
    const boxTextStyle ={
        '&:hover':{backgroundColor:"#2C66B8" ,  color:"white"} , display:"flex" , flexDirection:"column" ,borderRadius:2 ,px:2,
    };
  return (  
 <Box sx={{backgroundColor:"#EDF1F8" , width:"100%" ,py:8 , }}>
        <Typography textAlign="center" variant="h4" sx={{pb:2}}>How it works</Typography>
        <Box sx={{display:"flex" , gap:{xs:4 , md:0} , flexDirection:{xs:"column" , md:"row"}  ,mx: "auto",
          alignItems: "center", // vertically align on desktop
          justifyContent: "center", }}>
            <Box sx={{display:"flex" , flexDirection:"column" ,backgroundColor:"white" ,p:3,  maxWidth:"350px" ,  gap:2 , borderRadius:4 ,}}>
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
      <Box sx={{flex:1 ,  maxWidth:"600px",  }}><img src={howitwork} style={{width:"100%" ,heigth:"auto" , display:"block"  , borderRadius:4}}/></Box>
        </Box>
    </Box>
  )
}

export default HowWorks