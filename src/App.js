import React, { useState } from 'react';
import TrainingForm from './components/TrainingForm';
import TrainingTable from './components/TrainingTable';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [editItem, setEditItem] = useState(null);

  const handleAdd = (newItem) => {
    setData((prevData) => {
      const existingItem = prevData.find(item => item.date === newItem.date);
      if (existingItem) {
        return prevData.map(item =>
          item.date === newItem.date
            ? { ...item, distance: item.distance + newItem.distance }
            : item
        );
      }
      return [...prevData, newItem].sort((a, b) => new Date(b.date) - new Date(a.date));
    });
  };

  const handleDelete = (date) => {
    setData((prevData) => prevData.filter(item => item.date !== date));
  };

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const handleEditComplete = (updatedItem) => {
    setData((prevData) => prevData.map(item =>
      item.date === updatedItem.date ? updatedItem : item
    ));
    setEditItem(null);
  };

  return (
    <div className="App">
      <TrainingForm onAdd={handleAdd} editItem={editItem} onEditComplete={handleEditComplete} />
      <TrainingTable data={data} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
};

export default App;
