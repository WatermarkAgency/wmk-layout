import * as React from "react";
import { wmkClass } from "./logic";
import * as CSS from "csstype";

type copyrightProps = {
  children?: React.ReactChild;
  className?: string;
  id?: string;
  style?: CSS.Properties;
};

export const Copyright = React.forwardRef(
  (
    { children, className, id }: copyrightProps,
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    const year = new Date().getFullYear();
    return (
      <div
        id={id}
        className={wmkClass("copyright", "layout", className)}
        ref={ref}>
        © {year} {children ? children : null}
      </div>
    );
  }
);
