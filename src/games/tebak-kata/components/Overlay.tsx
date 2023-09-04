import { FC, memo, PropsWithChildren } from 'react';

const Overlay: FC<PropsWithChildren<{ show: boolean }>> = ({
  show,
  children,
}) => {
  return (
    <div className={`overlay ${show ? 'show' : ''}`}>
      <div className="content">{children}</div>
    </div>
  );
};

export default memo(Overlay);
