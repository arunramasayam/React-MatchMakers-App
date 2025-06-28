import UserType from '../UserType/UserType';
import SearchType from "../SearchType/SearchType";
import Feed from "../Feed/Feed";
import './CloudProfiles.css';
import { useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const CloudProfiles = ({ type = "cloudprofiles"}) => {

    const [cloudProfiles, setCloudProfiles] = useState([]);
    const [filteredCloudProfiles, setFilteredCloudProfiles] = useState([]);
    const [userCategoryCloud, setUserCategoryCloud] = useState('ALL');
    const [profilesCategoryCloud, setProfilesCategoryCloud] = useState([]);

    const { data, fetchError, isLoading } = useAxiosFetch("/data/db.json");

    useEffect(() => {
        if(data && data["cloud-profiles"])
        setCloudProfiles(data["cloud-profiles"]);
    }, [data]);


    useEffect(() => {
        (userCategoryCloud === "SHORTLISTED") ?
            (setProfilesCategoryCloud(filteredCloudProfiles.filter(profile => (profile.shortlisted) === true)))
            : setProfilesCategoryCloud(filteredCloudProfiles);

    }, [userCategoryCloud, filteredCloudProfiles, setProfilesCategoryCloud]);


    useEffect(() => {
        setFilteredCloudProfiles(cloudProfiles);
    }, [cloudProfiles, setFilteredCloudProfiles]);

    return (
        <main className="CloudProfiles">
            <h1>Cloud Profiles</h1>
            <SearchType
                profiles={cloudProfiles}
                filteredProfiles={filteredCloudProfiles}
                setFilteredProfiles={setFilteredCloudProfiles}
                setProfilesCategory={setProfilesCategoryCloud}
                setUserCategory={setUserCategoryCloud}
                userCategory={userCategoryCloud}
            />
            <UserType
                filteredProfiles={filteredCloudProfiles}
                userCategory={userCategoryCloud}
                setUserCategory={setUserCategoryCloud}
                type={type}
            />
            {isLoading && <p className="statusMsg">Loading Cloud Profiles...</p>}
            {fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
            {!isLoading && !fetchError && ((filteredCloudProfiles.length) ? (
                <Feed
                    profilesCategory={profilesCategoryCloud}
                    type={type} />)
                : (<p
                    style={{ marginTop: "2rem" }}>
                    No cloud profiles found.
                </p>)
            )}

        </main>
    )
}

export default CloudProfiles
