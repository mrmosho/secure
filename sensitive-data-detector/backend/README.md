# Sensitive Data Detector Backend

This is the backend part of the Sensitive Data Detector project, which is built using Node.js and Express. The backend is responsible for handling requests from the frontend and communicating with the Python sensitive data detector.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd sensitive-data-detector/backend
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the backend server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

## API Endpoints

### Detect Sensitive Data

- **Endpoint:** `/detect`
- **Method:** POST
- **Description:** This endpoint receives data from the frontend and uses the Python sensitive data detector to analyze it.

**Request Body:**
```json
{
  "data": "string to analyze"
}
```

**Response:**
```json
{
  "sensitiveData": ["detected sensitive information"]
}
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.