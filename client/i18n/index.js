import NextI18Next from 'next-i18next';
import _nextI18NextMiddleware from 'next-i18next/middleware';

const languages = ['vi', 'en'];
const NextI18NextInstance = new NextI18Next({
  defaultLanguage: 'vi',
  otherLanguages: ['en']
});

NextI18NextInstance.i18n.languages = languages;

export const {
  appWithTranslation,
  withTranslation,
  i18n
} = NextI18NextInstance;

export const nextI18NextMiddleware = _nextI18NextMiddleware;

export default NextI18NextInstance;
