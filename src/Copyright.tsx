import * as React from "react";
import { wmkClass } from "./logic";

type copyrightProps = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  style?: React.CSSProperties;
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
