import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import store, { persistor } from './store';
// import history from './services/history';
import GlobalStyle from './styles/GlobalStyles';
import Header from './components/Header';
import Routes from './routes';
import Footer from './components/Footer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes />
          <Footer />
          <GlobalStyle />
          <ToastContainer autoClose={3000} className="toast-container" />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
