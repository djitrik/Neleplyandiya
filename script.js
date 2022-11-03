const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
document.addEventListener("keydown",direction);
let dir;

let pause = false;
let ESCkeyClick = false;

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
let widthNelep = 50;
let heightNelep = 50;

let bullet = [];
let widthBullet = 10;
let heightBullet = 10;

let widthShip = 40;
let heightShip = 40;
let ship = {
    x:canvas.width / 2 - widthShip / 2,
    y:canvas.height - heightShip - 20,
    animX:0,
    animY:0,
    w: widthShip, //ширина корабля
    h: heightShip, //высота корабля
    hp: 0,
    sheet: 0,
    hpsec: 0,
    bulletK: 0,
    bulletSpeed: 0,
};

let lvlUP = 0;
let lvlUP_a = 0;
let lvlUP_b = 0;
let lvlUP_c = 0;
let lvlUP_d = 0;


let user = [];

let thisUser = {
 name: 'name',
 password: 'password',
 score: 0,
 LVL: 1,

}

canvas.addEventListener("mousemove", function(event){
    ship.x = event.offsetX - widthShip / 2;
    ship.y = event.offsetY - heightShip / 2;
});



let timer = 0;

DialogMenu.show();

function btnbtn() {

    kk.onclick = () => {
        ship.h = document.getElementById('ParamHeightShip').value;
        ship.w = document.getElementById('ParamWidthShip').value;
        ship.hp =  document.getElementById('ParamHPShip').value;
        ship.sheet =  document.getElementById('ParamSheetShip').value;
        ship.hpsec =  document.getElementById('ParamHPsecShip').value;
        ship.bulletK =  document.getElementById('ParamBulletKShip').value;
        ship.bulletSpeed =  document.getElementById('ParamSpeedAttackShip').value;
        
        bullet.h = document.getElementById('ParamHeightBullet').value;
        bullet.w = document.getElementById('ParamWidthBullet').value;   
        bullet.dy = document.getElementById('ParamSpeedBullet').value;
        bullet.damage = document.getElementById('ParamDamageBullet').value;
//Включить после добавления объекта Нелепых
        // posNelep.h = document.getElementById('ParamHeightNelep').value;
        // posNelep.w = document.getElementById('ParamWidthNelep').value;
        // posNelep.hp = document.getElementById('ParamHPNelep').value;
        // posNelep.damage = document.getElementById('ParamDamageNelep').value;
        // posNelep.dy = document.getElementById('ParamSpeedNelep').value;
        // posNelep.h = document.getElementById('ParamKOLNelep').value;


    }

    btnNewGame.onclick = () => {
        DialogMenu.close(), 
        DialogUserName.show()
    }
    
    btnExit.onclick = () => {window.close()}
    
    btnGoGame.onclick = () => { 
        if ( btnUserNameinput.value !== '' && btnUserPasswordinput.value !== '' ) {

            thisUser.name = btnUserNameinput.value;
            document.getElementById('UserName').innerHTML = thisUser.name;
            thisUser.password = btnUserPasswordinput.value;

            DialogUserName.close();
            DialogMenu.close();
            DialogGame.show();
            DialogPaused.show();
            DialogInGame.show();

        } else {document.getElementById('btnGoGame').innerHTML = 'Введи свое имя!'}   
    }
    
    btnBackNewGame.onclick = () => { DialogMenu.show(), DialogUserName.close() }   
    btnBackGame.onclick = () => { 
        DialogMenu.show(), 
        DialogUserName.close(), 
        DialogGame.close() 
    }
   
    btnСontinue.onclick = () => {
        DialogPaused.close(),
         pause = true 
    }  

    btnMenuСontinue.onclick = () => { 
        DialogPaused.show(), 
        DialogUserName.close(),
        DialogMenu.close(),
        DialogGame.show(), 
        pause = false
    } 

     
     btnSave.onclick = () => {
        DialogGameOver.show();


     }
}

fonimg.onload = () => {
    game();
}



function game(){
    update();
    render();
    requestAnimFrame(game);
    btnbtn();
}

function direction(event){                              //Нажатие клавиш
   

     if(event.keyCode == 32 /* Добавить проверку на нахождении в диалоге с игрой */){
       if ( pause == false ) {
        pause = true; 
         
        DialogPaused.close(); 
       } else {
        pause = false; 
        DialogPaused.show();
       }
         
     }else if(event.keyCode == 27){
        if ( ESCkeyClick == false ) {
            ESCkeyClick = true ;
            DialogChekGameSetings.show();
           
        } else { 
            ESCkeyClick = false ;
            DialogChekGameSetings.close();
        }
        
    }  //localStorage.clear();
 } 


  
    


