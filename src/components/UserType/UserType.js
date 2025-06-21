import './UserType.css';

const UserType = ({ setUserCategory, filteredProfiles, userCategory, type }) => {
  let allMembers = 0, paidMembers = 0, deactivatedMembers = 0, shortListedMembers = 0;

  if (filteredProfiles.length) {
    allMembers = filteredProfiles.length;

    if (type === "profiles") {
      paidMembers = filteredProfiles.filter(profile => profile.subscription === "PAID").length;
      deactivatedMembers = filteredProfiles.filter(profile => profile.subscription === "DEACTIVATED").length;
    } else if (type === "cloudprofiles") {
      shortListedMembers = filteredProfiles.filter(profile => profile.shortlisted === true).length;
    }
  }

  const defaultUserTypeOptions = {
    ALL: {
      label: "All Members",
      count: allMembers
    },
    PAID: {
      label: "Paid Members",
      count: paidMembers
    },
    DEACTIVATED: {
      label: "Deactivated Members",
      count: deactivatedMembers
    }
  };

  const cloudUserTypeOptions = {
    ALL: {
      label: "All Members",
      count: allMembers
    },
    SHORTLISTED: {
      label: "Shortlisted",
      count: shortListedMembers
    }
  };

  const userTypeOptions = type === "profiles" ? defaultUserTypeOptions : cloudUserTypeOptions;

  return (
    <div className='UserType'>
      {Object.entries(userTypeOptions).map(([key, { label, count }]) => (
        <button
          className={`user-toggle ${key===userCategory ? "active":""}`}
          key={key}
          onClick={() => setUserCategory(key)}
        >
          <span className='btn-label'>{label} ({count})</span>
        </button>
      ))}
    </div>
  );
};

export default UserType;
