
class _Node {
  constructor(value, next){
    this.value = value;
    this.next = next; 
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  insertFirst(item) {
    this.head = new _Node(item, this.head); 
  }
 
  insertBefore(item, item2) {
    if (!this.head){
      console.log('no list');
      return null; 
    }

    if(this.head.value === item2){
      this.insertFirst(item);
    }
    let currNode = this.head;
    while(currNode.next.value !== item2){
      currNode = currNode.next;
    }
    if(currNode === null){
      console.log('item not found');
      return;
    }
    currNode.next = new _Node(item, currNode.next);
  }

  insertAfter(item, item2) {
    if (!this.head) {
      return null;
    }

    let currNode = this.head;

    while((currNode !== null) && (currNode.value !== item2)){
      currNode = currNode.next; 
    }

    if (currNode === null){
      console.log('Item not found'); 
      return; 
    }

    currNode.next = new _Node(item, currNode.next); 

  }

  insertAt(item, loc, list){
    let current = list.head;
    for (let i = 1; i < loc -1; i++) {
      current = current.next;
      if(current.next === null){
        this.insertLast(item);
      }
    }
    current.next = new _Node(item, current.next);
  }


  insertLast(item, next=null) {
    if (this.head === null) {
      this.insertFirst(item);
    }
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) {
        tempNode = tempNode.next; 
      }
      tempNode.next = new _Node(item, next); 
    }
  }

  find(item) {
    let currNode = this.head; 
    if (!this.head) {
      return null; 
    }
    while (currNode.value !== item) {
      if (currNode.next === null) {
        return null; 
      }
      else {
        currNode = currNode.next;
      }
    }
    return currNode; 
  }

  remove(item) {
    if (!this.head) {
      return null; 
    }
    if (this.head.value === item) {
      this.head = this.head.next;
      return; 
    }

    let currNode = this.head; 
    let previousNode = this.head; 

    while((currNode !== null) && (currNode.value !== item)) {
      previousNode = currNode; 
      currNode = currNode.next; 
    }
    if (currNode === null) {
      console.log('Item not found');
      return; 
    }
    previousNode.next = currNode.next; 
  }
}

module.exports = LinkedList;