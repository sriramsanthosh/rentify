import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageRestrictedAccess() {
  return (
    <div style={{ margin: "10px" }}><div style={{ textAlign: "center", margin: "auto", marginTop: "50px", border: "2px solid green", fontSize: "20px", maxWidth: "500px", padding: "50px 5px", fontWeight: "bold" }}>
      <h2>Access Denied</h2>
      <h1>403</h1>
      <div style={{ width: "80%", margin: "auto", textAlign: "center" }}>Forbidden.. You do not have access to this page. Return back to <NavLink to="/">Home</NavLink></div>
    </div></div>
  )
}
