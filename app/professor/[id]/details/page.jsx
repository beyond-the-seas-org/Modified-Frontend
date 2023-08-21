'use client'
import React from 'react'
// import Header from '../../../../components/professor/Header'

import { useState, useEffect } from "react";
import { Box, Stack, Skeleton, Typography, Button, LinearProgress } from "@mui/material";
import ProfessorHeader from '../../../../components/professor/Header'
import ResearchProfile from '../../../../components/professor/Research'
import OngoingProjectsCard from '../../../../components/professor/Projects'
import FeedbacksComponent from '../../../../components/professor/Feedback'

// const page = () => {
//   return (
//     <div>
//       <Header/>
//       <About/>
//       <Details/>
//     </div>
//   )

// }

// export default page;

function ProfessorDetails() {
  // You can expand on these state values as required
  const [professor, setProfessor] = useState({});
  const [publications, setPublications] = useState([]);
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [fundingOpportunities, setFundingOpportunities] = useState([]);
  const [matchScore, setMatchScore] = useState(5); // Example value

  const qlink = window.location.href;
  const tokens = qlink.split("/");
  let prof_id = tokens[tokens.length - 2]
  //convert user id to int
  prof_id = parseInt(prof_id);
  console.log("prof_id", prof_id);

  useEffect(() => {
    async function showProfDetails() {
        try {
            // Fetch comments from the API
            const response = await fetch(`http://127.0.0.1:5002/api/professors/${prof_id}/get_a_professor_details`);
            const data = await response.json();
            setProfessor(data);
            console.log (data)

            // set publicaitons
            const pubs = data.publication_details;
            setPublications(pubs);
            // console.log (pubs)

            const fields = data.field_names;
            setFieldOfInterest(fields);
            // console.log (fields)

            const projects = data.on_going_research_details;
            setOngoingProjects(projects);
            console.log(projects)

            const values = data.professor_feedback_details;
            setFeedbacks(values);
            console.log(values)

        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    } showProfDetails();
}, [])


return (
  <div>
    <ProfessorHeader professor={professor} />
    <ResearchProfile publications={publications} fields={fieldOfInterest} />
    <OngoingProjectsCard projects = {ongoingProjects} />
    <FeedbacksComponent feedbacks = {feedbacks} />
  </div>
);

}

export default ProfessorDetails;


    // <Box p={3}>
    //   <Box mb={3}>
    //     <Typography variant="h4">{professor.name}</Typography>
    //     <Typography variant="subtitle1">{professor.contact}</Typography>
    //     <Typography variant="subtitle2">{professor.address}</Typography>
    //   </Box>

    //   <Box display="flex" mb={3}>
    //     <Box flex={1} pr={2}>
    //       <Typography variant="h6">Research Profile</Typography>
    //       <Typography>{professor.researchProfile}</Typography>

    //       <Typography variant="h6">Publication Count</Typography>
    //       <Typography>{professor.publicationCount}</Typography>

    //       <Typography variant="h6">H-index</Typography>
    //       <Typography>{professor.hIndex}</Typography>

    //       <Typography variant="h6">Field of Interest</Typography>
    //       <Typography>{professor.fieldOfInterest}</Typography>

    //       <Typography variant="h6">Working Area</Typography>
    //       <Typography>{professor.workingArea}</Typography>
    //     </Box>

    //     <Box flex={1} pl={2}>
    //       <Typography variant="h6">Publication Links</Typography>
    //       <ul>
    //         {publications.map(pub => (
    //           <li key={pub.id}><a href={pub.link}>{pub.title}</a></li>
    //         ))}
    //       </ul>

    //       <Typography variant="h6">Ongoing Projects</Typography>
    //       <ul>
    //         {ongoingProjects.map(project => (
    //           <li key={project.id}>{project.title}</li>
    //         ))}
    //       </ul>
    //     </Box>
    //   </Box>

    //   <Box mb={3}>
    //     <Typography variant="h6">Funding Opportunities</Typography>
    //     {fundingOpportunities.map(fund => (
    //       <Box key={fund.id} p={2} borderColor="grey.300" border={1} borderRadius={2} mb={2}>
    //         <Typography>{fund.title}</Typography>
    //         <Typography variant="body2">{fund.details}</Typography>
    //       </Box>
    //     ))}
    //   </Box>

    //   <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
    //     <Button variant="contained" color="primary">
    //       Add to Shortlist
    //     </Button>
        
    //     <Box>
    //       <Typography variant="h6">Profile Matching</Typography>
    //       <LinearProgress variant="determinate" value={(matchScore / 10) * 100} />
    //       <Typography>{matchScore} / 10</Typography>
    //     </Box>
    //   </Box>
    // </Box>