import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // أضف هذا
import App from './components/App';
import './index.css';
import './config/i18n';
import Problems from 'pages/test';
import Attestation2 from 'pdfGenerator/attestation2';
import SoutenanceMFE from 'pdfGenerator/SoutenanceMFE';
import AttestationNonRéinscription from 'pdfGenerator/AttestationNonRéinscription';
import AttestationAbandonDesEtudes from 'pdfGenerator/AttestationAbandonDesEtudes';
import ConventionDePreStage from 'pdfGenerator/conventionDePreStage';
import RecommandationStageDintégration from 'pdfGenerator/stageIntgration';
import ProlongationStage from 'pdfGenerator/prolongationStage';
import FicheDePresenceDeStage from 'pdfGenerator/ficheDePresenceDeStage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter> {/* هذا هو الحل */}
      <FicheDePresenceDeStage/>
    </BrowserRouter>
  </React.StrictMode>
);