function update() {
    if ( pause == true ){
       
timer++;

if ( timer % 1000 == 0 ) {
   lvlUP_a++;
   if ( lvlUP_a == 100 ) {
    lvlUP_a = lvlUP_a - 1;
    lvlUP_b++;
    if ( lvlUP_b == 100 ) {
        lvlUP_b = lvlUP_b - 1;
        lvlUP_c++; 
        if ( lvlUP_c == 100 ) {
            lvlUP_c = lvlUP_c - 1;
            lvlUP_d++;
            if ( lvlUP_d == 100 ) {
                lvlUP_d = lvlUP_d - 1;
                
                
               }
           }       
       }
   }
}
if ( timer % 100 == 0 ) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
    //console.log(timer,'a', lvlUP_a);
    posNelep.push( /* Добавить объект для адекватного отображения Нелепых*/{
        x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
        y: -heightNelep, 
        dx: 0, 
        dy: 1,//Math.floor(Math.random() * lvlUP_a/10 + 2), 
        del: 0,
        w: widthNelep,  //размер  нелепых
        h: heightNelep, //размер  нелепых
        hp: 0,
        damage: 0,
       });
       if ( timer % (100 - lvlUP_b) == 0 && lvlUP_b !== 0) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
       // console.log(timer, 'b',lvlUP_b);
        posNelep.push({
            x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
            y: -heightNelep, 
            dx: 0, 
            dy: Math.random() * lvlUP_b / 10 + 2, 
            del: 0,
            w: widthNelep, //размер  нелепых
            h: heightNelep, //размер  нелепых
            hp: 0,
            damage: 0,
           });
           if ( timer % (100 - lvlUP_c) == 0  && lvlUP_c !== 0) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
           // console.log(timer,'c', lvlUP_c);
            posNelep.push({
                x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
                y: -heightNelep, 
                dx: 0, 
                dy: Math.floor(Math.random() * lvlUP_c / 10 + 2), 
                del: 0,
                w: widthNelep, //размер  нелепых
                h: heightNelep, //размер  нелепых
                hp: 0,
                damage: 0,
               });
               if ( timer % (100 - lvlUP_d) == 0  && lvlUP_d !== 0) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
               // console.log(timer, 'd',lvlUP_d);
                posNelep.push({
                    x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
                    y: -heightNelep, 
                    dx: 0, 
                    dy: Math.random() * lvlUP_d / 10 + 2, 
                    del: 0,
                    w: widthNelep, //размер  нелепых
                    h: heightNelep, //размер  нелепых
                    hp: 0,
                    damage: 0,
                   });      
            }              
        }      
    }     
}

if ( timer % 10 == 0 ) {
    bullet.push({
        x: ship.x + ship.w / 2 - widthBullet / 2,
        y: ship.y - heightBullet, 
        dx: 0, 
        dy: -1, 
        w: widthBullet, //размер пули
        h: heightBullet, //размер пули
        damage: 0,
       });
}

//физика
for ( i in bullet) {
bullet[i].x = bullet[i].x + bullet[i].dx; 
bullet[i].y = bullet[i].y + bullet[i].dy; 
if ( bullet[i].y < -bullet[i].h) {bullet.splice(i, 1)};
}

for ( i in  posNelep ) {

posNelep[i].x = posNelep[i].x + posNelep[i].dx;
posNelep[i].y = posNelep[i].y + posNelep[i].dy;
//границы 
if ( posNelep[i].x + posNelep[i].w > canvas.width || posNelep[i].x < 0 )  {posNelep[i].dx = -posNelep[i].dx};
//if ( posNelep[i].x < 0 ) {posNelep[i].dx = -posNelep[i].dx};

//if ( posNelep[i].y > canvas.height) {posNelep.splice(i, 1);};
//if ( posNelep[i].y < 0 ) {posNelep[i].dy = -posNelep[i].dy};

for ( j in bullet ) {
        //console.log(`posNelep[${i}] ${posNelep[i].x} : ${posNelep[i].y}`);
        //console.log(`bullet[${j}] ${bullet[j].x} : ${bullet[j].y}`); //---Math.abs(posNelep[i].x + 25 - bullet[j].x + 10) < 25
    if ( posNelep[i].x < bullet[j].x + bullet[j].w &&
         posNelep[i].x + posNelep[i].w > bullet[j].x &&
         posNelep[i].y + posNelep[i].h -5 > bullet[j].y ) {
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

if ( posNelep[i].del == 1 || posNelep[i].y > canvas.height ) {posNelep.splice(i, 1)}


}
}
}

function render() {

    ctx.drawImage(fonimg, 0, 0, canvas.width, canvas.height);
    if ( pause ) {ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h);
    }else{/* Добавить картинку для обычного курсора или восстановить видимость дефолтного курсора */}
    

    for ( i in  bullet) {
        ctx.drawImage(bulletImg, bullet[i].x, bullet[i].y,  bullet[i].w,  bullet[i].h);
        }

    for ( i in  posNelep) {
         ctx.drawImage(arrNelep[i%4], posNelep[i].x, posNelep[i].y, posNelep[i].w, posNelep[i].h);
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