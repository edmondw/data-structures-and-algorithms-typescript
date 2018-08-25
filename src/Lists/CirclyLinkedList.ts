import ListNode from './ListNode';

export default class CirclyLinkedList<E> {
  private size = 0;
  private tail: ListNode<E>;

  getSize(): number {
    return this.size;
  }

  isEmpty(): boolean {
    return this.size === 0;
  }

  first(): E {
    return (this.isEmpty()) ? null : this.tail.next.element;
  }

  last(): E {
    return (this.isEmpty()) ? null : this.tail.element;
  }

  rotateCounterClockwise(): void {
    if (this.tail) {
      this.tail = this.tail.next;
    }
  }

  addFirst(e: E): void {
    if (this.isEmpty()) {
      this.tail = new ListNode<E>(e, { next: null });
      this.tail.next = this.tail;
    } else {
      this.tail.next = new ListNode<E>(e, { next: this.tail.next });
    }
    this.size++;
  }

  addLast(e: E): void {
    this.addFirst(e);
    this.tail = this.tail.next;
  }

  removeFirst(): E {
    if (this.isEmpty()) {
      return null;
    }
    const head = this.tail.next;
    if (this.tail === head) {
      this.tail = null;
    } else {
      this.tail.next = head.next;
      this.size--;
      return head.element;
    }
  }

}
