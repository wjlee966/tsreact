import { Route, Link } from 'react-router-dom';
import About from './About';
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
      </ul>
      <hr />

      {/* Route: 특정 주소에 컴포넌트 연결하기 */}
      {/* <Route path="주소규칙" component={보여주고싶은 컴포넌트}> */}
      <Route path='/' component={Home} exact />
      <Route path='/about' component={About} />
      <Route path='/profiles' component={Profiles} />
    </div>
  );
}

export default App;
