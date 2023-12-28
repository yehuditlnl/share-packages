/**
 * The `SortingCriterion<T>` class serves as a base class for defining specific sorting criteria
 * that can be applied to items of type `T`. Derived classes must implement the `compare` method
 * to provide custom comparison logic.
 *
 * @template T - The type of items that will be compared using this sorting criterion.
 */
class SortingCriterion<T> {
  /**
   * The name of the sorting criterion.
   */
  name: string;

  /**
   * Constructs a new instance of `SortingCriterion<T>` with the specified name.
   *
   * @param {string} name - The name of the sorting criterion.
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * Compares two items of type `T` based on the specific sorting criterion.
   *
   * @param {T} a - The first item to be compared.
   * @param {T} b - The second item to be compared.
   * @returns {number} - A negative, zero, or positive number based on the comparison result.
   * @throws {Error} - Throws an error indicating that the method must be implemented in a derived class.
   */
  compare(a: T, b: T): number {
    throw new Error("compare method must be implemented in derived class");
  }
}

export default SortingCriterion;
