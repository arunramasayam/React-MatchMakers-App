import KeywordSearch from "./KeywordSearch";
import AdvanceSearch from "./AdvanceSearch";

const SearchType = ({ profiles, searchType, setSearchType, setSearchInput, setKeywordType, searchInput, keywordType, setFilteredProfiles,
    handleKeywordSearch, setProfilesCategory, setUserCategory, advanceSearchFields, setAdvanceSearchFields
 }) => {
    return (
        <>
        <div className='search-type'>
            <button
                className='search-type-btn'
                onClick={(e) => setSearchType("keyword")}>
                Keyword Search
            </button>
            <button
                className='search-type-btn'
                onClick={(e) => setSearchType("advance")}>
                Advance Search
            </button>
        </div>
        {searchType === "keyword" 
        ? <KeywordSearch 
        profiles={profiles}
        setKeywordType={setKeywordType}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        keywordType={keywordType}
        setFilteredProfiles={setFilteredProfiles}
        handleKeywordSearch={handleKeywordSearch}
        setProfilesCategory={setProfilesCategory}
        setUserCategory={setUserCategory}
        /> 
        : <AdvanceSearch profiles={profiles} 
        advanceSearchFields={advanceSearchFields}
        setAdvanceSearchFields={setAdvanceSearchFields}
         setFilteredProfiles={setFilteredProfiles}
        />}
        </>
    )
}


export default SearchType
