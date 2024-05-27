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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
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

export default function Register({setValue}) {
  const { enqueueSnackbar } = useSnackbar();
  const Navigate = useNavigate();
  const [category, setCategory] = React.useState('');
  const [loadingCreate, setLoadingCreate] = React.useState(false);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoadingCreate(true);
    const data = new FormData(event.currentTarget);
    if (category === '') {
      let variant = "error";
      enqueueSnackbar("Select the category", { variant });
    }

    await Axios.post(`${process.env.REACT_APP_SERVER}`+"/register", {
      fName: data.get('fName'),
      lName: data.get('lName'),
      phone: data.get('phone'),
      email: data.get('email'),
      password: data.get('password'),
      category: category
    }).then(async(res)=>{
      if(res.status === 200){
        let variant = "success";
        enqueueSnackbar(res.data.message, { variant });
      }else{
        let variant = "error";
        enqueueSnackbar(res.data.message, { variant });
      }
    }).catch(async(err)=>{
      let variant = 'error';
      enqueueSnackbar('Connection Error!', { variant });
    });

    setLoadingCreate(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            // marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#3B5B40' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField required
                  margin="normal"
                  fullWidth
                  id="fName"
                  label="First Name"
                  name="fName"
                  type="text"
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
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField required
                  margin="normal"
                  fullWidth
                  id="lName"
                  label="Last Name"
                  name="lName"
                  type="text"
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
                />
              </Grid>
            </Grid>

            <TextField required
              margin="normal"
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              type="Number"
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
            />
            <TextField required
              margin="normal"
              fullWidth
              id="email"
              label="Email"
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
            />
            <TextField required
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
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
            />

            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label" style={{ margin: "10px 0", color: "black" }}>I want to be a</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={category}
                onChange={handleCategoryChange}
                sx={{
                  '& .Mui-focused': {
                    color: 'inherit',
                  },
                }}
              >
                <FormControlLabel
                  value="buyer"
                  control={<Radio color="success" />} // Set the color prop to "success"
                  label="Buyer"
                />
                <FormControlLabel
                  value="seller"
                  control={<Radio color="success" />} // Set the color prop to "success"
                  label="Seller"
                />
              </RadioGroup>
            </FormControl>

            <div style={{textAlign:"right"}} onClick={(e)=>{
              e.preventDefault();
              setValue(1);
            }}>
            
            <Link href="#" variant="body2">
                  {"Already have an account? Login"}
                </Link>
            </div>

            {!loadingCreate && <Button
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
              Create Account
            </Button>}

              {loadingCreate && <LoadingButton
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