import {useContext, createContext, useReducer} from 'react';

const initialRadio = [
  {
    id: 1,
    type: 'dragTypes',
    options: [
      {
        id: 1,
        name: 'no-drag',
        checked: true,
      },
      {
        id: 2,
        name: 'basic-drag',
        checked: false,
      },
      {
        id: 3,
        name: 'elastic-drag',
        checked: false,
      },
    ],
  },
  {
    id: 2,
    type: 'shadowTypes',
    options: [
      {
        id: 1,
        name: 'no-shadow',
        checked: true,
      },
      {
        id: 2,
        name: 'rectangular-shadow',
        checked: false,
      },
      {
        id: 3,
        name: 'round-shadow',
        checked: false,
      },
    ],
  },
];

function radioReducer(state, action) {
  switch (action.type) {
    case 'CLICK':
      return state.map((radio) =>
      radio.type === action.radioType
      ? {
          ...radio,
          options: 
            radio.options.map((option) =>
              option.id === action.id
                ? {...option, checked: true}
                : {...option, checked: false}
            ),
        }
      : radio)
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const RadioStateContext = createContext();
const RadioDispatchContext = createContext();

export function RadioProvider({children}) {
  const [state, dispatch] = useReducer(radioReducer, initialRadio);

  return (
    <RadioStateContext.Provider value={state}>
      <RadioDispatchContext.Provider value={dispatch}>
        {children}
      </RadioDispatchContext.Provider>
    </RadioStateContext.Provider>
  );
}

export function useRadioState() {
  const context = useContext(RadioStateContext);
  if (!context) {
    throw new Error('Cannot find RadioProvider');
  }
  return context;
}

export function useRadioDispatch() {
  const context = useContext(RadioDispatchContext);
  if (!context) {
    throw new Error('Cannot find RadioProvider');
  }
  return context;
}
