import { Route, Link } from 'react-router-dom';
import Profile from './Profile';
import WithRouterSample from './WithRouterSample';

const Profiles = () => {
  return (
    <div>
      <h3>사용자 목록</h3>
      <ul>
        <li>
          <Link to='/profiles/velopert'>velopert</Link>
        </li>
        <li>
          <Link to='/profiles/homer'>homer</Link>
        </li>
      </ul>

      {/* 서브 라우트는, 라우트 내부의 라우트를 만드는것을 의미합니다. */}
      {/* 그냥 컴포넌트를 만들어서 그 안에 또 Route 컴포넌트를 렌더링하시면 됩니다. */}

      {/* 특정 라우트 내에 탭 같은것을 만들게 된다면,
          단순히 state 로 관리하는 것 보다 서브 라우트로 관리를 하는 것을 권장드립니다. */}
      <Route path='/profiles' exact render={() => <div>사용자를 선택해주세요!</div>} />
      <Route path='/profiles/:username' component={Profile} />
      {/* <WithRouterSample /> */}
    </div>
  );
};

export default Profiles;
