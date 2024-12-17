import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadDocument, getUploadedDocs, setDocumentId } from '../redux/actions';
import {
  CircularProgress,
  LinearProgress,
  Button,
  Paper,
  Typography,
  IconButton,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilePresentIcon from '@mui/icons-material/FilePresent';
import DeleteIcon from '@mui/icons-material/Delete';
import { blue } from '@mui/material/colors';

const FileUploader = ({ isCollapsed, toggleCollapse }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadedFiles = useSelector((state) => state.document?.documents || []);
  const selectedDocumentId = useSelector((state) => state.document?.documentId || ''); 

  useEffect(() => {
    // Fetch the uploaded documents on component mount
    dispatch(getUploadedDocs());    
  }, [dispatch]);
  
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a PDF file.');
    }
  };

  const uploadFile = async () => {
    if (!file) 
      return;

    setUploading(true);
    
    try {
      
     await dispatch(uploadDocument({ file, setUploadProgress, setDocumentId, fileName: file.name }));
      dispatch(getUploadedDocs()); // Refresh the uploaded files list after upload
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleSelectFile = (fileName) => {
    dispatch(setDocumentId(fileName)); // Set documentId to the selected file
  };

  const handleDeleteFile = (fileName) => {
    // Logic to delete file (to be implemented if needed)
    console.log('Delete file:', fileName);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100%',
        transition: 'transform 0.3s ease',
        transform: isCollapsed ? 'translateX(-100%)' : 'translateX(0)',
      }}
    >
      {/* Header */}
      <Paper
        sx={{
          backgroundColor: '#3b5999',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          color: 'White',
        }}
      >
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize:'0.9rem', marginLeft:'10px' }}>
          Documents Upload
        </Typography>
      </Paper>

      {/* Content */}
      {!isCollapsed && (
        <Paper sx={{ padding: 2, minHeight: '100%' }}>
          {/* Upload Button */}
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
              endIcon={<CloudUploadIcon />}
            >
              Upload PDF
            </Button>
          </label>

          {/* Selected File */}
          {file && !uploading && (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              {file.name}
            </Typography>
          )}

          {/* Upload Progress */}
          {uploading && (
            <>
              <LinearProgress variant="determinate" value={uploadProgress} sx={{ marginTop: 2 }} />
              <CircularProgress size={40} sx={{ position: 'absolute', top: '50%', left: '50%' }} />
            </>
          )}

          {/* Start Upload Button */}
          {!uploading && file && (
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginTop: 2 }}
              onClick={uploadFile}
            >
              Start Upload
            </Button>
          )}

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 1 }}>
                Uploaded Files
              </Typography>
              <Typography sx={{ marginBottom: 1, fontSize:'10px', color:'blue' }}>
                Note: Select a document below, to ask questions about
              </Typography>
              <List sx={{ height: '700px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: 1 }}>
                {uploadedFiles.filter(uploadedFile => uploadedFile.name).map((uploadedFile, index) => (
                  
                  <ListItem
                    key={uploadFile.name}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      backgroundColor: uploadedFile.name === selectedDocumentId ? '#d3d3d3' : '#f9f9f9',
                      marginBottom: 1,
                      padding: 1,
                      borderRadius: 1,
                      cursor: 'pointer',
                    }}
                    onClick={() => handleSelectFile(uploadedFile.name)}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <ListItemIcon>
                        <FilePresentIcon color="primary" />
                      </ListItemIcon>
                      <ListItemText primary={uploadedFile.name} sx={{ fontSize: '9px', marginLeft:'-20px', width:'150px' }} />
                    </Box>
                    {/* <IconButton
                      onClick={() => handleDeleteFile(uploadedFile.name)}
                      sx={{ color: 'red' }}
                    >
                      <DeleteIcon />
                    </IconButton> */}
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default FileUploader;

