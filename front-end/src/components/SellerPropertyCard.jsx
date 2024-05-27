import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';

import { useNavigate } from 'react-router-dom';
import Axios from "axios"

export default function PropertyCard({ key, id, propertyData, setDeletedProperty, deletedProperty }) {
    const Navigate = useNavigate();
    const [visibility, setvisibility] = React.useState(true);
    const [loadDelete, setLoadDelete] = React.useState(false);
    const handleDeleteClick = async (e) => {
        e.preventDefault();
        setLoadDelete(true);
        const token = localStorage.getItem("token");
        await Axios.delete(`${process.env.REACT_APP_SERVER}/property/delete?id=${propertyData._id}&sellerId=${propertyData.seller._id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            
            if (res.status === 200) {
                setvisibility(false);
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    return (

        <div>{visibility && <Card id={`card${key}`} sx={{ minWidth: "300px", margin: "10px", background: "#d6f1d6", }}>
            {propertyData.images.length === 0 && <CardMedia
                sx={{ height: 140 }}
                image={require("../images/smaple image.jpg")}
                title="no-image"
            />}
            {propertyData.images.length > 0 && <CardMedia
                sx={{ height: 140 }}
                image={propertyData.images[0]}
                title="no-image"
            />}
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    <b style={{ backgroundColor: "#3B5B40", color: "white", borderRadius: '8px', userSelect: "none" }}>&nbsp;{propertyData.interested.length}&nbsp;</b> Interested
                </Typography>

                <Typography variant="body2" color="text.secondary">

                    <p><b style={{ backgroundColor: "#3B5B40", color: "white", borderRadius: '8px', userSelect: "none" }}>&nbsp;{propertyData.bhk}&nbsp;</b> BHK {propertyData.attachedBathroom ? "(attached bathroom)" : ""}</p>
                    <p><b><i className="fa-solid fa-location-dot"></i></b> {propertyData.village === propertyData.city ? `${propertyData.city}, ${propertyData.state}` : `${propertyData.village}, ${propertyData.city}`}</p>
                    <p><i className="fa-solid fa-indian-rupee-sign"></i>&nbsp;{propertyData.rent} (per month)</p>
                    <p><i className="fa-solid fa-heart"></i>&nbsp;{propertyData.likes.length} Likes</p>
                </Typography>

                <div style={{ right: "0", textAlign: "right" }}>
                    <Button onClick={(e) => {
                        e.preventDefault();
                        Navigate(`/update-property?id=${propertyData._id}`);
                    }} size="small" variant='outlined' color='success' id={`editButton${key}`}>Edit</Button> &nbsp;
                    {!loadDelete && <Button onClick={handleDeleteClick} size="small" variant='outlined' color='error' id={`deleteButton${key}`}>Delete</Button>}
                    {loadDelete && <LoadingButton size="small" color='error' loading variant="outlined">
                        Delete
                    </LoadingButton>}
                </div>
            </CardContent>

        </Card>}
        </div>

    );
}