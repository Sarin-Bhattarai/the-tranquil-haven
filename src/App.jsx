import styled from "styled-components";
import Button from "./ui/Button";
import Heading from "./ui/Heading";
import GlobalStyles from "./styles/GlobalStyles";
import Row from "./ui/Row";

//introduction to styled components
const StyledApp = styled.main`
  padding: 20px;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Row type="horizontal">
          <Heading as="h1">The Tranquil Haven</Heading>
          <div>
            <Heading as="h2">Check in & out</Heading>
            <Heading as="h3">End of marrison</Heading>
          </div>
        </Row>
        <Button>Check in</Button>
        <Button variation="secondary" size="small">
          Check in
        </Button>
      </StyledApp>
    </>
  );
}

export default App;
