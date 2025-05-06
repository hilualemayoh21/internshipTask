import React from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {Box , Typography , Select , FormControl , InputLabel ,FormControlLabel ,MenuItem ,Checkbox ,ListItemText ,Switch ,TextField} from "@mui/material"
import OutlinedInput from '@mui/material/OutlinedInput';
import dayjs from 'dayjs';


const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
      width: 250, },},};
function Schedule({formik}) {
 const times = ["Weekdays", "Weekends", "Mornings", "Evenings"];
 const { setFieldValue } = formik;
  return (
    <Box sx={{my:2}}>
        <Typography variant="h5" gutterBottom sx={{my:2}}>Schedule & Availability</Typography>
        <Box sx={{display:"flex" , gap:2 , }}>
       <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Start Date"
          views={['year', 'month', 'day']}
          sx={{ borderRadius:"19px"}} value={formik.values.startDate ? dayjs(formik.values.startDate) : null} onChange={(value) => {setFieldValue("startDate", value);}}
 slotProps={{
            textField:{
              name:"startDate",
              onBlur:formik.handleBlur,
              error:Boolean(formik.touched.startDate &&formik.errors.startDate),
              helperText:(formik.touched.startDate && formik.errors.startDate ? formik.errors.startDate: "")
            }}} renderInput={(params) => <TextField {...params} />}/>
        <DatePicker
          label="End Date"
          views={['year', 'month', 'day']}
          sx={{ borderRadius:"19px"}}  value={formik.values.endDate ? dayjs(formik.values.endDate) : null} onChange={(value)=>{setFieldValue("endDate" , value)}}
          slotProps={
            {
              textField:{
                name:"endDate",
                onBlur:formik.handleBlur,
                error:Boolean(formik.touched.endDate && formik.errors.endDate),
                helperText:(formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : "") }}}
                 renderInput={(params) => <TextField {...params} />}
          />
       </LocalizationProvider>
       </Box>
       <FormControl fullWidth error={formik.touched.times && Boolean(formik.errors.times)} sx={{mt:2}}>
  <InputLabel id="times-label">Preferred Times</InputLabel>
  <Select
    labelId="times-label"
    id="times"
    name="times"
    multiple
    value={formik.values.times}
    onChange={formik.handleChange}
    input={<OutlinedInput label="Preferred Times" />}
    renderValue={(selected) => selected.join(', ')}
    MenuProps={MenuProps}
  >
    {times.map((time) => (
      <MenuItem key={time} value={time}>
        <Checkbox checked={formik.values.times.includes(time)} />
        <ListItemText primary={time} />
      </MenuItem>
    ))}
  </Select>
  {formik.touched.times && (
    <Typography variant="caption" color="error">
      {formik.errors.times}
    </Typography>
  )}
</FormControl>
{formik.values.times.includes("Weekdays") && (
  <FormControlLabel
  control={
    <Switch
      name="laptopSupport"
      checked={formik.values.laptopSupport}
      onChange={formik.handleChange}
      error={formik.touched.laptopSupport && Boolean(formik.errors.laptopSupport)}
      helperText={formik.touched.laptopSupport && formik.errors.laptopSupport ? formik.error.laptopSupport : ""}
      color="primary"
    />
  }
  label="Need Laptop Support?"
/>

)}
 </Box>
    
  )
}

export default Schedule