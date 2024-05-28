import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div style={{ margin: "10px" }}><div style={{ textAlign: "center", margin: "auto", marginTop: "50px", border: "2px solid green", fontSize: "20px", maxWidth: "500px", padding: "50px 5px", fontWeight: "bold" }}>
      <h2>Page Not Found</h2>
      <h1>404</h1>
      <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>The Page you are looking for doesn't exist or an other error occured. Go back to <NavLink to="/">Home</NavLink></div>
    </div>
    </div>
  )
}