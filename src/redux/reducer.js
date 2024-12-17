import { UPLOAD_DOCUMENT, SET_UPLOAD_PROGRESS, SET_DOCUMENT_ID, SET_UPLOADED_DOCS, ASK_AI_REQUEST,ASK_AI_SUCCESS,ASK_AI_FAILURE } from './actions';

const initialState = {
  documents: [],
  documentId: null,
  uploadProgress: 0,
  chat: {
    question: "",
    namespace: "",
    answer: null,
    loading: false,
    error: null,
    stats:null
  },
};

export const documentReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPLOAD_DOCUMENT:
      return {
        ...state,
        documents: [...state.documents, action.payload],
      };
    case SET_DOCUMENT_ID:
      return {
        ...state,
        documentId: action.payload, // Set the documentId
      };
    case SET_UPLOAD_PROGRESS:
      return {
        ...state,
        uploadProgress: action.payload,
      };
      case SET_UPLOADED_DOCS:
      return {
        ...state,
        documents: action.payload,
      };
      case ASK_AI_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
      case ASK_AI_SUCCESS:
        return {
          ...state,
          chat: {
            ...state.chat,
            loading: false,
            answer: action.payload.result,
            stats: action.payload.averageScore
          },
        };
    case ASK_AI_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};
