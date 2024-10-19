import '@/styles/globals.scss';
import { setupInterceptors } from '@/store/services/axios-instance';
import { store } from '@/store/store';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

setupInterceptors();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={ store }>
      <Component { ...pageProps } />
    </Provider>
  );
};

export default appWithTranslation(App);
