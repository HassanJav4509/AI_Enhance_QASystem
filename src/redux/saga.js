import { call, put, takeEvery } from 'redux-saga/effects';
import { UPLOAD_DOCUMENT, setUploadProgress, SET_DOCUMENT_ID, setDocumentId,ASK_AI_REQUEST, ASK_AI_SUCCESS, ASK_AI_FAILURE, SET_UPLOADED_DOCS,setUploadedDocs, GET_UPLOADED_DOCS } from './actions';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BASE_URL; // Ensure this is set in your .env file

// Handle document upload with chunking
function* handleUploadDocument(action) {
  const { file, setUploadProgress, setDocumentId, fileName } = action.payload;

  try {
    const formData = new FormData();
    formData.append('file', file);
    // Upload the file using axios
    const response = yield call(uploadChunkToServer, formData, setUploadProgress);
    // After upload completes, set the documentId
    yield put(setDocumentId(fileName)); // Update documentId in state

  } catch (e) {
    console.error("Error uploading chunk", e);
  }
}

// Function to upload the chunk using Axios
function uploadChunkToServer(formData, setUploadProgress) {
  return axios.post(`${API_URL}documents/ingest`, formData, {
    onUploadProgress: (progressEvent) => {
      const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
      setUploadProgress(progress);
    },
  });
}

function* fetchUploadedDocs() {
  try {
    const response = yield call(axios.get, `${API_URL}documents/docs`, 
      {
          headers: {
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
    const namespaces = response.data.data.namespaces; // Adjust based on your API's response structure
    const documents = Object.keys(namespaces).map((name) => ({
      name,
      ...namespaces[name],
    }));
    
    yield put(setUploadedDocs(documents));
  } catch (error) {
    console.error('Error fetching uploaded documents:', error);
  }
}
function* getaskAI(action) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_BASE_URL}chat/ask`, action.payload);
    console.log("----------> SagaAskAI",response.data)
    yield put({ type: ASK_AI_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: ASK_AI_FAILURE, error: error.message });
  }

}
export function* watchUploadDocument() {
  yield takeEvery(UPLOAD_DOCUMENT, handleUploadDocument);
  yield takeEvery(GET_UPLOADED_DOCS, fetchUploadedDocs);
  yield takeEvery(ASK_AI_REQUEST, getaskAI);
}
