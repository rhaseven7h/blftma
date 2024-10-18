import Index from '@/pages/index';
import { store } from '@/store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

// TODO: Refactor this onto reusable utility functions and components.

// noinspection JSUnusedGlobalSymbols
jest.mock('next-i18next', () => ({
  __esModule: true,
  useTranslation: () => {
    // noinspection JSUnusedLocalSymbols
    return {
      t: (key: string) => key,
      i18n: {
        getFixedT: (_ns: string, _lng: string, _key: string) => (key: string) => (key)
      }
    };
  }
}));

const IndexWithStore = () => {
  return (
    <Provider store={ store }>
      <Index/>
    </Provider>
  );
};

const mockFetchBaseQuery = jest.fn();

jest.mock('@reduxjs/toolkit/query/react', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit/query/react');
  // noinspection JSUnusedGlobalSymbols
  return {
    __esModule: true,
    ...originalModule,
    fetchBaseQuery: () => jest
      .fn()
      .mockImplementation(
        () => mockFetchBaseQuery
      )
  };
});

describe('Index', () => {
  it('should render', () => {
    mockFetchBaseQuery.mockReturnValueOnce({ data: { accounts: [] } });
    const { getByText, container } = render(<IndexWithStore/>);
    const linksParagraph = getByText('Pages Links');
    expect(container).toMatchSnapshot();
    expect(linksParagraph).toBeInTheDocument();
  });
});
