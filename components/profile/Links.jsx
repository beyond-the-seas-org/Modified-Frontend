import React from 'react';
import { Card, CardContent, Link, Typography, AppBar, Toolbar } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WebIcon from '@mui/icons-material/Web';

const Links = () => {
  const links = [
    {
      title: 'GitHub',
      url: 'https://github.com/your-github-username',
      icon: <GitHubIcon />,
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/in/your-linkedin-username',
      icon: <LinkedInIcon />,
    },
    {
      title: 'Personal Website',
      url: 'https://www.your-personal-website.com',
      icon: <WebIcon />,
    },
  ];

  return (
    <Card>
      <CardContent>
      <AppBar position="static" color="primary" elevation={0}>
          <Toolbar>
            <Typography variant="h5" fontWeight="bold">
              Personal Links
            </Typography>
          </Toolbar>
        </AppBar>
        <br />
        {links.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            color="inherit"
            style={{ display: 'block', textDecoration: 'none', marginBottom: '1rem' }}
          >
            {link.icon}
            <Typography variant="body1" style={{ display: 'inline-block', marginLeft: '0.5rem' }}>
              {link.title}
            </Typography>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
};

export default Links;
