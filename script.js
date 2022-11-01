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

let lvlUP = 0;


let user = [];

let thisUser = {
 name: 'name',
 password: 'password',
 score: 0,
 LVL: 1,

}
canvas.addEventListener("mousemove", function(event){
    ship.x = event.offsetX-25;
    ship.y = event.offsetY-13;
});



let timer = 0;

DialogMenu.show();

function btnbtn() {
    btnNewGame.onclick = function(){ 
        DialogMenu.close();
        DialogUserName.show();
    
    }
    
     btnExit.onclick = function(){ 
        window.close();
    
     }
    
     btnGoGame.onclick = function(){ 
        if ( btnUserNameinput.value !== '' && btnUserPasswordinput.value !== '' ) {

            thisUser.name = btnUserNameinput.value;
            document.getElementById('UserName').innerHTML = thisUser.name;
            thisUser.password = btnUserPasswordinput.value;


            DialogUserName.close();
            DialogMenu.close();
            DialogGame.show();
            DialogPaused.show();
            DialogInGame.show();

            

        } else {document.getElementById('btnGoGame').innerHTML = 'Введи свое имя!';}

        
        
     }
    
      btnBackNewGame.onclick = function(){ 
         DialogMenu.show();
          DialogUserName.close();
      }
    
      btnBackGame.onclick = function(){ 
        DialogMenu.show();
         DialogUserName.close();
         DialogGame.close();
     }
    
     btnСontinue.onclick = function(){ 
        DialogPaused.close(); 
        pause = true; 
     }
     
     btnMenuСontinue.onclick = function(){ 
        DialogPaused.show(); 
        DialogUserName.close();
        DialogMenu.close();
        DialogGame.show(); 
        pause = false; 
     } 

     
     btnSave.onclick = function() {
        DialogGameOver.show();


     }
}

fonimg.onload = function () {
    game();
}



function game(){
    update();
    render();
    requestAnimFrame(game);
    btnbtn();
}

function direction(event){                              //Нажатие клавиш
    
     if(event.keyCode == 32){
       if ( pause == false ) {
        pause = true; 
         
        DialogPaused.close(); 
       } else {
        pause = false; 
        DialogPaused.show();
       }
         
     }else if(event.keyCode == 27){localStorage.clear();}  
 } 


  
    


function update() {
    if ( pause == true ){
       // document.getElementById('labelPlayer').innerHTML = `Игрок: ${inputNewGame.value}`;
timer++;

if ( timer % 100 == 0 ) {
   lvlUP++;
}
if ( timer % (100 - lvlUP)  == 0 ) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
    console.log(timer, lvlUP);
    posNelep.push({
        x:Math.floor(Math.random() * (canvas.width-50))  ,
        y:-50, 
        dx:0, 
        dy:Math.random() * lvlUP/10 + 2, 
        del:0,
       });
}

if ( timer % 50 == 0 ) {
    bullet.push({
        x:ship.x+15 ,
        y:ship.y-15, 
        dx:0, 
        dy:-3, 
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

//if ( posNelep[i].y > canvas.height) {posNelep.splice(i, 1);};
//if ( posNelep[i].y < 0 ) {posNelep[i].dy = -posNelep[i].dy};

for ( j in bullet ) {
        // console.log(`posNelep[i] ${posNelep[i].x} : ${posNelep[i].y}`);
        // console.log(`bullet[j] ${bullet[j].x} : ${bullet[j].y}`);
    if (Math.abs(posNelep[i].x-bullet[j].x) < 49 
        && Math.abs(posNelep[i].y-bullet[j].y) < 25) {
        // console.log(`posNelep[i] ${posNelep[i].x} : ${posNelep[i].y}`);
        // console.log(`bullet[j] ${bullet[j].x} : ${bullet[j].y}`);
        

        thisUser.score++;
       // console.log(thisUser.score);
        document.getElementById('UserScore').innerHTML = `Score: ${thisUser.score}`;
        posNelep[i].del = 1;
        bullet.splice(j, 1); 
        break;       
    }
}

if ( posNelep[i].del == 1 || posNelep[i].y > canvas.height) {posNelep.splice(i, 1)}


}
}
}

function render() {

    ctx.drawImage(fonimg, 0, 0, canvas.width, canvas.height);
    if ( pause ) {ctx.drawImage(shipImg, ship.x, ship.y, 50, 50);
    }else{/* Добавить картинку для обычного курсора или восстановить видимость дефолтного курсора */}
    

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