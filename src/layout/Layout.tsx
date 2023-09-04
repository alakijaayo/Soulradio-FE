import Header from "../components/Header";
import { StyledBody, Wrapper } from "./Layout.style";

interface LayoutProps {
  children: React.ReactNode;
  userImage?: string;
}

function Layout({ children, userImage }: LayoutProps) {
  return (
    <Wrapper>
      <Header userImage={userImage} />
      <StyledBody>{children}</StyledBody>
    </Wrapper>
  );
}

export default Layout;
