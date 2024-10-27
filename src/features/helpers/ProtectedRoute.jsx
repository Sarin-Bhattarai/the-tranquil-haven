import { useEffect } from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useUser } from "../authentication/hooks/useUser";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  //1. Load the authenticated user.
  const { isLoading, isAuthenticated } = useUser();

  //2. No authenticated user, redirect to /login
  useEffect(
    function () {
      if (!isAuthenticated && !isLoading) navigate("/login");
    },
    [isAuthenticated, isLoading, navigate]
  );

  //3. While loading, show spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />;
      </FullPage>
    );

  //4. If there is user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
