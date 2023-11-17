import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  OtpInput,
  OtpVerificationContainer,
  OtpVerificationHeader,
  OtpVerificationText,
  TimerText,
  VerifyButton,
} from './styles';

function OtpVerification() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(300);
  const [isResendActive, setIsResendActive] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          setIsResendActive(true);
          clearInterval(interval);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleVerifyOTP = async () => {
    // Add logic to verify OTP
    const mobileNumber = localStorage.getItem('phoneNumber')
    try{
      const response = await fetch("https://node-backend.up.railway.app/customer/verify-otp/", {
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "phoneNumber": mobileNumber,
          "user_otp": otp
        }),
      })
      if (response.ok){
        const data = await response.json()
        if (data.redirectURL === '/uploadphoto'){
          localStorage.setItem('customerToken', data.token)
          navigate(data.redirectURL)
        }
        if (data.redirectURL === '/finish'){
          navigate(data.redirectURL)
        }
      }
    } catch (err) {
      console.log(err.message)
    }
  };

  const handleResendOTP = () => {
    // Add logic to resend OTP
    // For simplicity, let's reset the timer to 60 seconds
    setTimer(60);
    setIsResendActive(false);
  };

  return (
    <OtpVerificationContainer>
      <OtpVerificationHeader>OTP Verification</OtpVerificationHeader>
      <OtpVerificationText>Enter the OTP sent to your mobile number</OtpVerificationText>
      <OtpInput
        type='text'
        placeholder='OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <VerifyButton onClick={handleVerifyOTP}>Verify</VerifyButton>
      <TimerText>
        Time left: {timer} seconds
        {isResendActive && (
          <span
            style={{
              marginLeft: '10px',
              cursor: 'pointer',
              color: isResendActive ? '#007bff' : '#ccc',
              pointerEvents: isResendActive ? 'auto' : 'none',
            }}
            onClick={handleResendOTP}
          >
            Resend OTP
          </span>
        )}
      </TimerText>
    </OtpVerificationContainer>
  );
}

export default OtpVerification;
