# Sensitive Data Detector Frontend

This project is a web application that integrates with a Python sensitive data detector. It allows users to input data and check for sensitive information through a user-friendly interface.

## Getting Started

To get started with the frontend application, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd sensitive-data-detector/frontend
   ```

2. **Install dependencies**:
   Make sure you have Node.js installed. Then, run:
   ```bash
   npm install
   ```

3. **Run the application**:
   Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Project Structure

- `public/index.html`: The main HTML file for the application.
- `src/App.js`: The main React component that sets up the application structure.
- `src/components/DetectorForm.js`: A form component for users to input data for detection.
- `src/styles/App.css`: CSS styles for the application.

## Usage

Once the application is running, you can navigate to the main page where you will find a form to input data. After submitting the form, the application will communicate with the backend to check for sensitive information.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request with your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.