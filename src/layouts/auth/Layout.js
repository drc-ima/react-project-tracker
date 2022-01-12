import Login from "../../pages/Login";
import {Routes, Route, Outlet } from 'react-router-dom';
import Signup from "../../pages/Signup";
import React from 'react';

function Layout() {

    return (
        <>
        <Outlet />
        </>

    );
}

export default Layout;