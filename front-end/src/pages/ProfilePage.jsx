import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import ProfileInfo from '../components/profile/profile-info';
import ProfileDetails from '../components/profile/profile-details';
import Footer from '../components/Footer';


export default function ProfilePage(){
  return (
    <Stack spacing={3}>
      <div>
        <Typography variant="h4" sx={{textAlign:"center", marginTop:2}}>My Account Details</Typography>
      </div>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <ProfileInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <ProfileDetails />
        </Grid>
      </Grid>
      <Footer />
    </Stack>
  );
}