import { useEffect } from "react";

const UserType = ({ profiles, setUserCategory, userCategory, filteredProfiles }) => {
  let allMembers = 0, paidMembers = 0, deactivatedMembers = 0;
  if (filteredProfiles.length) {
    allMembers = filteredProfiles.length;
    paidMembers = (filteredProfiles.filter(profile => profile.subscription === "PAID")).length;
    deactivatedMembers = (filteredProfiles.filter(profile => profile.subscription === "DEACTIVATED")).length;
  
  }
  
  return (
    <div
      className='UserType'>
      <button className='user-toggle'
        onClick={(e) => setUserCategory("ALL")}>
        All Members ({allMembers})
      </button>
      <button
        className='user-toggle'
        onClick={(e) => setUserCategory("PAID")}>
        Paid Members ({paidMembers})
      </button>
      <button
        className='user-toggle'
        onClick={(e) => setUserCategory("DEACTIVATED")}>
        Deactivated Members ({deactivatedMembers})
      </button>
    </div>
  )
}

export default UserType
