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
let hpNelep = 0;
let damageNelep = 0;
let kolvoNelep = 0;
let speedNelep = 1;

let bullet = [];
let widthBullet = 10;
let heightBullet = 10;
let speedBullet = 0;
let damageBullet = 0;

let widthShip = 40;
let heightShip = 40;
let gun = 1;


let lvlUP = 0;
let lvlUP_a = 0;
let lvlUP_b = 0;
let lvlUP_c = 0;
let lvlUP_d = 0;

let RateOfFire = 1;         // Скорострельность
let SpeedBull = -1;          // Скорость пуль
let Damage = 1;             // Урон
let Ricochet = 0;           // Рикошет
let Reloading = 30;         // Время перезарядки
let NumberOfBullets = 10;   // Количество патронов
let GUN = 1;                // Двойная пушка
let Drone = 0;              // Дроны
let HP = 1;                 // Жизни
let hpRegeneration = 0;     // Регенерация ХП
let shieldRegeneration = 0; // Щит
let shield = 0;             // Регенерация щита
let DroneDamage = 0;        // Дроны урон
let DroneReloading = 30;    // Дроны перезарядка
let DroneNumberOfBullets = 10;  // Дроны кол-во патронов
let DroneGUN = 0;           // Дроны двойная пушка

let RateOfFireBuy = 1;// Скорострельность
let SpeedBullBuy = 1;// Скорость пуль
let DamageBuy = 1;// Урон
let RicochetBuy = 1;// Рикошет
let ReloadingBuy = 1;// Время перезарядки
let NumberOfBulletsBuy = 1;// Количество патронов
let GUNBuy = 1;// Двойная пушка
let DroneBuy = 1;// Дроны
let HPBuy = 1;// Жизни
let hpRegenerationBuy = 1;// Регенерация ХП
let shieldRegenerationBuy = 1;// Щит
let shieldBuy = 1;// Регенерация щита
let DroneDamageBuy = 1;// Дроны урон
let DroneReloadingBuy = 1;// Дроны перезарядка
let DroneNumberOfBulletsBuy = 1;// Дроны кол-во патроно
let DroneGUNBuy = 1;// Дроны двойная пушка

let ship = {
  x:canvas.width / 2 - widthShip / 2,
  y:canvas.height - heightShip - 20,
  animX:0,
  animY:0,
  w: widthShip, //ширина корабля
  h: heightShip, //высота корабля
  hp: HP,
  shield: 0,
  hpsec: hpRegeneration,
  bulletK: NumberOfBullets,
  bulletSpeed: RateOfFire,
};


let user = [];

let thisUser = {
 name: 'name',
 password: 'password',
 score: 0,
 LVL: 1,
 money: 0,

}

canvas.addEventListener("mousemove", function(event){
  ship.x = event.offsetX - widthShip / 2;
  ship.y = event.offsetY - heightShip / 2;
});



let timer = 0;

DialogMenu.show();


function newGame(){

  thisUser.score = 0;
  document.getElementById('UserScore').innerHTML = `Score: ${thisUser.score}`;
  bullet.length = 0;
  posNelep.length = 0;
  timer = 0;
       

}
hpNelep = 1;
function straf(){

  thisUser.money = Math.floor(thisUser.money /100 * 90); //Изменить на переменную

  document.getElementById('UserMoney').innerHTML = `Деньги: ${thisUser.money}`;

  bullet.length = 0;
  posNelep.length = 0;
  timer = 0;
  lvlUP_a = 0;
  lvlUP_b = 0;
  lvlUP_c = 0;
  lvlUP_d = 0;
}

