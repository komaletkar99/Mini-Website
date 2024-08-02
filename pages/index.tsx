import React from 'react';
import PriceTable from '../components/PriceTable';
import Modal from '../components/Modal';
import { wrapper } from '../redux/store';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Real-Time Stock/Crypto Prices</h1>
      <PriceTable />
      <Modal />
    </div>
  );
};

export default wrapper.withRedux(Home);
