
export const UPLOAD_DOCUMENT = 'UPLOAD_DOCUMENT';
export const SET_DOCUMENT_ID = 'SET_DOCUMENT_ID'; // New action for setting documentId
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS';
export const ASK_AI_REQUEST = 'ASK_AI_REQUEST';
export const ASK_AI_SUCCESS = 'ASK_AI_SUCCESS';
export const ASK_AI_FAILURE = 'ASK_AI_FAILURE';

export const getASK_AI = (payload) => ({
  type: ASK_AI_REQUEST,
  payload,
});
export const uploadDocument = (data) => ({
  type: UPLOAD_DOCUMENT,
  payload: data,
});

export const setDocumentId = (fileName) => ({
  type: SET_DOCUMENT_ID,
  payload: fileName,
});

export const setUploadProgress = (progress) => ({
  type: SET_UPLOAD_PROGRESS,
  payload: progress,
});

export const GET_UPLOADED_DOCS = 'GET_UPLOADED_DOCS';
export const SET_UPLOADED_DOCS = 'SET_UPLOADED_DOCS';

export const getUploadedDocs = () => ({
  type: GET_UPLOADED_DOCS,
});

export const setUploadedDocs = (docs) => ({
  type: SET_UPLOADED_DOCS,
  payload: docs,
});

