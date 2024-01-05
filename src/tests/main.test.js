import { expect, test } from "vitest";
import { transformIdToCoordinates } from "../main";

test("transformIdToCoordinates should return the correct coordinates", () => {
  const coordinates = transformIdToCoordinates("A1");
  expect(coordinates).toEqual(["A", "1"]);
});
