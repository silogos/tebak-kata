import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="container">
      <div className="wrapper">{children}</div>
    </div>
  );
};

export default Layout;