function btnBUY(){
  btnRateOfFire.onclick = () => { //+
    RateOfFire++;
    
    thisUser.money = thisUser.money - RateOfFireBuy;
    RateOfFireBuy = RateOfFireBuy + 1;
}

btnSpeedBull.onclick = () => { //+
  SpeedBull--;
  
  thisUser.money = thisUser.money - SpeedBullBuy;
  SpeedBullBuy = SpeedBullBuy + 1;
}

btnDamage.onclick = () => { //+
  Damage++;
  
  thisUser.money = thisUser.money - DamageBuy;
  DamageBuy = DamageBuy + 1;
}

btnRicochet.onclick = () => { //Добавить сколько будет жить пуля(столкновения)
  Ricochet++;                 //Добавить потерю урона при столкновении
  
  thisUser.money = thisUser.money - RicochetBuy;
  RicochetBuy = RicochetBuy + 10;
}

btnReloading.onclick = () => {
  Reloading++;
  
  thisUser.money = thisUser.money - ReloadingBuy;
  ReloadingBuy = ReloadingBuy + 10;
}

btnNumberOfBullets.onclick = () => {
  NumberOfBullets++;
  
  thisUser.money = thisUser.money - NumberOfBullets;
  NumberOfBullets = NumberOfBullets + 10;
}

btnGUN.onclick = () => { //+
  GUN++;
  
  thisUser.money = thisUser.money - GUNBuy;
  GUNBuy = GUNBuy + 10;
}

btnDrone.onclick = () => {
  Drone++;
  
  thisUser.money = thisUser.money - DroneBuy;
  DroneBuy = DroneBuy + 10;
}

btnHP.onclick = () => {
  HP++;
  
  thisUser.money = thisUser.money - HPBuy;
  HPBuy = HPBuy + 10;
}

btnhpRegeneration.onclick = () => {
  hpRegeneration++;
  
  thisUser.money = thisUser.money - hpRegenerationBuy;
  hpRegenerationBuy = hpRegenerationBuy + 10;
}

btnshieldRegeneration.onclick = () => {
  shieldRegeneration++;
  
  thisUser.money = thisUser.money - shieldRegenerationBuy;
  shieldRegenerationBuy = shieldRegenerationBuy + 10;
}

btnshield.onclick = () => {
  shield++;
  
  thisUser.money = thisUser.money - shieldBuy;
  shieldBuy = shieldBuy + 10;
}

btnDroneDamage.onclick = () => {
  DroneDamage++;
  
  thisUser.money = thisUser.money - DroneDamageBuy;
  DroneDamageBuy = DroneDamageBuy + 10;
}

btnDroneReloading.onclick = () => {
  DroneReloading++;
  
  thisUser.money = thisUser.money - DroneReloadingBuy;
  DroneReloadingBuy = DroneReloadingBuy + 10;
}

btnDroneNumberOfBullets.onclick = () => {
  DroneNumberOfBullets++;
  
  thisUser.money = thisUser.money - DroneNumberOfBulletsBuy;
  DroneNumberOfBulletsBuy = DroneNumberOfBulletsBuy + 10;
}

btnDroneGUN.onclick = () => {
  DroneGUN++;
  
  thisUser.money = thisUser.money - DroneGUNBuy;
  DroneGUNBuy = DroneGUNBuy + 10;
}



}
function activParam() {
  
  document.getElementById('btnRateOfFire').innerHTML = `Скорострельность <br> Ур. ${RateOfFire} Стоим. (${RateOfFireBuy})`;
  
  if (thisUser.money < RateOfFireBuy){
    document.getElementById('btnRateOfFire').setAttribute('disabled', true);
   } else {
    document.getElementById('btnRateOfFire').removeAttribute('disabled') 
  }
  
  document.getElementById('btnSpeedBull').innerHTML = `Скорость пуль <br> Ур. ${SpeedBull} Стоим. (${SpeedBullBuy})`;
  if (thisUser.money < SpeedBullBuy){
    document.getElementById('btnSpeedBull').setAttribute('disabled', true);
   } else {
    document.getElementById('btnSpeedBull').removeAttribute('disabled') 
  }
  

  document.getElementById('btnDamage').innerHTML = `Урон <br> Ур. ${Damage} Стоим. (${DamageBuy})`;
  

  if (thisUser.money < DamageBuy){
    document.getElementById('btnDamage').setAttribute('disabled', true);;
   } else {
    document.getElementById('btnDamage').removeAttribute('disabled') 
  }

  document.getElementById('btnRicochet').innerHTML = `Рикошет  <br> Ур. ${Ricochet} Стоим. (${RicochetBuy})`;
  

  if (thisUser.money < RicochetBuy){
    document.getElementById('btnRicochet').setAttribute('disabled', true);
   } else {
    document.getElementById('btnRicochet').removeAttribute('disabled') 
  }

  document.getElementById('btnReloading').innerHTML = `Время перезарядки <br> Ур. ${Reloading} Стоим. (${ReloadingBuy})`;
  
  if (thisUser.money < ReloadingBuy){
    document.getElementById('btnReloading').setAttribute('disabled', true);
   } else {
    document.getElementById('btnReloading').removeAttribute('disabled') 
  }

  document.getElementById('btnNumberOfBullets').innerHTML = `Количество патронов <br> Кол-во: ${NumberOfBullets} Стоим. (${NumberOfBulletsBuy})`;
 
  if (thisUser.money < NumberOfBulletsBuy){
    document.getElementById('btnNumberOfBullets').setAttribute('disabled', true);
   } else {
    document.getElementById('btnNumberOfBullets').removeAttribute('disabled') 
  }

  document.getElementById('btnGUN').innerHTML = `Двойная пушка <br> Ур. ${GUN} Стоим. (${GUNBuy})`;
  
  if (thisUser.money < GUNBuy || GUN > 2){
    document.getElementById('btnGUN').setAttribute('disabled', true);
   } else {
    document.getElementById('btnGUN').removeAttribute('disabled') 
  }

  document.getElementById('btnDrone').innerHTML = `Дроны <br> Ур. ${Drone} Стоим. (${DroneBuy})`;
 

  if (thisUser.money < DroneBuy ){
    document.getElementById('btnDrone').setAttribute('disabled', true);
   } else {
    document.getElementById('btnDrone').removeAttribute('disabled') 
  }

  document.getElementById('btnHP').innerHTML = `Жизни <br> Ур. ${HP} Стоим. (${HPBuy})`;
  

  if (thisUser.money < HPBuy){
    document.getElementById('btnHP').setAttribute('disabled', true);
   } else {
    document.getElementById('btnHP').removeAttribute('disabled') 
  }

  document.getElementById('btnhpRegeneration').innerHTML = `Регенерация ХП <br> Ур. ${hpRegeneration} Стоим. (${hpRegenerationBuy})`;
  

  if (thisUser.money < hpRegenerationBuy){
    document.getElementById('btnhpRegeneration').setAttribute('disabled', true);
   } else {
    document.getElementById('btnhpRegeneration').removeAttribute('disabled') 
  }

  document.getElementById('btnshieldRegeneration').innerHTML = `Щит <br> Ур. ${shieldRegeneration} Стоим. (${shieldRegenerationBuy})`;
  

  if (thisUser.money < shieldRegenerationBuy){
    document.getElementById('btnshieldRegeneration').setAttribute('disabled', true);
   } else {
    document.getElementById('btnshieldRegeneration').removeAttribute('disabled') 
  }

  document.getElementById('btnshield').innerHTML = `Регенерация щита <br> Ур. ${shield} Стоим. (${shieldBuy})`;
  

  if (thisUser.money < shieldBuy){
    document.getElementById('btnshield').setAttribute('disabled', true);
   } else {
    document.getElementById('btnshield').removeAttribute('disabled') 
  }

  document.getElementById('btnDroneDamage').innerHTML = `Дроны урон <br> Ур. ${DroneDamage} Стоим. (${DroneDamageBuy})`;
  

  if (thisUser.money < DroneDamageBuy){
    document.getElementById('btnDroneDamage').setAttribute('disabled', true);
   } else {
    document.getElementById('btnDroneDamage').removeAttribute('disabled') 
  }

  document.getElementById('btnDroneReloading').innerHTML = `Дроны перезарядка <br> Ур. ${DroneReloading} Стоим. (${DroneReloadingBuy})`;
  

  if (thisUser.money < DroneReloadingBuy){
    document.getElementById('btnDroneReloading').setAttribute('disabled', true);
   } else {
    document.getElementById('btnDroneReloading').removeAttribute('disabled') 
  }

  document.getElementById('btnDroneNumberOfBullets').innerHTML = `Дроны кол-во патронов<br> Ур. ${DroneNumberOfBullets} Стоим. (${DroneNumberOfBulletsBuy})`;
  

  if (thisUser.money < DroneNumberOfBulletsBuy){
    document.getElementById('btnDroneNumberOfBullets').setAttribute('disabled', true);
   } else {
    document.getElementById('btnDroneNumberOfBullets').removeAttribute('disabled') 
  }

  document.getElementById('btnDroneGUN').innerHTML = `Дроны двойная пушка<br> Ур. ${DroneGUN} Стоим. (${DroneGUNBuy})`;
  

  if (thisUser.money < DroneGUNBuy){
    document.getElementById('btnDroneGUN').setAttribute('disabled', true);
   } else {
    document.getElementById('btnDroneGUN').removeAttribute('disabled') 
  }







document.getElementById('ParamWidthShip').value = ship.w;
document.getElementById('ParamHPShip').value = ship.hp;
document.getElementById('ParamSheetShip').value = ship.sheet;
document.getElementById('ParamHPsecShip').value = ship.hpsec;
document.getElementById('ParamBulletKShip').value = ship.bulletK;
document.getElementById('ParamSpeedAttackShip').value = ship.bulletSpeed;
document.getElementById('ParamHeightBullet').value = heightBullet;
document.getElementById('ParamWidthBullet').value = widthBullet;   
document.getElementById('ParamSpeedBullet').value = speedBullet;
document.getElementById('ParamDamageBullet').value = damageBullet;
document.getElementById('ParamHeightNelep').value = heightNelep;
document.getElementById('ParamWidthNelep').value = widthNelep;
document.getElementById('ParamHPNelep').value = hpNelep;
document.getElementById('ParamDamageNelep').value = damageNelep;
document.getElementById('ParamSpeedNelep').value = speedNelep;
document.getElementById('ParamKOLNelep').value = kolvoNelep;
}

