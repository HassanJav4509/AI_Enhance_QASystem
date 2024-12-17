# AI-Enhanced Document QA System - Frontend
## Overview
This is the frontend for the AI-Enhanced Document QA System, which allows users to interact with a question-answering system for uploaded documents. The application integrates with a backend service to process documents, generate embeddings, and perform QA tasks. It is built using React.js and provides a user-friendly interface for uploading documents and querying them.
## Features
- **Document Upload:** Users can upload documents for processing.
- **Question-Answering Interface:** Users can ask questions about uploaded documents and receive relevant answers.
- **Integration with Backend:** Seamless communication with the backend for document processing and QA tasks.
- **Responsive Design:** Optimized for use on various devices.
## Prerequisites
- **Node.js:** Version 14 or higher.
- **npm or Yarn:** For managing dependencies.
## Setup Instructions
### Step 1: Clone the Repository
```bash
git clone <repository_url>
cd AIEnhanceQA_FE-main
```
### Step 2: Install Dependencies
```bash
npm install
```
or
```bash
yarn install
```
### Step 3: Configure Environment Variables
Create a `.env` file in the root directory with the following content:
```
REACT_APP_BACKEND_URL=http://<backend_base_url>
```
Replace `<backend_base_url>` with the actual URL of your backend service.
### Step 4: Start the Development Server
```bash
npm start
```
or
```bash
yarn start
```
The application will run on `http://localhost:3000` by default.
## Deployment
To build the project for production, run:
```bash
npm run build
```
or
```bash
yarn build
```
The built files will be available in the `build/` directory. You can deploy these files to any static hosting service.
**Preview URL:** [AI QA System Preview](http://ai-qa-system.s3-website.us-east-2.amazonaws.com)
## Project Structure
```
AIEnhanceQA_FE-main
├── public          # Static assets
├── src
│   ├── components  # Reusable React components
│   ├── pages       # Page components for routing
│   ├── services    # API service functions
│   ├── styles      # CSS and styling files
│   ├── utils       # Utility functions
│   ├── App.js      # Main app component
│   └── index.js    # Entry point
├── .env            # Environment variables
├── package.json    # Project configuration
├── README.md       # Project documentation
└── ...
```
## Key Files
- **src/components:** Contains reusable UI components.
- **src/pages:** Contains main page components like upload and QA interfaces.
- **src/services:** Handles API calls to the backend.
- **src/styles:** Contains application-wide styling.
## Features Explained
1. **Document Upload:**
   - Users can upload documents via the file upload interface.
   - Uploaded files are sent to the backend for processing.
2. **QA Interface:**
   - Users can input questions and receive answers related to uploaded documents.
3. **Integration:**
   - The frontend interacts with the backend through REST API endpoints.
## Challenges Faced
- **Cross-Origin Resource Sharing (CORS):** Ensuring proper communication between the frontend and backend.
- **State Management:** Managing state across various components efficiently.
- **Dynamic Integration:** Handling dynamic changes in backend API responses.
## Acknowledgments
- **React.js:** For building the UI.
- **AWS S3:** For hosting the frontend preview.
- **Backend Team:** For providing robust backend services.
## License
This project is licensed under the MIT License.
ai-qa-system.s3-website.us-east-2.amazonaws.com
AI Enhanced Document QA System
Web site created using create-react-app
