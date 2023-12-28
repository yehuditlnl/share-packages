import SortingCriterion from './sorting-criterion';

/**
 * The `SortingManager<T>` class provides functionalities to manage and sort items based on
 * a collection of sorting criteria.
 *
 * @template T - The type of items that will be sorted using the specified criteria.
 */
export class SortingManager<T> {
  /**
   * Array to store the sorting criteria.
   */
  private criteria: SortingCriterion<T>[] = [];

  /**
   * Constructs an instance of `SortingManager<T>` with an optional list of initial sorting criteria.
   *
   * @param {...SortingCriterion<T>[]} initialCriteria - Initial sorting criteria to be added to the manager.
   */
  constructor(...initialCriteria: SortingCriterion<T>[]) {
    this.addCriteria(...initialCriteria);
  }

  /**
   * Adds one or more sorting criteria to the manager.
   *
   * @param {...SortingCriterion<T>[]} criteria - Sorting criteria to be added.
   */
  addCriteria = (...criteria: SortingCriterion<T>[]): void => {
    this.criteria.push(...criteria);
  };

  /**
   * Compares two items based on the registered sorting criteria.
   *
   * @param {T} a - The first item to be compared.
   * @param {T} b - The second item to be compared.
   * @returns {number} - A negative, zero, or positive number based on the comparison result.
   */
  private compareItems = (a: T, b: T): number => {
    for (const criterion of this.criteria) {
      const result = criterion.compare(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };

  /**
   * Sorts an array of items based on the registered sorting criteria.
   *
   * @param {T[]} items - Array of items to be sorted.
   * @returns {T[]} - Sorted array of items.
   */
  sort = (items: T[]): T[] => {
    return items.sort(this.compareItems);
  };

  /**
   * Inserts a new item into the sorted array based on the registered sorting criteria.
   *
   * @param {T[]} items - Array of items where the new item will be inserted.
   * @param {T} newItem - The new item to be inserted.
   * @returns {T[]} - Updated array of items with the new item inserted at the correct position.
   */
  insertItem = (items: T[], newItem: T): T[] => {
    const index = this.findInsertIndex(items, newItem);
    if (index === -1) {
      items.push(newItem);
    } else {
      items.splice(index, 0, newItem);
    }
    return items;
  };

  /**
   * Rearranges an item within the sorted array based on the registered sorting criteria.
   *
   * @param {T[]} items - Array of items where the existing item will be rearranged.
   * @param {T} updatedItem - The existing item to be rearranged.
   * @returns {T[]} - Updated array of items with the existing item rearranged at the correct position.
   */
  rearrangeItemInSortArray = (items: T[], updatedItem: T): T[] => {
    const currentIndex = items.findIndex((item) => this.compareItems(updatedItem, item) === 0);
    if (currentIndex !== -1) {
      items.splice(currentIndex, 1);
    }
    this.insertItem(items, updatedItem);
    return items;
  };

  /**
   * Finds the correct index to insert a new item within the sorted array based on the registered sorting criteria.
   *
   * @param {T[]} items - Array of items where the new item will be inserted.
   * @param {T} newItem - The new item to be inserted.
   * @returns {number} - The correct index to insert the new item.
   */
  private findInsertIndex = (items: T[], newItem: T): number => {
    for (let i = 0; i < items.length; i++) {
      const comparisonResult = this.compareItems(newItem, items[i]);
      if (comparisonResult <= 0) {
        return i; // Found the correct position
      }
    }
    return items.length; // Insert at the end
  };
}
