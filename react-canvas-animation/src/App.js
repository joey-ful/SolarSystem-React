import React from 'react';
import SolarSystem from './SolarSystem.js';
import Background from './Background.js';
import { PlanetProvider } from './PlanetContext.js';

function App() {


  return (
    <PlanetProvider>
      <Background />
      <SolarSystem />
    </PlanetProvider>
  );
}

export default App;