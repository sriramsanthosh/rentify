import React from 'react'
import { NavLink } from 'react-router-dom'

export default function PageInternalServerError() {
    return (
        <div style={{ margin: "10px" }}><div style={{ textAlign: "center", margin: "auto", marginTop: "50px", border: "2px solid green", fontSize: "20px", maxWidth: "500px", padding: "50px 5px", fontWeight: "bold" }}>
            <h2>Internal Server Error</h2>
            <h1>500</h1>
            <div style={{ width: "80%", margin: "auto" }}>The server encountered an internal error or misconfiguration and was unable to complete your request. <NavLink onClick={(e)=>{
                e.preventDefault();
                window.location.reload();
            }}>Refresh Page</NavLink> </div>
        </div></div>
    )
}
