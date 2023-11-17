import { SignupButton } from './styles';

const HomePage = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <div>
        <img
          src='https://res.cloudinary.com/dhnkuonev/image/upload/v1699618405/aa_r1c4j4.png'
          alt=''
        />
      </div>
      <SignupButton to='/signup'>Lets Signup</SignupButton>
    </div>
  );
};

export default HomePage;
