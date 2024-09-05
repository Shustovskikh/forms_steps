import React from 'react';
import './TrainingTable.css';

const formatDate = (date) => {
  const [year, month, day] = date.split('-');
  return `${day}.${month}.${year}`;
};

const TrainingTable = ({ data, onDelete, onEdit }) => {
  const maxDistance = Math.max(...data.map(item => item.distance));

  return (
    <div className="table-container">
      <table className="training-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Пройдено км</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="table-row">
              <td>
                {item.distance === maxDistance && <span className="star">⭐</span>}
                {formatDate(item.date)}
              </td>
              <td>{item.distance}</td>
              <td>
                <button className="edit" onClick={() => onEdit(item)}>✎</button>
                <button className="delete" onClick={() => onDelete(item.date)}>✘</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TrainingTable;
