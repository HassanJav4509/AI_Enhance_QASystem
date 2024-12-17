import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import FileUploader from './../components/FileUploader';
import References from './../components/References';
import ChatApp from './../components/ChatApp';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const MainPage = () => {
  const [documentId, setDocumentId] = useState(null);
  const [leftColumnCollapsed, setLeftColumnCollapsed] = useState(false);
  const [rightColumnCollapsed, setRightColumnCollapsed] = useState(true);
  const toggleLeftColumn = () => setLeftColumnCollapsed(prev => !prev);
  const toggleRightColumn = () => setRightColumnCollapsed(prev => !prev);

  return (
    <Grid
      container
      sx={{
        height: '98vh',
        backgroundColor: '#FFFFFF',
        border: '0px solid #ddd',
      }}
    >
      {/* Left Column: File Uploader */}
      <Grid
        item
        xs={leftColumnCollapsed ? 0 : 2}
        sx={{
          backgroundColor: 'White',
          color: '#FFFFFF',
          height: '100%',
          overflowY: 'hidden',
          transition: 'width 0.3s ease',
        }}
      >
        {!leftColumnCollapsed && (
          <FileUploader setDocumentId={setDocumentId} />
        )}
      </Grid>

      {/* Center Column: Chat Application */}
      <Grid
        item
        xs={leftColumnCollapsed && rightColumnCollapsed ? 12 : leftColumnCollapsed || rightColumnCollapsed ? 10 : 8}
        sx={{
          backgroundColor: '#FFFFFF',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 2,
          borderRight: rightColumnCollapsed ? 'none' : '1px solid #ddd',
          borderLeft: leftColumnCollapsed ? 'none' : '1px solid #ddd',
          transition: 'width 0.3s ease',
        }}
      >
        <ChatApp documentId={documentId} />
      </Grid> 
      {/* Toggle Button for Left Column */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: leftColumnCollapsed ? 0 : 'calc(16.67% - 20px)', // Adjust button position based on collapse
          transform: 'translateY(-50%)',
          zIndex: 2,
          backgroundColor: '#3b5999',
          padding: 0,
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'left 0.3s ease',
          height:'20px',
          border:'1px solid #db6747'
        }}
        onClick={toggleLeftColumn}
      >
        {leftColumnCollapsed ? (
          <ExpandMoreIcon style={{ fontSize:'20px', transform: 'rotate(270deg)', transition: 'transform 0.3s ease' }} sx={{ color: 'white' }} />
        ) : (
          <ExpandLessIcon style={{ fontSize:'20px', transform: 'rotate(-90deg)', transition: 'transform 0.3s ease' }} sx={{ color: 'white' }} />
        )}
      </Box>
    </Grid>
  );
};

export default MainPage;
