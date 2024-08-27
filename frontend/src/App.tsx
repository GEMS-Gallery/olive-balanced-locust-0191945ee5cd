import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AppBar, Toolbar, Typography, Container, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Home as HomeIcon, Forum as ForumIcon } from '@mui/icons-material';
import TopicList from './components/TopicList';
import TopicDetail from './components/TopicDetail';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00FF00',
    },
    background: {
      default: '#000000',
      paper: '#333333',
    },
  },
  typography: {
    fontFamily: '"Roboto Mono", monospace',
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="container">
        <AppBar position="static" color="transparent">
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
            <ListItem button component={Link} to="/topics">
              <ListItemIcon>
                <ForumIcon />
              </ListItemIcon>
              <ListItemText primary="Topics" />
            </ListItem>
          </List>
        </div>
        <Container className="main-content">
          <Routes>
            <Route path="/" element={<TopicList />} />
            <Route path="/topics" element={<TopicList />} />
            <Route path="/topics/:topicId" element={<TopicDetail />} />
          </Routes>
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default App;
