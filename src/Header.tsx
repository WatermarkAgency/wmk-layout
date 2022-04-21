import * as React from "react";
import { wmkClass } from "./logic";

type headerProps = {
  children: React.ReactChild;
  className?: string;
  style?: React.CSSProperties;
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
