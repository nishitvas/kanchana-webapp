import React, { useState } from 'react';
import { Navbar } from './components/simple/navbar';
import { UploadTab } from './components/tabs/upload';
import { Settings } from './components/tabs/settings';
import { Icon } from './components/simple/icon';
import { BankAccountsTab } from './components/tabs/bank-accounts';

const App = () => {

  const [selectedTab, setSelectedTab] = useState(0);
  const tabs = [
    {
      name: <span><Icon type="summary"/> Summary</span>,
      component: <div>Summary</div>,
    },
    {
      name: <span><Icon type="bankAccount"/> Bank Accounts</span>,
      component: <BankAccountsTab/>,
    },
    {
      name: <span><Icon type="investments"/> Investments</span>,
      component: <div>Investments</div>,
    },
    {
      name: <span><Icon type="insurances"/> Insurances</span>,
      component: <div>Insurances</div>,
    },
    {
      name: <span><Icon type="upload"/> Upload Files</span>,
      component: <UploadTab/>,
    },
    {
      name: <span><Icon type="settings"/> Settings</span>,
      components: <Settings/>,
    }
  ];
  return (
    <div className="App">
      <Navbar title="Kanchana"/>
      <br/>
      <div className="container-fluid">
        <ul className="nav nav-tabs nav-fill">
          {tabs.map((tab, idx) => <li key={idx} className="nav-item">
            <a className={`nav-link${idx === selectedTab ? ' active' : ''}`} href="#" onClick={() => setSelectedTab(idx)}>{tab.name}</a>
          </li>)}
        </ul>
        <br/>
        <div className="container-fluid">
          {tabs[selectedTab].component}  
        </div>
      </div>
    </div>
  );
}

export default App;