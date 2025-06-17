import Profile from "./Profile"

const Feed = ({ profilesCategory }) => {
  return (
    <>
    {(profilesCategory.length) ?
    <ul className="profiles-container">
    {profilesCategory.map(profile=>
      <Profile 
      key={profile.id}
      profile={profile}
      />
    )}
    </ul>
    : <p style={{marginTop:"2rem"}}>Profiles not found.</p>}
    </>
  )
}

export default Feed
