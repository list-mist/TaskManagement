import React, {useEffect,useState} from 'react'
import { Form, Formik } from 'formik'

import {Grid, TextField, Typography,Paper, Button,Box} from "@mui/material"
import * as yup from "yup"
import {Link, useNavigate} from "react-router-dom"
import useRequestResource from 'src/hooks/useRequestResource';
export default function CategoryDetails() {

  const [initialValues, setInitialValues] = useState({
    name : "",
    color : ""
    }
  );
  const handleChange = (e) =>{
      e.preventDefault();
     const {name,value} = e.target
     setInitialValues((prev) =>{
         return {
             ...prev,
             [name] : value,
         }
     })
  }
  const {name,color} = initialValues
  const {addResource} = useRequestResource({
    endpoint : "categories"
  });
//   useEffect(() =>{
//     addResource()
//   },[]);
  const handleSubmit = (e) =>{
    addResource(initialValues)
  }
  return (
      <><Paper sx={{ borderRadius: "2px" ,
                     boxShadow : (theme) => theme.shadows[5],
                     padding:(theme) => theme.spacing(2,4,3)
       }}>
           <Typography variant = "h6" mb = {4}>
                Create category
           </Typography>
           <Formik>
               {(formik) =>{
                   return (
                       <form>
                           <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                    
                                    fullWidth
                                    id = "name"
                                    label = "name"
                                    {...formik.getFieldProps
                                    ("name")} 
                                    error = {formik.touched.name && Boolean(formik.errors.name) }
                                    helperText = {formik.touched.name && formik.errors.name }  
                                    onChange = {handleChange}
                                    value = {name}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                    fullWidth
                                    id = "color"
                                    label = "Color"
                                    {...formik.getFieldProps
                                    ("color")}
                                    error = {formik.touched.color && Boolean(formik.errors.color) }
                                    helperText = {formik.touched.color && formik.errors.color } 
                                    onChange = {handleChange} 
                                    value = {color}
                                    />
                                </Grid>
                                <Grid item>
                                    <Box sx={{display:"flex",
                                     margin : (theme) => theme.spacing(1),marginTop:(theme) => theme.spacing(3)
                                     }} >
                                     <Button component={Link} to="/categories" size="medium" variant="outlined"
                                     sx = {{mr : 2}}
                                     >Back</Button>
                                     <Button 
                                      type="submit"
                                      size="medium"
                                      variant="outlined"
                                      color="primary"
                                      onSubmit={handleSubmit}
                                      >Submit</Button>
                                     </Box>
                                </Grid>
                           </Grid>
                       </form>
                   )
               }}
           </Formik>
       </Paper>
      </>
  )
}
