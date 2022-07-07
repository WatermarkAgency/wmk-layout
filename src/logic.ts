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

/**
 * Array pagination helper function
 */
const paginateArray = (arr: any[], _per = 20) => {
  const per = Math.round(_per);
  if (Array.isArray(arr)) {
    const totalPages = Math.ceil(arr.length / per);
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages[i] = arr.slice(i * per, i * per + per);
    }
    return pages;
  } else {
    return [];
  }
};

/**
 * Class that represents paginated items
 */
export class Pagination {
  pages: any[][];
  perPage: number;
  length: number; // total number of pages
  total: number;
  constructor(arr: any[], per = 20) {
    const pages =
      per > 0.5 ? (per < arr.length ? paginateArray(arr, per) : [arr]) : [arr];
    if (per === 60) {
      console.log(pages.length, arr.length, [arr].length, per < arr.length);
    }

    this.pages = pages;
    this.perPage = per > 0.5 ? Math.round(per) : arr.length;
    this.length = pages.length;
    this.total = Array.isArray(arr) ? arr.length : 0;
  }
}
