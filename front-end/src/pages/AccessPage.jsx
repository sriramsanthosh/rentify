import Login from "../components/login";

import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Register from "../components/register";


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function AccessPage() {
  const [value, setValue] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <Box sx={{ width: '100%', margin:"auto"}}>
      <Box sx={{ borderColor: 'red'}}>
        <Tabs  textColor="inherit" 
          indicatorColor="primary"
          sx={{
            width: "100%",
            '& .MuiTabs-indicator': { backgroundColor: 'green' },
            '& .MuiTab-root': { color: 'green' },
            '& .Mui-selected': { color: 'darkgreen' }
          }} value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab sx={{width:"50%", margin:"auto"}} label="Register" {...a11yProps(0)} />
          <Tab sx={{width:"50%", margin:"auto"}} label="Login" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Register setValue={setValue} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Login setValue={setValue} />
      </CustomTabPanel>

    </Box>
  );
}

