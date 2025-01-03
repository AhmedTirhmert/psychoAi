export function useResetObject() {
  /**
   * Recursive function to reset object attributes.
   *
   * @param {Object} obj - The object to reset.
   */
  const resetObject = (obj: any) => {
    for (const key in obj) {
      if (
        obj[key] !== null &&
        typeof obj[key] === 'object' &&
        !Array.isArray(obj[key])
      ) {
        // Recursively reset nested objects
        resetObject(obj[key]);
      } else if (Array.isArray(obj[key])) {
        // Reset arrays to empty arrays
        obj[key] = [];
      } else {
        // Reset primitives based on type
        obj[key] = typeof obj[key] === 'string' ? '' : null;
      }
    }
  };

  /**
   * Resets an object reactively.
   *
   * @param {Object} objectToReset - The object to reset.
   * @returns {Object} - Reactive object with reset functionality.
   */
  const reset = (objectToReset: any) => {
    const reactiveObject = reactive(objectToReset);
    resetObject(reactiveObject);
    return reactiveObject;
  };

  return { reset };
}
