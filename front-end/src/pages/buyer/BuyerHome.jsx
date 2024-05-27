import React from 'react'
import Button from '@mui/material/Button';
import RecipeReviewCard from "../../components/BuyerPropertyCard";
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import { useSnackbar } from 'notistack';
import CircularLoader from '../../components/loaders/CircularLoader';
import PageInternalServerError from '../../components/PageInternalServerError';

export default function BuyerHome() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const [fetchEach, setfetchEach] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const [propertiesIdArray, setPropertiesIdArray] = useState([]);
    const [propertiesArray, setPropertiesArray] = useState([]);

    const handleQueryForm = (e) => {
        e.preventDefault();
    }

    const fetchProperties = async () => {
        setServerError(false);
        try {
            const res = await Axios.get(`${process.env.REACT_APP_SERVER}/property`);
            if (res.status === 200) {
                if(res.data.PropertiesIdArray.length>0){
                    setPropertiesIdArray(res.data.PropertiesIdArray);
                }
            } else {
                enqueueSnackbar(res.data.message, { variant: "error" });
            }
        } catch (err) {
            console.log(err);
            setServerError(true);
            enqueueSnackbar("Connection Error..", { variant: "error" });
        }
    }

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
        if (propertiesIdArray.length > 0) {
            fetchEachProperty();
        }
    }, [propertiesIdArray]);

    return (
        <div>
            <h1 className='text-center'>Welcome to Rentify</h1>
            <p className='text-center'>In a search to find a rental house? Find on Rentify</p>
            <form onSubmit={handleQueryForm} style={{ width: "100%", textAlign: "center" }}>
                <p className='searchContainer'>
                    <input placeholder='Location..' className='searchBox' type="text" value={searchQuery} autoFocus onChange={(e) => {
                        e.preventDefault();
                        setSearchQuery(e.target.value)
                    }} />
                    <SearchIcon className='searchIcon' />
                </p>
                {searchQuery.length > 0 && <div>Searching for '{searchQuery}'</div>}
            </form>
            {serverError && <PageInternalServerError />}
            {!serverError && propertiesArray.length === 0 &&
                <div style={{ margin: "50px", textAlign: "center" }}>
                    <CircularLoader />
                </div>}

            {propertiesArray.length > 0 && <p className='text-center'>Fetched {propertiesArray.length} out of {propertiesIdArray.length} results</p>}

            {propertiesArray.length > 0 && <div style={{ display: "flex", flexWrap: "wrap", width: "100%", justifyContent: "center" }}>

                {propertiesArray.map((eachProperty, index) => (
                    <RecipeReviewCard key={index} propertyData={eachProperty} CardId={`property${index}`} />
                ))}

                {fetchEach && <div style={{ width: "315px", paddingTop:"250px", margin: "10px", textAlign: "center" }}>
                    <CircularLoader />
                </div>}

            </div>}
        </div>
    )
}