function btnbtn() {

  kk.onclick = () => {

    ship.h  =           document.getElementById('ParamHeightShip').value;
    ship.w =            document.getElementById('ParamWidthShip').value;
    ship.hp =           document.getElementById('ParamHPShip').value;
    ship.shield =        document.getElementById('ParamSheetShip').value;
    ship.hpsec =        document.getElementById('ParamHPsecShip').value;
    ship.bulletK =      document.getElementById('ParamBulletKShip').value;
    ship.bulletSpeed =  document.getElementById('ParamSpeedAttackShip').value;
    
    bullet.h =          document.getElementById('ParamHeightBullet').value;
    bullet.w =          document.getElementById('ParamWidthBullet').value;   
    bullet.dy =         document.getElementById('ParamSpeedBullet').value;
    bullet.damage =     document.getElementById('ParamDamageBullet').value;

    heightNelep =       document.getElementById('ParamHeightNelep').value;
    widthNelep =        document.getElementById('ParamWidthNelep').value;
    hpNelep =           document.getElementById('ParamHPNelep').value;
    damageNelep =       document.getElementById('ParamDamageNelep').value;
    speedNelep =        document.getElementById('ParamSpeedNelep').value;
    kolvoNelep =        document.getElementById('ParamKOLNelep').value;


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

  btnGameOverСontinue.onclick = () => {
    DialogGameOver.close();
    straf()

  }

  btnGameOverNewGame.onclick = () => {
    DialogGameOver.close();
    newGame();
  }


}

fonimg.onload = () => {game()}

function game(){
  update();
  render();
  requestAnimFrame(game);
  btnbtn();
  activParam();
  btnBUY();
  document.getElementById('UserScore').innerHTML = `Очки: ${thisUser.score}`;
  document.getElementById('UserLVL').innerHTML = `Уровень: ${thisUser.LVL}`;
  document.getElementById('UserMoney').innerHTML = `Деньги: ${thisUser.money}`;
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
      activParam()    
    } else { 
      ESCkeyClick = false ;
      DialogChekGameSetings.close();
    }    
    }  //localStorage.clear();
} 

