class Ship {
  constructor(length, start=null, end=null) {
    this.length = length;
    this.start = start;
    this.end = end;
  }
  
  hitCount = 0;

  hit = () => {
    this.hitCount += 1;
  }
  
  isSunk = () => this.hitCount >= this.length
}

export default Ship;