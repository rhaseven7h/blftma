import DefaultLayout from '@/layouts/default';
import { store } from '@/store/store';
import { render } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

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

const StoreWrapper = ({ children }: PropsWithChildren) => {
  return (
    <Provider store={ store }>
      { children }
    </Provider>
  );
};

describe('DefaultLayout', () => {
  it('should render', () => {
    const { getByText, container } = render(
      <StoreWrapper>
        <DefaultLayout>
          <p>Page Content</p>
        </DefaultLayout>
      </StoreWrapper>
    );
    const linksParagraph = getByText('Page Content');
    expect(container).toMatchSnapshot();
    expect(linksParagraph).toBeInTheDocument();
  });
});
