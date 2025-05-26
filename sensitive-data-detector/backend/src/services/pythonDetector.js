class PythonDetectorService {
    constructor() {
        this.pythonScriptPath = '../detector/detector.py';
    }

    async detectSensitiveData(data) {
        const { spawn } = require('child_process');
        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python', [this.pythonScriptPath, JSON.stringify(data)]);

            pythonProcess.stdout.on('data', (result) => {
                resolve(JSON.parse(result.toString()));
            });

            pythonProcess.stderr.on('data', (error) => {
                reject(error.toString());
            });

            pythonProcess.on('error', (error) => {
                reject(error.toString());
            });
        });
    }
}

module.exports = PythonDetectorService;