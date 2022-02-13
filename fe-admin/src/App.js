import React from "react";

// ====== COMPONENT =====
import Header from './components/header';
import Footer from './components/footer'; 
import Sidebar from './components/sidebar';

// ====== PAGES =====
import Home from './pages/home';

function App() {
  return (
    <div className="App">
      <section>
        <Sidebar />
        <Header />
        <div className="main-content">
          <Home />
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default App;
