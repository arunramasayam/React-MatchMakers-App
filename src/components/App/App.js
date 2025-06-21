import { Route, Routes } from 'react-router-dom';
import Profiles from '../Profiles/Profiles';
import CloudProfiles from '../CloudProfiles/CloudProfiles';
import Missing from '../Missing/Missing';
import { DataProvider } from '../../context/DataContext.js';

function App() {
  return (
    <div className="App">
      <DataProvider>
      <Routes>
        <Route path='/profiles' element={<Profiles
        />} />
        <Route path='/cloud-profiles' element={<CloudProfiles />} />
        <Route path="*" element={<Missing />} />
      </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
