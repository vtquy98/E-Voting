const TOGGLE_VETICALBAR = 'ToggleVerticalBar';

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
  }
};
