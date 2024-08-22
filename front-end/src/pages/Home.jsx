import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import BuyerHome from "./buyer/BuyerHome";
import SellerHome from "./seller/SellerHome";


const Home = ({categoryOfUser, setCatergoyOfUser}) => {
    
    useEffect(()=>{

    }, [categoryOfUser]);
    
    return (
        <div>
            {localStorage.getItem("category") === "seller" && <SellerHome setCatergoyOfUser={setCatergoyOfUser} /> }
            {localStorage.getItem("category") !== "seller" && <BuyerHome setCatergoyOfUser={setCatergoyOfUser} /> }
            <Footer />
        </div>
    )

}

export default Home;
