import * as React from "react";
import * as CSS from "csstype";
import { wmkClass } from "./logic";

type headerProps = {
  children: React.ReactNode;
  className?: string;
  style?: CSS.Properties;
};

export const Header = React.forwardRef(
  (
    { children, className, style }: headerProps,
    ref: React.ForwardedRef<HTMLHeadElement>
  ) => {
    return (
      <header
        className={wmkClass("header", "layout", className)}
        style={style}
        ref={ref}>
        {children}
      </header>
    );
  }
);
