import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; // 리덕스 개발자 도구
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from './modules';
import ReduxThunk from 'redux-thunk';
// import myLogger from './middlewares/myLogger';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import { Router } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';

const customHistory = createBrowserHistory();

const store = createStore(
  rootReducer,
  // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다
  composeWithDevTools(
    applyMiddleware(ReduxThunk.withExtraArgument({ history: customHistory }), logger)
  )
); // 여러개의 미들웨어를 적용 할 수 있습니다.

ReactDOM.render(
  <React.StrictMode>
    <Router history={customHistory}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
