import './Profile.css';
import { calculateAge } from "../../utils/ageCalculateUtils";
import { convertCmToFeetInches } from "../../utils/HeightCalculateUtils";

const Profile = ({ profile, type }) => {
  return (
    <li
      className='profile-card'
      style={(type === "profiles") ? (profile.subscription) === "FREE" ? { border: "1.5px solid lightgrey" } :
        (profile.subscription) === "PAID" ? { border: "1.5px solid mediumspringgreen" } :
          { border: "1.5px solid lightcoral" } : (type === "cloudprofiles") ? { border: "1.5px solid lightgrey" } : {}}>

      <div className='image-wrapper'>
        <img
          className="profile-image"
          src={profile.picture}
          alt="" />
      </div>

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
