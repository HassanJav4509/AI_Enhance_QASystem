import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';

const References = ({ documentId, isCollapsed }) => {
  const [references, setReferences] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (documentId) {
      setLoading(true);
      fetchReferences(documentId);
    }
  }, [documentId]);

  const fetchReferences = async (docId) => {
    try {
      const response = await fetch(`/api/references/${docId}`);
      const data = await response.json();
      setReferences(data);
    } catch (error) {
      console.error("Error fetching references", error);
    } finally {
      setLoading(false);
    }
  };

  if (isCollapsed) {
    return null; // Don't render anything when collapsed
  }

  return (
    <Paper sx={{
        backgroundColor: '#3b5999',
        padding: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'White',
        
      }}>
      <Typography sx={{fontFamily:'"Roboto","Helvetica","Arial",sans-serif'}} variant="h8">Document References</Typography>
      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <div>
          {references.map((ref, index) => (
            <div key={index}>
              <Typography variant="body2">{ref.documentName}</Typography>
              <Typography variant="body2">Score: {ref.score}</Typography>
            </div>
          ))}
        </div>
      )}
    </Paper>
  );
};

export default References;
