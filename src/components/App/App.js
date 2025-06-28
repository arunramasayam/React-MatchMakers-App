import { Route, Routes, Navigate } from 'react-router-dom';
import Profiles from '../Profiles/Profiles';
import CloudProfiles from '../CloudProfiles/CloudProfiles';
import Missing from '../Missing/Missing';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/profiles" />} />
        <Route path='/profiles' element={<Profiles
        />} />
        <Route path='/cloud-profiles' element={<CloudProfiles />} />
        <Route path="*" element={<Missing />} />
      </Routes>
    </div>
  );
}

export default App;
