import '@testing-library/jest-dom';

// noinspection JSUnusedGlobalSymbols
jest.mock('next-i18next', () => ({
  __esModule: true,
  useTranslation: () => {
    // noinspection JSUnusedLocalSymbols
    return {
      t: (key: string) => key,
      i18n: {
        getFixedT: (_ns: string, _lng: string, _key: string) => (key: string) => key,
      },
    };
  },
}));
