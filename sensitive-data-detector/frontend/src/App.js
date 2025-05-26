import React, { useState } from 'react';
import DetectorForm from './components/DetectorForm';
import './styles/App.css';

function App() {
  const [result, setResult] = useState(null);

  const handleDetectionResult = (data) => {
    setResult(data);
  };

  return (
    <div className="App">
      <h1>Sensitive Data Detector</h1>
      <DetectorForm onDetectionResult={handleDetectionResult} />
      {result && (
        <div className="result">
          <h2>Detection Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default App;