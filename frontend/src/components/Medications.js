import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Medications.css';

// API URL configuration
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Medications() {
  const [medications, setMedications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingMed, setEditingMed] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dosage: '',
    times: [''],
    notes: '',
    active: true
  });

  useEffect(() => {
    fetchMedications();
  }, []);

  const fetchMedications = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/medications`);
      setMedications(response.data);
    } catch (error) {
      console.error('Error fetching medications:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleTimeChange = (index, value) => {
    const newTimes = [...formData.times];
    newTimes[index] = value;
    setFormData({ ...formData, times: newTimes });
  };

  const addTimeSlot = () => {
    setFormData({ ...formData, times: [...formData.times, ''] });
  };

  const removeTimeSlot = (index) => {
    const newTimes = formData.times.filter((_, i) => i !== index);
    setFormData({ ...formData, times: newTimes });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate times
    const validTimes = formData.times.filter(t => t.trim() !== '');
    if (validTimes.length === 0) {
      alert('Please add at least one reminder time');
      return;
    }

    try {
      const dataToSubmit = { ...formData, times: validTimes };

      if (editingMed) {
        await axios.put(`${API_URL}/api/medications/${editingMed.id}`, dataToSubmit);
      } else {
        await axios.post(`${API_URL}/api/medications`, dataToSubmit);
      }

      fetchMedications();
      closeModal();
    } catch (error) {
      console.error('Error saving medication:', error);
      alert('Failed to save medication');
    }
  };

  const handleEdit = (med) => {
    setEditingMed(med);
    setFormData({
      name: med.name,
      dosage: med.dosage,
      times: med.times,
      notes: med.notes || '',
      active: med.active
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this medication?')) {
      try {
        await axios.delete(`${API_URL}/api/medications/${id}`);
        fetchMedications();
      } catch (error) {
        console.error('Error deleting medication:', error);
        alert('Failed to delete medication');
      }
    }
  };

  const toggleActive = async (med) => {
    try {
      await axios.put(`${API_URL}/api/medications/${med.id}`, {
        ...med,
        active: !med.active
      });
      fetchMedications();
    } catch (error) {
      console.error('Error toggling medication status:', error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMed(null);
    setFormData({
      name: '',
      dosage: '',
      times: [''],
      notes: '',
      active: true
    });
  };

  return (
    <div className="medications">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">💊 Medications</h2>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Add Medication
          </button>
        </div>

        {medications.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">💊</div>
            <h3>No medications added yet</h3>
            <p>Click "Add Medication" to create your first reminder</p>
          </div>
        ) : (
          <div className="medications-list">
            {medications.map(med => (
              <div key={med.id} className={`medication-item ${!med.active ? 'inactive' : ''}`}>
                <div className="med-header">
                  <h3 className="med-name">{med.name}</h3>
                  <div className="med-actions">
                    <button
                      className={`btn-toggle ${med.active ? 'active' : ''}`}
                      onClick={() => toggleActive(med)}
                      title={med.active ? 'Disable reminder' : 'Enable reminder'}
                    >
                      {med.active ? '✓' : '○'}
                    </button>
                    <button className="btn-icon btn-edit" onClick={() => handleEdit(med)} title="Edit">
                      ✏️
                    </button>
                    <button className="btn-icon btn-delete" onClick={() => handleDelete(med.id)} title="Delete">
                      🗑️
                    </button>
                  </div>
                </div>
                <div className="med-details">
                  <div className="med-detail-item">
                    <strong>Dosage:</strong> {med.dosage}
                  </div>
                  <div className="med-detail-item">
                    <strong>Reminder Times:</strong>
                    <div className="time-tags">
                      {med.times.map((time, idx) => (
                        <span key={idx} className="time-tag">🕐 {time}</span>
                      ))}
                    </div>
                  </div>
                  {med.notes && (
                    <div className="med-detail-item">
                      <strong>Notes:</strong> {med.notes}
                    </div>
                  )}
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
              <h2 className="modal-title">{editingMed ? 'Edit Medication' : 'Add New Medication'}</h2>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Medication Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Aspirin"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Dosage *</label>
                <input
                  type="text"
                  name="dosage"
                  className="form-input"
                  value={formData.dosage}
                  onChange={handleInputChange}
                  placeholder="e.g., 1 tablet, 500mg"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Reminder Times *</label>
                {formData.times.map((time, index) => (
                  <div key={index} className="time-input-group">
                    <input
                      type="time"
                      className="form-input"
                      value={time}
                      onChange={(e) => handleTimeChange(index, e.target.value)}
                    />
                    {formData.times.length > 1 && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => removeTimeSlot(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" className="btn btn-secondary btn-sm" onClick={addTimeSlot}>
                  + Add Another Time
                </button>
              </div>

              <div className="form-group">
                <label className="form-label">Notes (Optional)</label>
                <textarea
                  name="notes"
                  className="form-textarea"
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions..."
                />
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleInputChange}
                  />
                  <span>Active (send reminders)</span>
                </label>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingMed ? 'Update' : 'Add'} Medication
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Medications;
