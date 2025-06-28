import Feed from "../Feed/Feed";
import MembershipLegend from "../MembershipLegends/MembershipLegend";
import UserType from "../UserType/UserType";
import SearchType from "../SearchType/SearchType";
import './Profiles.css';
import { useEffect, useState } from "react";
import useAxiosFetch from "../../hooks/useAxiosFetch";

const Profiles = ({ type = "profiles" }) => {

    const [profiles, setProfiles] = useState([]);
    const [userCategory, setUserCategory] = useState('ALL');
    const [filteredProfiles, setFilteredProfiles] = useState([]);
    const [profilesCategory, setProfilesCategory] = useState([]);

    const { data, fetchError, isLoading } = useAxiosFetch("/data/db.json");

    useEffect(() => {
        if (data && data.profiles) {
            setProfiles(data.profiles);
        }
    }, [data]);


    useEffect(() => {
        setFilteredProfiles(profiles);
    }, [profiles, setFilteredProfiles])


    useEffect(() => {
        (userCategory !== "ALL") ?
            (setProfilesCategory(filteredProfiles.filter(profile => (profile.subscription) === userCategory)))
            : setProfilesCategory(filteredProfiles);

    }, [userCategory, filteredProfiles]);

    return (
        <>
            <main className="Profiles">
                <h1>Profiles</h1>
                <SearchType
                    profiles={profiles}
                    filteredProfiles={filteredProfiles}
                    setFilteredProfiles={setFilteredProfiles}
                    setProfilesCategory={setProfilesCategory}
                    userCategory={userCategory}
                    setUserCategory={setUserCategory}
                />
                <UserType
                    filteredProfiles={filteredProfiles}
                    userCategory={userCategory}
                    setUserCategory={setUserCategory}
                    type={type}
                />
                {isLoading && <p className="statusMsg">Loading Profiles....</p>}
                {fetchError && <p className="statusMsg" style={{ color: "red" }}>{fetchError}</p>}
                {!isLoading && !fetchError && (filteredProfiles.length ?
                    (<Feed
                        profilesCategory={profilesCategory}
                        type={type} />
                    )
                    : (<p
                        style={{ marginTop: "2rem" }}>
                        No profiles found.
                    </p>)
                )}

            </main>
            <MembershipLegend />
        </>

    )
}

export default Profiles