function update() {
  if ( pause == true ){
       
    timer++;
    if (timer % 5000 == 0){thisUser.LVL++}
    if ( timer % 200 == 0 ) {
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

// Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые
// Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые
// Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые
// Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые

  if ( timer % (100 - lvlUP_a) == 0 ) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
    //console.log(timer,'a', lvlUP_a);
    posNelep.push({
      x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
      y: -heightNelep, 
      dx: 0, 
      dy: speedNelep,//Math.floor(Math.random() * lvlUP_a/10 + 2), 
      del: 0,
      w: widthNelep,  //размер  нелепых
      h: heightNelep, //размер  нелепых
      hp: hpNelep,
      damage: damageNelep,
      kolvo: kolvoNelep,
      });
        if ( timer % (100 - lvlUP_b) == 0 && lvlUP_b !== 0) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
          // console.log(timer, 'b',lvlUP_b);
          posNelep.push({
            x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
            y: -heightNelep, 
            dx: 0, 
            dy: speedNelep, //Math.random() * lvlUP_b / 10 + 2, 
            del: 0,
            w: widthNelep, //размер  нелепых
            h: heightNelep, //размер  нелепых
            hp: hpNelep,
            damage: damageNelep,
            kolvo: kolvoNelep,
            });
            if ( timer % (100 - lvlUP_c) == 0  && lvlUP_c !== 0) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
            // console.log(timer,'c', lvlUP_c);
              posNelep.push({
                x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
                y: -heightNelep, 
                dx: 0, 
                dy: speedNelep, //Math.floor(Math.random() * lvlUP_c / 10 + 2), 
                del: 0,
                w: widthNelep, //размер  нелепых
                h: heightNelep, //размер  нелепых
                hp: hpNelep,
                damage: damageNelep,
                kolvo: kolvoNelep,
                });
              if ( timer % (100 - lvlUP_d) == 0  && lvlUP_d !== 0) { //if ( timer === 1/2 * Math.pow(lvlUP, 2)) {
                // console.log(timer, 'd',lvlUP_d);
                posNelep.push({
                    x: Math.floor(Math.random() * (canvas.width - widthNelep))  ,
                    y: -heightNelep, 
                    dx: 0, 
                    dy: speedNelep, // Math.random() * lvlUP_d / 10 + 2, 
                    del: 0,
                    w: widthNelep, //размер  нелепых
                    h: heightNelep, //размер  нелепых
                    hp: hpNelep,
                    damage: damageNelep,
                    kolvo: kolvoNelep,
                    });      
            }              
        }      
    }     
  }
  // Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые
  // Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые
  // Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые
