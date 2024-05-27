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
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddHomeIcon from '@mui/icons-material/AddHome';
import CircularLoader from './loaders/CircularLoader';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">Rentify</Link> {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default function UpdateProperty() {
    const [searchParams] = useSearchParams();
    const PropertyId = searchParams.get('id');
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [attachedBathroom, setAttachedBathroom] = React.useState('no');
    const [loadingCreate, setLoadingCreate] = React.useState(false);
    const [images, setImages] = React.useState([]);

    const [PropertyData, setPropertyData] = React.useState();

    const handleImageChange = (event) => {
        const files = event.target.files;
        const fileReaders = [];
        const imagePromises = Array.from(files).map((file) => {
            return new Promise((resolve, reject) => {
                const fileReader = new FileReader();
                fileReaders.push(fileReader);
                fileReader.onload = (e) => resolve(e.target.result);
                fileReader.onerror = reject;
                fileReader.readAsDataURL(file);
            });
        });

        Promise.all(imagePromises)
            .then((imageUrls) => {
                setImages((prevImages) => [...prevImages, ...imageUrls]);
            })
            .catch((error) => {
                console.error('Error reading files:', error);
            });
    };

    const handleDeleteImage = (imageUrl) => {
        setImages((prevImages) => prevImages.filter((image) => image !== imageUrl));
    };

    const handleCategoryChange = (event) => {
        setAttachedBathroom(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoadingCreate(true);
        const data = new FormData(event.currentTarget);
        if (attachedBathroom === '') {
            let variant = "error";
            enqueueSnackbar("Select the attached bathroom status..", { variant });
            setLoadingCreate(false);
            return;
        }

        const propertyData = {
            area: data.get('area'),
            bhk: data.get('bhk'),
            rent: data.get('rent'),
            address: data.get('address'),
            village: data.get('village'),
            city: data.get('district'),
            state: data.get('state'),
            school: data.get('school'),
            hospital: data.get('hospital'),
            attachedBathroom: attachedBathroom,
            images: images, // Base64 encoded images
        };
        const token = localStorage.getItem("token");
        // setTimeout(async() => {
        await Axios.post(`${process.env.REACT_APP_SERVER}/property/update`, propertyData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(async(res) => {
                if (res.status === 200) {
                    let variant = "success";
                    enqueueSnackbar(res.data.message, { variant });
                    // navigate('/properties'); // Redirect after successful creation
                } else {
                    let variant = "error";
                    enqueueSnackbar(res.data.message, { variant });
                }
            })
            .catch(async (err) => {
                console.log("err", err);
                let variant = 'error';
                enqueueSnackbar('Connection Error!', { variant });
            });

        // }, 5000);
        setLoadingCreate(false);
    };


    const fetchPropertyData = async()=>{
        const token = localStorage.getItem("token");
        await Axios.get(`${process.env.REACT_APP_SERVER}/property/fetch?id=${PropertyId}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }).then((res)=>{
              let variant = "success";
              enqueueSnackbar(res.data.message, { variant });
              setPropertyData(res.data.PropertyData);
              setImages(res.data.PropertyData.images);
              if(res.data.PropertyData.attachedBathroom){
                  setAttachedBathroom("yes");
              }
          }).catch((err)=>{
            console.log(err);
            let variant = 'error';
            enqueueSnackbar('Connection Error!', { variant });
          });
    }

    React.useEffect(()=>{
        fetchPropertyData();
    }, []);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main"
            // maxWidth="xs"
            >
                <CssBaseline />
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: '#3B5B40' }}>
                        <AddHomeIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Update Property
                    </Typography>
                    {!PropertyData && <div style={{ margin: "50px", textAlign: "center" }}>
                        <CircularLoader />
                    </div>}
                    {PropertyData && <Box component="form" onSubmit={handleSubmit} Validate sx={{ mt: 1, width: "100%" }}>
                        <Grid container spacing={2}>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="area"
                                    label="Plot Area (in sq.feet)"
                                    name="area"
                                    type="Number"
                                    defaultValue={PropertyData.area}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="bhk"
                                    label="BHK"
                                    name="bhk"
                                    type="Number"
                                    defaultValue={PropertyData.bhk}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <div style={{ textAlign: "center" }}>

                                    <FormControl>
                                        <FormLabel id="demo-row-radio-buttons-group-label" style={{ margin: "10px 0", color: "black" }}>
                                            Attached Bathroom?
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={attachedBathroom}
                                            onChange={handleCategoryChange}
                                            sx={{ '& .Mui-focused': { color: 'inherit' } }}
                                        >
                                            <FormControlLabel value="yes" control={<Radio color="success" />} label="Yes" />
                                            <FormControlLabel value="no" control={<Radio color="success" />} label="No" />
                                        </RadioGroup>
                                    </FormControl>
                                </div>
                            </Grid>


                        </Grid>


                        <div style={{ margin: "15px 0" }}>
                            <FormLabel>Property Photos</FormLabel>
                            <br />
                            <input
                                accept="image/*"
                                style={{ display: 'none' }}
                                id="contained-button-file"
                                multiple
                                type="file"
                                onChange={handleImageChange}
                            />
                            <label htmlFor="contained-button-file">
                                <Button
                                    style={{ margin: "10px 0", color: '#3B5B40', borderColor: '#3B5B40' }}
                                    component="span"
                                    role={undefined}
                                    variant="outlined"
                                    tabIndex={-1}
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Upload
                                </Button>
                            </label>
                        </div>

                        <Grid container spacing={2}>
                            {images.map((imageSrc, index) => (
                                <Grid item xs={12} sm={4} key={index}>
                                    <Box position="relative">
                                        <img src={imageSrc} alt="Uploaded" style={{ maxWidth: '100%', marginBottom: '10px' }} />
                                        <IconButton
                                            onClick={() => handleDeleteImage(imageSrc)}
                                            sx={{
                                                position: 'absolute',
                                                top: 5,
                                                right: 5,
                                                backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                                '&:hover': { backgroundColor: 'rgba(255, 255, 255, 1)' },
                                            }}
                                        >
                                            <CloseIcon />
                                        </IconButton>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="rent"
                                    label="Rent per month"
                                    name="rent"
                                    type="number"
                                    defaultValue={PropertyData.rent}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    id="address"
                                    label="Address"
                                    name="address"
                                    type="text"
                                    defaultValue={PropertyData.address}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="village"
                                    label="Village / City"
                                    type="text"
                                    id="village"
                                    defaultValue={PropertyData.village}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="district"
                                    label="District"
                                    type="text"
                                    id="district"
                                    defaultValue={PropertyData.city}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="state"
                                    label="State"
                                    type="text"
                                    id="state"
                                    defaultValue={PropertyData.state}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="school"
                                    label="School (Near by)"
                                    type="text"
                                    id="school"
                                    defaultValue={PropertyData.school}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    margin="normal"
                                    fullWidth
                                    name="hospital"
                                    label="Hospital (Near by)"
                                    type="text"
                                    id="hospital"
                                    defaultValue={PropertyData.hospital}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': { borderColor: 'green' },
                                            '&:hover fieldset': { borderColor: 'darkgreen' },
                                            '&.Mui-focused fieldset': { borderColor: 'green' },
                                        },
                                        '& .MuiInputLabel-root': { color: 'green' },
                                        '& .MuiInputLabel-root.Mui-focused': { color: 'darkgreen' },
                                    }}
                                />
                            </Grid>
                        </Grid>

                        {!loadingCreate && (
                            <Button
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
                                Update Property
                            </Button>
                        )}

                        {loadingCreate && (
                            <LoadingButton
                                loading
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="outlined"
                                type="submit"
                                fullWidth
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Loading
                            </LoadingButton>
                        )}
                    </Box>}
                </Box>
                <Copyright sx={{ mt: 4, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}
