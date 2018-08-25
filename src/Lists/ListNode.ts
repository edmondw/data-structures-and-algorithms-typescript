export default class ListNode<E> {
  public element: E;
  public previous: ListNode<E>;
  public next: ListNode<E>;

  constructor(element: E = null, { previous = null, next = null } = {}) {
    this.element = element;
    this.previous = previous;
    this.next = next;
  }
}
