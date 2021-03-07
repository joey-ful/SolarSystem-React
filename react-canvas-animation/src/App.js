import React from 'react';
import SolarSystem from './SolarSystem.js';
import Background from './Background.js';
import CustomizationMenu from './CustomizaztionMenu.js';
import {RadioProvider} from './contexts/RadioContext.js';
import {ToggleProvider} from './contexts/ToggleContext.js';

const AppProvider = ({contexts, children}) =>
  contexts.reduce(
    (prev, context) =>
      React.createElement(context, {
        children: prev,
      }),
    children
  );

function App() {
  return (
    <AppProvider contexts={[RadioProvider, ToggleProvider]}>
      <Background />
      <SolarSystem/>
      <CustomizationMenu />
    </AppProvider>
  );
}

export default App;
