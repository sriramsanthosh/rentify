import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { brown, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import  Axios  from 'axios';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import { useRef } from 'react';


export default function RecipeReviewCard({ CardId, propertyData }) {
  const Navigate = useNavigate();
  const [userLiked, setUserliked] = React.useState(false);

  React.useEffect(()=>{
    const LikesArray = propertyData.likes;
    console.log(propertyData);
    console.log(LikesArray);
    let user_id = localStorage.getItem("user_id");
    for(let i = 0; i<LikesArray.length; i++){
      if(LikesArray[i] === user_id){
        const likeIcon = document.getElementById(`${CardId}Like`);
        likeIcon.style.color = "green";
      }
    }
  }, [])

  const monthArray = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
  
  const [loadingButton, setLoadingButton] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [expanded, setExpanded] = React.useState(false);
  const [likes, setLikes] = React.useState(propertyData.likes.length);
  const [interested, setInterested] = React.useState(false);
  
  const audioRef = useRef(null);
  const audioRef2 = useRef(null);

  const handleLikeAction = async(e) => {
    e.preventDefault();

    const likeIcon = document.getElementById(`${CardId}Like`);
    const token = localStorage.getItem("token");
    if (likeIcon.style.color === "green") {
      if (audioRef2.current) {
        audioRef2.current.play();
      }
      likeIcon.style.color = "lightgray"
      setLikes(likes - 1);
      await Axios.post(`${process.env.REACT_APP_SERVER}/property/toggle-like?id=${propertyData._id}`, {like: false}, {headers:{Authorization: `Bearer ${token}`}}).then((res)=>{
        console.log(res.data.message);
      }).catch((err)=>{
        console.log(err);
      });
    }
    else {
      if (audioRef.current) {
        audioRef.current.play();
      }
      likeIcon.style.color = "green";
      setLikes(likes + 1);
      await Axios.post(`${process.env.REACT_APP_SERVER}/property/toggle-like?id=${propertyData._id}`,{like: true}, {headers:{Authorization: `Bearer ${token}`}}).then((res)=>{
        console.log(res.data.message);
      }).catch((err)=>{
        console.log(err);
      });
    }
  }
  return (
    <Card sx={{
      width: "315px", margin: "10px", background: "#d6f1d6",
    }}>
      {localStorage.getItem("isLogged") && <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {propertyData.seller.fName[0]}
          </Avatar>
        }
        action={
          <IconButton onClick={handleLikeAction} aria-label="add to favorites">
            <FavoriteIcon style={{ color: "lightgray" }} className='like-icon' id={`${CardId}Like`} />
            <Typography>
              &nbsp;{likes}
            </Typography>
            <audio ref={audioRef} src={require("../audio/bubble_like.mp3")} />
            <audio ref={audioRef2} src={require("../audio/bubble_dislike.wav")} />
          </IconButton>
        }
        title={propertyData.seller.fName+" "+propertyData.seller.lName}
        subheader={`${monthArray[Number(propertyData.createdAt.substring(5,7)-1)]} ${propertyData.createdAt.substring(8,10)}, ${propertyData.createdAt.substring(0,4)}`}
        // September 14, 2016
      />}
      {propertyData.images.length===0 && <CardMedia
        component="img"
        height="180"
        image={require("../images/smaple image.jpg")}
        alt="room-img"
      />}
      {propertyData.images.length!==0 && <CardMedia
        component="img"
        height="180"
        image={propertyData.images[0]}
        alt="room-img"
      />}
      <CardContent>
        <p><b style={{ backgroundColor: "#3B5B40", color: "white", borderRadius: '8px', userSelect: "none" }}>&nbsp;{propertyData.area}&nbsp;</b> Sq.feet Area</p>
        <p><b style={{ backgroundColor: "#3B5B40", color: "white", borderRadius: '8px', userSelect: "none" }}>&nbsp;{propertyData.bhk}&nbsp;</b> BHK {propertyData.attachedBathroom? "(attached bathroom)": ""}</p>
        <p><b><i className="fa-solid fa-location-dot"></i></b> {propertyData.village===propertyData.city? `${propertyData.city}, ${propertyData.state}`: `${propertyData.village}, ${propertyData.city}`}</p>
        <p><i className="fa-solid fa-stethoscope"></i> {propertyData.hospital[0]}</p>
        <p><i className="fa-solid fa-school"></i> {propertyData.school[0]}</p>
        <p><i className="fa-solid fa-indian-rupee-sign"></i> {propertyData.rent}/- per month</p>

        {!interested && !loadingButton && <Button
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
          onClick={async(e) => {
            e.preventDefault();
            setLoadingButton(true);
            if (!localStorage.getItem("isLogged")) {
              let variant = "error";
              enqueueSnackbar("Please Login..", { variant });
              Navigate("/access");
            }
            else {
              const token = localStorage.getItem("token");
              
              try {
                const res = await Axios.post(`${process.env.REACT_APP_SERVER}/send-email`, {propertyData: propertyData}, {
                  headers: {
                    Authorization: `Bearer ${token}`
                  }
                });
                
                if(res.status===200){
                  let variant = "success";
                  enqueueSnackbar(res.data.message, { variant });
                  
                }
                else{
                  let variant = "error";
                  enqueueSnackbar(res.data.message, { variant });
                }
                setInterested(true);
              } catch (err) {
                console.log(err);
                let variant = "error";
                enqueueSnackbar("Try Again", { variant });
              }
              setLoadingButton(false);
            }
          }}
          >
          <i className="fa-regular fa-hand" style={{ color: "white" }}></i> &nbsp; I'm Interested
        </Button>}

        {loadingButton && <LoadingButton
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
                Sending Emails..
              </LoadingButton>}
        {interested && <Button variant="contained" disabled type="submit"
          fullWidth
          sx={{
            mt: 3,
            mb: 2,
            backgroundColor: '#3B5B40',
            '&:hover': {
              backgroundColor: '#2C4A32',
            },
          }}>
          Email Sent.. Check Inbox
        </Button>}
      </CardContent>
    </Card>
  );
}