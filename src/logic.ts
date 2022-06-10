export const wmkClass = (
  name: string,
  group: string,
  append = "",
  prefix = "wmk"
) => {
  const classes = [
    prefix + "-" + group,
    prefix + "-" + group + "-" + name,
    append
  ];
  return classes.join(" ").trim();
};

enum BREAKPOINTS {
  EXTRA_SMALL = "xs",
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
  EXTRA_LARGE = "xl",
  EXTRA_EXTRA_LARGE = "xxl"
}

export interface BreakPoint {
  min: number;
  max: number;
  units: string;
}

export type MediaBreakPoints = {
  [key in BREAKPOINTS]?: BreakPoint;
};

export class MediaQueries {
  breakpoints: MediaBreakPoints;
  constructor(
    breakpoints = {
      [BREAKPOINTS.EXTRA_SMALL]: { min: 0, max: 576, units: "px" },
      [BREAKPOINTS.SMALL]: { min: 576, max: 768, units: "px" },
      [BREAKPOINTS.MEDIUM]: { min: 768, max: 992, units: "px" },
      [BREAKPOINTS.LARGE]: { min: 992, max: 1200, units: "px" },
      [BREAKPOINTS.EXTRA_LARGE]: { min: 1200, max: 1400, units: "px" },
      [BREAKPOINTS.EXTRA_EXTRA_LARGE]: { min: 1400, max: Infinity, units: "px" }
    }
  ) {
    this.breakpoints = breakpoints;
  }
  private _bp(size: BREAKPOINTS) {
    return size in this.breakpoints ? this.breakpoints[size] : undefined;
  }
  range(
    css: string,
    start: BREAKPOINTS,
    end?: BREAKPOINTS,
    _typeObj = { type: "screen", qualifier: "only" }
  ) {
    const startBreaks = this._bp(start);
    const endBreaks = end ? this._bp(end) : this._bp(start);
    const minFirst = startBreaks.min < endBreaks.max;
    return this.query(
      _typeObj,
      [
        {
          feature: minFirst ? "min-width" : "max-width",
          break: {
            amount: startBreaks + (minFirst ? 0.1 : -0.1),
            units: get(startBreaks, "units")
          }
        },
        {
          feature: minFirst ? "max-width" : "min-width",
          break: {
            amount: get(endBreaks, "amount") + (minFirst ? -0.1 : 0.1),
            units: get(endBreaks, "units")
          }
        }
      ],
      css
    );
  }
  addSize(size, amount, _units) {
    const units = _units ? _units : "px";
    this.breakpoints[size] = { amount, units };
  }
  max(size, css, mediaType) {
    const type = mediaType ? mediaType : { type: "screen", qualifier: "only" };
    return this.query(
      type,
      [{ feature: "max-width", break: this._bp(size) }],
      css
    );
  }
  min(size, css, mediaType) {
    const type = mediaType ? mediaType : { type: "screen", qualifier: "only" };
    return this.query(
      type,
      [{ feature: "min-width", break: this._bp(size) }],
      css
    );
  }
  only(css, _type) {
    const type = _type ? _type : "screen";
    return this.query({ type, qualifier: "only" }, [], css);
  }
  _mediaFeature(feature, breakpoint) {
    const featStr =
      get(breakpoint, "amount", "") + get(breakpoint, "units", "");
    return `and (${feature}: ${featStr})`;
  }
  _mediaType(type, qualifier) {
    const _t = type ? type : "all";
    const _q =
      qualifier === "only" ? " only " : qualifier === "not" ? " not " : " ";
    return `@media${_q}${_t}`;
  }
  query(
    modifiers: MediaQueryModifiers,
    features: MediaQueryFeatures[],
    css: string
  ) {
    const feats = features.map((feat) => {
      return this._mediaFeature(feat.feature, feat.break);
    });

    return `${this._mediaType(
      get(typeObj, `type`),
      get(typeObj, `qualifier`)
    )} ${feats.join(" ")}{${css}}`;
  }
}

export type MediaQueryTypes = "all" | "print" | "screen" | "speech";

export type MediaQueryFeatures =
  | "any-hover"
  | "any-pointer"
  | "aspect-ratio"
  | "color"
  | "color-gamut"
  | "color-index"
  | "grid"
  | "height"
  | "hover"
  | "inverted-colors"
  | "light-level"
  | "max-aspect-ratio"
  | "max-color"
  | "max-color-index"
  | "max-height"
  | "max-monochrome"
  | "max-resolution"
  | "max-width"
  | "min-aspect-ratio"
  | "min-color"
  | "min-color-index"
  | "min-height"
  | "min-monochrome"
  | "min-resolution"
  | "min-width"
  | "monochrome"
  | "orientation"
  | "overflow-block"
  | "overflow-inline"
  | "pointer"
  | "resolution"
  | "scan"
  | "scripting"
  | "update"
  | "width";

export interface MediaQueryModifiers {
  type?: MediaQueryTypes;
  rule?: "only";
  features?: MediaQueryFeatures;
}
