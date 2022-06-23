import { Pagination } from "./logic";
import { mockData } from "./MOCK_DATA";

describe("Pagination class", () => {
  it("Pagination instantiates with defaults", () => {
    const paginated = new Pagination(mockData);
    expect(paginated.length).toBe(3);
    expect(paginated.total).toBe(50);
    expect(paginated.pages[0].length).toBe(20);
    expect(paginated.perPage).toBe(20);
  });

  it("Pagination instantiates with postive integers", () => {
    const paginated = new Pagination(mockData, 5);
    expect(paginated.length).toBe(10);
    expect(paginated.total).toBe(50);
    expect(paginated.pages[0].length).toBe(5);
    expect(paginated.perPage).toBe(5);
  });

  it("Pagination instantiates with non-integer", () => {
    const roundUp = new Pagination(mockData, 4.5);
    expect(roundUp.length).toBe(10);
    expect(roundUp.total).toBe(50);
    expect(roundUp.pages[0].length).toBe(5);
    expect(roundUp.perPage).toBe(5);

    const roundDown = new Pagination(mockData, 4.25);
    expect(roundDown.length).toBe(Math.ceil(50 / 4));
    expect(roundDown.total).toBe(50);
    expect(roundDown.pages[0].length).toBe(4);
    expect(roundDown.perPage).toBe(4);
  });

  it("Pagination instantiates with zero | negative integer", () => {
    const badPaged = new Pagination(mockData, -1);
    const zeroPaged = new Pagination(mockData, 0);
    const roundToZero = new Pagination(mockData, 0.25);

    expect(badPaged.length).toBe(1);
    expect(badPaged.total).toBe(50);
    expect(badPaged.pages[0].length).toBe(50);
    expect(badPaged.perPage).toBe(50);

    expect(zeroPaged.length).toBe(1);
    expect(zeroPaged.total).toBe(50);
    expect(zeroPaged.pages[0].length).toBe(50);
    expect(zeroPaged.perPage).toBe(50);

    expect(roundToZero.length).toBe(1);
    expect(roundToZero.total).toBe(50);
    expect(roundToZero.pages[0].length).toBe(50);
    expect(roundToZero.perPage).toBe(50);
  });

  it("Pagination instantiates with higher per page than source array", () => {
    const morePerPage = new Pagination([], 60);

    expect(morePerPage.length).toBe(1);
    expect(morePerPage.total).toBe(50);
    expect(morePerPage.pages[0].length).toBe(50);
    expect(morePerPage.perPage).toBe(60);
  });

  it("Pagination instantiates with empty array", () => {
    const empty = new Pagination([], 10);

    expect(empty.length).toBe(1);
    expect(empty.total).toBe(50);
    expect(empty.pages[0].length).toBe(50);
    expect(empty.perPage).toBe(50);
  });

  it("Pagination instantiates with perPage equal to array length", () => {
    const empty = new Pagination(mockData, 50);

    expect(empty.length).toBe(1);
    expect(empty.total).toBe(50);
    expect(empty.pages[0].length).toBe(50);
    expect(empty.perPage).toBe(50);
  });
});
