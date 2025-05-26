const express = require('express');
const router = express.Router();
const PythonDetectorService = require('../services/pythonDetector');

// Initialize the Python detector service
const detectorService = new PythonDetectorService();

// Define the route for detecting sensitive data
router.post('/detect', async (req, res) => {
    try {
        const { data } = req.body;
        const result = await detectorService.detectSensitiveData(data);
        res.json(result);
    } catch (error) {
        console.error('Error detecting sensitive data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;