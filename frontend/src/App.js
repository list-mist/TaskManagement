
import React from 'react';
import ReactDOM  from 'react-dom';
import  CssBaseline  from '@mui/material/CssBaseline';
import { BrowserRouter as Router , Route, Routes } from 'react-router-dom';
import {Box} from '@mui/material';
import Categories from './pages/categories';
import CategoryDetails from './pages/categories/CategoryDetails';
import {SnackbarProvider} from "notistack"
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import AuthContextProvider from './contexts/AuthContextProvider';


export function App() {
  return (
    <><CssBaseline />
    <AuthContextProvider>
    <SnackbarProvider>

    
    <Router>
      <Box >
        <Routes>
          <Route path="/categories"
          element = {<Categories/>}
         />
          <Route path="/categories/create"
          element = {<CategoryDetails/>}
         />
         <Route path={`/categories/edit/:id`}
          element = {<CategoryDetails/>}
         />
          <Route path={`/categories/delete/:id`}
          element = {<CategoryDetails/>}
         />
          <Route path="/auth/signup" 
          element = {<SignUp/>}
         />
          <Route path="/auth/signin" 
          element = {<SignIn/>}   
         />
        </Routes>
      </Box>
    </Router>
    </SnackbarProvider>
    </AuthContextProvider>
    </>
  );
}

ReactDOM.render(<App/>, document.getElementById("root"))
