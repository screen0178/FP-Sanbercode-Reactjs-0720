import React from 'react';
import 'antd/dist/antd.css'
import './App.css';
import {Layout} from 'antd'
import Navi from './component/Navi'
import {AppProvider} from './component/AppContext'

import Signup from './component/Signup'
const {Footer} = Layout

function App() {
  return (
    <AppProvider>
      <Layout>
        <Navi />
        <Signup />
        <Footer style={{ textAlign: 'center' }}>copyright &copy; 2020 by Sanbercode</Footer>
      </Layout>
    </AppProvider>
  );
}

export default App;
