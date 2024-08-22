import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { TextField } from '@mui/material';

const states = [
    { value: 'andhra-pradesh', label: 'Andhra Pradesh' },
    { value: 'arunachal-pradesh', label: 'Arunachal Pradesh' },
    { value: 'assam', label: 'Assam' },
    { value: 'bihar', label: 'Bihar' },
    { value: 'chhattisgarh', label: 'Chhattisgarh' },
    { value: 'goa', label: 'Goa' },
    { value: 'gujarat', label: 'Gujarat' },
    { value: 'haryana', label: 'Haryana' },
    { value: 'himachal-pradesh', label: 'Himachal Pradesh' },
    { value: 'jharkhand', label: 'Jharkhand' },
    { value: 'karnataka', label: 'Karnataka' },
    { value: 'kerala', label: 'Kerala' },
    { value: 'madhya-pradesh', label: 'Madhya Pradesh' },
    { value: 'maharashtra', label: 'Maharashtra' },
    { value: 'manipur', label: 'Manipur' },
    { value: 'meghalaya', label: 'Meghalaya' },
    { value: 'mizoram', label: 'Mizoram' },
    { value: 'nagaland', label: 'Nagaland' },
    { value: 'odisha', label: 'Odisha' },
    { value: 'punjab', label: 'Punjab' },
    { value: 'rajasthan', label: 'Rajasthan' },
    { value: 'sikkim', label: 'Sikkim' },
    { value: 'tamil-nadu', label: 'Tamil Nadu' },
    { value: 'telangana', label: 'Telangana' },
    { value: 'tripura', label: 'Tripura' },
    { value: 'uttar-pradesh', label: 'Uttar Pradesh' },
    { value: 'uttarakhand', label: 'Uttarakhand' },
    { value: 'west-bengal', label: 'West Bengal' },
    { value: 'andaman-and-nicobar-islands', label: 'Andaman and Nicobar Islands' },
    { value: 'chandigarh', label: 'Chandigarh' },
    { value: 'dadra-and-nagar-haveli-and-daman-and-diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
    { value: 'lakshadweep', label: 'Lakshadweep' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'puducherry', label: 'Puducherry' },
    { value: 'ladakh', label: 'Ladakh' },
    { value: 'jammu-and-kashmir', label: 'Jammu and Kashmir' }
];


export default function ProfileDetails() {
    return (
        <form
            onSubmit={(event) => {
                event.preventDefault();
            }}
            
        >
            <Card sx={{backgroundColor:"#D6F1D6"}}>
                <CardHeader subheader="The information can be edited" title="Profile" />
                <Divider />
                <CardContent >
                    <Grid container spacing={3}>
                        <Grid md={6} xs={12}>
                            <TextField sx={formInputTheme}
                                fullWidth
                                id="fName"
                                label="First Name"
                                name="fName"
                                type="text"
                                defaultValue="Sofia"
                                required
                            />
                        </Grid>
                        <Grid md={6} xs={12}>
                            <TextField sx={formInputTheme}
                                fullWidth
                                id="lName"
                                label="Last Name"
                                name="lName"
                                type="text"
                                defaultValue="Ram"
                                required
                            />

                        </Grid>
                        <Grid md={6} xs={12}>
                            <TextField sx={formInputTheme}
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                defaultValue="sofiaram@email.com"
                                disabled
                                required
                            />
                        </Grid>
                        <Grid md={6} xs={12}>
                            <TextField sx={formInputTheme}
                                fullWidth
                                id="phone"
                                label="Phone"
                                name="phone"
                                type="number"
                                defaultValue="1234567890"
                                required
                            />

                        </Grid>
                        <Grid md={6} xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>State</InputLabel>
                                <Select defaultValue="New York" label="State" name="state" variant="outlined">
                                    {states.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid md={6} xs={12}>
                            <TextField sx={formInputTheme}
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                type="text"
                                defaultValue="Kadapa"
                                required
                            />

                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end' }}>
                    <Button variant="contained" style={{background:"crimson"}}>Delete my account</Button>
                    <Button variant="contained" style={{background:"#3B5B40"}}>Save details</Button>
                </CardActions>
            </Card>
        </form>
    );
}


const formInputTheme = {
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
}