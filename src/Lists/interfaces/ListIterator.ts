import IteratorProtocal from './IteratorProtocol';

export default interface ListIterator<E> {
  hasNext(): boolean;
  hasPrevious?(): boolean;
  next(): IteratorProtocal<E>;
  remove?(): E;
}
