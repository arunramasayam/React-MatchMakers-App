import Feed from "./Feed";
import MembershipLegend from "./MembershipLegend";
import UserType from "./UserType";
import SearchType from "./SearchType";

const Profiles = ({ profiles, filteredProfiles, userCategory, setUserCategory, searchType, setSearchType,
    setKeywordType, setSearchInput, searchInput, keywordType, setFilteredProfiles, handleKeywordSearch, profilesCategory, setProfilesCategory,
    advanceSearchFields, setAdvanceSearchFields
 }) => {
    
    return (
        <>
        <main className="Profiles">
            <h1>Profiles</h1>
            <SearchType 
            profiles={profiles}
            searchType={searchType}
            setSearchType={setSearchType}
            setKeywordType={setKeywordType}
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            keywordType={keywordType}
            filteredProfiles={filteredProfiles}
            setFilteredProfiles={setFilteredProfiles}
            handleKeywordSearch={handleKeywordSearch}
            setProfilesCategory={setProfilesCategory}
            setUserCategory={setUserCategory}
            advanceSearchFields={advanceSearchFields}
            setAdvanceSearchFields={setAdvanceSearchFields}
            />
           <UserType
           filteredProfiles={filteredProfiles} 
           userCategory={userCategory}
           setUserCategory={setUserCategory}
           />
            {(filteredProfiles.length) ?
                <Feed
                    profilesCategory={profilesCategory} />
                : <p
                    style={{ marginTop: "2rem" }}>
                    No profiles found.
                </p>}
            
        </main>
        <MembershipLegend />
        </>

    )
}

export default Profiles
