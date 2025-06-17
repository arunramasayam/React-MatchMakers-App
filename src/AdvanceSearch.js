import { calculateAge } from "./utils/ageCalculateUtils";
import { annualIncomeRangeOptions } from "./utils/options/annualIncomeRangeOptions";
import { casteSubcasteOptions } from "./utils/options/casteSubcasteOptions";
import { complexionOptions } from "./utils/options/complexionOptions";
import { dobRangeOptions } from "./utils/options/dobRangeOptions";
import { doshamOptions } from "./utils/options/doshamOptions";
import { educationOptions } from "./utils/options/eduationOptions";
import { familyValueOptions } from "./utils/options/familyValueOptions";
import { familyStatusOptions } from "./utils/options/familyStatusOptions";
import { heightRangeOptions } from "./utils/options/heightRangeOptions";
import { languageOptions } from "./utils/options/languageOptions.js";
import { locationOptions } from "./utils/options/locationOptions";
import { maritalStatusOptions } from "./utils/options/maritalStatusOptions";
import { professionOptions } from "./utils/options/professionOptions";
import { rashiNakshatraPadaOptions } from "./utils/options/rashiNakshatraPadasOptions";
import { residenceTypeOptions } from "./utils/options/residenceOptions";
import { onBehalfOptions } from "./utils/options/onBehalfOptions";

const AdvanceSearch = ({ profiles, advanceSearchFields, setAdvanceSearchFields, setFilteredProfiles }) => {

  const handleAdvanceSearchSubmit = (e) => {
    e.preventDefault();
    const fields = {
      country: 'address.country',
      state: 'address.state',
      city: 'address.city',
      memberLanguage: 'motherTongue',
      onBehalf: 'registeredBy',
      caste: 'caste',
      subCaste: 'subCaste',
      maritalStatus: 'maritalStatus',
      complexion: 'complexion',
      rashi: 'horoscope.rashi',
      nakshatra: 'horoscope.nakshatra',
      pada: 'horoscope.pada',
      dosham: 'horoscope.dosham',
      higherEducation: 'higherEducation',
      familyValue: 'familyValue',
      familyStatus: 'familyStatus',
      residenceType: 'residenceType',
      professionType: 'profession.professionType',
      designation: 'profession.designation'
    }
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((acc, part) => acc?.[part], obj);
    };

    let searchResults = profiles;
    Object.entries(fields).forEach(([searchKey, profilePath]) => {
      const filterValue = advanceSearchFields[searchKey];
      if (filterValue) {
        searchResults = searchResults.filter(profile => getNestedValue(profile, profilePath) === filterValue);
      }
    })


    if (advanceSearchFields.dobRange && dobRangeOptions[advanceSearchFields.dobRange]) {
      const [minAge, maxAge] = dobRangeOptions[advanceSearchFields.dobRange];
      searchResults = searchResults.filter(profile => {
        const age = calculateAge(profile.dob);
        return maxAge !== null
          ? age >= minAge && age <= maxAge
          : age >= minAge;
      });
    }



    if (advanceSearchFields.annualIncomeRange && annualIncomeRangeOptions[advanceSearchFields.annualIncomeRange]) {
      const [minIncome, maxIncome] = annualIncomeRangeOptions[advanceSearchFields.annualIncomeRange];
      searchResults = searchResults.filter(profile => {
        const income = profile.annualIncomeInRupees;
        return (maxIncome !== null)
          ? ((income >= minIncome) && (income <= maxIncome))
          : (income >= minIncome);

      })
    }

    if(advanceSearchFields.heightRange && heightRangeOptions[advanceSearchFields.heightRange]){
      const [minHeight, maxHeight]=heightRangeOptions[advanceSearchFields.heightRange];
      searchResults=searchResults.filter(profile=>{
        const height=profile.heightInCms;
        return (maxHeight!=null) 
        ? ((height>=minHeight) && (height<=maxHeight)) 
        : (height >= minHeight);
      })
    }

    if (advanceSearchFields.keyword) {
      searchResults = searchResults.filter(profile => ((`${profile.surname.toLowerCase()}`).includes((advanceSearchFields.keyword).toLowerCase()))
        || ((`${profile.name.toLowerCase()}`).includes((advanceSearchFields.keyword).toLowerCase()))
        || ((`${profile.surname} ${profile.name}`).toLowerCase().includes((advanceSearchFields.keyword).toLowerCase()))
        || ((`${profile.name} ${profile.surname}`).toLowerCase().includes((advanceSearchFields.keyword).toLowerCase()))
      );
    }
    setFilteredProfiles(searchResults);
  }

  const handleClear = () => {
    setAdvanceSearchFields(prev => {
      const clearedFields = {};
      Object.keys(prev).forEach(key => {
        clearedFields[key] = "";
      });
      return clearedFields;
    });
  };


  const handleFieldsChange = (e) => {
    const { name, value } = e.target;
    setAdvanceSearchFields(prev => {
      let updateFields = {
        ...prev,
        [name]: value
      };
      if (name === 'country') {
        updateFields.state = '';
        updateFields.city = '';
      }
      if (name === 'rashi') {
        updateFields.nakshatra = '';
        updateFields.pada = '';
      }
      return updateFields;
    });
  };
