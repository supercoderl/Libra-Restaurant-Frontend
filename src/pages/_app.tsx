import React from 'react';
import App, { AppContext } from 'next/app';
import { GlobalStyles } from 'twin.macro';
import ThemeProvider from '../theme/theme-provider';
import ThemeStyles from '../theme/theme';
import 'tailwindcss/tailwind.css';
import '../global.css';
import store from 'src/redux/store';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { ToastContainer } from 'react-toastify';
import { ConfigProvider } from 'antd';
import 'dayjs/locale/vi';
import locale from 'antd/locale/vi_VN';
import localeData from 'dayjs/plugin/localeData';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import weekYear from 'dayjs/plugin/weekYear'

let persistor = persistStore(store);

export default class MyApp extends App {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps } = this.props;
    dayjs.extend(customParseFormat);
    dayjs.extend(advancedFormat);
    dayjs.extend(weekday);
    dayjs.extend(weekOfYear);
    dayjs.extend(weekYear);
    dayjs.extend(localeData);
    dayjs.locale("vi_VN");

    return (
      <ConfigProvider locale={locale}>
        <Provider store={store}>
          <GlobalStyles />
          <ThemeStyles />
          <ToastContainer position="top-center" />
          <ThemeProvider>
            <PersistGate loading={null} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </ThemeProvider>
        </Provider>
      </ConfigProvider>
    );
  }
}
