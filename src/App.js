import { Route, Routes } from 'react-router-dom';
import Profiles from './Profiles';
import CloudProfiles from './CloudProfiles';
import Missing from './Missing';
import { useState, useEffect } from 'react';

function App() {
  const [userCategory, setUserCategory] = useState('ALL');
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [searchType, setSearchType] = useState('keyword');
  const [keywordType, setKeywordType] = useState('Any');
  const [searchInput, setSearchInput] = useState('');
  const [profilesCategory, setProfilesCategory] = useState([]);
  const [advanceSearchFields, setAdvanceSearchFields] = useState(
    {
      caste: "",
      subCaste: "",
      memberLanguage: "",
      country: "",
      state: "",
      city: "",
      onBehalf: "",
      familyValue: "",
      familyStatus: "",
      maritalStatus: "",
      higherEducation: "",
      annualIncomeRange: "",
      professionType: "",
      designation: "",
      residenceType: "",
      dobRange: "",
      rashi: "",
      nakshatra: "",
      pada: "",
      dosham: "",
      complexion: "",
      heightRange: "",
      keyword: ""
    }

  )
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      picture: "https://static.toiimg.com/thumb/msid-37319741,imgsizecity-50435,width-400,resizemode-4/37319741.jpg",
      surname: "Kona",
      name: "Venkateshwar",
      gender: "male",
      dob: "1997-08-15",
      heightInCms: 180,
      caste: "Velama",
      subCaste: "Kapu",
      profession: {
        professionType: "IT / Software",
        designation: "Software Engineer"
      },
      maritalStatus: "Never Married",
      subscription: "PAID",
      motherTongue: "Tamil",
      address: {
        country: "India",
        state: "Telangana",
        city: "Warangal"
      },
      registeredBy: "Parent",
      familyValue: "Liberal",
      familyStatus: "Middle Class",
      higherEducation: "Master's",
      annualIncomeInRupees: 500000,
      residenceType: "Rented",
      dobRange: "",
      horoscope: {
        rashi: "Tula",
        nakshatra: "Chitra",
        pada: "3",
        dosham: "Pitru Dosham",
      },
      complexion: "Fair",
    },
    {
      id: 2,
      picture: "https://c8.alamy.com/comp/FB540N/beautiful-indian-bride-in-rich-ethnic-dress-FB540N.jpg",
      surname: "Yadavalli",
      name: "Bhavani",
      gender: "Female",
      dob: "1998-03-01",
      heightInCms: 175,
      caste: "Reddy",
      subCaste: "Pedakanti",
      profession:
      {
        professionType: "IT / Software",
        designation: "Software Engineer"
      },
      maritalStatus: "Never Married",
      subscription: "FREE",
      motherTongue: "Telugu",
      address: {
        country: "India",
        state: "Telangana",
        city: "Karimnager"
      },
      registered: "Self",
      familyValue: "Modern",
      familyStatus: "Middle Class",
      higherEducation: "Bachelor's",
      annualIncomeInRupees: "700000",
      residenceType: "Owned",
      dobRange: "",
      horoscope: {
        rashi: "Tula",
        nakshatra: "Chitra",
        pada: "3",
        dosham: "Pitru Dosham",
      },
      complexion: "Very Fair",
      heightRange: "",
      keyword: ""
    }//,
    // {
    //   id: 3,
    //   picture: null,
    //   surname: "Goud",
    //   name: "Srinivas",
    //   dob: "1991-02-14",
    //   heightInCms: 180,
    //   caste: "Goud",
    //   subCaste: "Tadi",
    //   profession: "Devops Engineer",
    //   city: "Bangalore",
    //   maritalStatus: "Never Married",
    //   subscription: "DEACTIVATED"
    // },
    // {
    //   id: 4,
    //   picture: null,
    //   surname: "Goud",
    //   name: "Srinivas",
    //   dob: "1991-02-14",
    //   heightInCms: 180,
    //   caste: "Goud",
    //   subCaste: "Tadi",
    //   profession: "Devops Engineer",
    //   city: "Bangalore",
    //   maritalStatus: "Never Married",
    //   subscription: "PAID"
    // },
    // {
    //   id: 5,
    //   picture: null,
    //   surname: "Goud",
    //   name: "Srinivas",
    //   dob: "1991-02-14",
    //   heightInCms: 180,
    //   caste: "Goud",
    //   subCaste: "Tadi",
    //   profession: "Devops Engineer",
    //   city: "Bangalore",
    //   maritalStatus: "Never Married",
    //   subscription: "PAID"
    // },
    // {
    //   id: 6,
    //   picture: "https://static.toiimg.com/thumb/msid-37319741,imgsizecity-50435,width-400,resizemode-4/37319741.jpg",
    //   surname: "Kona",
    //   name: "Venkateshwar",
    //   gender: "male",
    //   dob: "1997-08-15",
    //   heightInCms: 180,
    //   caste: "Velama",
    //   subCaste: "Kapu",
    //   profession: "Sr Software Engineer",
    //   city: "Hyderabad",
    //   maritalStatus: "Never Married",
    //   subscription: "PAID"
    // },
    // {
    //   id: 7,
    //   picture: null,
    //   surname: "Yadavalli",
    //   name: "Bhavani",
    //   gender: "Female",
    //   dob: "1998-03-01",
    //   heightInCms: 175,
    //   caste: "Reddy",
    //   subCaste: "Pedakanti",
    //   profession: "Cloud Engineer",
    //   city: "Vijayawada",
    //   maritalStatus: "Never Married",
    //   subscription: "FREE"
    // },
    // {
    //   id: 8,
    //   picture: null,
    //   surname: "Goud",
    //   name: "Srinivas",
    //   dob: "1991-02-14",
    //   heightInCms: 180,
    //   caste: "Goud",
    //   subCaste: "Tadi",
    //   profession: "Devops Engineer",
    //   city: "Bangalore",
    //   maritalStatus: "Never Married",
    //   subscription: "DEACTIVATED"
    // },
    // {
    //   id: 9,
    //   picture: null,
    //   surname: "Goud",
    //   name: "Srinivas",
    //   dob: "1991-02-14",
    //   heightInCms: 180,
    //   caste: "Goud",
    //   subCaste: "Tadi",
    //   profession: "Devops Engineer",
    //   city: "Bangalore",
    //   maritalStatus: "Never Married",
    //   subscription: "PAID"
    // },
    // {
    //   id: 10,
    //   picture: null,
    //   surname: "Goud",
    //   name: "Srinivas",
    //   dob: "1991-02-14",
    //   heightInCms: 180,
    //   caste: "Goud",
    //   subCaste: "Tadi",
    //   profession: "Devops Engineer",
    //   city: "Bangalore",
    //   maritalStatus: "Never Married",
    //   subscription: "PAID"
    // }


  ]);
  useEffect(() => {
    (userCategory !== "ALL") ?
      (setProfilesCategory(filteredProfiles.filter(profile => (profile.subscription) === userCategory)))
      : setProfilesCategory(filteredProfiles);

  }, [userCategory, filteredProfiles]);




  useEffect(() => {
    setFilteredProfiles(profiles);
  }, [profiles])



  return (
    <div className="App">
      <Routes>
        <Route path='/profiles' element={<Profiles
          profiles={profiles}
          filteredProfiles={filteredProfiles}
          useCategory={userCategory}
          setUserCategory={setUserCategory}
          searchType={searchType}
          setSearchType={setSearchType}
          setSearchInput={setSearchInput}
          keywordType={keywordType}
          setKeywordType={setKeywordType}
          searchInput={searchInput}
          setFilteredProfiles={setFilteredProfiles}
          profilesCategory={profilesCategory}
          setProfilesCategory={setProfilesCategory}
          advanceSearchFields={advanceSearchFields}
          setAdvanceSearchFields={setAdvanceSearchFields}
        />} />
        <Route path='/cloud-profiles' element={<CloudProfiles />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
