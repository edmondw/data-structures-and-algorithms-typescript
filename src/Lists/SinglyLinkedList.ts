import ListIterator from './interfaces/ListIterator';
import ListNode from './ListNode';

export default class SinglyLinkedList<E> {
  private size = 0;
  private head: ListNode<E> = null;
  private tail: ListNode<E> = null;

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  first(): E {
    return (this.isEmpty()) ? null : this.head.element;
  }

  last(): E {
    return (this.isEmpty()) ? null : this.tail.element;
  }

  addFirst(e: E): void {
    this.head = new ListNode(e, {next: this.head});
    if (this.isEmpty()) {
      this.tail = this.head;
    }
    this.size++;
  }

  addLast(e: E): void {
    const newNode = new ListNode(e);
    if (this.isEmpty()) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  removeFirst(): E {
    if (this.isEmpty()) {
      return null;
    }
    const removedElement = this.head.element;
    this.head = this.head.next;
    this.size--;
    if (this.isEmpty()) {
      this.tail = null;
    }
    return removedElement;
  }

  createIterator(): ListIterator<E> {
    let positionIndex = -1;
    let currentNode = this.head;
    let nextElement: E = null;

    const iterator: ListIterator<E> = {
      hasNext: () => positionIndex < this.size,
      next: () => {
        if (positionIndex === this.size) {
          return { value: null, done: true, index: positionIndex };
        }
        nextElement = currentNode.element;
        currentNode = currentNode.next;
        return { value: nextElement, done: false, index: ++positionIndex };
      }
    };

    return iterator;
  }

  printToConsole(): void {
    const iterator = this.createIterator();
    while (iterator.hasNext()) {
      console.log(iterator.next().value);
    }
  }
}