//   const educationOptions = [
//     'Bachelor\'s', 'Master\'s', 'Diploma', 'Ph.D', 'Law', 'Medical', 'Foregin', '12th Pass', '10th Pass', 'Others'
//   ];

//   const complexionOptions = [
//     'Fair', 'Very Fair', 'Wheatish', 'Wheatish Brown', 'Dark'
//   ].sort();

//   const maritalStatusOptions = [
//     'Never Married', 'Divorced', 'Widowed'
//   ].sort();

//   const languageOptions = [
//     "Telugu", "Hindi", "Tamil", "Kannada", "Malayalam", "Bengali", "Bhojpuri", "Gujarati", "Marathi", "Odia", "Punjabi", "Urdu",
//     "Nepali", "Assamese", "English", "Sindhi", "Konkani", "Manipuri", "Dogri", "Maithili", "Bodo", "Tulu", "Santhali",
//   ].sort();



//   const residenceTypeOptions = [
//     'Owned', 'Rented', 'Living with Parents', 'Hostel', 'Company Accomodation', 'Paying Guest (PG)', 'Others'
//   ];

//   const heightRangeOptions = {
//   "4'6\" - 5'0\"": [137, 152],
//   "5'0\" - 5'4\"": [152, 163],
//   "5'4\" - 5'8\"": [163, 173],
//   "5'8\" - 6'0\"": [173, 183],
//   "6'0\" - 6'4\"": [183, 193],
//   "6'4\" - 6'6\"": [193, 198],
//   "Others": [0, null] 
// };


//   const dobRangeOptions = {
//     "18 - 24": [18, 24],
//     "25 - 28": [25, 28],
//     "29 - 30": [29, 30],
//     "31 - 35": [31, 35],
//     "36 - 40": [36, 40],
//     "41 - 45": [41, 45],
//     "46 and Above": [46, null]
//   };

//   const annualIncomeRangeOptions = {
//     "No Income": [0, 0],
//     "Less than ₹1 Lakh": [1, 99999],
//     "₹1 Lakh - ₹2 Lakh": [100000, 200000],
//     "₹2 Lakh – ₹4 Lakh": [200001, 400000],
//     "₹4 Lakh – ₹7 Lakh": [400001, 700000],
//     "₹7 Lakh – ₹10 Lakh": [700001, 1000000],
//     "₹10 Lakh – ₹15 Lakh": [1000001, 1500000],
//     "₹15 Lakh – ₹20 Lakh": [1500001, 2000000],
//     "₹20 Lakh – ₹25 Lakh": [2000001, 2500000],
//     "₹25 Lakh – ₹30 Lakh": [2500001, 3000000],
//     "₹30 Lakh – ₹50 Lakh": [3000001, 5000000],
//     "₹50 Lakh – ₹1 Crore": [5000001, 10000000],
//     "Above ₹1 Crore": [10000001, null]
//   };
//   const onBehalfOptions = [
//     "Self", "Parent", "Sibling", "Relative", "Friend", "Others"
//   ];

//   const familyValueOptions = [
//     "Traditional", "Modern", "Liberal"
//   ];

//   const familyStatusOptions = [
//     "Lower Middle Class", "Middle Class", "Upper Middle Class", "Affluent", "Rich / Wealthy"
//   ];

//   const doshamOptions = [
//     "Mangal Dosham", "Kalasarpa Dosham", "Rahu Dosham", "Ketu Dosham", "Naga Dosham", "Pitru Dosham", "Shani Dosham",
//     "Other Dosham", "No Dosham", "Don't Know"
//   ];


