import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import QuoteRequest from './QuoteRequestPage/QuoteRequest';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QuoteRequest />
  </React.StrictMode>
);

reportWebVitals();
