import ListIterator from './interfaces/ListIterator';
import ListNode from './ListNode';

export default class DoublyLinkedList<E> {
  private sentinelHead: ListNode<E>;
  private sentinelTail: ListNode<E>;
  private size = 0;

  constructor() {
    this.sentinelHead = new ListNode<E>();
    this.sentinelTail = new ListNode<E>(null, {previous: this.sentinelHead});
    this.sentinelHead.next = this.sentinelTail;
  }

  getSize() {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  first(): E {
    return (this.isEmpty()) ? null : this.sentinelHead.next.element;
  }

  last(): E {
    return (this.isEmpty()) ? null : this.sentinelTail.previous.element;
  }

  addFirst(e: E): void {
    this.addBetween(e, this.sentinelHead, this.sentinelHead.next);
  }

  addLast(e: E): void {
    this.addBetween(e, this.sentinelTail.previous, this.sentinelTail);
  }

  removeFirst(): E {
    return this.remove(this.sentinelHead.next);
  }

  removeLast(): E {
    return this.remove(this.sentinelTail.previous);
  }

  createIterator() {
    let currentNode = this.sentinelHead;
    let positionIndex = 0;

    const iterator: ListIterator<E> = {
      hasNext: () => positionIndex < this.size,
      next: () => {
        if (this.isEmpty()) {
          return null;
        }
        currentNode = currentNode.next;
        ++positionIndex;
        return currentNode.element;
      }
    };
    return iterator;
  }

  private addBetween(e: E, predecessor: ListNode < E > , successor: ListNode<E>): void {
    const newNode = new ListNode<E>(e, { previous: predecessor, next: successor });
    predecessor.next = newNode;
    successor.previous = newNode;
    ++this.size;
  }

  private remove(node: ListNode<E>): E {
    const predecessor = node.previous;
    const successor = node.next;
    predecessor.next = successor;
    successor.previous = predecessor;
    --this.size;
    const removedElement = node.element;
    node.previous = null;
    node.next = null;
    node.element = null;
    return removedElement;
  }
}
