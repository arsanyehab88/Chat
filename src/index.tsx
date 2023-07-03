import ReactDOM from 'react-dom/client';
import React, { Suspense } from 'react';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.js'
import "@fortawesome/fontawesome-free/css/all.min.css"
import App from './App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import store from './Redux/store';


const persistedStore = persistStore(store);
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <Suspense fallback="loading">
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistedStore}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  </Suspense>

);

