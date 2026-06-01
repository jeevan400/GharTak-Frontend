import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../components/layout/Footer';

function Layout() {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Navbar search={search} setSearch={setSearch}/>
      <Outlet context={{search}}/>
      <Footer/>
    </div>
  )
}

export default Layout;
