import { render, screen } from "@testing-library/react";
import LoginButton from "./LoginButton";

describe("LoginButton", () => {
  test('It renders the login button when "loggedIn" is false', () => {
    const loggedIn = "false";
    render(<LoginButton loggedIn={loggedIn} />);
    const button = screen.getByText("Login");

    expect(button).toBeInTheDocument();
  });

  test('It renders the logout button when "loggeedIn" is true', () => {
    const loggedIn = "true";
    render(<LoginButton loggedIn={loggedIn} />);
    const button = screen.getByText("Logout");

    expect(button).toBeInTheDocument();
  });
});
