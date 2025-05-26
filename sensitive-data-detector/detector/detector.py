def detect_sensitive_data(input_data):
    sensitive_patterns = [
        r'\b\d{3}-\d{2}-\d{4}\b',  # SSN
        r'\b\d{16}\b',              # Credit Card
        r'\b\d{4}-\d{4}-\d{4}-\d{4}\b',  # Credit Card with dashes
        r'\b\d{3}-\d{3}-\d{4}\b',  # Phone Number
        r'\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b'  # Email
    ]
    
    import re
    
    detected_data = {}
    
    for pattern in sensitive_patterns:
        matches = re.findall(pattern, input_data)
        if matches:
            detected_data[pattern] = matches
    
    return detected_data

if __name__ == "__main__":
    import sys
    input_data = sys.argv[1] if len(sys.argv) > 1 else ""
    results = detect_sensitive_data(input_data)
    print(results)