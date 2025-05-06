import React from 'react'
import {Box , Typography , Button} from "@mui/material"
import heroimage from "../assets/heroimage.png"
function GridBox() {
  return (
   <Box sx={{display:"flex" , justifyContent:"space-between" , alignItems:"center" , padding:"40px" , gap:"40px"}}>
        <Box sx={{flex:1}}>
<Typography variant="h4" component="h5" sx={{fontWeight:"bold" ,
  marginBottom:"16px"
}}>
yTake <Box component="span" sx={{color:"#1976d2"}}>student exprience </Box><br/>
to the next level
</Typography>
<Typography variant="body1" sx={{color:"#666" , marginBottom:"24px"}}>
  Learn how to bring theory, test & thinking, but improving skills. Learn apart via live The industy's fastest service.
</Typography>
<Button variant="contained" sx={{textTransform:"none" , borderRadius:"8px" , padding:"10px 24px"}}>Join Now</Button>
        </Box>
        <Box sx={{flex:1}}>
          <img src={heroimage} alt="student studying" style={{width:"10",
            height:"auto",
            borderRadius:"8px"
          }}/>
        </Box>
   </Box>
  )
}

export default GridBox