import {useContext, createContext, useReducer} from 'react';

const initialToggle = [
  {
    id: 1,
    name: 'background',
    checked: false,
  },
  {
    id: 2,
    name: 'planet-art',
    checked: false,
  },
  {
    id: 3,
    name: 'orbit-path',
    checked: false,
  },
];

function toggleReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE':
      return state.map((toggle) =>
        toggle.name === action.name
          ? {...toggle, checked: !toggle.checked}
          : toggle
      );
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const ToggleStateContext = createContext();
const ToggleDispatchContext = createContext();

export function ToggleProvider({children}) {
  const [state, dispatch] = useReducer(toggleReducer, initialToggle);

  return (
    <ToggleStateContext.Provider value={state}>
      <ToggleDispatchContext.Provider value={dispatch}>
        {children}
      </ToggleDispatchContext.Provider>
    </ToggleStateContext.Provider>
  );
}

export function useToggleState() {
  const context = useContext(ToggleStateContext);
  if (!context) {
    throw new Error('Cannot find ToggleProvider');
  }
  return context;
}

export function useToggleDispatch() {
  const context = useContext(ToggleDispatchContext);
  if (!context) {
    throw new Error('Cannot find CustomOptionProvider');
  }
  return context;
}
