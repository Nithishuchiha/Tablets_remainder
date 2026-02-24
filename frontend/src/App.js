import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Medications from './components/Medications';
import Contacts from './components/Contacts';
import Dashboard from './components/Dashboard';
import './App.css';

// API URL configuration - uses environment variable or defaults to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [whatsappStatus, setWhatsappStatus] = useState(false);

  useEffect(() => {
    checkWhatsAppStatus();
    const interval = setInterval(checkWhatsAppStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  const checkWhatsAppStatus = async () => {
    try {
      const response = await fetch(`${API_URL}/api/whatsapp/status`);
      const data = await response.json();
      setWhatsappStatus(data.ready);
    } catch (error) {
      console.error('Failed to check WhatsApp status:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1>💊 Tablet Reminder</h1>
            <div className="whatsapp-status">
              <span className={`status-indicator ${whatsappStatus ? 'connected' : 'disconnected'}`}></span>
              <span className="status-text">
                WhatsApp: {whatsappStatus ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </header>

        <nav className="nav-bar">
          <Link to="/" className="nav-link">📊 Dashboard</Link>
          <Link to="/medications" className="nav-link">💊 Medications</Link>
          <Link to="/contacts" className="nav-link">👥 Contacts</Link>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard whatsappReady={whatsappStatus} />} />
            <Route path="/medications" element={<Medications />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>Made with ❤️ for family health</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
