import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Dashboard({ whatsappReady }) {
  const [medications, setMedications] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({ totalMeds: 0, activeMeds: 0, totalContacts: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [medsResponse, contactsResponse] = await Promise.all([
        axios.get(`${API_URL}/api/medications`),
        axios.get(`${API_URL}/api/contacts`)
      ]);

      const meds = medsResponse.data;
      const cons = contactsResponse.data;

      setMedications(meds);
      setContacts(cons);
      setStats({
        totalMeds: meds.length,
        activeMeds: meds.filter(m => m.active).length,
        totalContacts: cons.length
      });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getNextReminder = () => {
    if (medications.length === 0) return null;

    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();

    let nextReminder = null;
    let minDiff = Infinity;

    medications.forEach(med => {
      if (!med.active) return;

      med.times.forEach(time => {
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        let diff = timeInMinutes - currentTime;

        if (diff < 0) diff += 24 * 60; // Next day

        if (diff < minDiff) {
          minDiff = diff;
          nextReminder = { med, time };
        }
      });
    });

    return nextReminder;
  };

  const nextReminder = getNextReminder();

  return (
    <div className="dashboard">
      <h2 className="page-title">📊 Dashboard</h2>

      {!whatsappReady && (
        <div className="alert alert-warning">
          ⚠️ WhatsApp is not connected! Please check your backend server and scan the QR code to enable reminders.
        </div>
      )}

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💊</div>
          <div className="stat-content">
            <h3>{stats.totalMeds}</h3>
            <p>Total Medications</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-content">
            <h3>{stats.activeMeds}</h3>
            <p>Active Reminders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.totalContacts}</h3>
            <p>Family Contacts</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">{whatsappReady ? '📱' : '❌'}</div>
          <div className="stat-content">
            <h3>{whatsappReady ? 'Connected' : 'Disconnected'}</h3>
            <p>WhatsApp Status</p>
          </div>
        </div>
      </div>

      {nextReminder && (
        <div className="card next-reminder-card">
          <h3 className="card-title">⏰ Next Reminder</h3>
          <div className="next-reminder-content">
            <div className="reminder-med-name">{nextReminder.med.name}</div>
            <div className="reminder-time">🕐 {nextReminder.time}</div>
            <div className="reminder-dosage">📋 {nextReminder.med.dosage}</div>
          </div>
        </div>
      )}

      <div className="card">
        <h3 className="card-title">📝 Quick Start Guide</h3>
        <ol className="guide-list">
          <li>
            <strong>Add Family Contacts:</strong> Go to the Contacts tab and add phone numbers of family members who should receive reminders.
            <br /><small>Format: Country code + number (e.g., 919876543210 for India)</small>
          </li>
          <li>
            <strong>Add Medications:</strong> Go to the Medications tab and add your dad's medicines with their dosage and timing.
          </li>
          <li>
            <strong>Connect WhatsApp:</strong> Run the backend server and scan the QR code with your WhatsApp to enable automatic reminders.
          </li>
          <li>
            <strong>Automatic Reminders:</strong> The app will automatically send WhatsApp messages at the scheduled times!
          </li>
        </ol>
      </div>

      {medications.length > 0 && (
        <div className="card">
          <h3 className="card-title">💊 Today's Medication Schedule</h3>
          <div className="today-schedule">
            {medications
              .filter(med => med.active)
              .map(med => (
                <div key={med.id} className="schedule-item">
                  <div className="schedule-med-info">
                    <strong>{med.name}</strong>
                    <span className="schedule-dosage">{med.dosage}</span>
                  </div>
                  <div className="schedule-times">
                    {med.times.map((time, idx) => (
                      <span key={idx} className="time-badge">{time}</span>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
