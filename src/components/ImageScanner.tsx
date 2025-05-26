import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, Upload, Shield, Lock } from 'lucide-react';

interface ScanResult {
  sensitiveData: {
    type: string;
    confidence: number;
    location: string;
  }[];
  encryptionStatus: {
    isEncrypted: boolean;
    encryptionType?: string;
  };
  metadata: {
    fileType: string;
    size: number;
    lastModified: Date;
  };
}

export function ImageScanner() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
      setError(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles: 1
  });

  const handleScan = async () => {
    if (!file) return;

    setScanning(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:3000/api/scan', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to scan image');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <Card className="p-6">
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'}`}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag and drop an image here, or click to select</p>
          )}
        </div>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <Button
              onClick={handleScan}
              disabled={scanning}
              className="w-full mt-4"
            >
              {scanning ? 'Scanning...' : 'Scan Image'}
            </Button>
          </div>
        )}

        {scanning && (
          <Progress value={undefined} className="mt-4" />
        )}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {result && (
          <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold">Scan Results</h3>
            
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <h4 className="font-medium">Encryption Status</h4>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Lock className={`h-4 w-4 ${result.encryptionStatus.isEncrypted ? 'text-green-500' : 'text-red-500'}`} />
                <span>
                  {result.encryptionStatus.isEncrypted 
                    ? `File is encrypted (${result.encryptionStatus.encryptionType})`
                    : 'File is not encrypted'}
                </span>
              </div>
            </div>

            {result.sensitiveData.length > 0 && (
              <div>
                <h4 className="font-medium">Sensitive Data Detected</h4>
                <div className="mt-2 space-y-2">
                  {result.sensitiveData.map((data, index) => (
                    <div key={index} className="p-3 bg-red-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{data.type}</span>
                        <span className="text-sm text-gray-500">
                          {Math.round(data.confidence * 100)}% confidence
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Location: {data.location}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h4 className="font-medium">File Information</h4>
              <div className="mt-2 p-3 bg-gray-50 rounded-lg space-y-1">
                <p className="text-sm">
                  <span className="font-medium">Type:</span> {result.metadata.fileType}
                </p>
                <p className="text-sm">
                  <span className="font-medium">Size:</span> {(result.metadata.size / 1024).toFixed(2)} KB
                </p>
                <p className="text-sm">
                  <span className="font-medium">Last Modified:</span>{' '}
                  {new Date(result.metadata.lastModified).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
} 