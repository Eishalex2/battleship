class Ship {
  constructor(name, length) {
    this.name = name;
    this.length = length;
  }
  
  hitCount = 0;

  hit = () => {
    this.hitCount += 1;
  }
  
  isSunk = () => this.hitCount >= this.length
}

export default Ship;