import React, { useEffect } from 'react'
import { Button,Box,Paper,Table,
  TabelBody,TableCell,TableContainer,
  TableHead,TableRow,IconButton, TableBody} from '@mui/material'

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { BrowserRouter as Router ,Link } from 'react-router-dom';
import useRequestResource from 'src/hooks/useRequestResource';
// const res = [
//   { 
//     id : 1,
//     name : "Feature",
//     color : "CCCCC"
//   },
//   { 
//     id : 2,
//     name : "Bug",
//     color : "CCFFF"
//   }
// ]


export default function  Categories() {
  const {getResourceList, resourceList} = useRequestResource({
    endpoint : "categories"
  });
  useEffect(() =>{
    getResourceList()
  },[getResourceList])
  return (
    <div> 
    <Box sx = {{
      display:"flex",
      justifyContent:"flex-end",
      mt:4,
      mb:4
    }}>
    <Button component={Link} variant="contained" color="primary" to="/categories/create">
    Create category
    </Button>

    </Box>
    <TableContainer component={Paper}>
      <Table sx={{
        minWidth : 360
      }} size = "small" >
        <TableHead>
          <TableRow>
            <TableCell align = "left"> Name  </TableCell>
            <TableCell align = "left"> Color </TableCell>
            <TableCell align = "right"> Actions  </TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {resourceList.map((r) => {
            return <TableRow key = {r.id}> <TableCell align = "left">
               {r.name}
            </TableCell>  
            <TableCell align = "left">
               {r.color}
            </TableCell>
            <TableCell align = "right">
               <Box sx = {{display : "flex", justifyContent: "flex-end"}}>
                <Link to={`/categories/edit/${r.id}`} 
                 key = "category-edit">
                 <IconButton size = "large" > <EditIcon/> </IconButton> 
                </Link>
                <IconButton size = "large" onClick={null} > <DeleteIcon/> </IconButton> 
               </Box>
            </TableCell>  </TableRow>
          })}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  )
}
