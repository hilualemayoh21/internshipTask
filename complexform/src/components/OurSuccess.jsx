import React from "react"
import {Box ,Typography , Grid } from "@mui/material"
import {MenuBook , Campaign , LiveHelp , Group , Stars} from "@mui/icons-material"


const successData =[
    {icon:<MenuBook style={{fontSize:40 , color:"#2196f3"}}/> , value:"15K+",label:"Number Of Students"},
    {icon:<Campaign style={{fontSize:40 , color:"#2196f3"}}/> , value:"75%" , label:"Percentage Of Success"},
    {icon:<LiveHelp style={{fontSize:40 , color:"#2196f3"}}/> , value:"35" , label:"Numbers Of Questions"},
    {icon:<Group style={{fontSize:40 , color:"#2196f3"}}/> , value:"25+" , label:"Number Of Experts"},
    {icon:<Stars style={{fontSize:40 , color:"#2196f3"}}/> , value:"15+" , label:"Years Of Exprience"}
];

  function OurSuccess() {
    return (
        <Box sx={{py:4 , mt:4,}}>
        <Typography variant="h4" align="center" gutterBottom sx={{mb:4}}>
            Our Success
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mx:"auto"}}>
            {successData.map((item , index)=>(<Grid item textAlign="center" xs={6} sm={4} md={2.4}>
                  {item.icon}
                  <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.label}</Typography>
            </Grid>))}
            
        </Grid>
           
       
        </Box>
    )
  }

  export default OurSuccess ;