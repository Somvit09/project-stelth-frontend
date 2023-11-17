// ThreePartMultipage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmbeddedPhoto, MultipageText, NextButton, ThreePartMultipageContainer } from './styles';

const ThreePartMultipage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  const handleNext = () => {
    if (page < 3) {
      setPage(page + 1);
    } else {
      // Navigate to the next route when on the last part
      navigate('/uploadphoto');
    }
  };

  return (
    <ThreePartMultipageContainer>
      {page === 1 && (
        <>
          <MultipageText>Welcome to the virtual room!</MultipageText>
          <EmbeddedPhoto
            src='https://img.freepik.com/free-vector/choosing-clothes-concept-illustration_114360-3257.jpg?w=740&t=st=1699630282~exp=1699630882~hmac=2829468efe1badfb5c1f1316332689d4812b6ce0b8034e46ffa10735577fc708'
            alt='Embedded Photo 1'
          />
        </>
      )}
      {page === 2 && (
        <>
          <MultipageText>Do not upload selfie or group photos</MultipageText>
          <EmbeddedPhoto
            src='https://img.freepik.com/free-vector/man-taking-selfie-with-friends_23-2148409474.jpg?size=626&ext=jpg&ga=GA1.1.42915604.1699629990&semt=ais'
            alt='Embedded Photo 2'
          />
        </>
      )}
      {page === 3 && (
        <>
          <MultipageText>Upload a full-body image</MultipageText>
          <EmbeddedPhoto
            src='https://img.freepik.com/free-vector/customer-woman-shopping-with-barrow-concept_40876-2550.jpg?w=740&t=st=1699630047~exp=1699630647~hmac=f25a8db99b1c1d442563a4c264c51887da8872620290edfe3cc0bab9aa1b4488'
            alt='Embedded Photo 3'
          />
        </>
      )}
      <NextButton onClick={handleNext}>{page < 3 ? 'Next' : 'Finish'}</NextButton>
    </ThreePartMultipageContainer>
  );
};

export default ThreePartMultipage;
