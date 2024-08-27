import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, TextField, Button, CircularProgress, Fab } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { backend } from '../../declarations/backend';

interface Post {
  id: bigint;
  topicId: bigint;
  content: string;
  createdAt: bigint;
  replies: bigint[];
}

interface Reply {
  id: bigint;
  postId: bigint;
  content: string;
  createdAt: bigint;
}

const TopicDetail: React.FC = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    if (topicId) {
      fetchPosts();
    }
  }, [topicId]);

  const fetchPosts = async () => {
    if (!topicId) return;
    try {
      const result = await backend.getPosts(BigInt(topicId));
      setPosts(result);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleCreatePost = async () => {
    if (newPostContent.trim() === '' || !topicId) return;
    setLoading(true);
    try {
      const result = await backend.createPost(BigInt(topicId), newPostContent);
      if ('ok' in result) {
        setNewPostContent('');
        setShowNewPostForm(false);
        fetchPosts();
      } else {
        console.error('Error creating post:', result.err);
      }
    } catch (error) {
      console.error('Error creating post:', error);
    }
    setLoading(false);
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Topic Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id.toString()}>
            <ListItemText
              primary={post.content}
              secondary={new Date(Number(post.createdAt) / 1000000).toLocaleString()}
            />
          </ListItem>
        ))}
      </List>
      <Fab color="primary" aria-label="add" onClick={() => setShowNewPostForm(true)} style={{ position: 'fixed', bottom: 20, right: 20 }}>
        <AddIcon />
      </Fab>
      {showNewPostForm && (
        <div>
          <TextField
            label="New Post Content"
            variant="outlined"
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreatePost}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Create Post'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TopicDetail;
