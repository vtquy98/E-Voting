import { always } from 'lodash/fp';
export const TOGGLE_VETICALBAR = 'ToggleVerticalBar';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const DEFAULT_TOGGLE_VETICALBAR = true;

const initDefaultPageState = () => {
  return {
    isToggledBar: DEFAULT_TOGGLE_VETICALBAR
  };
};

export const toggleBarAction = toggleState => dispatch => {
  dispatch({
    type: TOGGLE_VETICALBAR,
    payload: toggleState
  });
};

const languages = [
  {
    id: 1,
    symbol: 'vi',
    label: 'Tiếng Việt'
  },
  {
    id: 2,
    symbol: 'en',
    label: 'English'
  }
];

export default {
  PageState: (state = initDefaultPageState(), action = {}) => {
    let newState = { ...state };
    switch (action.type) {
      case TOGGLE_VETICALBAR:
        const { isToggledBar } = action.payload;
        newState = { ...newState, isToggledBar };
        return newState;

      default:
        return state;
    }
  },

  availableLanguages: always(languages),
  currentLanguage: (state = languages[0], { type, payload }) => {
    if (type === CHANGE_LANGUAGE) {
      const result = languages.find(lang => lang.id === payload);
      state = result;
      return state;
    }
    return state;
  }
};
