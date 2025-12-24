
import Stemmer from "../stemmer";

describe("Stemmer Security Tests", () => {
  it("should not be vulnerable to prototype key collisions", () => {
    // Create a stemmer with an empty dictionary
    const stemmer = new Stemmer([]);

    // Built-in properties should not be found in the dictionary
    expect(stemmer.find("toString")).toBe(false);
    expect(stemmer.find("constructor")).toBe(false);
    expect(stemmer.find("valueOf")).toBe(false);

    // After adding them, they should be found
    stemmer.addToDict(["toString"]);
    expect(stemmer.find("toString")).toBe(true);
    expect(stemmer.find("constructor")).toBe(false);
  });

  it("should not have a prototype", () => {
      const stemmer = new Stemmer([]);
      // @ts-ignore
      expect(Object.getPrototypeOf(stemmer.internalDictionary)).toBeNull();
      // @ts-ignore
      expect(stemmer.internalDictionary.toString).toBeUndefined();
  });
});
