import { useEffect } from "react";

const KeywordSearch = ({ profiles, setSearchInput, setKeywordType, searchInput, keywordType, setFilteredProfiles, setUserCategory }) => {
    const handleClear = () => {
        setKeywordType('Any');
        setSearchInput('');
        setFilteredProfiles(profiles);
    }
    
      const handleKeywordSearch = (e) => {
        e.preventDefault();
    if (keywordType === "Any") {
      const searchProfiles = profiles.filter(profile => ((profile.surname).toLowerCase())
        .includes(searchInput.toLowerCase())
        || ((profile.name).toLowerCase()).includes(searchInput.toLowerCase()));
      setFilteredProfiles(searchProfiles);
    }
    else if (keywordType === "Surname") {
      const searchProfiles = profiles.filter(profile => ((profile.surname).toLowerCase())
        .includes(searchInput.toLowerCase()));
      setFilteredProfiles(searchProfiles);
    }
    else {
      const searchProfiles = profiles.filter(profile =>
        (`${profile.surname} ${profile.name}`.toLowerCase() === searchInput.toLowerCase()) 
       || (`${profile.name} ${profile.surname}`.toLowerCase() === searchInput.toLowerCase()));
      setFilteredProfiles(searchProfiles);
    }
     setUserCategory("ALL");
  }


    return (
        <div className="search-keyword">
            <form className="search-keyword-form" onSubmit={handleKeywordSearch}>
                <label htmlFor="keyword-type">Keyword Type:</label>
                <select name="keyword-type" id="keyword-type" value={keywordType} onChange={(e) => setKeywordType(e.target.value)}>
                    <option value="Any">Any</option>
                    <option value="Surname">Surname</option>
                    <option value="Full Name">Full Name</option>
                </select>
                <label htmlFor="search-box">Search: </label>
                <input
                    id="search-box"
                    type="text"
                    placeholder='Enter Keyword'
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} />
                <button id="clear-btn" type="button" onClick={handleClear}>Clear</button>
                <button id="search-btn" type="submit" >Search</button>
            </form>
        </div>
    )
}

export default KeywordSearch
