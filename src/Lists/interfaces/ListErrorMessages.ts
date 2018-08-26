export const ListErrorMessages = {
  invalidIndexMsg(i: number): string {
    return `The index ${i} is invalid. The index must be in the range of [0, ${this._size - 1}]`;
  }
};
