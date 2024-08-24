import React from 'react';
import { Box, Typography, TextField, IconButton, Avatar, AppBar, Toolbar, Container, Grid } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

const Home = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#f7e8d1', boxShadow: 'none' }}>
        <Toolbar>
          <Grid container alignItems="center">
            {/* Logo Section */}
            <Grid item xs={12} sm={6} md={8} sx={{ display: 'flex', alignItems: 'center'  }}>
              <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5', fontSize: '14px' }}>
              <span className="fancy-font">Wish</span>
              </Typography>
            </Grid>
            {/* Search and User Profile Section */}
            <Grid item xs={12} sm={6} md={4} container justifyContent="flex-end" alignItems="center">
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <TextField
                    variant="outlined"
                    placeholder="Search..."
                    size="small"
                    InputProps={{
                      endAdornment: (
                        <IconButton edge="end">
                          <SearchIcon />
                        </IconButton>
                      ),
                    }}
                    sx={{ marginRight: 2 }}
                  />
                </Box>
                <Typography variant="body2" sx={{ marginRight: 2 }}>
                  {currentDate}
                </Typography>
                <IconButton edge="end">
                  <NotificationsIcon />
                </IconButton>
                <Avatar sx={{ marginLeft: 2 }}>U</Avatar>
                <Typography variant="body2" sx={{ marginLeft: 1 }}>
                  Hey, User
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Container sx={{ marginTop: 4 }}>
        <Box className="home-content" sx={{ textAlign: 'center' }}>
          <Typography variant="h3">
            <span className="fancy-font">Welcome to Wish</span>
          </Typography>
          <Typography variant="body1">
            Let us be your safe space... your love maze :)
          </Typography>

          <Box className="cards-container" sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 4 }}>
            <Box className="cardy" sx={{ width: '30%', padding: 2, boxShadow: 1, borderRadius: 2 }}>
              <Typography variant="h6">Learn More</Typography>
              <Typography variant="body2">
                Discover how Wish works and how it can benefit you. Get detailed information about our features and technology.
              </Typography>
              <a href="/learn-more" className="card-link">Learn More</a>
            </Box>

            <Box className="cardy" sx={{ width: '30%', padding: 2, boxShadow: 1, borderRadius: 2 }}>
              <Typography variant="h6">Get Involved</Typography>
              <Typography variant="body2">
                Join our efforts to improve the platform. Contribute to development, provide feedback, or become an ambassador.
              </Typography>
              <a href="/get-involved" className="card-link">Get Involved</a>
            </Box>

            <Box className="cardy" sx={{ width: '30%', padding: 2, boxShadow: 1, borderRadius: 2 }}>
              <Typography variant="h6">Join Community</Typography>
              <Typography variant="body2">
                Connect with other users. Participate in discussions, ask questions, and stay updated with our latest news.
              </Typography>
              <a href="/join-community" className="card-link">Join Community</a>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
