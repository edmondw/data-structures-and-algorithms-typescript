export default interface ListIterator<E> {
  hasNext(): boolean;
  hasPrevious?(): boolean;
  next(): E;
  remove?(): E;
}
