import { useState } from 'react'
import Navbar from './components/Navbar'
import Grid from "@mui/material/Grid"
import Box from '@mui/material/Box';
import { Button, Typography ,IconButton , TextField} from '@mui/material'
import heroimage from "./assets/heroimage.png"
import PlayArrowIcon  from "@mui/icons-material/PlayArrow"
import Stepperform from './components/stepperform/Stepperform'
import OurSuccess from './components/OurSuccess';
import HowWorks from './components/HowWorks';
import { ToastContainer } from "react-toastify"
import UserCard from "./components/Card";
function App() {
 const [open , setOpen] = useState(false);
 const handleClose = ()=> setOpen(false);
 const handleOpen= ()=> setOpen(true);
  return (
   <>
   <Box sx={{position:"relative" , minHeight:"440px"}} >
         <Box sx={{position:"absolute", top:0 , left:0 , height:"100%" , width:"100%" , bgcolor:"#EDF2F8" , zIndex:0 , display:{md:"block" , xs:"none"}}}/>
       <Box sx={{position:"absolute", top:0 , right:0 , height:"100%" , width:"250px" , bgcolor:"white" , zIndex:1 ,display:{md:"block" , xs:"none"}}}/>
    <Box sx={{ zIndex:2 ,   display:"flex" , flexDirection:"column"}}>
<Navbar/>
<Grid container   sx={{width:"100%" , dispaly:{md:"flex" }, mx:{ xs:"4%"} ,flexDirection:{md:"row" , xs:"column"},justifyContent:{md:"space-between" , xs:"center"}, alignItems:"center" , pt:1}} rowSpacing={0}>
       <Grid item xs={12} md={6} sx={{flex:1, zIndex:2 , ml:{  md:12} ,}}>
<Typography variant="h4" component="h5" sx={{fontWeight:"bold" , marginBottom:"16px" , }}>Take <Box component="span" sx={{color:"#479CBB"}}>student experience</Box> <br/>
to the next level</Typography>
<Typography variant="subtitle1" sx={{color:"666" , marginBottom:"28px"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</Typography>
   <Button variant="contained" sx={{padding:"10px 24px" , transform:'none' , borderRadius:"8px"}} onClick={handleOpen}>Join Now</Button>
  </Grid>
        <Grid item xs={12} md={6} sx={{zIndex:2 , flex:1,   }}>
          <Box sx={{position:"relative"}}>
             <img component="img" src={heroimage} alt="hero section image" style={{ width:"100%" , height:"100%",borderRadius:"8px" , objectFit:"cover" , }}/>
             <Box sx={{position:"absolute" ,top:"50%" , left:"0"  , transform:"translate(-50% , -50%)", backgroundColor:"#EDF2F8" , width:"64px"  , height:"64px" ,  borderRadius:"50%" , display:{xs:"none" , md:"flex"} , alignItems:"center" , justifyContent:"center"}}>
              <IconButton sx={{backgroundColor:"#fff" , width:"45px" , height:"45px" }} >
              <PlayArrowIcon sx={{color:"#2C66B8"}}/>
              </IconButton>
             </Box>
          </Box>
           </Grid>
           
       </Grid>
    </Box>
    </Box>
    <Stepperform open={open} handleClose={handleClose}/>
    <ToastContainer position="top-right" autoClose={3000}/>
 <Box>
   <OurSuccess/>
 </Box>
 <Box width="100%">
   <HowWorks/>
 </Box>
 <UserCard/>
  </>
    

 
  
    
      
     
     
      
    
  )
}

export default App
