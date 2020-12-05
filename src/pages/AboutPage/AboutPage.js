/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components';

const Root = styled.div``
const AboutContainer = styled.div`
  width: 600px;
  margin: 20px auto 0 auto;
  padding: 20px;
  box-shadow: 0px 2px 10px 2px rgba(0, 0, 0, 0.1);
`
const AboutHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 20px 0;
`

const AboutTitle = styled.div`
  font-size: 36px;
  color: #555;
`

const AboutContent = styled.div`
  padding: 20px 0;
  color: #555;
  word-break: break-word;
`

function AboutPage() {
  return (
    <Root>
      <AboutContainer>
        <AboutHeader>
          <AboutTitle>
            About
          </AboutTitle>
        </AboutHeader>
        <AboutContent>
          Lidemy React homework - blog
        </AboutContent>
      </AboutContainer>
    </Root>
  );
}

export default AboutPage;
