import KeywordSearch from "../KeywordSearch/KeywordSearch";
import AdvanceSearch from "../AdvanceSearch/AdvanceSearch";
import './SearchType.css';
import { useEffect, useState } from "react";

const SearchType = ({ profiles, setFilteredProfiles,
    handleKeywordSearch, setProfilesCategory, setUserCategory, advanceSearchFields, setAdvanceSearchFields, filteredProfiles
}) => {

    const [searchType, setSearchType] = useState('keyword');
    useEffect(() => {
        setFilteredProfiles(profiles);
    }, [searchType, setFilteredProfiles, profiles])
    return (
        <>
            <div className='search-type'>
                <button
                    className={`search-type-btn ${searchType === "keyword" ? "active" : ""}`}
                    onClick={(e) => setSearchType("keyword")}>
                    <span className="btn-label">Keyword Search</span>
                </button>
                <button
                    className={`search-type-btn ${searchType === "advance" ? "active" : ""}`}
                    onClick={(e) => setSearchType("advance")}>
                    <span className="btn-label">Advance Search</span>

                </button>
            </div>
            {searchType === "keyword"
                ? <KeywordSearch
                    profiles={profiles}
                    setFilteredProfiles={setFilteredProfiles}
                    handleKeywordSearch={handleKeywordSearch}
                    setProfilesCategory={setProfilesCategory}
                    setUserCategory={setUserCategory}
                />
                : <AdvanceSearch profiles={profiles}
                    setFilteredProfiles={setFilteredProfiles}
                />}
        </>
    )
}


export default SearchType
