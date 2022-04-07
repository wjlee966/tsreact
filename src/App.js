import { Route } from 'react-router-dom';
import './App.css';
import CounterContainer from './containers/CounterContainer';
// import PostListContainer from './containers/PostListContainer';
import PostListPage from './page/PostListPage';
import PostPage from './page/PostPage';

function App() {
  return (
    <>
      {/* 페이지 (리액트 라우터) 적용 전 */}
      {/* <PostListContainer /> */}
      {/* 페이지 (리액트 라우터) 적용 후 */}
      <CounterContainer />
      <Route path='/' component={PostListPage} exact />
      <Route path='/:id' component={PostPage} />
    </>
  );
}

export default App;
