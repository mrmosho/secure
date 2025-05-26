import React, { useState } from 'react';

const DetectorForm = () => {
    const [inputData, setInputData] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/detect', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: inputData }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Sensitive Data Detector</h2>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={inputData}
                    onChange={handleChange}
                    placeholder="Enter data to check for sensitive information"
                    rows="5"
                    cols="50"
                />
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Detecting...' : 'Detect'}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            {result && (
                <div>
                    <h3>Detection Results:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default DetectorForm;