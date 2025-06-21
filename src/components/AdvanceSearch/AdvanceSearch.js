import { calculateAge } from "../../utils/ageCalculateUtils.js";
import { annualIncomeRangeOptions } from "../../utils/options/annualIncomeRangeOptions.js";
import { casteSubcasteOptions } from "../../utils/options/casteSubcasteOptions.js";
import { complexionOptions } from "../../utils/options/complexionOptions.js";
import { dobRangeOptions } from "../../utils/options/dobRangeOptions.js";
import { doshamOptions } from "../../utils/options/doshamOptions.js";
import { educationOptions } from "../../utils/options/eduationOptions.js";
import { familyValueOptions } from "../../utils/options/familyValueOptions.js";
import { familyStatusOptions } from "../../utils/options/familyStatusOptions.js";
import { heightRangeOptions } from "../../utils/options/heightRangeOptions.js";
import { languageOptions } from "../../utils/options/languageOptions.js";
import { locationOptions } from "../../utils/options/locationOptions.js";
import { maritalStatusOptions } from "../../utils/options/maritalStatusOptions.js";
import { professionOptions } from "../../utils/options/professionOptions.js";
import { rashiNakshatraPadaOptions } from "../../utils/options/rashiNakshatraPadasOptions.js";
import { residenceTypeOptions } from "../../utils/options/residenceOptions.js";
import { onBehalfOptions } from "../../utils/options/onBehalfOptions.js";
import { fields, getNestedValue } from "../../utils/options/fieldPathMap.js";
import '../AdvanceSearch/AdvanceSearch.css';
import { useState } from "react";


