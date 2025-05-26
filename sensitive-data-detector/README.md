# Sensitive Data Detector Project

This project is designed to detect sensitive data using a combination of a Python backend and a Node.js server, along with a React frontend. The system allows users to input data, which is then analyzed for sensitive information.

## Project Structure

The project is organized into three main directories:

- **backend**: Contains the Node.js server that handles API requests and communicates with the Python detector.
- **detector**: Contains the Python script that performs the sensitive data detection.
- **frontend**: Contains the React application that provides the user interface for data input and results display.

## Getting Started

### Prerequisites

- Node.js and npm installed for the backend and frontend.
- Python and pip installed for the detector.

### Installation

1. **Backend Setup**:
   - Navigate to the `backend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the server:
     ```
     npm start
     ```

2. **Detector Setup**:
   - Navigate to the `detector` directory.
   - Install Python dependencies:
     ```
     pip install -r requirements.txt
     ```

3. **Frontend Setup**:
   - Navigate to the `frontend` directory.
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React application:
     ```
     npm start
     ```

## Usage

- Access the frontend application in your web browser (usually at `http://localhost:3000`).
- Input the data you want to analyze in the provided form.
- Submit the form to send the data to the backend, which will then communicate with the Python detector to analyze the input.
- Results will be displayed on the frontend.

## API Documentation

Refer to the `backend/README.md` for detailed API usage and endpoints.

## Python Detector Documentation

Refer to the `detector/README.md` for details on how the Python detector works and its usage.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.