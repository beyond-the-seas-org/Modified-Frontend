'use client'
import React from 'react'
// import Header from '../../../../components/professor/Header'

import { useState, useEffect } from "react";
import ProfessorHeader from '../../../../components/professor/Header'
import ResearchProfile from '../../../../components/professor/Research'
import OngoingProjectsCard from '../../../../components/professor/Projects'
import FeedbacksComponent from '../../../../components/professor/Feedback'
import FundingDetailsCard from '../../../../components/professor/Funding'

const ProfessorDetails = () => {
  // You can expand on these state values as required
  const [professor, setProfessor] = useState({});
  const [publications, setPublications] = useState([]);
  const [fieldOfInterest, setFieldOfInterest] = useState([]);
  const [ongoingProjects, setOngoingProjects] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [fundingOpportunities, setFundingOpportunities] = useState([]);
  const [matchScore, setMatchScore] = useState(5); // Example value
  const [user_id, setUser_id] = useState(null);
  const [prof_id, setProf_id] = useState(null);


  //console.log("prof_id", prof_id);
  useEffect(() => {
    const qlink = window.location.href;
    const tokens = qlink.split("/");
    let prof_id = tokens[tokens.length - 2]
    //convert user id to int
    console.log("prof_id", prof_id);
    prof_id = parseInt(prof_id);

    setProf_id(prof_id);

    //get user id
    const user_id = localStorage.getItem("id");
    setUser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
    }

    async function showProfDetails() {
        try {
            // Fetch comments from the API
            const response = await fetch(`http://127.0.0.1:5002/api/professors/${prof_id}/get_a_professor_details`,
            {
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem('access_token')} `
                },
            });

            if (response.status === 401) {
                window.location.href = "/login";
            }
            
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

            const fund = data.funding_details
            setFundingOpportunities(fund);
            console.log(fund)
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
    <FundingDetailsCard fundingDetails = {fundingOpportunities} />
  </div>
);

}

export default ProfessorDetails;
