import React from 'react';
import SolarSystem from './components/SolarSystem.js';
import Background from './components/Background.js';
import CustomizationMenu from './components/CustomizaztionMenu.js';
import {RadioProvider} from './contexts/RadioContext.js';
import {ToggleProvider} from './contexts/ToggleContext.js';
import {sunStar, planetInfo} from './consts/PlanetInfo.js';
import Planet from './js/Planet.js';

const AppProvider = ({contexts, children}) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

function App() {
  let planets = [];
  let sun;
  let earth;

  const createPlanet = (planet, star) => {
    let planetInstance = new Planet(
      planet.name,
      star,
      planet.radius,
      planet.color,
      planet.velocity,
      planet.orbitRadius,
      planet.src
    );
    planets.push(planetInstance);

    return planetInstance;
  };

  for (let planet of planetInfo) {
    if (planet.name === 'sun') {
      sun = createPlanet(planet, sunStar);
    } else if (planet.name === 'earth') {
      earth = createPlanet(planet, sun);
    } else {
      if (planet.star === 'sun') {
        createPlanet(planet, sun);
      } else {
        createPlanet(planet, earth);
      }
    }
  }

  return (
    <AppProvider contexts={[RadioProvider, ToggleProvider]}>
      <Background />
      <SolarSystem planets={planets} />
      <CustomizationMenu />
    </AppProvider>
  );
}

export default App;
