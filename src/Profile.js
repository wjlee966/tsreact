import WithRouterSample from './WithRouterSample';

// 프로필에서 사용 할 데이터
const profileData = {
  velopert: {
    name: '김민준',
    description: 'Frontend Engineer @ RIDI',
  },
  homer: {
    name: '호머 심슨',
    description: '심슨 가족에 나오는 아빠 역할 캐릭터',
  },
};

// 파라미터: /profiles/velopert
const Profile = ({ match }) => {
  // 파라미터를 받아올 땐 match 안에 들어있는 params 값을 참조합니다.
  const { username } = match.params;
  const profile = profileData[username];

  if (!profile) {
    return <div>존재하지 않는 사용자입니다.</div>;
  }

  return (
    <div>
      <h3>
        {username} ({profile.name})
      </h3>
      <p>{profile.description}</p>
      <WithRouterSample />
    </div>
  );
};

export default Profile;
