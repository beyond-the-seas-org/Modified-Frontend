import { Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography, Avatar, Checkbox, Favorite, Button } from "@mui/material";

import StyledButton from "../styled-components/StyledButton"


const Funding = ({ funding, refreshFundinglist, mode }) => {

  return (
    <Card sx={{ margin: 5 , borderColor:mode === 'dark' ? 'white' : 'black' ,borderWidth: '2px', borderStyle: 'solid',borderRadius: 4,boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)'}} >
      <CardHeader
        avatar={ 
          <Avatar alt="Profile Picture" src={funding.professor_image} sx={{ width: 60, height: 60 }}/>
        }
       
        title={
          /*Shows the Funding's name */
          <Typography variant="h6" component="div">
            {funding.professor_name}
          </Typography>
        }

        subheader ={
          <div>
            <Typography variant="body2" color="textSecondary">
            {funding.date}
            </Typography>
            <Typography variant="body2" color="textSecondary">
           Number of Slots: {funding.num_of_slot}
            </Typography>
            {/* You can continue to add more subheaders in the same fashion */}
          </div>
        }

  
      />
      
      <CardContent>
        <Typography variant="body2" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Funding Amount :</b> {funding.amount} $
        </Typography>

        <Typography variant="body2" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Funding Post :</b> {funding.funding_post}
        </Typography>

        <Typography variant="body2" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Funding Requirements :</b> {funding.requirement_description}
        </Typography>

        
        <br/>

        <Typography variant="h8" color={ mode === 'dark' ? 'white' : 'black'  }>
          <b>Research Area:</b>
        
          {funding.field_names.map((field, index) => (
            <li key={index}>
              <Typography component="span" variant="body1" color={ mode === 'dark' ? 'white' : 'black' }>
                {field}
              </Typography>
            </li>
          ))}
          
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Funding;
