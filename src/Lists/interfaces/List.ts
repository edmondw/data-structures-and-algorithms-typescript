import ListIterator from './ListIterator';

export interface List<E> {
  add(i: number, e: E);
  addFirst(e: E);
  addLast(e: E);
  clear();
  contains(e: E): boolean;
  get(i: number): E;
  getFirst(): E;
  getLast(): E;
  indexOf(e: E): number;
  isEmpty(): boolean;
  iterator(): ListIterator<E>;
  remove(i: number): E;
  removeFirst(): E;
  removeLast(): E;
  set(i: number, e: E): E;
  size(): number;
}
