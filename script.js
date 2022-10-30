const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown",direction);
let dir;
let pause = false;

let box = 400;

canvas.width = 1.2 * box; 
canvas.height = 1.6 * box;

let fonimg = new Image();
fonimg.src = 'fon.jpg';

let nelep0 = new Image();
nelep0.src = 'nelep0.jpg';

let nelep1 = new Image();
nelep1.src = 'nelep1.jpg';

let nelep2 = new Image();
nelep2.src = 'nelep2.jpg';

let nelep3 = new Image();
nelep3.src = 'nelep3.jpg';

let shipImg = new Image();
shipImg.src = 'ship.png';

let bulletImg = new Image();
bulletImg.src = 'fire.jpg';

let arrNelep = [nelep0, nelep1, nelep2, nelep3];
let nelepNumber = Math.floor(Math.random() * 4);

let posNelep = [];

let bullet = [];

let ship = {x:canvas.width/2-25, y:canvas.height-70, animX:0, animY:0};

let score = 0;

canvas.addEventListener("mousemove", function(event){
    ship.x = event.offsetX-25;
    ship.y = event.offsetY-13;
});


let timer = 0;


fonimg.onload = function () {
    game() 
}



function game(){
    update();
    render();
    requestAnimFrame(game);
}

function direction(event){                              //Нажатие клавиш
    
     if(event.keyCode == 32){
       if ( pause == false ) {
        pause = true;  
       } else {
        pause = false; 
       }
         
     }else if(event.keyCode == 27){localStorage.clear();}  
 } 


  
    


function update() {
    if ( pause == true ){
timer++;
if ( timer % 100 ==0 ) {
    posNelep.push({
        x:Math.random() * (canvas.width-50)  ,
        y:-50, 
        dx:0, 
        dy:Math.random() * 1 + 0.2, 
        del:0,
       });
}

if ( timer % 100 ==0 ) {
    bullet.push({
        x:ship.x+10 ,
        y:ship.y, 
        dx:0, 
        dy:-5.2, 
       });
}

//физика
for ( i in  bullet) {
bullet[i].x = bullet[i].x + bullet[i].dx; 
bullet[i].y = bullet[i].y + bullet[i].dy; 
if ( bullet[i].y < -50) {bullet.splice(i, 1)};
}

for ( i in  posNelep) {

posNelep[i].x = posNelep[i].x + posNelep[i].dx;
posNelep[i].y = posNelep[i].y + posNelep[i].dy;
//границы
if ( posNelep[i].x+50 > canvas.width || posNelep[i].x < 0)  {posNelep[i].dx = -posNelep[i].dx};
//if ( posNelep[i].x < 0 ) {posNelep[i].dx = -posNelep[i].dx};
if ( posNelep[i].y > canvas.height) {posNelep.splice(i, 1)};
//if ( posNelep[i].y < 0 ) {posNelep[i].dy = -posNelep[i].dy};

for ( j in bullet ) {
    if (Math.abs(posNelep[i].x+25-bullet[j].x-15) < 50 && Math.abs(posNelep[i].y-bullet[j].y) < 25) {
       
        
        posNelep[i].del = 1;
        bullet.splice(j, 1); break;

    }


}
if ( posNelep[i].del == 1 ) {posNelep.splice(i, 1)}


}
}
}

function render() {

    ctx.drawImage(fonimg, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(shipImg, ship.x, ship.y, 50, 50);

    for ( i in  bullet) {
        ctx.drawImage(bulletImg, bullet[i].x, bullet[i].y, 20, 20);
        }

    for ( i in  posNelep) {
         ctx.drawImage(arrNelep[i%4], posNelep[i].x, posNelep[i].y, 50, 50);
    }
}

let requestAnimFrame = (function() {
    return window.requestAnimationFrame         ||
           window.webkitRequestAnimationFrame   ||
           window.mozRequestAnimationFrame      ||
           window.oRequestAnimationFrame        ||
           window.msRequestAnimationFrame       ||
           function(callback) {
            window.setTimeout(callback, 1000 / 20);
           }
})();