//   const rashiNakshatraPadaOptions = {
//     Mesha: {
//       label: 'Mesha (Aries)',
//       nakshatra: {
//         Ashwini: [1, 2, 3, 4],
//         Bharani: [1, 2, 3, 4],
//         Krittika: [1]
//       }
//     },
//     Vrishabha: {
//       label: 'Vrishabha (Taurus)',
//       nakshatra: {
//         Krittika: [2, 3, 4],
//         Rohini: [1, 2, 3, 4],
//         Mrigashira: [1, 2]
//       }
//     },
//     Mithuna: {
//       label: 'Mithuna (Gemini)',
//       nakshatra: {
//         Mrigashira: [3, 4],
//         Ardra: [1, 2, 3, 4],
//         Punarvasu: [1, 2, 3]
//       }
//     },
//     Karka: {
//       label: 'Karka (Cancer)',
//       nakshatra: {
//         Punarvasu: [4],
//         Pushyami: [1, 2, 3, 4],
//         Ashlesha: [1, 2, 3, 4]
//       }
//     },
//     Simha: {
//       label: 'Simha (Leo)',
//       nakshatra: {
//         Makha: [1, 2, 3, 4],
//         'Poorva Phalguni': [1, 2, 3, 4],
//         'Uttara Phalguni': [1]
//       }
//     },
//     Kanya: {
//       label: 'Kanya (Virgo)',
//       nakshatra: {
//         'Uttara Phalguni': [2, 3, 4],
//         Hasta: [1, 2, 3, 4],
//         Chitra: [1, 2]
//       }
//     },
//     Tula: {
//       label: 'Tula (Libra)',
//       nakshatra: {
//         Chitra: [3, 4],
//         Swati: [1, 2, 3, 4],
//         Visakha: [1, 2, 3]
//       }
//     },
//     Vrishchika: {
//       label: 'Vrishchika (Scorpio)',
//       nakshatra: {
//         Visakha: [4],
//         Anuradha: [1, 2, 3, 4],
//         Jyeshta: [1, 2, 3, 4]
//       }
//     },
//     Dhanu: {
//       label: 'Dhanu (Sagittarius)',
//       nakshatra: {
//         Moola: [1, 2, 3, 4],
//         Poorvashada: [1, 2, 3, 4],
//         Uttarashada: [1]
//       }
//     },
//     Makara: {
//       label: 'Makara (Capricorn)',
//       nakshatra: {
//         Uttarashada: [2, 3, 4],
//         Sravana: [1, 2, 3, 4],
//         Dhanishta: [1, 2]
//       }
//     },
//     Kumbha: {
//       label: 'Kumbha (Aquarius)',
//       nakshatra: {
//         Dhanishta: [3, 4],
//         Satabhishak: [1, 2, 3, 4],
//         'Poorvabhadra': [1, 2, 3]
//       }
//     },
//     Meena: {
//       label: 'Meena (Pisces)',
//       nakshatra: {
//         'Poorvabhadra': [4],
//         'Uttara Bhadrapada': [1, 2, 3, 4],
//         Revati: [1, 2, 3, 4]
//       }
//     }
//   };

//   const casteSubcasteOptions = {
//     Reddy: [
//       "Pedakanti",
//       "Panta",
//       "Desuru",
//       "Gowda",
//       "Kapu Reddy",
//       "Others"
//     ],
//     Kamma: [
//       "Naidu",
//       "Chowdary",
//       "Nijam Kamma",
//       "Others"
//     ],
//     Brahmin: [
//       "Niyogi",
//       "Vaidiki",
//       "Smartha",
//       "Dravida",
//       "Hoysala",
//       "Others"
//     ],
//     Yadav: [
//       "Golla",
//       "Konar",
//       "Dhangar",
//       "Others"
//     ],
//     Kapu: [
//       "Telaga",
//       "Balija",
//       "Ontari",
//       "Turpu Kapu",
//       "Others"
//     ],
//     Velama: [
//       "Padmanayaka",
//       "Polinati Velama",
//       "Koppula Velama",
//       "Others"
//     ],
//     Naidu: [
//       "Balija Naidu",
//       "Kamma Naidu",
//       "Mudiraj Naidu",
//       "Others"
//     ],
//     SC: [
//       "Mala",
//       "Madiga",
//       "Adi Andhra",
//       "Chambhar",
//       "Others"
//     ],
//     ST: [
//       "Lambada",
//       "Koya",
//       "Sugali",
//       "Others"
//     ],
//     Muslim: [
//       "Sunni",
//       "Shia",
//       "Sheikh",
//       "Syed",
//       "Others"
//     ],
//     Christian: [
//       "Roman Catholic",
//       "Protestant",
//       "CSI",
//       "Evangelical",
//       "Others"
//     ],
//     Others: [
//       "Other Subcaste"
//     ]
//   };


