//import * as animate from './animate.js';
//import * as lol from './helper.js';

// left = 37
// up = 38
// right = 39
// down = 40




// **** I NEED TO LINE 96 *** //




var x, y, srcx, srcy, sheetWidth, sheetHeight, frameColumn, width, height;//, currentFrame;
var canWidth, canHeight;
var clownImage;
var ctx;
var frame0 = 43;
var frame1 = 76;
var frame2 = 110;
var standardImage = 42;
var sideImage = 33;
var bool, gameOver, isKey = 0;
var poopHeight = 0;
var leftOrRight = 0;
var TemporaryTimer = 0;
var i;
var j = 0;
var numberOfPoop = 8;
var poopx = 0;
var poopRandom = [];
var interval = 25;
var score = 0;


function initialise() {
    //var preload = document.createElement("CANVAS");
    //var ctx = x.getContext("2d");
    //ctx.fillStyle = #color;
    //ctx.fillRect(20,20,150,100);
    //document.getElementById("main").innerHTML = x;
    canWidth = 300;
    canHeight = 650;
    document.getElementById("main").innerHTML = '<canvas id="myCanvas" width="300" height="650" style="border:1px solid black" />';
    srcx = 0;
    srcy = 0;
    sheetWidth = 108;
    sheetHeight = 51;
    frameColumn = 3;
    width = standardImage;
    height = 51;
    
    // set x by canvas.width - sprite.width then divide by 2
    x = (canWidth - width) / 2;
    y = canHeight - height;
    //width = sheetWidth / frameColumn;
    //height = sheetHeight; // usually have frameRow but here it's 1
    //currentFrame = 0;
    startGame();
}

function startGame() {
    var c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    clownImage = new Image();
    clownImage.src = "./clownsmall.png";
    poopImage = new Image();
    poopImage.src = "./poop.png"
   // clownImage = document.getElementById("htmlClown");
    //ctx.drawImage(clownImage, 0, 0); 
    //ctx.drawImage(clownImage, 15, 0, 93, 51, 0, 0, 15, 51)
    //ctx.drawImage(clownImage, 0, 0, 0, 0, 0, 0, 10, 50);
    var k;
    for(k = 0; k < numberOfPoop; k++) {
        poopRandom[k] = (Math.random() * (canWidth - poopImage.width));
    }
    draw();
}

function draw() {
    // updateFrame();
    if(!clownImage.complete) {
        setTimeout(function() {
            draw();
        }, 50);
    }
    if(leftOrRight === 37) {
        width = sideImage;
        x -= 5;
    } else if (leftOrRight === 39) {
        width = sideImage;
        x += 5;
    } else {
        srcx = 0;
        width = standardImage;
    }
    //ctx.clearRect(0, 0, canWidth, canHeight);
    //ctx.drawImage(clownImage, srcx, srcy, width, height, x, y, width, height);
    multiplePoop(TemporaryTimer); // fix - bring the draw to the multiplePoop() function or while draw outside

    //multiplePoop = function(temporaryTimer) {
     //   alert("hi");
       // i = temporaryTimer;
        //if(i > 200) {
          //  i -= 200;
           // multiplePoop(i)
    //    }
     //   ctx.drawImage(poopImage, 0, 0);
        //poop[j] = poopImage;
        //ctx.drawImage(poop[j], 0, (poopHeight - (200 * j)));
      //  j++;
        //for(i = 0; i < numberOfPoop; i++) {
        //    poop[i] = poopImage;
        //}
        //*** TODO: RECURSIVE ANONYMOUS FUNCTION WITH FOR LOOP OF TEMPORARYTIMER / 100? AS THE LOOPING INDEX
    //}
    //ctx.drawImage(poopImage, 0, poopHeight);
    TemporaryTimer++;
    if(TemporaryTimer === 100000) {
        gameOver = 1;
    } else if((!(TemporaryTimer % 2000)) && (interval > 4)) {
        interval -= 4;
    }
    if(!gameOver) {
        setTimeout(function() {
            poopHeight += 5;
            if(poopHeight >= (canHeight - (clownImage.height + poopImage.height))) {
                detectCollision();
            }
            if(poopHeight >= canHeight) {
                poopHeight -= 200;
                poopRandom.shift();
                poopRandom.push(Math.random() * (canWidth - poopImage.width));
                // gameOver = 1; TODO: we will make gameOver = 1 only when poop hits clown
            }
            draw();
        }, interval);
    }
    //poopHeight -= 5;
}

