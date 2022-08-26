const canvas = document.getElementById("canvas");
const GAME_WIDTH = 800
const SNAKE_COLOR = 'white'
const UNIT = 40
canvas.width = canvas.height = 800
const ctx = canvas.getContext('2d')
const BACKGROUND_COLOR = "black"
ctx.fillStyle= BACKGROUND_COLOR
ctx.fillRect(0,0,GAME_WIDTH,GAME_WIDTH)
const LEFT = 37
const UP = 38
const RIGHT = 39
const DOWN = 40
let time = 100



class Vector2d{
    constructor(x,y) {
        this.x = x ;
        this.y=y

    }
}
let  currentDirection = new Vector2d(-1,0)





class Snake{

    constructor() {
        this.body = [
            new Vector2d(UNIT*10,UNIT*3),
            new Vector2d(UNIT*11,UNIT*3),
            new Vector2d(UNIT*12,UNIT*3)
        ]
        this.speed = new Vector2d(-1,0)
        this.head = this.body[0]
      this.score = 0
        this.flag = false

    }
    draw(){
        ctx.fillStyle = 'blue';
        ctx.fillRect(this.body[0].x,this.body[0].y,UNIT,UNIT);
        ctx.fillStyle= SNAKE_COLOR
        for (let i =1 ; i<this.body.length;i++){
            ctx.fillRect(this.body[i].x,this.body[i].y,UNIT,UNIT);

        }
    }
    clear(){
        ctx.fillStyle = BACKGROUND_COLOR
        ctx.fillRect(this.body[0].x,this.body[0].y,UNIT,UNIT);
        ctx.fillStyle= BACKGROUND_COLOR
        for (let i =1 ; i<this.body.length;i++){
            ctx.fillRect(this.body[i].x,this.body[i].y,UNIT,UNIT);

        }
    }
    move(){
        this.clear()

        for (let i = this.body.length -1 ; i>=1 ; i--){
           this.body[i].x = this.body[i-1].x
            this.body[i].y = this.body[i-1].y

        }

        this.body[0].x += this.speed.x*UNIT
        this.body[0].y += this.speed.y*UNIT
        this.handleBound()
        this.checkDie()
        this.draw()


    }
    checkDie(){
         for (let i =1 ; i<this.body.length;i++){
           if((this.body[0].x==this.body[i].x)&&(this.body[0].y==this.body[i].y)){
           alert("GAME OVER")
               location.reload()
           }
         }

    }
    checkEat(food){
        let head = this.body[0]
        return food.x === head.x && food.y == head.y
    }
    grow(){
        // tang them 1 chieu dai cho ran
       this.clear()
        let snakelength = this.body.length
        let mountX = this.body[snakelength-1].x - this.body[snakelength-2].x
        let mountY = this.body[snakelength-1].y - this.body[snakelength-2].y

        let newPart = new Vector2d(this.body[snakelength-1].x+mountX,this.body[snakelength-1].y+mountY)
        this.body.push(newPart)
        this.score = this.score +1
        this.draw()

    }
    handleBound(){
        if(this.head.x<0){
            this.head.x = GAME_WIDTH - UNIT
        }
        if (this.head.x > GAME_WIDTH - UNIT){
            this.head.x =0
        }
        if(this.head.y<0){
            this.head.y = GAME_WIDTH - UNIT
        }
        if (this.head.y > GAME_WIDTH - UNIT){
            this.head.y =0
        }

    }
    isScore(){

        document.getElementById("scoreText").innerHTML= "Score: " +this.score
    }

}
class Food{
    constructor(x,y) {
    this.x = x
        this.y = y
    }
    draw(){
        ctx.fillStyle= 'green'
        ctx.fillRect(this.x,this.y,UNIT,UNIT)
    }
    clear(){
        ctx.fillStyle= BACKGROUND_COLOR
        ctx.fillRect(this.x,this.y,UNIT,UNIT)
    }
    getRandomNumber(){
        // 40 80 != 23 44
        // 0 - game_size
        let randomNumber = Math.floor(Math.random()*GAME_WIDTH)
        randomNumber -= randomNumber%UNIT
        return randomNumber

    }
    spawn(){
        this.clear()
        this.x = this.getRandomNumber()
        this.y = this.getRandomNumber()
        this.draw()
    }
}


let player = new Snake()
let food1 = new Food(80,40)

    let food2 = new Food(80,40)


function Star() {
    food1.spawn()

    setInterval(() => {
        player.move()
        if (player.checkEat(food1)) {
            player.grow()
            food1.spawn()

        }
        player.isScore()




    }, time)
    // player.checkDie()
}
document.getElementById("scoreText").innerHTML= "Score: " +player.score

document.onkeydown = function (e){
    switch (e.keyCode) {
        case LEFT :
           if (currentDirection.x==1)break
            player.speed = new Vector2d(-1,0)
            currentDirection = new Vector2d(-1,0)
            break;
        case RIGHT :
            if (currentDirection.x==-1)break
            player.speed = new Vector2d(1,0)
            currentDirection = new Vector2d(1,0)
            break;
        case UP :
            if (currentDirection.y==1)break
            player.speed = new Vector2d(0,-1)
            currentDirection = new Vector2d(0,-1)
            break;
        case DOWN :
            if (currentDirection.y==-1)break
            player.speed = new Vector2d(0,1)
            currentDirection = new Vector2d(0,1)
            break;

    }
}





// function drawSquare(x,y,color){
//     ctx.fillStyle = color;
//     ctx.fillRect(x*40,y*40,40,40);
//     ctx.strokeStyle = "#ccc";
//     ctx.strokeRect(x*40,y*40,40,40)
//
// }


// let board= [];
// for(let  r =0 ;r<20;r++){
//     board[r]=[];
//     for(let  c = 0;c<20;c++){
//         board[r][c]='red';
//     }
// }
//
// function  drawBoard(){
//     for(let r =0 ;r<20;r++){
//         for( let c = 0;c<20;c++){
//             drawSquare(c,r,board[r][c])
//         }
//     }
// }
// drawBoard()


