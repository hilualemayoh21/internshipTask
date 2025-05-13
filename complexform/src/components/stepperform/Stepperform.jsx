import React,{useState , useEffect} from 'react'
import {Modal , Box , Stepper , Step , StepLabel ,Divider , Grid, Button , Typography} from "@mui/material"
import PersonalInfo from "../PersonalInfo.jsx"
import Schedule from "../Schedule.jsx"
import SkillAssessment from '../SkillAssesment.jsx'
import AccountSetup from '../AccountSetup.jsx'
import  useformikForm from "../useformik/Useformik.jsx"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageWithPlaceholder from '../imagewithplaceholder/ImageWithPlaceholder.jsx'
function Stepperfom({open ,handleClose , onFinalSubmit}) {
    const [activeStep , setActiveStep] = useState(0);
    const handlePreviouse = ()=>setActiveStep(prevStep=> prevStep - 1);
    const steps =["Personal Info" , "Skill Assessment" , "Schedule & Availability" , "Account Setup"];
    const formik =  useformikForm({onSubmitSuccess: onFinalSubmit });
    const handleNext = async ()=>{
    const stepFields ={
      0:[ "name","email","phoneNumber" ,"profilePicture"],
      1:["skillLevel" , "interestedTopics" , "portfolioLink" , "mentorshipArea"],
      2:["startDate" , "endDate" , "times" ,"laptopSupport"],
      3:["password" , "confirmPassword"  , "requireSupport" , "sponsorshipCode"]
    }
        const currentStepFields = stepFields[activeStep] || [];
        const touchedFields = {};
        currentStepFields.forEach(field => {
          touchedFields[field] = true;
        });
        formik.setTouched(touchedFields , true);
        const errors = await formik.validateForm();
        const stepError = currentStepFields.some(field=>errors[field]);
        if (stepError) {
  toast.error("Please fix the errors before proceeding.");
  return;
}
  if (activeStep === steps.length - 1) {
  await formik.submitForm();
  return;
}
  else {setActiveStep(prev => prev + 1); } } 
    const getStepperContent =(step)=>{
      switch(step){
        case 0:
          return (<PersonalInfo formik={formik}/>);
        case 1:
          return (<SkillAssessment formik={formik}/>);
        case 2:
          return (<Schedule formik={formik}/>);
        case 3:
          return(<AccountSetup formik={formik}/>); }}

     const style ={
          position:"absolute", 
          top:"50%",
          left:"50%",
          width:600,
          transform:"translate(-50% , -50%)",
          backgroundColor:"white",
          boxShadow:"24px",
          p:4,
          borderRadius:"16px"
   }
   useEffect(() => {
  if (!open) {
    setActiveStep(0); // Reset to first step only when modal closes
  }
}, [open]);
  return (
    <Modal   keepMounted open={open} onClose={handleClose} aria-labelledby='complexform' sx={{}}>
      <Box sx={style}>
        <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>{steps[activeStep]}</Typography>
         <Stepper alternativeLabel activeStep={activeStep} >
          {steps.map((label , index)=>(<Step key={index}>
            <StepLabel >{label}</StepLabel>
          </Step>))}
        </Stepper>
        <Divider sx={{mt:4}}/>
  <Grid container >
  <Grid item sx={{mx:"auto"}}>
  {getStepperContent(activeStep)}
  <Box sx={{display:"flex" ,gap:4 , my:2}}>
    <Button variant="outlined" disabled={activeStep === 0 ? true : false} onClick={handlePreviouse}>Back</Button>
     <Button type="submit" variant="outlined" onClick={ handleNext} >{activeStep === steps.length - 1 ? "Submit" : "Next"}</Button>
  </Box>
    </Grid>
    </Grid>
      </Box>
    </Modal>
   
  )
}

export default Stepperfom