// components/Modal.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSymbol } from '../redux/slices';

const Modal: React.FC = () => {
  const [newSymbol, setNewSymbol] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(setSymbol(newSymbol));
  };

  return (
    <div className="modal">
      <input
        type="text"
        value={newSymbol}
        onChange={(e) => setNewSymbol(e.target.value)}
      />
      <button onClick={handleSubmit}>Change Symbol</button>
    </div>
  );
};

export default Modal;
