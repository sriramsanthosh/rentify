import React from 'react'
import CreateProperty from '../../components/SellerCreateProperty'
import PageRestrictedAccess from '../../components/PageRestrictedAccess'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function NewProperty() {
  return (
    <div>
      {localStorage.getItem("category")==="seller"?<CreateProperty />:<div style={{textAlign:"center"}}><PageRestrictedAccess /> <div>If you are a seller, please <NavLink to="/access">Login</NavLink></div> <Footer/> </div>}
    </div>
  );
}