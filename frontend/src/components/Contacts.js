import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Contacts.css';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Contacts() {
  const [contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testContact, setTestContact] = useState(null);
  const [testMessage, setTestMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    relation: ''
  });

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/contacts`);
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      alert('Please enter a valid phone number with country code');
      return;
    }

    try {
      await axios.post(`${API_URL}/api/contacts`, {
        ...formData,
        phone: phoneDigits
      });

      fetchContacts();
      closeModal();
    } catch (error) {
      console.error('Error saving contact:', error);
      alert('Failed to save contact');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_URL}/api/contacts/${id}`);
        fetchContacts();
      } catch (error) {
        console.error('Error deleting contact:', error);
        alert('Failed to delete contact');
      }
    }
  };

  const handleTestMessage = (contact) => {
    setTestContact(contact);
    setTestMessage(`Hello ${contact.name.split(' ')[0]}! This is a test message from your Tablet Reminder app. 💊✅`);
    setShowTestModal(true);
  };

  const sendTestMessage = async () => {
    if (!testContact) return;

    try {
      await axios.post(`${API_URL}/api/test-message`, {
        phone: testContact.phone,
        message: testMessage
      });

      alert('Test message sent successfully! ✅');
      setShowTestModal(false);
    } catch (error) {
      console.error('Error sending test message:', error);
      alert(`Failed to send test message: ${error.response?.data?.error || error.message}`);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      phone: '',
      relation: ''
    });
  };

  const closeTestModal = () => {
    setShowTestModal(false);
    setTestContact(null);
    setTestMessage('');
  };

  const formatPhoneDisplay = (phone) => {
    // Format phone number for display
    if (phone.length >= 10) {
      const countryCode = phone.substring(0, phone.length - 10);
      const number = phone.substring(phone.length - 10);
      return `+${countryCode} ${number.substring(0, 5)} ${number.substring(5)}`;
    }
    return phone;
  };

  return (
    <div className="contacts">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">👥 Family Contacts</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Contact
          </button>
        </div>

        <div className="alert alert-info">
          ℹ️ Add family members who should receive medication reminders. 
          Phone numbers should include the country code (e.g., 919876543210 for India, 1234567890 for US).
        </div>

        {contacts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">👥</div>
            <h3>No contacts added yet</h3>
            <p>Add family members to receive WhatsApp reminders</p>
          </div>
        ) : (
          <div className="contacts-list">
            {contacts.map(contact => (
              <div key={contact.id} className="contact-item">
                <div className="contact-avatar">
                  {contact.name.charAt(0).toUpperCase()}
                </div>
                <div className="contact-info">
                  <h3 className="contact-name">{contact.name}</h3>
                  {contact.relation && (
                    <span className="contact-relation">{contact.relation}</span>
                  )}
                  <div className="contact-phone">📱 {formatPhoneDisplay(contact.phone)}</div>
                </div>
                <div className="contact-actions">
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleTestMessage(contact)}
                    title="Send test message"
                  >
                    ✉️ Test
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(contact.id)}
                    title="Delete contact"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Add New Contact</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number (with country code) *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="e.g., 919876543210"
                  required
                />
                <small className="form-help">
                  Format: Country code + number (no spaces or special characters)
                  <br />Examples: 919876543210 (India), 1234567890 (US)
                </small>
              </div>

              <div className="form-group">
                <label className="form-label">Relation (Optional)</label>
                <input
                  type="text"
                  name="relation"
                  className="form-input"
                  value={formData.relation}
                  onChange={handleInputChange}
                  placeholder="e.g., Father, Mother, Son"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showTestModal && testContact && (
        <div className="modal-overlay" onClick={closeTestModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Send Test Message</h2>
            </div>

            <div className="form-group">
              <label className="form-label">Recipient</label>
              <div className="test-recipient">
                <strong>{testContact.name}</strong>
                <span>{formatPhoneDisplay(testContact.phone)}</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                className="form-textarea"
                value={testMessage}
                onChange={(e) => setTestMessage(e.target.value)}
                rows="5"
              />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeTestModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-success" onClick={sendTestMessage}>
                Send Test Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Contacts;
