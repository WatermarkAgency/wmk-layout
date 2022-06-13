import * as React from "react";
import { FlexSpacer } from "./FlexSpacer";
import { wmkClass } from "./logic";

type mainLayoutProps = {
  children: React.ReactNode;
  Header?: React.ReactElement<{}>;
  Footer?: React.ReactElement<{}>;
  className?: string;
};

export const MainLayout = ({
  children,
  Header = <div>Pass Header JSX</div>,
  Footer = <div>Pass Footer JSX</div>,
  className
}: mainLayoutProps) => {
  return (
    <div
      className={wmkClass("wrap", "layout")}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {Header}
      <main className={wmkClass("main", "layout", className)}>{children}</main>
      <FlexSpacer />
      {Footer}
    </div>
  );
};
