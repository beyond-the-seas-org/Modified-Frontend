import React from 'react'
import ProfileHeader from '../../../components/profile/ProfileHeader'
import About from '../../../components/profile/About'
import Skills from '../../../components/profile/Skills'
import ActivityFeed from '../../../components/profile/ActivityFeed'

const page = () => {
  return (
    <div>
        <ProfileHeader/>
        <About/>
        <Skills/>
       {/* Pass the 'user' prop to the ActivityFeed component */}
      <ActivityFeed/>
    </div>
  )
}

export default page