function multiplePoop(timer) {
/*    if(timer >= 200) {
        timer -= 200;
        multiplePoop(timer)
        poop[j] = poopImage;
        var hello = poopHeight - (200 * j)
        ctx.drawImage(poop[j], 0, hello);
        j++;
    }*/
    ctx.clearRect(0, 0, canWidth, canHeight);
    if((timer % 40) === 0) {
        j = timer / 40;
    }
    score++;
    drawScore();
    //poopx = (Math.random() * (canWidth - poopImage.width)) @@@@@@@@@@@@@@@HELP@@@@@@@@@@@@@@@@
    ctx.drawImage(clownImage, srcx, srcy, width, height, x, y, width, height);
    //ctx.drawImage(poopImage, poopx, poopHeight);
    var k = 0;
    while(k <= j) {
        //poop[j] = poopImage;
        ctx.drawImage(poopImage, poopRandom[k], (poopHeight - (200 * k)));
        k++;
    }
}

function detectCollision() {
    //pseudocode:
    if(((x + width) >= poopRandom[0]) && (x <= (poopRandom[0] + poopImage.width))) {
        gameOver = 1;
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: "+score, 8, 20);
}
    //x is start of x position of clown
    //width is clown width
    //poopRandom[0] is x position of random poop
    //poopImage.width is width of poop

    //    CHECK IF COLLISION OF POOP AND CLOWN X POSITIONS
    //        IF SO THEN GAMEOVER = 1

// Since we're using draw() function to update frame, we don't need updateFrame() function anymore otherwise it doubles up

/* function updateFrame(leftOrRight) {
    if(leftOrRight === 37) {
        width = sideImage;
        x -= 5;
    } else if (leftOrRight === 39) {
        width = sideImage;
        x += 5;
    }
    // to make smooth movement (first increment delay) we use:
    // Animate() is not what you want for smooth moves.  If you use .css to move one pixel at a time, start it up when the key is pressed, and stop when the key is released. You get smoothness.
    // https://forum.jquery.com/topic/how-to-move-an-element-with-arrow-keys-consistently
    ctx.clearRect(0, 0, canWidth, canHeight);
    ctx.drawImage(clownImage, srcx, srcy, width, height, x, y, width, height);
    poopHeight +=5; 
    ctx.drawImage(poopImage, 0, poopHeight);
    if(bool) {
        setTimeout(function() {
            updateFrame(leftOrRight);
        }, 30);
    }
    // currentFrame = ++currentFrame % frameColumn;
    
    //srcx = currentFrame * width;
    // srcy = 0; // srcy is always 0
} */

document.onkeyup = function(event) {
    switch(event.keyCode) {
        case 37:
            if(srcx === frame1) {
                bool = 0;
                leftOrRight = 0;
            }
        break;
        case 39:
            if(srcx === frame0) {
                bool = 0;
                leftOrRight = 0;
            }
        break;
    }
}

document.onkeydown = function(event) {
    if(!bool) {
        switch(event.keyCode) {
            case 37:
                //alert('left key'); // call function updateFrame(left)?
                // ** WE LOOP UPDATEFRAME UNTIL ONKEYUP -> THEN BREAK
                srcx = frame1;
                bool = 1;
                leftOrRight = 37;
            break;
            case 39:
                //alert('right key'); // call function updateFrame(right)?
                srcx = frame0;
                bool = 1;
                leftOrRight = 39;
            break;
        }
    }
};