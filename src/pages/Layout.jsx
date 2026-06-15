import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '../components/layout/Footer';

function Layout() {
  const [search, setSearch] = useState("");

  const location = useLocation();
  const hideFooterRoutes = ["/profile"];


  return (
    <div>
      <Navbar search={search} setSearch={setSearch}/>
      <Outlet context={{search}}/>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
    </div>
  )
}

export default Layout;