//   const professionOptions = {
//     "IT / Software": [
//       "Software Engineer",
//       "Full Stack Developer",
//       "Frontend Developer",
//       "Backend Developer",
//       "QA Engineer",
//       "DevOps Engineer",
//       "UI/UX Designer",
//       "Product Manager",
//       "IT Consultant",
//       "Others"
//     ],
//     "Medical / Healthcare": [
//       "Doctor",
//       "Surgeon",
//       "Dentist",
//       "Pharmacist",
//       "Nurse",
//       "Lab Technician",
//       "Physiotherapist",
//       "Medical Officer",
//       "Others"
//     ],
//     "Government / Civil Services": [
//       "IAS Officer",
//       "IPS Officer",
//       "Group 1 Officer",
//       "Group 2 / 3 / 4 Staff",
//       "Police Department",
//       "Railway Employee",
//       "Defense (Army/Navy/Air Force)",
//       "PSU Employee",
//       "Others"
//     ],
//     "Business / Self-Employed": [
//       "Entrepreneur",
//       "Retail / Shop Owner",
//       "Real Estate Dealer",
//       "Trader / Wholesaler",
//       "Freelancer",
//       "Others"
//     ],
//     "Education / Teaching": [
//       "School Teacher",
//       "College Lecturer",
//       "Professor",
//       "Principal",
//       "Tutor / Trainer",
//       "Others"
//     ],
//     "Finance / Accounts": [
//       "Chartered Accountant",
//       "Bank Manager",
//       "Auditor",
//       "Financial Analyst",
//       "Tax Consultant",
//       "Investment Banker",
//       "Others"
//     ],
//     "Engineering / Non-IT": [
//       "Mechanical Engineer",
//       "Civil Engineer",
//       "Electrical Engineer",
//       "Electronics Engineer",
//       "Site Engineer",
//       "Quality Engineer",
//       "Others"
//     ],
//     "Law / Legal": [
//       "Lawyer",
//       "Advocate",
//       "Legal Advisor",
//       "Judge",
//       "Legal Executive",
//       "Others"
//     ],
//     "Arts / Media / Design": [
//       "Graphic Designer",
//       "Photographer",
//       "Animator",
//       "Video Editor",
//       "Journalist",
//       "Fashion Designer",
//       "Others"
//     ],
//     "Agriculture": [
//       "Farmer",
//       "Agri Business Owner",
//       "Horticulturist",
//       "Poultry / Dairy Farmer",
//       "Others"
//     ],
//     "Not Working / Student": [
//       "Student",
//       "Unemployed",
//       "Preparing for Govt Exams",
//       "Others"
//     ],
//     "Other": [
//       "Other"
//     ]
//   };

