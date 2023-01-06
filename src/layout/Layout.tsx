import Header from "../components/Header";

interface LayoutProps {
  children: React.ReactNode;
  userImage?: string;
}

function Layout({ children, userImage }: LayoutProps) {
  return (
    <>
      <Header userImage={userImage} />
      {children}
    </>
  );
}

export default Layout;
