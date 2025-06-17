import { calculateAge } from "./utils/ageCalculateUtils";
import { convertCmToFeetInches } from "./utils/HeightCalculateUtils";

const Profile = ({ profile }) => {
  return (
    <li
      className='profile-card'
      style={(profile.subscription) === "FREE" ? { border: "1px solid lightgrey" } :
        (profile.subscription) === "PAID" ? { border: "1px solid mediumspringgreen" } :
          { border: "1px solid lightcoral" }}>

      <img
        className="profile-image"
        src={profile.picture}
        alt=""
        width="150px"
        height="190px"/>

      <article className="profile-info">
        <h3>{`${profile.surname} ${profile.name}`}</h3>
        <div className="primary-info">
        <p>{calculateAge(profile.dob)} Y</p>
        <p>{convertCmToFeetInches(profile.heightInCms)}</p>
        <p>{`${profile.caste} ${profile.subCaste}`}</p>
        </div>
        <div className="details-row">
          <div className="details-row">
        <span className="detail-label">Location : </span>
        <span className="detial-value">{profile.address?.city}</span>
        <div>
        <div className="details-row"></div>
        <span className='detail-label'>Profession : </span>
        <span className="detial-value">{profile.profession?.designation}</span>
        </div>
        <div className="details-row"></div>
        <span className='detail-label'>Marital Status : </span>
        <span className="detail-value">{profile.maritalStatus}</span>
        </div>
        </div>
      </article>
    </li>
    

  )
}

export default Profile
