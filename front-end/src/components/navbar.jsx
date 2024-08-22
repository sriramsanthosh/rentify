import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useSnackbar } from 'notistack';

export default function NavBar({setCatergoyOfUser}) {
  const Navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [auth, setAuth] = React.useState(localStorage.getItem("token"));
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClick = (event) => {
    Navigate("/access");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogOut = () => {
    setAnchorEl(null);
    localStorage.clear();
    sessionStorage.clear();
    let variant = "success";
    enqueueSnackbar("Logout Success", { variant });
    Navigate("/access");
  };

  const handleLogo = (e)=>{
    e.preventDefault();
    Navigate("/");
  }

  React.useEffect(()=>{
    if(localStorage.getItem("token")){
      setAuth(true);
    }
    else{
      setAuth(false);
    }
  });
  


  return (
    <Box sx={{ flexGrow: 1}}>
      <FormGroup sx={{display:"none"}}>
        <FormControlLabel
          control={
            <Switch
            checked={auth}
            onChange={handleChange}
            aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup>
      <AppBar position="static" sx={{backgroundColor:"#354E41"}}>
        <Toolbar>
          <IconButton onClick={handleLogo}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <img src={require("../images/logo1.png")} alt="logo" width={"35px"} style={{borderRadius:'50%'}} />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
            <span style={{userSelect:"none" , cursor:"pointer"}} onClick={handleLogo}>Rentify</span>
          </Typography>
          { (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={(e)=>{
                  e.preventDefault();
                  if(auth){
                    handleMenu(e)
                  }
                  else{
                    handleClick(e)
                  }
              }}
                color="inherit"
              >
                <AccountCircle />
                {localStorage.getItem("isLogged") ? <Typography>&nbsp;{localStorage.getItem("fName")}</Typography>: <Typography>&nbsp;Login</Typography>}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={(e)=>{handleClose(e); Navigate("/profile")}}>Profile</MenuItem>
                {localStorage.getItem("category")==="buyer" && <><MenuItem onClick={handleClose}>My Favorites</MenuItem><MenuItem onClick={(e)=>{handleClose(e);localStorage.setItem("category", "seller"); setCatergoyOfUser("seller"); Navigate("/");}}>Seller Dashboard</MenuItem></>}
                {localStorage.getItem("category")==="seller" && <><MenuItem onClick={handleClose}>My Properties</MenuItem><MenuItem onClick={(e)=>{handleClose(e); localStorage.setItem("category", "buyer"); setCatergoyOfUser("buyer"); Navigate("/");}}>Buyer Dashboard</MenuItem></>}
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
