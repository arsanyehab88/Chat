import React from 'react'
import { Outlet } from 'react-router-dom'
import Navigation from "../Navbar/Navigation"


export default function MainLayOut() {
    return (
        <>
            <Navigation />
            <Outlet />
        </>
    )
}
