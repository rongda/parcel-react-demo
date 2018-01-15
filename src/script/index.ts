import message from "./message";
console.log(`${message}, this is typescript world`);

let canvas = document.querySelector('canvas'),
    ctx = canvas.getContext('2d'),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    balls: Array<Ball> = [],
    random = (min: number, max: number): number => Math.floor(Math.random()*(max-min)) + min;

interface IBall {
  x: number, 
  y: number, 
  velX: number, 
  velY: number, 
  color: string, 
  size: number
}

class Ball {
  constructor(public config: IBall) {
    //
  }

  draw ():void {
    ctx.beginPath();
    ctx.fillStyle = this.config.color;
    ctx.arc(this.config.x, this.config.y, this.config.size, 0, 2 * Math.PI);
    ctx.fill();
  }

  update ():void {
    if((this.config.x + this.config.size) >= width){
      this.config.velX = -(this.config.velX);
    }
    if((this.config.x - this.config.size) <= 0){
      this.config.velX = -(this.config.velX);
    }
    if((this.config.y + this.config.size) >= height){
      this.config.velY = -(this.config.velY);
    }
    if((this.config.y - this.config.size) <= 0){
      this.config.velY = -(this.config.velY);
    }

    this.config.x += this.config.velX;
    this.config.y += this.config.velY;
  }

  collisionDetect():void {
    for(let j = 0; j < balls.length; j++) {
      if(!(this === balls[j])) {
        let dx = this.config.x - balls[j].config.x,
            dy = this.config.y - balls[j].config.y,
            distance = Math.sqrt(dx * dx + dy * dy);
        if(distance < this.config.size + balls[j].config.size) {
          balls[j].config.color = this.config.color = `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`;
        }
      }
    }
  }
}

class BallChild extends Ball {
  constructor(configChild:IBall, public z: number) {
    super(configChild);
    this.z = z;
    console.log(this.config.color, this.z);
  }
  child() {
    super.draw();
    console.log("child");
  }
}

let loop = ():void => {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  while(balls.length < 25) {
    let ball = new Ball({
      x: random(0, width), 
      y: random(0, height), 
      velX: random(-7, 7), 
      velY: random(-7, 7), 
      color: `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`, 
      size: random(10, 20)
    });
    balls.push(ball);
  }
  for(let i = 0; i < balls.length; i++){
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }
  requestAnimationFrame(loop);
}
loop();

let ballChilds = new BallChild({
  x: random(0, width),
  y: random(0, height),
  velX: random(-7, 7),
  velY: random(-7, 7),
  color: `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`,
  size: random(10, 20)},
  random(0, 255)
);
ballChilds.child();
