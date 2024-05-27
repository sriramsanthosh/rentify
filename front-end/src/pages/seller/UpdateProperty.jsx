import React from 'react'
import UpdateProperty from '../../components/SellerUpdateProperty'
import PageRestrictedAccess from '../../components/PageRestrictedAccess'
import { NavLink } from 'react-router-dom'
import Footer from '../../components/Footer'

export default function UpdatePropertyPage() {
  return (
    <div>
      {localStorage.getItem("category")==="seller"?<UpdateProperty />:<div style={{textAlign:"center"}}><PageRestrictedAccess /> <div>If you are a seller, please <NavLink to="/access">Login</NavLink></div> <Footer/> </div>}
    </div>
  )
}