// Нелепые  Нелепые Нелепые Нелепые Нелепые Нелепые



  // Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули
  // Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули
  // Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули
  if ( timer % (100 - RateOfFire )  == 0 ) {
    if ( GUN == 1 || GUN == 3){ 
    bullet.push({
      x: ship.x + ship.w / 2 - widthBullet / 2,
      y: ship.y - heightBullet, 
      dx: 0, 
      dy: SpeedBull, 
      w: widthBullet, //размер пули
      h: heightBullet, //размер пули
      damage: Damage,
      });
    }
    if ( GUN == 2 || GUN == 3){ 

      bullet.push({
        x: ship.x + ship.w / 2 - widthBullet / 2,
        y: ship.y - heightBullet, 
        dx: 0.1, 
        dy: SpeedBull, 
        w: widthBullet, //размер пули
        h: heightBullet, //размер пули
        damage: Damage,
        });

        bullet.push({
          x: ship.x + ship.w / 2 - widthBullet / 2,
          y: ship.y - heightBullet, 
          dx: -0.1, 
          dy: SpeedBull, 
          w: widthBullet, //размер пули
          h: heightBullet, //размер пули
          damage: Damage,
          });
        }
  }
  // Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули
  // Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули
  // Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули  Пули


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
         posNelep[i].y + posNelep[i].h -5 > bullet[j].y &&
         posNelep[i].y < bullet[j].y + bullet[j].h ) { 
        // console.log(`posNelep[i] ${posNelep[i].x} : ${posNelep[i].y}`);
        // console.log(`bullet[j] ${bullet[j].x} : ${bullet[j].y}`);
        

        //thisUser.score++;
       // console.log(thisUser.score);
        
        posNelep[i].del = posNelep[i].del + 1;
        bullet.splice(j, 1); 
        break;       
    }

    
}

if ( posNelep[i].x < ship.x + ship.w &&
  posNelep[i].x + posNelep[i].w > ship.x &&
  posNelep[i].y + posNelep[i].h > ship.y &&
  posNelep[i].y < ship.y + ship.h ) { 
    pause = false;
    DialogPaused.show();
    DialogGameOver.show();
  }

if ( posNelep[i].del == posNelep[i].hp  ) {
  
  if ( posNelep[i].y + posNelep[i].h > canvas.height ) {
    pause = false;
    DialogPaused.show();
    DialogGameOver.show();
  }
  
  thisUser.score++;
  thisUser.money = thisUser.money + 1;

  
  
  
  posNelep.splice(i, 1);
}


}
}
}

function render() {

    ctx.drawImage(fonimg, 0, 0, canvas.width, canvas.height);
    if ( pause ) {ctx.drawImage(shipImg, ship.x, ship.y, ship.w, ship.h);
    }else{/* Добавить картинку для обычного курсора или восстановить видимость дефолтного курсора */}
    

    for ( i in bullet) {
        ctx.drawImage(bulletImg, bullet[i].x, bullet[i].y,  bullet[i].w,  bullet[i].h);
        }

    for ( i in posNelep) {
         ctx.drawImage(arrNelep[i%4], posNelep[i].x, posNelep[i].y, posNelep[i].w, posNelep[i].h);
         ctx.beginPath();
         ctx.fillStyle = "red";
         ctx.fillRect(posNelep[i].x, posNelep[i].y + posNelep[i].h, posNelep[i].w, 5);
         ctx.closePath();
         ctx.beginPath();
         ctx.fillStyle = "green";
         ctx.fillRect(posNelep[i].x, posNelep[i].y + posNelep[i].h, posNelep[i].w - posNelep[i].del * posNelep[i].w / hpNelep , 5);
         ctx.closePath();
         

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