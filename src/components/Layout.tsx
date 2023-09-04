import { FC, PropsWithChildren } from 'react';

const Layout: FC<PropsWithChildren<{ title?: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className="container">
      <div className="wrapper">
        {title && <div className="title">{title}</div>}
        {children}
      </div>
    </div>
  );
};

export default Layout;
