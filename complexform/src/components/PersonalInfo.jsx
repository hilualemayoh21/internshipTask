import React,{useState , useCallback , useRef}from 'react'
import {Box , TextField , Grid , InputAdornment , IconButton, FilledInput , Typography } from "@mui/material"
import PermIdentitySharpIcon from '@mui/icons-material/PermIdentitySharp';
import MailIcon from '@mui/icons-material/Mail';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import {useDropzone} from "react-dropzone"

function PersonalInfo({formik}) {
    const MAX_FILE_SIZE = 400 * 1024; // 400KB in bytes
   const onDrop = (acceptedFiles) => {
  const file = acceptedFiles[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      formik.setFieldValue("profilePicture", file);
      formik.setFieldValue("profilePreview", reader.result);
      formik.setFieldValue("profileBase64", reader.result);
      formik.setFieldTouched("profilePicture", true, true); // ← important
    };
    reader.readAsDataURL(file);
    formik.setFieldValue("profilePicture", file);
formik.validateField("profilePicture");

  }
};


    const onDropRejected = (fileRejections) => {
        const message = fileRejections[0]?.errors[0]?.message || "Invalid file.";
        formik.setFieldError("profilePicture", message);
    };

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        onDrop,
        onDropRejected,
        accept: { "image/*": [".png", ".jpeg", ".jpg"] },
        multiple: false,
        maxSize: MAX_FILE_SIZE
    });

    const style = {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:4,
        width:500,
        height:70,
        bgcolor:"#fafafa",
        borderWidth:2,
        borderStyle:"dashed",
        borderColor:isFocused ? "#2196f3" : isDragAccept ? "#00e676" : isDragReject ? "#ff1744" : "#eeeeee",
        outline:"none",  
        transition: ".24s ease-in-out",
        cursor: 'pointer',
    }

    return (
        <Box sx={{my:2 ,py:2 }}>
            <Box sx={{display:"flex" , gap:3 }}>
                <TextField 
                    sx={{borderRadius:"23px"}} 
                    label="name" 
                    name="name" 
                    InputProps={{
                        endAdornment:<InputAdornment position="end"><IconButton><PermIdentitySharpIcon/></IconButton></InputAdornment>
                    }}  
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name ?  formik.errors.name : ""}
                />
                <TextField 
                    sx={{borderRadius:"23px"}} 
                    variant="outlined"  
                    name="email" 
                    label="email" 
                    InputProps={{
                        endAdornment:<InputAdornment position="end"><IconButton><MailIcon/></IconButton></InputAdornment>
                    }} 
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email ?  formik.errors.email : ""}
                /> 
            </Box>

            <TextField 
                name="phoneNumber" 
                label="phonenumber" 
                sx={{ my:2,borderRadius:"23px"}} 
                InputProps={{ 
                    endAdornment:<InputAdornment position="end"><IconButton><PhoneAndroidIcon/></IconButton></InputAdornment>
                }} 
                variant="outlined" 
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber ?  formik.errors.phoneNumber : ""}
            />
            <Typography variant="body1" sx={{my:1}}>Profile Picture Upload</Typography>
            <Box {...getRootProps()} sx={style}>
                <input {...getInputProps()} />
                {formik.values.profilePreview ? 
                    <img 
                        src={formik.values.profilePreview} 
                        alt="Profile Preview" 
                        style={{marginTop: 16, width:"70%",height:"100%", borderRadius: 8 ,objectFit:"contain"}}
                    /> : (
                    <Typography variant="body2" color="textSecondary">
                        Drag & drop or click to upload
                    </Typography>
                )}
            </Box>
       
            {formik.touched.profilePicture && formik.errors.profilePicture && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                    {formik.errors.profilePicture}
                </Typography>
            )}
        </Box>
    )
}

export default PersonalInfo