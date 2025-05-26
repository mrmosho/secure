import { spawn } from 'child_process';
import path from 'path';

export interface AnalysisResult {
  sensitiveData: {
    type: string;
    confidence: number;
    location: string;
  }[];
  encryptionStatus: {
    isEncrypted: boolean;
    encryptionType?: string;
    suggested?: boolean;
  };
  metadata: {
    fileType: string;
    size: number;
    lastModified: Date;
  };
}

export async function analyzeImage(imageBuffer: Buffer): Promise<AnalysisResult> {
  return new Promise((resolve, reject) => {
    // Path to the Python script
    const scriptPath = path.join(__dirname, '../../../clean_package/sensitive_data_detector/process.py');
    
    // Spawn Python process
    const pythonProcess = spawn('python', [scriptPath]);

    let result = '';
    let error = '';

    // Send the image buffer to Python process
    pythonProcess.stdin.write(imageBuffer);
    pythonProcess.stdin.end();

    // Collect data from Python process
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      error += data.toString();
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Python process exited with code ${code}: ${error}`));
        return;
      }

      try {
        const analysisResult = JSON.parse(result);
        // Add current timestamp to metadata
        analysisResult.metadata.lastModified = new Date();
        resolve(analysisResult);
      } catch (err) {
        reject(new Error('Failed to parse analysis result'));
      }
    });
  });
} 