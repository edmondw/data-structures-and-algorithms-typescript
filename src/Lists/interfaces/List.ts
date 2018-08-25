export interface List<E> {
  size(): number;
  isEmpty(): boolean;
  get(i: number);
  set(i: number, e: E);
  add(i: number, e: E);
  remove(i: number): E;
}
