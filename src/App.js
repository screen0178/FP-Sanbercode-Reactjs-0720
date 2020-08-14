import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Routes from './routes'
import 'antd/dist/antd.css'
import './App.css';
import {Layout} from 'antd'
import Navi from './component/Navi'
import {AppProvider} from './component/AppContext'

const {Footer} = Layout

function Footerr() {
  return (
    <Footer style={{ textAlign: 'center' }}>copyright &copy; 2020 by Sanbercode</Footer>
  )
}

function App() {
  return (
    <Router>
      <AppProvider>
        <Layout>
          <Navi />
          <Routes />
          <Footerr />
        </Layout>
      </AppProvider>
    </Router>
  );
}

export default App;
