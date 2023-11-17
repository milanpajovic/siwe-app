import React, { ReactNode } from 'react';
import { ConnectKitButton } from 'connectkit';
import './styles.css';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-container">
      <header className="header">
        {/* Other header content */}
        <ConnectKitButton />
      </header>
      <main>{children}</main>
      {/* Footer */}
    </div>
  );
};

export default Layout;
