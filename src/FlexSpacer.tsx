import * as React from "react";
import { wmkClass } from "./logic";

type flexSpacerProps = {
  className?: string;
  id?: string;
};

export const FlexSpacer = ({ className, id }: flexSpacerProps) => {
  return (
    <div
      className={wmkClass("flex-spacer", "layout", className)}
      id={id}
      style={{ margin: "auto" }}
    />
  );
};

export default FlexSpacer;
