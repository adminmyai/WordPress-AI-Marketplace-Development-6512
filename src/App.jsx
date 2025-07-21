import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { QuestProvider } from '@questlabs/react-sdk';
import '@questlabs/react-sdk/dist/style.css';
import questConfig from './config/questConfig';
import Layout from './components/Layout/Layout';
import QuestLogin from './pages/Auth/QuestLogin';
import QuestOnboarding from './pages/Auth/QuestOnboarding';
// ... other imports

function App() {
  return (
    <QuestProvider
      apiKey={questConfig.APIKEY}
      entityId={questConfig.ENTITYID}
      apiType="PRODUCTION"
    >
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<QuestLogin />} />
            <Route path="/onboarding" element={<QuestOnboarding />} />
            {/* ... other routes */}
          </Routes>
        </div>
      </Router>
    </QuestProvider>
  );
}

export default App;