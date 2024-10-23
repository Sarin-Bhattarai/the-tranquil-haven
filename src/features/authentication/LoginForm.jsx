import { useState } from "react";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useLogin } from "./hooks/useLogin";
import SpinnerMini from "../../ui/SpinnerMini";
import FormRowVertical from "../../ui/FormRowVertical";

function LoginForm() {
  const { login, isLoading } = useLogin();
  const [email, setEmail] = useState("sarin@example.com");
  const [password, setPassword] = useState("pass0987");

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoading}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" disabled={isLoading}>
          {!isLoading ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