const AdvanceSearch = ({ profiles, setFilteredProfiles }) => {

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

  const handleAdvanceSearchSubmit = (e) => {
    e.preventDefault();
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

    if (advanceSearchFields.heightRange && heightRangeOptions[advanceSearchFields.heightRange]) {
      const [minHeight, maxHeight] = heightRangeOptions[advanceSearchFields.heightRange];
      searchResults = searchResults.filter(profile => {
        const height = profile.heightInCms;
        return (maxHeight != null)
          ? ((height >= minHeight) && (height <= maxHeight))
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

  return (
    <>
      <form className="advance-search-form" onSubmit={handleAdvanceSearchSubmit}>
        <div className="form-group" data-label="Caste" data-has-value={advanceSearchFields.caste ? "true" : "false"}>
          <label htmlFor="caste">Caste</label>
          <select name="caste" id="caste" value={advanceSearchFields.caste} onChange={handleFieldsChange}>
            <option value=""></option>
            {casteSubcasteOptions && (Object.keys(casteSubcasteOptions)).map(caste => (
              <option key={caste} value={caste}>{caste}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Sub-Caste" data-has-value={advanceSearchFields.subCaste ? "true" : "false"}>
          <label htmlFor="subCaste">Sub-Caste</label>
          <select name="subCaste" id="subCaste" value={advanceSearchFields.subCaste} onChange={handleFieldsChange}>
            <option value=""></option>
            {advanceSearchFields.caste && casteSubcasteOptions && (casteSubcasteOptions[advanceSearchFields.caste]).map(subCaste => (
              <option key={subCaste} value={subCaste}>{subCaste}</option>
            ))
            }
          </select>
        </div>

        <div className="form-group" data-label="Member Language" data-has-value={advanceSearchFields.memberLanguage ? "true" : "false"}>
          <label htmlFor="memberLanguage">Member Language</label>
          <select name="memberLanguage" id="memberLanguage" value={advanceSearchFields.memberLanguage} onChange={handleFieldsChange}>
            <option value=""></option>
            {languageOptions && languageOptions.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
            <option value="Others">Others</option>
          </select>
        </div>

        <div className="form-group" data-label="Country" data-has-value={advanceSearchFields.country ? "true" : "false"}>
          <label htmlFor="country">Country</label>
          <select name="country" id="country" value={advanceSearchFields.country} onChange={handleFieldsChange}>
            <option value=""></option>
            {locationOptions && Object.keys(locationOptions).map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>
        <div className="form-group"  data-label="State" data-has-value={advanceSearchFields.state ? "true" : "false"}>
          <label htmlFor="state">State</label>
          <select name="state" id="state" value={advanceSearchFields.state} onChange={handleFieldsChange}>
            <option value=""></option>
            {advanceSearchFields.country && (Object.keys(locationOptions[advanceSearchFields.country])).map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="City" data-has-value={advanceSearchFields.city ? "true" : "false"}>
          <label htmlFor="city">City</label>
          <select name="city" id="city" value={advanceSearchFields.city} onChange={handleFieldsChange}>
            <option value=""></option>
            {advanceSearchFields.state
              && (locationOptions[advanceSearchFields.country]?.[advanceSearchFields.state]).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
          </select>
        </div>

        <div className="form-group" data-label="On Behalf" data-has-value={advanceSearchFields.onBehalf ? "true" : "false"}>
          <label htmlFor="onBehalf">On Behalf</label>
          <select name="onBehalf" id="onBehalf" value={advanceSearchFields.onBehalf} onChange={handleFieldsChange}>
            <option value=""></option>
            {onBehalfOptions && onBehalfOptions.map(onBehalf => (
              <option key={onBehalf} value={onBehalf}>{onBehalf}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Family Value" data-has-value={advanceSearchFields.familyValue ? "true" : "false"}>
          <label htmlFor="familyValue">Family Value</label>
          <select name="familyValue" id="familyValue" value={advanceSearchFields.familyValue} onChange={handleFieldsChange}>
            <option value=""></option>
            {familyValueOptions && familyValueOptions.map(familyValue => (
              <option key={familyValue} value={familyValue}>{familyValue}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Family Status" data-has-value={advanceSearchFields.familyStatus ? "true" : "false"}>
          <label htmlFor="familyStatus">Family Status</label>
          <select name="familyStatus" id="familyStatus" value={advanceSearchFields.familyStatus} onChange={handleFieldsChange}>
            <option value=""></option>
            {familyStatusOptions && familyStatusOptions.map(familyStatus => (
              <option key={familyStatus} value={familyStatus}>{familyStatus}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Marital Status" data-has-value={advanceSearchFields.maritalStatus ? "true" : "false"}>
          <label htmlFor="maritalStatus">Marital Status</label>
          <select name="maritalStatus" id="maritalStatus" value={advanceSearchFields.maritalStatus} onChange={handleFieldsChange}>
            <option value=""></option>
            {maritalStatusOptions && maritalStatusOptions.map(maritalStatus => (
              <option key={maritalStatus} value={maritalStatus}>{maritalStatus}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Higher Education" data-has-value={advanceSearchFields.higherEducation ? "true" : "false"}>
          <label htmlFor="higherEducation">Higher Education</label>
          <select name="higherEducation" id="higherEducation" value={advanceSearchFields.higherEducation} onChange={handleFieldsChange}>
            <option value=""></option>
            {educationOptions && educationOptions.map(education =>
            (
              <option key={education} value={education}>{education}</option>
            )
            )}
          </select>
        </div>

        <div className="form-group" data-label="Annual Income Range" data-has-value={advanceSearchFields.annualIncomeRange ? "true" : "false"}>
          <label htmlFor="annualIncomeRange">Annual Income Range</label>
          <select name="annualIncomeRange" id="annualIncomeRange" value={advanceSearchFields.annualIncomeRange} onChange={handleFieldsChange}>
            <option value=""></option>
            {annualIncomeRangeOptions && Object.keys(annualIncomeRangeOptions).map(annualIncomeRange => (
              <option key={annualIncomeRange} value={annualIncomeRange}>{annualIncomeRange}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Profession Type" data-has-value={advanceSearchFields.professionType ? "true" : "false"}>
          <label htmlFor="professionType">Profession Type</label>
          <select name="professionType" id="professionType" value={advanceSearchFields.professionType} onChange={handleFieldsChange}>
            <option value=""></option>
            {professionOptions && Object.keys(professionOptions).map(professionType => (
              <option key={professionType} value={professionType}>{professionType}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Designation" data-has-value={advanceSearchFields.designation ? "true" : "false"}>
          <label htmlFor="designation">Designation</label>
          <select name="designation" id="designation" value={advanceSearchFields.designation} onChange={handleFieldsChange}>
            <option value=""></option>
            {advanceSearchFields.professionType
              && (professionOptions[advanceSearchFields.professionType]).map(designation => (
                <option key={designation} value={designation}>{designation}</option>
              ))}
          </select>
        </div>

        <div className="form-group" data-label="Residence Type" data-has-value={advanceSearchFields.residenceType ? "true" : "false"}>
          <label htmlFor="residenceType">Residence Type</label>
          <select name="residenceType" id="residenceType" value={advanceSearchFields.residenceType} onChange={handleFieldsChange}>
            <option value=""></option>
            {residenceTypeOptions && residenceTypeOptions.map(residenceType => (
              <option key={residenceType} value={residenceType}>{residenceType}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Date of Birth Range" data-has-value={advanceSearchFields.dobRange ? "true" : "false"}>
          <label htmlFor="dobRange">Date of Birth Range</label>
          <select name="dobRange" id="dobRange" value={advanceSearchFields.dobRange} onChange={handleFieldsChange}>
            <option value=""></option>
            {dobRangeOptions && Object.keys(dobRangeOptions).map(dobRange => (
              <option key={dobRange} value={dobRange}>{dobRange}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Rashi" data-has-value={advanceSearchFields.rashi ? "true" : "false"}>
          <label htmlFor="rashi">Rashi</label>
          <select name="rashi" id="rashi" value={advanceSearchFields.rashi} onChange={handleFieldsChange}>
            <option value=""></option>
            {rashiNakshatraPadaOptions && Object.keys(rashiNakshatraPadaOptions).map(rashi => (
              <option key={rashi} value={rashi}>{(rashiNakshatraPadaOptions[rashi]?.label)}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Nakshatra" data-has-value={advanceSearchFields.nakshatra ? "true" : "false"}>
          <label htmlFor="nakshatra">Nakshatra</label>
          <select name="nakshatra" id="nakshatra" value={advanceSearchFields.nakshatra} onChange={handleFieldsChange}>
            <option value=""></option>
            {rashiNakshatraPadaOptions && advanceSearchFields.rashi
              && (Object.keys(rashiNakshatraPadaOptions[advanceSearchFields.rashi].nakshatra))
                .map(nakshatra => (
                  <option key={nakshatra} value={nakshatra}>{nakshatra}</option>
                ))}
          </select>
        </div>
        <div className="form-group" data-label="Pada" data-has-value={advanceSearchFields.pada ? "true" : "false"}>
          <label htmlFor="pada">Pada</label>
          <select name="pada" id="pada" value={advanceSearchFields.pada} onChange={handleFieldsChange}>
            <option value=""></option>
            {rashiNakshatraPadaOptions && advanceSearchFields.nakshatra
              && (rashiNakshatraPadaOptions[advanceSearchFields.rashi]?.nakshatra[advanceSearchFields.nakshatra])
                .map(pada => (
                  <option key={pada} value={pada}>{pada}</option>
                ))}
          </select>
        </div>
        <div className="form-group" data-label="Dosham" data-has-value={advanceSearchFields.dosham ? "true" : "false"}>
          <label htmlFor="dosham">Dosham</label>
          <select name="dosham" id="dosham" value={advanceSearchFields.dosham} onChange={handleFieldsChange}>
            <option value=""></option>
            {doshamOptions && doshamOptions.map(dosham => (
              <option key={dosham} value={dosham}>{dosham}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Complexion" data-has-value={advanceSearchFields.complexion ? "true" : "false"}>
          <label htmlFor="Complexion">Complexion</label>
          <select name="complexion" id="complexion" value={advanceSearchFields.complexion} onChange={handleFieldsChange}>
            <option value=""></option>
            {complexionOptions && complexionOptions.map(complexion => (
              <option key={complexion} value={complexion}>{complexion}</option>
            ))}
          </select>
        </div>

        <div className="form-group" data-label="Height Range" data-has-value={advanceSearchFields.heightRange ? "true" : "false"}>
          <label htmlFor="heightRange">Height Range</label>
          <select name="heightRange" id="heightRange" value={advanceSearchFields.heightRange} onChange={handleFieldsChange}>
            <option value=""></option>
            {
              heightRangeOptions && Object.keys(heightRangeOptions).map(heightRange => (
                <option key={heightRange} value={heightRange}>{heightRange}</option>
              ))
            }
          </select>
        </div>

        <div className="form-group" data-label="Keyword"  data-has-value={advanceSearchFields.keyword ? "true" : "false"}>
          <label htmlFor="keyword">keyword</label>
          <input type="text" id='keyword' name="keyword" value={advanceSearchFields.keyword} onChange={handleFieldsChange} />
        </div>
        <div className="form-group" id="form-btn">
        <button id="clear-btn" onClick={handleClear}>Clear</button>
        <button id="search-btn" type='submit'>Search</button>
        </div>
      </form>
    </>
  )
}

export default AdvanceSearch
