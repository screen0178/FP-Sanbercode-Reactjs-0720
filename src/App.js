import React from 'react';
import 'antd/dist/antd.css'
import './App.css';
import {Layout} from 'antd'
import Navi from './component/Navi'

import Login from './component/Login'
const {Footer} = Layout

function App() {
  return (
    <Layout>
      <Navi />
      <Login />
      <Footer style={{ textAlign: 'center' }}>copyright &copy; 2020 by Sanbercode</Footer>
    </Layout>
  );
}

export default App;
