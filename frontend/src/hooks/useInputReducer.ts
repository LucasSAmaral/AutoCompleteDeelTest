import { useReducer } from 'react';

type State = {
  inputSearchValue: string;
  inputSelectedValue: string;
  isInputFocused: boolean;
};

type ReduceType = 'setSearchValue' | 'setSelectedValue' | 'setFocus' | 'clearValues';

type Action = { type: ReduceType; payload?: string | boolean };

const inputInitialState: State = {
  inputSearchValue: '',
  inputSelectedValue: '',
  isInputFocused: false,
};

const inputReducer = (state: State, action: Action): State => {
  switch (action?.type) {
    case 'setSearchValue':
      return { ...state, inputSelectedValue: '', inputSearchValue: action?.payload as string };

    case 'setSelectedValue':
      return { ...state, inputSelectedValue: action?.payload as string };

    case 'clearValues':
      return { ...state, inputSearchValue: '', inputSelectedValue: '' };

    case 'setFocus':
      return { ...state, isInputFocused: action?.payload as boolean };

    default:
      return state;
  }
};

export const useInputReducer = () => {
  const [state, dispatch] = useReducer(inputReducer, inputInitialState);

  return { state, dispatch };
};
