import React, { useReducer, createContext, useContext, useRef } from 'react';

const initialPlanets = [
  {
    id: 0,
    name: 'sun',
    star: 'sun',
    radius: 80,
    color: '#FFF599',
    velocity: 0,
    orbitRadius: 0,
    theta: Math.random() * Math.PI * 2,
    x: window.innerWidth/2,
    y: window.innerHeight/2,
    mouseX: window.innerWidth/2,
    mouseY: window.innerHeight/2,
    clicked: false,
  },
  // {
  //   id: 1,
  //   name: 'mercury',
  //   star: 'sun',
  //   radius: 5,
  //   color: '#74B1E9',
  //   velocity: 0.008,
  //   orbitRadius: 120,
  //   x: 0,
  //   y: 0,
  // },
  // {
  //   id: 2,
  //   name: 'venus',
  //   star: 'sun',
  //   radius: 11,
  //   color: '#F3E6B7',
  //   velocity: 0.005,
  //   orbitRadius: 142,
  //   x: 0,
  //   y: 0,
  // },
  {
    id: 3,
    name: 'earth',
    star: 'sun',
    radius: 13,
    color: '#AAE7F0',
    velocity: 0.006,
    orbitRadius: 172,
    theta: Math.random() * Math.PI * 2,
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
    clicked: false,
  },
  {
    id: 4,
    name: 'moon',
    star: 'earth',
    radius: 4,
    color: '#F0F7F8',
    velocity: 0.02,
    orbitRadius: 28,
    theta: Math.random() * Math.PI * 2,
    x: 0,
    y: 0,
    mouseX: 0,
    mouseY: 0,
    clicked: false,
  },
  // {
  //   id: 5,
  //   name: 'mars',
  //   star: 'sun',
  //   radius: 6,
  //   color: '#F39999',
  //   velocity: 0.007,
  //   orbitRadius: 219,
  // },
  // {
  //   id: 6,
  //   name: 'jupiter',
  //   star: 'sun',
  //   radius: 28,
  //   color: '#B3D8A1',
  //   velocity: 0.004,
  //   orbitRadius: 260,
  // },
  // {
  //   id: 7,
  //   name: 'saturn',
  //   star: 'sun',
  //   radius: 24,
  //   color: '#E3AE90',
  //   velocity: 0.0035,
  //   orbitRadius: 310,
  // },
  // {
  //   id: 8,
  //   name: 'uranus',
  //   star: 'sun',
  //   radius: 18,
  //   color: '#8C7E75',
  //   velocity: 0.003,
  //   orbitRadius: 357,
  // },
  // {
  //   id: 9,
  //   name: 'neptune',
  //   star: 'sun',
  //   radius: 16,
  //   color: '#A888BB',
  //   velocity: 0.002,
  //   orbitRadius: 396,
  // },
];

function planetReducer(state, action) {
  switch (action.type) {
    case 'ANIMATE':
      return state.map(planet =>
        planet.name === action.name ? { ...planet, x: action.x, y: action.y} : planet
      );
    case 'CLICK':
      return state.map(planet =>
        planet.name === action.name ? { ...planet, clicked: !planet.clicked} : planet
      );
    case 'DRAG':
      return state.map(planet =>
        planet.name === action.name ? { ...planet, mouseX: action.mouseX, mouxeY: action.mouseY} : planet
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const PlanetStateContext = createContext();
const PlanetDispatchContext = createContext();

export function PlanetProvider({children}) {
  const [state, dispatch] = useReducer(planetReducer, initialPlanets);
  const clicked = useRef(false);

  return (
    <PlanetStateContext.Provider value={state}>
      <PlanetDispatchContext.Provider value={dispatch}>
        {children}
      </PlanetDispatchContext.Provider>
    </PlanetStateContext.Provider>
  );
}

export function usePlanetState() {
  const context = useContext(PlanetStateContext);

  if (!context) {
    throw new Error('Cannot find PlanetProvider');
  }

  return context;
}

export function usePlanetDispatch() {
  const context = useContext(PlanetDispatchContext);

  if (!context) {
    throw new Error('Cannot find PlanetProvider');
  }

  return context;
}