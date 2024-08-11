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
    const { Component, pageProps } = this.props
    return (
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
    );
  }
}
