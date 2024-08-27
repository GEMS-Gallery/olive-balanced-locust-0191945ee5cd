import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, Forum as ForumIcon } from '@mui/icons-material';
import TopicList from './components/TopicList';
import TopicDetail from './components/TopicDetail';
import { backend } from '../declarations/backend';

interface Category {
  id: bigint;
  name: string;
}

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#333333',
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
});

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await backend.getCategories();
        setCategories(result);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <div className="container">
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hacker Forum
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="sidebar">
          <List>
            <ListItem button component={Link} to="/">
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            {categories.map((category) => (
              <ListItem key={category.id.toString()} button component={Link} to={`/category/${category.id}`}>
                <ListItemIcon>
                  <ForumIcon />
                </ListItemIcon>
                <ListItemText primary={category.name} />
              </ListItem>
            ))}
          </List>
        </div>
        <Container className="main-content">
          <Routes>
            <Route path="/" element={<TopicList />} />
            <Route path="/category/:categoryId" element={<TopicList />} />
            <Route path="/topics/:topicId" element={<TopicDetail />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
