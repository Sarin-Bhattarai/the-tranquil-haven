import styled from "styled-components";

//introduction to styled components
const H1 = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;

const Button = styled.button`
  font-size: 1.4rem;
  padding: 1.2rem 1.4rem;
  font-weight: 500;
  border: none;
  border-radius: 7px;
  background-color: purple;
  color: white;
  cursor: pointer;
  margin: 20px;
`;

function App() {
  return (
    <div>
      <H1>The Tranquil Haven</H1>
      <Button>Check in</Button>
    </div>
  );
}

export default App;
