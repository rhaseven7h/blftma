import Index from '@/pages/index';
import { store } from '@/store/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

jest.mock('next-i18next', () => ({
  __esModule: true,
  useTranslation: () => {
    return {
      t: (key: string) => key,
      i18n: {
        getFixedT: (ns: string, lng: string, key: string) => (key: string) => (key)
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

global.fetch = jest.fn(() =>
  Promise.resolve<Response>(
    new Response(JSON.stringify({}), { status: 200 })
  ) as Promise<Response>
);

describe('Index', () => {
  it('should render', () => {
    const { getByText } = render(<IndexWithStore/>);
    const linksParagraph = getByText('Pages Links');
    expect(linksParagraph).toBeInTheDocument();
  });
});
