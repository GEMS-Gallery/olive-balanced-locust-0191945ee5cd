import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, TextField, Button, CircularProgress } from '@mui/material';
import { backend } from '../../declarations/backend';

interface Topic {
  id: bigint;
  title: string;
  createdAt: bigint;
}

const TopicList: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const result = await backend.getTopics();
      setTopics(result);
    } catch (error) {
      console.error('Error fetching topics:', error);
    }
  };

  const handleCreateTopic = async () => {
    if (newTopicTitle.trim() === '') return;
    setLoading(true);
    try {
      const result = await backend.createTopic(newTopicTitle);
      if ('ok' in result) {
        setNewTopicTitle('');
        fetchTopics();
      } else {
        console.error('Error creating topic:', result.err);
      }
    } catch (error) {
      console.error('Error creating topic:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Topics
      </Typography>
      <List>
        {topics.map((topic) => (
          <ListItem key={topic.id.toString()} button component={Link} to={`/topics/${topic.id}`}>
            <ListItemText
              primary={topic.title}
              secondary={new Date(Number(topic.createdAt) / 1000000).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <TextField
        label="New Topic Title"
        variant="outlined"
        value={newTopicTitle}
        onChange={(e) => setNewTopicTitle(e.target.value)}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateTopic}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} /> : 'Create Topic'}
      </Button>
    </div>
  );
};

export default TopicList;
