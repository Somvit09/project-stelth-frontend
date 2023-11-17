import styled from 'styled-components';

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #000; /* Optional: Add a background color for better visibility */
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DisplayedPhoto = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const DisplayPhoto = () => {
  // Retrieve photo data from local storage
  const photoData = localStorage.getItem('uploadedPhoto');

  return (
    <FullScreenContainer>
      <DisplayedPhoto src={photoData} alt='Uploaded Photo' />
    </FullScreenContainer>
  );
};

export default DisplayPhoto;
