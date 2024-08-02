// components/PriceTable.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPrices } from '../redux/slices';
import axios from 'axios';

const PriceTable: React.FC = () => {
  const dispatch = useDispatch();
  const { prices, symbol } = useSelector((state: any) => state.price);

  useEffect(() => {
    const fetchPrices = async () => {
      const response = await axios.get(`/api/prices/${symbol}`);
      dispatch(setPrices(response.data));
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 5000);

    return () => clearInterval(interval);
  }, [dispatch, symbol]);

  return (
    <table>
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {prices.map((price: any) => (
          <tr key={price._id}>
            <td>{new Date(price.timestamp).toLocaleString()}</td>
            <td>{price.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PriceTable;
