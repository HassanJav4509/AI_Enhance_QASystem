import React, { useState, useRef, useEffect } from 'react';
import { TextField, IconButton, Paper, Typography, Box } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch,useSelector } from 'react-redux';
import { getASK_AI } from '../redux/actions';

const ChatApp = ({namespace}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);
  const dispatch = useDispatch();
  const { answer, loading, error,stats } = useSelector((state) => state.document.chat);
  const FileName = useSelector((state) => state.document?.documentId || ''); 

  const handleSendMessage = async () => {
    if (message.trim()) {
      const userMessage = { sender: 'You', message };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setMessage('');

      const aiRequest = { question: message, namespace:FileName };
      await dispatch(getASK_AI(aiRequest));
    }
  };
  useEffect(() => {
    if (answer) {
      const aiResponse = { sender: 'AI', message: answer };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }
  }, [answer]);

  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: 0,
        border: '0px solid #ddd',
        width: '100%',
        marginLeft:'30px',
        marginRight:'30px',
      }}
    >
      {/* Chat Title */}
      <Typography
        variant="h8"
        sx={{
          fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
          marginBottom: 1,
          paddingLeft: '5px',
          paddingTop: '15px',
          paddingBottom: '15px',
          color: 'white',
          backgroundColor: '#3b5999',
        }}
      >
        Chat About Documents  (Current Document: {FileName? FileName:'No File selected'})
      </Typography>

      {/* Chat Messages */}
      <Box
        ref={chatBoxRef}
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          marginBottom: 2,
          padding: 2,
          border: '1px solid #ddd',
          borderRadius: '4px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              alignSelf: msg.sender === 'You' ? 'flex-end' : 'flex-start',
              maxWidth: '80%',
              marginBottom: 1,
              padding: 1,
              borderRadius: '8px',
              backgroundColor: msg.sender === 'You' ? '#e3f2fd' : '#f0f0f0',
              wordBreak: 'break-word',
            }}
          >
            {msg.sender === 'You' ? (
              <Typography>
              <strong>{msg.sender}: </strong>
              {msg.message}
            </Typography>):(
              <Typography style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'nowrap' }}>
                <span style={{backgroundColor: '#3b5999',
                  color: 'white',
                  borderRadius: '50%', 
                  padding: '7px', 
                  display: 'inline-flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                  width: '7rem', 
                  height: '2.3rem', 
                  fontSize: '11px',}}>{stats?.toFixed(4)}</span>
              <strong>{msg.sender}: <span style={{fontWeight:'lighter'}}>{msg.message}</span> </strong>
              
            </Typography>
            )}
            
          </Box>
        ))}
      </Box>

      {/* Input Box */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          borderTop: '1px solid #ddd',
          paddingTop: 1,
          marginBottom: '10px',
          marginLeft: '5px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label= {FileName.length > 0 ? "Type your message" : "please select a file, the uploaded files list" } 
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <IconButton onClick={handleSendMessage} color="primary">
          <SendIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default ChatApp;
