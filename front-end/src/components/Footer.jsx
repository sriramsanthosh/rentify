
import { Link, Typography } from '@mui/material';
import React from 'react'


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

export default function Footer() {
  return (
    <div>
      <Copyright sx={{ mt: 4, mb: 4 }} />
    </div>
  )
}
