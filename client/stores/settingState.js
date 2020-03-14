import { always } from 'lodash/fp';
export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE';

const languages = [
  {
    id: 1,
    symbol: 'vi',
    label: 'Vietnamese'
  },
  {
    id: 2,
    symbol: 'en',
    label: 'English'
  }
];
export default {
  availableLanguages: always(languages),
  currentLanguage: (state = languages[0], { type, payload = {} }) => {
    const { id, symbol } = payload;
    if (type === CHANGE_LANGUAGE) {
      const result = id
        ? languages.find(lang => lang.id === id)
        : languages.find(lang => lang.symbol === symbol);
      state = result || languages[0];
      return state;
    }
    return state;
  }
};
