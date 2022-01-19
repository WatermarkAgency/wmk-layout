import * as React from "react";
import { FlexSpacer } from "./FlexSpacer";
import { wmkClass } from "./logic";

type mainLayoutProps = {
  children: React.ReactNode;
  Header?: React.ComponentClass | React.FunctionComponent;
  Footer?: React.ComponentClass | React.FunctionComponent;
  className?: string;
};

export const MainLayout = ({
  children,
  Header = () => <div>Pass Header JSX</div>,
  Footer = () => <div>Pass Footer JSX</div>,
  className
}: mainLayoutProps) => {
  const HeaderJSX = Header;
  const FooterJSX = Footer;
  return (
    <div
      className={wmkClass("wrap", "layout")}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <HeaderJSX />
      <main className={wmkClass("main", "layout", className)}>{children}</main>
      <FlexSpacer />
      <FooterJSX />
    </div>
  );
};
