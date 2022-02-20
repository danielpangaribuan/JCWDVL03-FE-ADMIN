import React from "react";
import { useDispatch } from 'react-redux';
import { Routes, Route, Outlet } from 'react-router-dom';

// ====== COMPONENT =====
import Header from './components/header';
import Footer from './components/footer'; 
import Sidebar from './components/sidebar';

// ====== PAGES =====
import Home from './pages/home';
import UserMembers from './pages/userMembers';

function App() {
  return (
    <div className="App">
      <section>
        <Sidebar />
        <Header />
        <div className="main-content">
          <Routes>
            <Route path="" element={<Home />} />
            {/* <Route path="login" element={<Login />} /> */}
            {/* <Route path="products" element={<Products />} /> */}
            {/* <Route path="transaction" element={<Transaction />} /> */}
            {/* <Route path="report" element={<Report />} /> */}
            <Route path="user-members" element={<UserMembers />} />
            {/* <Route path="userAdmin" element={<UserAdmin />} /> */}
          </Routes>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