//   const locationOptions = {
//     India: {
//       "Andhra Pradesh": ["Vijayawada", "Guntur", "Visakhapatnam", "Tirupati", "Nellore"],
//       Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar", "Khammam"],
//       Karnataka: ["Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum"],
//       "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Trichy", "Salem"],
//       Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad"],
//       Delhi: ["New Delhi"]
//     },
//     USA: {
//       California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
//       Texas: ["Houston", "Austin", "Dallas", "San Antonio", "Fort Worth"],
//       "New York": ["New York City", "Buffalo", "Rochester", "Albany"]
//     },
//     Canada: {
//       Ontario: ["Toronto", "Ottawa", "Hamilton", "London"],
//       "British Columbia": ["Vancouver", "Victoria", "Surrey", "Kelowna"]
//     }
//   };



  return (
    <>
      <form className="advance-search-form" onSubmit={handleAdvanceSearchSubmit}>
        <label htmlFor="caste">Caste</label>
        <select name="caste" id="caste" value={advanceSearchFields.caste} onChange={handleFieldsChange}>
          <option value=""></option>
          {casteSubcasteOptions && (Object.keys(casteSubcasteOptions)).map(caste => (
            <option key={caste} value={caste}>{caste}</option>
          ))}
        </select>

        <label htmlFor="subCaste">Sub-Caste</label>
        <select name="subCaste" id="subCaste" value={advanceSearchFields.subCaste} onChange={handleFieldsChange}>
          <option value=""></option>
          {advanceSearchFields.caste && casteSubcasteOptions && (casteSubcasteOptions[advanceSearchFields.caste]).map(subCaste => (
            <option key={subCaste} value={subCaste}>{subCaste}</option>
          ))
          }
        </select>

        <label htmlFor="memberLanguage">Member Language</label>
        <select name="memberLanguage" id="memberLanguage" value={advanceSearchFields.memberLanguage} onChange={handleFieldsChange}>
          <option value=""></option>
          {languageOptions && languageOptions.map(language => (
            <option key={language} value={language}>{language}</option>
          ))}
          <option value="Others">Others</option>
        </select>

        <label htmlFor="country">Country</label>
        <select name="country" id="country" value={advanceSearchFields.country} onChange={handleFieldsChange}>
          <option value=""></option>
          {locationOptions && Object.keys(locationOptions).map(country => (
            <option key={country} value={country}>{country}</option>
          ))}
        </select>

        <label htmlFor="state">State</label>
        <select name="state" id="state" value={advanceSearchFields.state} onChange={handleFieldsChange}>
          <option value=""></option>
          {advanceSearchFields.country && (Object.keys(locationOptions[advanceSearchFields.country])).map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>

        <label htmlFor="city">City</label>
        <select name="city" id="city" value={advanceSearchFields.city} onChange={handleFieldsChange}>
          <option value=""></option>
          {advanceSearchFields.state
            && (locationOptions[advanceSearchFields.country]?.[advanceSearchFields.state]).map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
        </select>


        <label htmlFor="onBehalf">On Behalf</label>
        <select name="onBehalf" id="onBehalf" value={advanceSearchFields.onBehalf} onChange={handleFieldsChange}>
          <option value=""></option>
          {onBehalfOptions && onBehalfOptions.map(onBehalf => (
            <option key={onBehalf} value={onBehalf}>{onBehalf}</option>
          ))}
        </select>

        <label htmlFor="familyValue">Family Value</label>
        <select name="familyValue" id="familyValue" value={advanceSearchFields.familyValue} onChange={handleFieldsChange}>
          <option value=""></option>
          {familyValueOptions && familyValueOptions.map(familyValue => (
            <option key={familyValue} value={familyValue}>{familyValue}</option>
          ))}
        </select>

        <label htmlFor="familyStatus">Family Status</label>
        <select name="familyStatus" id="familyStatus" value={advanceSearchFields.familyStatus} onChange={handleFieldsChange}>
          <option value=""></option>
          {familyStatusOptions && familyStatusOptions.map(familyStatus => (
            <option key={familyStatus} value={familyStatus}>{familyStatus}</option>
          ))}
        </select>

        <label htmlFor="maritalStatus">Marital Status</label>
        <select name="maritalStatus" id="maritalStatus" value={advanceSearchFields.maritalStatus} onChange={handleFieldsChange}>
          <option value=""></option>
          {maritalStatusOptions && maritalStatusOptions.map(maritalStatus => (
            <option key={maritalStatus} value={maritalStatus}>{maritalStatus}</option>
          ))}
        </select>

        <label htmlFor="higherEducation">Higher Education</label>
        <select name="higherEducation" id="higherEducation" value={advanceSearchFields.higherEducation} onChange={handleFieldsChange}>
          <option value=""></option>
          {educationOptions && educationOptions.map(education =>
          (
            <option key={education} value={education}>{education}</option>
          )
          )}
        </select>

        <label htmlFor="annualIncomeRange">Annual Income Range</label>
        <select name="annualIncomeRange" id="annualIncomeRange" value={advanceSearchFields.annualIncomeRange} onChange={handleFieldsChange}>
          <option value=""></option>
          {annualIncomeRangeOptions && Object.keys(annualIncomeRangeOptions).map(annualIncomeRange => (
            <option key={annualIncomeRange} value={annualIncomeRange}>{annualIncomeRange}</option>
          ))}
        </select>


        <label htmlFor="professionType">Profession Type</label>
        <select name="professionType" id="professionType" value={advanceSearchFields.professionType} onChange={handleFieldsChange}>
          <option value=""></option>
          {professionOptions && Object.keys(professionOptions).map(professionType => (
            <option key={professionType} value={professionType}>{professionType}</option>
          ))}
        </select>

        <label htmlFor="designation">Designation</label>
        <select name="designation" id="designation" value={advanceSearchFields.designation} onChange={handleFieldsChange}>
          <option value=""></option>
          {advanceSearchFields.professionType
            && (professionOptions[advanceSearchFields.professionType]).map(designation => (
              <option key={designation} value={designation}>{designation}</option>
            ))}
        </select>

        <label htmlFor="residenceType">Residence Type</label>
        <select name="residenceType" id="residenceType" value={advanceSearchFields.residenceType} onChange={handleFieldsChange}>
          <option value=""></option>
          {residenceTypeOptions && residenceTypeOptions.map(residenceType => (
            <option key={residenceType} value={residenceType}>{residenceType}</option>
          ))}
        </select>

        <label htmlFor="dobRange">Date of Birth Range</label>
        <select name="dobRange" id="dobRange" value={advanceSearchFields.dobRange} onChange={handleFieldsChange}>
          <option value=""></option>
          {dobRangeOptions && Object.keys(dobRangeOptions).map(dobRange => (
            <option key={dobRange} value={dobRange}>{dobRange}</option>
          ))}
        </select>

        <label htmlFor="rashi">Rashi</label>
        <select name="rashi" id="rashi" value={advanceSearchFields.rashi} onChange={handleFieldsChange}>
          <option value=""></option>
          {rashiNakshatraPadaOptions && Object.keys(rashiNakshatraPadaOptions).map(rashi => (
            <option key={rashi} value={rashi}>{(rashiNakshatraPadaOptions[rashi]?.label)}</option>
          ))}
        </select>

        <label htmlFor="nakshatra">Nakshatra</label>
        <select name="nakshatra" id="nakshatra" value={advanceSearchFields.nakshatra} onChange={handleFieldsChange}>
          <option value=""></option>
          {rashiNakshatraPadaOptions && advanceSearchFields.rashi
            && (Object.keys(rashiNakshatraPadaOptions[advanceSearchFields.rashi].nakshatra))
              .map(nakshatra => (
                <option key={nakshatra} value={nakshatra}>{nakshatra}</option>
              ))}
        </select>

        <label htmlFor="pada">Pada</label>
        <select name="pada" id="pada" value={advanceSearchFields.pada} onChange={handleFieldsChange}>
          <option value=""></option>
          {rashiNakshatraPadaOptions && advanceSearchFields.nakshatra
            && (rashiNakshatraPadaOptions[advanceSearchFields.rashi]?.nakshatra[advanceSearchFields.nakshatra])
              .map(pada => (
                <option key={pada} value={pada}>{pada}</option>
              ))}
        </select>

        <label htmlFor="dosham">Dosham</label>
        <select name="dosham" id="dosham" value={advanceSearchFields.dosham} onChange={handleFieldsChange}>
          <option value=""></option>
          {doshamOptions && doshamOptions.map(dosham => (
            <option key={dosham} value={dosham}>{dosham}</option>
          ))}
        </select>

        <label htmlFor="Complexion">Complexion</label>
        <select name="complexion" id="complexion" value={advanceSearchFields.complexion} onChange={handleFieldsChange}>
          <option value=""></option>
          {complexionOptions && complexionOptions.map(complexion => (
            <option key={complexion} value={complexion}>{complexion}</option>
          ))}
        </select>


        <label htmlFor="heightRange">Height Range</label>
        <select name="heightRange" id="heightRange" value={advanceSearchFields.heightRange} onChange={handleFieldsChange}>
          <option value=""></option>
          {
            heightRangeOptions && Object.keys(heightRangeOptions).map(heightRange => (
              <option key={heightRange} value={heightRange}>{heightRange}</option>
            ))
          }
        </select>

        <label htmlFor="keyword">keyword</label>
        <input type="text" id='keyword' name="keyword" value={advanceSearchFields.keyword} onChange={handleFieldsChange} />
        <button id="clear-btn" onClick={handleClear}>Clear</button>
        <button type='submit'>Search</button>
      </form>
    </>



  )
}

export default AdvanceSearch
