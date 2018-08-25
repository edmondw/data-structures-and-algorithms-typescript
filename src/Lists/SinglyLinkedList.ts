import ListIterator from './interfaces/ListIterator';
import ListNode from './ListNode';

export default class SinglyLinkedList<E> {
  private size = 0;
  private head: ListNode<E> = null;
  private tail: ListNode<E> = null;

  public getSize(): number {
    return this.size;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public first(): E {
    return (this.isEmpty()) ? null : this.head.element;
  }

  public last(): E {
    return (this.isEmpty()) ? null : this.tail.element;
  }

  public addFirst(e: E): void {
    this.head = new ListNode(e, {next: this.head});
    if (this.isEmpty()) {
      this.tail = this.head;
    }
    this.size++;
  }

  public addLast(e: E): void {
    const newNode = new ListNode(e);
    if (this.isEmpty()) {
      this.head = newNode;
    } else {
      this.tail.next = newNode;
    }
    this.tail = newNode;
    this.size++;
  }

  public removeFirst(): E {
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

  public createIterator(): ListIterator<E> {
    let positionIndex = 0;
    let currentNode = this.head;
    let nextElement: E = null;

    const iterator: ListIterator<E> = {
      hasNext: () => positionIndex < this.size,
      next: () => {
        if (positionIndex === this.size) {
          throw new RangeError('No available next element while iterating.');
        }
        nextElement = currentNode.element;
        currentNode = currentNode.next;
        ++positionIndex;
        return nextElement;
      }
    };

    return iterator;
  }

  public printToConsole(): void {
    const iterator = this.createIterator();
    while (iterator.hasNext()) {
      console.log(iterator.next());
    }
  }
}