import React from 'react';
import { Card, CardContent, Link, Typography, AppBar, Toolbar, ListItem, ListItemText, ListItemAvatar, Avatar, List, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';

const Links = ({ links }) => {
  const linkItems = [
    {
      title: 'GitHub',
      url: links.github_link,
      icon: <GitHubIcon />,
    },
    {
      title: 'LinkedIn',
      url: links.linkedin_link,
      icon: <LinkedInIcon />,
    },
    {
      title: 'Website',
      url: links.website_link,
      icon: <WebIcon />,
    },
  ];

  return (
    <Card elevation={3}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">
            Personal Links
          </Typography>
        </Toolbar>
      </AppBar>
      <CardContent>
        <List>
          {linkItems.map((link, index) => (
            <React.Fragment key={link.title}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      backgroundColor: 'primary.main',
                      color: 'white',
                    }}
                  >
                    {link.icon}
                  </Avatar>
                </ListItemAvatar>
                {link.url ? (
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    style={{ display: 'block', textDecoration: 'none' }}
                  >
                    <ListItemText
                      primaryTypographyProps={{ fontWeight: 'medium' }}
                      secondaryTypographyProps={{ fontWeight: 'bold', color: 'secondary.main' }}
                      primary={link.title}
                    />
                  </Link>
                ) : (
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: 'medium' }}
                    secondaryTypographyProps={{ fontWeight: 'bold', color: 'error' }}
                    primary={link.title}
                    secondary="Link Not Found"
                  />
                )}
              </ListItem>
              {index !== linkItems.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default Links;
