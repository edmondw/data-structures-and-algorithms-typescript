export interface List<E> {
  add(i: number, e: E);
  addFirst(e: E);
  addLast(e: E);
  clear();
  contains(e: E): boolean;
  get(i: number);
  indexOf(e: E);
  isEmpty(): boolean;
  iterator();
  remove(i: number): E;
  removeFirst(): E;
  removeLast(): E;
  set(i: number, e: E): E;
  size(): number;
}
