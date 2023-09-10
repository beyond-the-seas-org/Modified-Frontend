import React from 'react';
import { Card, CardContent, Link, Typography, AppBar, Toolbar, ListItem, ListItemText, ListItemAvatar, Avatar, List, Divider } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';
import EmailIcon from '@mui/icons-material/Email';

const Links = ({ links }) => {
  const linkItems = [
    {
      title: 'Email',
      url: links.primary_email ? `mailto:${links.primary_email}` : null,
      display: links.primary_email || "Not provided",
      icon: <EmailIcon />,
    },
    {
      title: 'GitHub',
      url: links.github_link 
           ? (links.github_link.startsWith('http') ? links.github_link : `https://${links.github_link}`)
           : null,
      display: links.github_link || "Not provided",
      icon: <GitHubIcon />,
    },
    {
      title: 'LinkedIn',
      url: links.linkedin_link 
           ? (links.linkedin_link.startsWith('http') ? links.linkedin_link : `https://${links.linkedin_link}`)
           : null,
      display: links.linkedin_link || "Not provided",
      icon: <LinkedInIcon />,
    },
    {
      title: 'Website',
      url: links.website_link 
           ? (links.website_link.startsWith('http') ? links.website_link : `https://${links.website_link}`)
           : null,
      display: links.website_link || "Not provided",
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
                      primaryTypographyProps={{ fontWeight: 'medium', color: 'primary.main', textDecoration: 'underline' }}
                      secondaryTypographyProps={{ fontWeight: 'bold', color: 'secondary.main' }}
                      primary={link.title}
                      secondary={link.display}
                    />
                  </Link>
                ) : (
                  <ListItemText
                    primaryTypographyProps={{ fontWeight: 'medium', textDecoration: 'underline' }}
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
