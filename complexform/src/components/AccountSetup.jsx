import React,{useState} from 'react'
import { TextField , Box ,FormControl ,FormLabel ,RadioGroup , FormControlLabel, Radio, FormHelperText  ,IconButton, Typography} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
function AccountSetup({formik}) {
  const [showPassword , setShowPassword] = useState(false);
  return (
    <Box sx={{my:4}}>
   {/* <Typography variant="h5" sx={{my:2}}>Personal Info</Typography> */}
  <TextField fullWidth
  type={showPassword ? "text" : "password"}
  name="password"
  label="Password"
  slotProps={{
    input:{
      endAdornment:<IconButton onClick={()=>setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff/> : <Visibility/>}</IconButton>
    }
  }}
  value={formik.values.password}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.password && Boolean(formik.errors.password)}
  helperText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}/>
  <TextField
  fullWidth
  type="password"
  name="confirmPassword"
  label="Confirm Password"
  value={formik.values.confirmPassword}
  onChange={formik.handleChange}
  onBlur={formik.handleBlur}
  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword :""}
  sx={{mt:2}}
/>
{formik.values.interestedTopics.includes("AccessibilityDesign") && (
  <FormControl component="fieldset" sx={{mt:2}} >
    <FormLabel component="legend">Will you require support staff?</FormLabel>
    <RadioGroup
      name="requireSupport"
      value={formik.values.requireSupport}
      onChange={formik.handleChange}
    >
      <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
      <FormControlLabel value="No" control={<Radio />} label="No" />
    </RadioGroup>
    {formik.touched.requireSupport && formik.errors.requireSupport && (
      <FormHelperText error>{formik.errors.requireSupport}</FormHelperText>
    )}
  </FormControl>
)}
{formik.values.skillLevel === "Intermediate" &&
 formik.values.interestedTopics.includes("Project Management") && (
  <TextField
    fullWidth
    name="sponsorshipCode"
    label="Company Sponsorship Code"
    value={formik.values.sponsorshipCode}
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    error={
      formik.touched.sponsorshipCode &&
      Boolean(formik.errors.sponsorshipCode)
    }
    sx={{mt:2}}
    helperText={
      formik.touched.sponsorshipCode && formik.errors.sponsorshipCode ? formik.errors.sponsorshipCode :""
    } />)}</Box>
  )
}

export default AccountSetup
