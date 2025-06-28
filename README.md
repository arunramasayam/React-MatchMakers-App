# MatchMakers – Matrimony React App

MatchMakers is a responsive and modular matrimony application built using React.js. The project showcases user profile listings, cloud profile filtering, and a clean component-based design. It is intended for frontend portfolio demonstration with mock data.

## Live Demo

View the deployed project here: [Netlify Live Site](https://moonlit-chebakia-5c4b32.netlify.app/)  


## Tech Stack

- React.js (Hooks, useEffect, Context API)
- Axios (for data fetching)
- React Router DOM (for routing)
- HTML & CSS (custom styling)

## Features

- Profile browsing from static JSON data
- Filtered views for different user types
- Cloud profile display
- Responsive design for desktop and mobile
- Custom hook (`useAxiosFetch`) for reusable API logic

## Available Routes

| Route              | Description                         |
|-------------------|-------------------------------------|
| `/profiles`        | Displays standard user profiles     |
| `/cloud-profiles`  | Displays cloud profiles  |

These routes are handled using **React Router DOM** and pull their respective data from `db.json` located in the `public/` directory.

## Project Structure

```  
public/
├── index.html
├── manifest.json
├── robots.txt
├── _redirects
└── data/
    └── db.json

src/
├── index.js
├── styles/
│   └── index.css
├── hooks/
│   └── useAxiosFetch.js
├── context/
│   └── DataContext.js
├── utils/
│   ├── ageCalculateUtils.js
│   ├── HeightCalculateUtils.js
│   └── options/
│       ├── annualIncomeRangeOptions.js
│       ├── casteSubcasteOptions.js
│       ├── complexionOptions.js
│       ├── dobRangeOptions.js
│       ├── doshamOptions.js
│       ├── eduationOptions.js
│       ├── familyStatusOptions.js
│       ├── familyValueOptions.js
│       ├── fieldPathMap.js
│       ├── heightRangeOptions.js
│       ├── languageOptions.js
│       ├── locationOptions.js
│       ├── maritalStatusOptions.js
│       ├── onBehalfOptions.js
│       ├── professionOptions.js
│       ├── rashiNakshatraPadasOptions.js
│       └── residenceOptions.js
├── components/
│   ├── AdvanceSearch/
│   │   ├── AdvanceSearch.css
│   │   └── AdvanceSearch.js
│   ├── App/
│   │   ├── App.css
│   │   └── App.js
│   ├── CloudProfiles/
│   │   ├── CloudProfiles.css
│   │   └── CloudProfiles.js
│   ├── Feed/
│   │   ├── Feed.css
│   │   └── Feed.js
│   ├── KeywordSearch/
│   │   ├── KeywordSearch.css
│   │   └── KeywordSearch.js
│   ├── MembershipLegends/
│   │   ├── MembershipLegend.css
│   │   └── MembershipLegend.js
│   ├── Missing/
│   │   └── Missing.js
│   ├── Profile/
│   │   ├── Profile.css
│   │   └── Profile.js
│   ├── Profiles/
│   │   ├── Profiles.css
│   │   └── Profiles.js
│   ├── SearchType/
│   │   ├── SearchType.css
│   │   └── SearchType.js
│   └── UserType/
│       ├── UserType.css
│       └── UserType.js
```
