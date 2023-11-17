// Signup.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import { SignupContainer, SignupHeader, SignupInput } from './styles';

function Signup() {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory
  localStorage.setItem('phoneNumber', mobileNumber)

  const handleGetOTP = async () => {
    // Add logic to get OTP
    try{
      const response = await fetch('https://node-backend.up.railway.app/customer/login/', {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phoneNumber: mobileNumber,
        }),
      })

      if (response.ok){
        navigate('/otp')
      } else {
        console.log(`Failed to send otp, error: ${response.statusText}`)
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  return (
    <SignupContainer>
      <SignupHeader>Lets Signup</SignupHeader>
      <SignupInput
        type='text'
        placeholder='Mobile Number'
        value={mobileNumber}
        onChange={(e) => setMobileNumber(e.target.value)}
      />
      <button
        onClick={handleGetOTP}
        style={{
          textDecoration: 'none',
          color: '#fff',
          background: '#007bff',
          padding: '10px 20px',
          borderRadius: '5px',
          display: 'inline-block',
          fontize: '16px',
        }}
      >
        Get OTP
      </button>
    </SignupContainer>
  );
}

export default Signup;
