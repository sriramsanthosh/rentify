import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        Rentify
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Login({setValue}) {
  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();
  const [loadingLogin, setLoadingLogin] = React.useState(false);

  const handleSubmit = async(event) => {
    event.preventDefault();
    setLoadingLogin(true);
    const data = new FormData(event.currentTarget);
    await Axios.post(`${process.env.REACT_APP_SERVER}`+"/login", {
      email: data.get('email'),
      password: data.get('password'),
    }).then(async(res)=>{
     
      if(res.status === 200){
        let variant = "success";
        enqueueSnackbar(res.data.message, { variant });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("email", res.data.email);
        localStorage.setItem("fName", res.data.fName);
        localStorage.setItem("category", res.data.category);
        localStorage.setItem("isLogged", true);
        Navigate("/");
      }else{
        let variant = "error";
        enqueueSnackbar(res.data.message, { variant });
      }
    }).catch(async(err)=>{
      let variant = 'error';
      enqueueSnackbar('Connection Error!', { variant });
    });
    setLoadingLogin(false);
  };

  return (
    <ThemeProvider  theme={defaultTheme} >
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#3B5B40' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              fullWidth
              id="email"
              label="Email *"
              name="email"
              type="email"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'green',
                  },
                  '&:hover fieldset': {
                    borderColor: 'darkgreen',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'green',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'green',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: 'darkgreen',
                },
              }}
              autoFocus
            />
            <TextField
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'green',
                },
                '&:hover fieldset': {
                  borderColor: 'darkgreen',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'green',
                },
              },
              '& .MuiInputLabel-root': {
                color: 'green',
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: 'darkgreen',
              },
            }}
              margin="normal"
              fullWidth
              name="password"
              label="Password *"
              type="password"
              id="password"
            />
            <div style={{textAlign:"right"}} onClick={(e)=>{
              e.preventDefault();
              setValue(0);
            }}>
            
            <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
            </div>
            
            
            {!loadingLogin && <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: '#3B5B40',
                '&:hover': {
                  backgroundColor: '#2C4A32',
                },
              }}
            >
              Sign In
            </Button>}

              {loadingLogin && <LoadingButton
                loading
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="outlined"
                type="submit"
                fullWidth
                sx={{
                  mt: 3,
                  mb: 2,
                }}
              >
                Loading
              </LoadingButton>}
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 4, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}