import { List } from './interfaces/List';
import { ListErrorMessages } from './interfaces/ListErrorMessages';
import ListIterator from './interfaces/ListIterator';
import ListNode from './ListNode';

export default class LinkedList<E> implements List<E> {
  private _size = 0;
  private sentinelHead: ListNode<E>;
  private sentinelTail: ListNode<E>;

  constructor() {
    this.sentinelHead = new ListNode<E>();
    this.sentinelTail = new ListNode<E>(null, { previous: this.sentinelTail });
    this.sentinelHead.next = this.sentinelTail;
  }

  add(i: number, e: E) {
    if (!this.isValidIndex(i)) {
      throw new RangeError(ListErrorMessages.invalidIndexMsg(i));
    }
    const nodeAtPosition = this.find(i);
    this.addBetween(e, nodeAtPosition, nodeAtPosition.next);
    this._size++;
  }

  addFirst(e: E) {
    this.addBetween(e, this.sentinelHead, this.sentinelHead.next);
  }

  addLast(e: E) {
    this.addBetween(e, this.sentinelTail.previous, this.sentinelTail);
  }

  clear() {
    throw new Error('Method not implemented.');
  }

  contains(e: E): boolean {
    let hasElement = false;
    const iterator = this.iterator();
    while (iterator.hasNext()) {
      if (iterator.next().value === e) {
        hasElement = true;
        break;
      }
    }
    return hasElement;
  }

  get(i: number): E {
    if (!this.isValidIndex(i)) {
      throw new RangeError(ListErrorMessages.invalidIndexMsg(i));
    }
    return this.find(i).element;
  }

  getFirst(): E {
    if (this.isEmpty()) {
      return null;
    }
    return this.sentinelHead.next.element;
  }

  getLast(): E {
    if (this.isEmpty()) {
      return null;
    }
    return this.sentinelTail.previous.element;
  }

  indexOf(e: E): number {
    let indexOfElement = -1;
    let temp = null;
    const iterator = this.iterator();
    while (iterator.hasNext()) {
      temp = iterator.next();
      if (e === temp.value) {
        indexOfElement = temp.index;
        break;
      }
    }
    return indexOfElement;
  }

  isEmpty(): boolean {
    return this._size === 0;
  }

  iterator() {
    let currentNode = this.sentinelHead.next;
    let currentIndex = -1;
    const iterator: ListIterator<E> = {
      hasNext: () => currentNode.next !== this.sentinelTail,
      next: () => {
        if (currentNode.next === this.sentinelTail) {
          return { value: null, done: true, index: currentIndex };
        }
        currentNode = currentNode.next;
        return { value: currentNode.element, done: false, index: ++currentIndex};
      }
    };
    return iterator;
  }

  remove(i: number): E {
    if (!this.isValidIndex(i)) {
      throw new RangeError(ListErrorMessages.invalidIndexMsg(i));
    }
    const node = this.find(i);
    return this.removeNode(node);
  }

  removeFirst(): E {
    if (this.isEmpty()) {
      return null;
    }
    return this.removeNode(this.sentinelHead.next);
  }

  removeLast(): E {
    if (this.isEmpty()) {
      return null;
    }
    return this.removeNode(this.sentinelTail.previous);
  }

  set(i: number, e: E): E {
    throw new Error('Method not implemented.');
  }

  size(): number {
    return this._size;
  }

  private addBetween(e: E, predecessor: ListNode<E>, successor: ListNode<E>) {
    const newNode = new ListNode<E>(e, { previous: predecessor, next: successor });
    predecessor.next = newNode;
    successor.previous = newNode;
    this._size++;
  }

  private isValidIndex(i: number): boolean {
    return i >= 0 && i < this._size;
  }

  private find(i: number): ListNode<E> {
    let currentNode = this.sentinelHead;
    let currentIndex = 0;
    while (currentIndex <= i && currentNode.next !== this.sentinelTail) {
      currentNode = currentNode.next;
      currentIndex++;
    }
    return currentNode;
  }

  private removeNode(node: ListNode<E>): E {
    const predecessor = node.previous;
    const successor = node.next;
    predecessor.next = successor;
    successor.previous = predecessor;
    this._size--;
    const removedElement = node.element;
    node.element = null;
    node.next = null;
    node.previous = null;
    return removedElement;
  }
}
