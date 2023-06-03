import { Routes, Route } from 'react-router-dom';

import Home from './routes/home/home.component';
import Layout from './routes/layout/layout.component';
import Shop from './routes/shop/shop.component';
import Authentication from './components/authentication/authentication.component';
import Checkout from './routes/checkout/checkout.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
  );
};

export default App;
