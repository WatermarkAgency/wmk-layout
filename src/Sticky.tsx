import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { useScrollPosition } from "@n8tb1t/use-scroll-position";
import { wmkClass } from "./logic";
import { Header } from "./Header";

interface StickyProps {
  Alert?: React.ReactElement<{}>;
  className?: string;
  children: React.ReactChild;
  absolute?: boolean;
  style?: React.CSSProperties;
  zIndex?: number;
  width?: string;
  trigger?: number;
}

export const Sticky = ({
  Alert = <React.Fragment />,
  className,
  children,
  absolute,
  style,
  zIndex = 1000,
  width = "100%",
  trigger = 0
}: StickyProps) => {
  const domPosition = absolute ? "absolute" : "relative";
  const [headerRect, setHeaderRect] = useState<DOMRect>({
    y: 0,
    height: 0,
    width: 0,
    x: 0,
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    toJSON: () => ""
  });
  const [scrollPos, setScrollPos] = useState(0);
  const [location, setLocation] = useState<string>();

  const headerRef = useRef<HTMLHeadElement>();

  useEffect(() => {
    setLocation(window.location.href);
    const handleResize = () => {
      setHeaderRect(headerRef.current.getBoundingClientRect());
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [location]);

  useScrollPosition(({ currPos }) => {
    setScrollPos(currPos.y * -1);
  });
  const classes = [className];
  const triggerHeight =
    !Alert && !headerRect.y
      ? trigger >= 0
        ? trigger
        : headerRect.height
      : headerRect.y;
  const isTriggered = scrollPos > triggerHeight;
  if (isTriggered) classes.push("stuck");
  return (
    <React.Fragment>
      <div
        className={wmkClass("sticky-header", "layout", classes.join(" "))}
        style={{
          ...style,
          position: isTriggered ? "fixed" : domPosition,
          zIndex,
          width
        }}>
        {!isTriggered ? Alert : null}
        <Header ref={headerRef}>{children}</Header>
      </div>
      {Alert && isTriggered ? <div style={{ height: headerRect.y }} /> : null}
      {isTriggered && <div style={{ height: headerRect.height }} />}
    </React.Fragment>
  );
};
