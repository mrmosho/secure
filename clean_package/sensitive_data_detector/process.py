import sys
import json
import base64
from typing import Dict, Any
from detector import SensitiveDataDetector
from encryption import EncryptionModule

def process_image(image_data: bytes) -> Dict[str, Any]:
    """Process an image and return detection and encryption results."""
    try:
        # Initialize detector
        detector = SensitiveDataDetector()
        
        # Convert image to base64 for text extraction
        image_base64 = base64.b64encode(image_data).decode()
        
        # Detect sensitive data
        result = detector.detect(image_base64)
        
        # Initialize encryption module
        encryption = EncryptionModule()
        
        # Prepare response
        response = {
            "sensitiveData": [{
                "type": result.sensitive_type or "Unknown",
                "confidence": result.confidence,
                "location": "Image content"
            }] if result.is_sensitive else [],
            "encryptionStatus": {
                "isEncrypted": False,  # Images are not encrypted by default
                "encryptionType": None
            },
            "metadata": {
                "fileType": "image",
                "size": len(image_data),
                "lastModified": None  # This will be set by the Node.js server
            }
        }
        
        # If sensitive data is found, suggest encryption
        if result.is_sensitive:
            response["encryptionStatus"]["suggested"] = True
            response["encryptionStatus"]["encryptionType"] = "Fernet"
        
        return response
        
    except Exception as e:
        print(json.dumps({
            "error": str(e)
        }))
        sys.exit(1)

if __name__ == "__main__":
    # Read image data from stdin
    image_data = sys.stdin.buffer.read()
    
    # Process the image
    result = process_image(image_data)
    
    # Output result as JSON
    print(json.dumps(result)) 