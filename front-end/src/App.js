import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AccessPage from './pages/AccessPage';
import NavBar from './components/navbar';
import Home from './pages/Home';
import { SnackbarProvider, useSnackbar } from 'notistack';
import NewProperty from './pages/seller/NewProperty';
import UpdatePropertyPage from './pages/seller/UpdateProperty';
import PageNotFound from './components/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import { useState } from 'react';


function MyApp() {
  const { enqueueSnackbar } = useSnackbar();
  
  const handleClickVariant = (variant) => () => {
    enqueueSnackbar('This is a success message!', { variant });
  };

  const [categoryOfUser, setCatergoyOfUser]=useState();
  return (
    <div style={{backgroundColor:"#E8F7E8", minHeight:"100vh", height:"auto"}}>
    <BrowserRouter>
        <NavBar setCatergoyOfUser={setCatergoyOfUser}/>
        <div>
          <Routes>
            <Route exact path='/access' element={<AccessPage />} />
            <Route exact path='/' element={<Home categoryOfUser={categoryOfUser} setCatergoyOfUser={setCatergoyOfUser} />} />
            <Route exact path='/new-property' element={<NewProperty />} />
            <Route exact path='/update-property' element={<UpdatePropertyPage />} />
            <Route exact path='/profile' element={<ProfilePage />} />
            <Route exact path='*' element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default function App() {
  return (
    <SnackbarProvider autoHideDuration={1500} maxSnack={1} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <MyApp />
    </SnackbarProvider>
  );
}