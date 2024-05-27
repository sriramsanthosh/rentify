import Footer from "../components/Footer";
import BuyerHome from "./buyer/BuyerHome";
import SellerHome from "./seller/SellerHome";


const Home = () => {
    
    return (
        <div>
            {localStorage.getItem("category") === "seller" && <SellerHome /> }
            {localStorage.getItem("category") !== "seller" && <BuyerHome /> }
            <Footer />
        </div>
    )

}

export default Home;
