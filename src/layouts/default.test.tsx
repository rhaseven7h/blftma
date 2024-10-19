import DefaultLayout from '@/layouts/default';
import StoreWrapper from '@/util/testing/store-wrapper';
import { render } from '@testing-library/react';

const fetchBaseQueryMock = jest.fn();

jest.mock('@reduxjs/toolkit/query/react', () => {
  const originalModule = jest.requireActual('@reduxjs/toolkit/query/react');
  // noinspection JSUnusedGlobalSymbols
  return {
    __esModule: true,
    ...originalModule,
    fetchBaseQuery: () => jest
      .fn()
      .mockImplementation(
        () => fetchBaseQueryMock()
      )
  };
});

describe('DefaultLayout', () => {
  it('should render', () => {
    fetchBaseQueryMock.mockReturnValueOnce({
      data: 'data'
    });
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
