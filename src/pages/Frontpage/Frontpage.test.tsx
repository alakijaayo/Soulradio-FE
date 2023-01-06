import { render, screen } from "@testing-library/react";
import Frontpage from ".";

describe("Frontpage", () => {
  describe("When the user is yet to Login", () => {
    test("It informs the User to login", () => {
      render(<Frontpage />);
      const welcome = screen.getByText("Welcome To SoulRadio");
      const login = screen.getByText("Login to enjoy the full experience");

      expect(welcome).toBeInTheDocument();
      expect(login).toBeInTheDocument();
    });
  });
});
