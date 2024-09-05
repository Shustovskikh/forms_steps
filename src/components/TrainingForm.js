import React, { useState, useEffect } from 'react';
import LocationPicker from './LocationPicker';
import './TrainingForm.css';

const TrainingForm = ({ onAdd, editItem, onEditComplete }) => {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (editItem) {
      setDate(editItem.date);
      setDistance(editItem.distance);
      setLocation(editItem.location);
    }
  }, [editItem]);

  const handleDistanceChange = (e) => {
    const value = e.target.value;
    if (value >= 0) {
      setDistance(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = { date, distance: parseFloat(distance), location };
    if (editItem) {
      onEditComplete(newItem);
    } else {
      onAdd(newItem);
    }
    setDate('');
    setDistance('');
    setLocation(null);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="form-container">
      <LocationPicker onLocationSelect={setLocation} />
      <form className="training-form" onSubmit={handleSubmit}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          max={today}
          required
        />
        <input
          type="number"
          value={distance}
          onChange={handleDistanceChange}
          required
          placeholder="Пройдено км"
          min="0"
        />
        <button type="submit">OK</button>
      </form>
    </div>
  );
};

export default TrainingForm;
