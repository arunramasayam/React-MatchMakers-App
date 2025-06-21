import Profile from "../Profile/Profile";
import '../Feed/Feed.css';
const Feed = ({ profilesCategory, type }) => {
  const viewHeight= (type==="profiles") ? "62vh":"70vh";
  return (
    <>
    {(profilesCategory.length) ?
    <ul className="profiles-container" style={{height:viewHeight}}>
    {profilesCategory.map(profile=>
      <Profile 
      key={profile.id}
      profile={profile}
      type={type}
      />
    )}
    </ul>
    : <p style={{marginTop:"2rem", marginLeft:"2rem", textDecoration:"underline"}}>Profiles not found.</p>}
    </>
  )
}

export default Feed
