import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Axios from 'axios';
import PropertyCard from '../../components/SellerPropertyCard';
import CircularLoader from '../../components/loaders/CircularLoader';
import PageInternalServerError from '../../components/PageInternalServerError';

export default function SellerHome() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [serverError, setServerError] = useState(false);
  const [propertiesIdArray, setPropertiesIdArray] = useState([]);
  const [PropertiesArray, setPropertiesArray] = useState([]);
  const [loader, setLoader] = useState(false);
  const [fetchEach, setfetchEach] = useState(false);
  const [deletedProperty, setDeletedProperty] = useState(true);

  const fetchProperties = async () => {
    try {
      setLoader(true);
      setServerError(false);
      const token = localStorage.getItem("token");
      const res = await Axios.get(`${process.env.REACT_APP_SERVER}/seller/fetch-all`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.status === 200) {
        if(res.data.PropertiesIdArray.length>0){
          setPropertiesIdArray(res.data.PropertiesIdArray);
        }
      }
      else {
        let variant = "error";
        enqueueSnackbar(res.data.message, { variant });
      }
    }
    catch (err) {
      console.log(err);
      setServerError(true);
      let variant = "error";
      enqueueSnackbar("Connection Error..", { variant });
    }
    setLoader(false);
  };

  const fetchEachProperty = async () => {
    setfetchEach(true);
    for (const propertyId of propertiesIdArray) {
      try {
        const res = await Axios.get(`${process.env.REACT_APP_SERVER}/property/fetch?id=${propertyId}`);
        if (res.status === 200) {
          setPropertiesArray(prevArray => [...prevArray, res.data.PropertyData]);
        } else {
          enqueueSnackbar(res.data.message, { variant: "error" });
        }
      } catch (err) {
        console.log(err);
        setServerError(true);
        enqueueSnackbar("Connection Error..", { variant: "error" });
      }
    }
    setfetchEach(false);
  }


  useEffect(() => {
    if (propertiesIdArray.length === 0) {
      fetchProperties();
    }
    if (propertiesIdArray.length > 0 && PropertiesArray.length === 0) {
      fetchEachProperty();
    }
  }, [propertiesIdArray, deletedProperty]);

  return (
    <div>
      <h1 className='text-center'>Welcome to Rentify</h1>
      <p className='text-center'>In a search to rent a house? Reach out to buyers on Rentify</p>
      <div style={{ textAlign: "center" }}>
        <Button
          variant='contained'
          color='success'
          onClick={(e) => {
            e.preventDefault();
            navigate("/new-property");
          }}
        >
          <i style={{ color: "white" }} className="fa-solid fa-square-plus"></i>&nbsp; New Property
        </Button>
      </div>
      {serverError && <PageInternalServerError />}
      {!serverError && <div>{!loader && PropertiesArray.length === 0 && <h3 style={{ textAlign: "center" }}>No Properties to show</h3>}
        {loader && <div style={{ margin: "50px", textAlign: "center" }}>
          <CircularLoader />
        </div>}

        {PropertiesArray.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", width: "100%", marginTop: "20px", justifyContent: "center" }}>
          {PropertiesArray.length > 0 && PropertiesArray.map((eachProperty, index) => {
            return <PropertyCard id={eachProperty._id} key={index} propertyData={eachProperty} setDeletedProperty={setDeletedProperty} deletedProperty={deletedProperty} />;
          })}
          {fetchEach && <div style={{ width: "315px", paddingTop: "200px", margin: "10px", textAlign: "center" }}>
            <CircularLoader />
          </div>}
        </div>}</div>}

    </div>
  );
}
