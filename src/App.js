import { Route, Link, Switch } from 'react-router-dom';
import About from './About';
import HistorySample from './HistorySample';
import Home from './Home';
import Profiles from './Profiles';

function App() {
  return (
    <div>
      <ul>
        <li>
          {/* Link: 누르면 다른 주소로 이동시키기 */}
          <Link to='/'>홈</Link>
        </li>
        <li>
          <Link to='/about'>소개</Link>
        </li>
        <li>
          <Link to='/profiles'>프로필 목록</Link>
        </li>
        <li>
          <Link to='/history'>예제</Link>
        </li>
      </ul>
      <hr />

      {/* Switch 는 여러 Route 들을 감싸서 그 중 규칙이 일치하는
          라우트 단 하나만을 렌더링시켜줍니다. Switch 를 사용하면,
          아무것도 일치하지 않았을때 보여줄 Not Found 페이지를 구현 할 수도 있습니다. */}
      <Switch>
        {/* Route: 특정 주소에 컴포넌트 연결하기 */}
        {/* <Route path="주소규칙" component={보여주고싶은 컴포넌트}> */}

        <Route path='/' component={Home} exact />
        <Route path='/about' component={About} />
        <Route path='/profiles' component={Profiles} />
        <Route path='/history' component={HistorySample} />
        <Route
          render={({ location }) => (
            <div>
              <h2>이 페이지는 존재하지 않습니다.</h2>
              <p>{location.pathname}</p>
            </div>
          )}
        />
      </Switch>
    </div>
  );
}

export default App;
