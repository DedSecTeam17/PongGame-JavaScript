var h = 500;
var w = 800;


// ball properties
var currentSpeed = 4;


var ball_x_velocity = currentSpeed;
var ball_y_velocity = currentSpeed;
mouse = {}


///
var paddle_width = 10;
var paddle_height;


var score = 0;
var $score = document.getElementById('score');


var player_a_score = 0;
var $player_a_score = document.getElementById('player_a_score');


var player_b_score = 0;
var $player_b_score = document.getElementById('player_b_score');


var winner = "";


//

function increase($amoun) {
    ball_x_velocity = $amoun;
    ball_y_velocity = $amoun;
}


run = function () {
    console.log('asd')
    Court = new CCourt({h: h, w: w}, 25);
    // document.body.appendChild(Court);
    main = document.getElementById('main');
    main.appendChild(Court);


    Net = new CNet(
        {x: w / 2, y: 0},
        {h: h, w: 3},
        20);
    Court.appendChild(Net);

    Ball = new CBall(
        {x: 2, y: 1},
        {x: this.ball_x_velocity, y: this.ball_y_velocity},
        25);
    Court.appendChild(Ball);


    // paddle
    BatL = new CBat(
        {x: 15, y: (h / 2 - 20)},
        {h: h / 3, w: paddle_width}, false);
    Court.appendChild(BatL);

    BatR = new CBat(
        {
            x: w - 20,
            y: (h / 2 - 300)
        },
        {h: h / 3, w: paddle_width}, true);

    Court.appendChild(BatR);

    Timer = new CTimer(20, update);


    document.onkeypress = batupdate;

    // ScoreL = new CScore({x: w / 4, y: 5},
    //     {w: 20, h: 40});
    // ScoreL.setValue(0);
    // Court.appendChild(ScoreL);
    // ScoreR = new CScore({x: 3 * w / 4, y: 5},
    //     {w: 20, h: 40});
    // ScoreR.setValue(0);
    // Court.appendChild(ScoreR);


    // document.body.addEventListener('mousemove',function (e) {
    //     // console.log('X axis'+e.pageX)
    //     // console.log('Y axis'+e.pageY)
    //     // //
    //     // // BatL.move(e.pageY);
    //     // //
    //
    //
    //     if (BatL.y<e.pageY)
    //     {
    //         console.log('down');
    //         BatL.move(10);
    //
    //     }else {
    //         BatL.move(-10);
    //
    //         console.log('up');
    //
    //     }
    //
    //     BatL.y=e.pageY;
    //
    //
    // })


}


CBlock = function (position, size, c, margin) {
    var DOMObj =
        document.createElement("div");
    DOMObj.style.position = "absolute";
    DOMObj.style.width = size.w + 'px';
    DOMObj.style.height = size.h + 'px';
    DOMObj.style.top = position.y + 'px';
    DOMObj.style.left = position.x + 'px';
    DOMObj.style.backgroundColor = c;
    DOMObj.style.borderRadius = 50 + 'px';
    // DOMObj.style.marginLeft = margin + "%";
    // DOMObj.style.marginRight = margin + "%";
    //  DOMObj.style.marginTop = margin/3 + "%";
    return DOMObj;
}


CCourt = function (size, margin) {
    var DOMObj =
        new CBlock({x: 10, y: 10}, size, "#24252a", margin);
    return DOMObj;
}


Sestting = function (size) {
    var DOMObj =
        new CBlock({x: 10, y: 10}, size, "#24252a", 70);
    return DOMObj;
}

CNet = function (position,
                 size, nodash) {
    DOMObj = new CBlock(position,
        size, "#24252a");
    DOMObj.p = position;
    DOMObj.s = size;
    for (i = 0; i < nodash; i++) {
        dash = new CBlock(
            {
                x: 0, y: i * 2 * DOMObj.s.h /
                    (2 * nodash)
            }, {
                h: size.h /
                    (2 * nodash), w: size.w
            }, "#ff9478");
        DOMObj.appendChild(dash);
    }
    return DOMObj;
};

CBall = function (position,
                  velocity, radius) {
    DOMObj = new CBlock(position,
        {h: radius, w: radius}, "#00b5cc");
    DOMObj.p = position;
    DOMObj.v = velocity;
    DOMObj.r = radius;


    DOMObj.move = function () {
        this.p.x += this.v.x;
        this.p.y += this.v.y;
        this.style.top = this.p.y + 'px';
        this.style.left = this.p.x + 'px';
        this.play = 0;


        if (this.p.x + this.r >
            parseInt(this.parentNode.style.width)) {
            this.play = 1;
            console.log("hit " + this.play)

        }

        if (this.p.x < 0) {
            this.play = 2;
            console.log("hit " + this.play)

        }

        if (this.p.y + this.r >
            parseInt(this.parentNode.style.height)) {

            this.v.y = -this.v.y;
            console.log("hit " + this.play)

        }

        if (this.p.y < 0) {
            this.v.y = -this.v.y;
            console.log("hit " + this.play)

        }

        return this.play;
    };
    return DOMObj;
};


CBat = function (position, size, computer) {
    DOMObj = CBlock(position,
        size, "#ff9478");
    DOMObj.p = position;
    DOMObj.s = size;
    DOMObj.move = function (d) {


        this.p.y += d;
        this.style.top = this.p.y + 'px';
    };
    DOMObj.hit = function (B) {
        if (((B.p.x + B.r) >= this.p.x) &&
            (B.p.x <= (this.p.x + this.s.w))) {

            if (B.p.y >= this.p.y &&
                B.p.y <= (this.p.y + this.s.h)) {
                B.v.x = -B.v.x;
                var snd = new Audio("sounds/sonar.mp3");
                snd.volume = 0.4;
                snd.play();


            } else {

                // var snd = new Audio("sounds/punch.wav");
                // snd.play();
            }
        }
    }
    return DOMObj;
};
CTimer = function (tick, code) {
    this.timer = window.setInterval(
        code, tick);
    this.clearTimer = function () {
        window.clearInterval(this.timer)
    };
}


batupdate = function (e) {
    var e = window.event ? event : e;

    if (e.keyCode) {
        key = e.keyCode;
    } else if (typeof (e.which)
        != 'undefined') {
        key = e.which;
    }
    switch (key) {
        case (122):
            console.log('122')
            var snd = new Audio("sounds/wall.mp3");
            snd.play();
            BatL.move(10);
            break;
        case (97):
            var snd = new Audio("sounds/wall.mp3");
            snd.play().then(() => {
            });
            BatL.move(-10);
            break;
        case (107):
            BatR.move(-10);
            var snd = new Audio("sounds/wall.mp3");
            snd.play().then(() => {
            });
            break;
        case (109):
            BatR.move(10);
            var snd = new Audio("sounds/wall.mp3");
            snd.play().then(() => {
            });
            break;
    }
}


restartGame = function () {

    console.log("Current speed " + currentSpeed);
    this.ball_x_velocity = currentSpeed;
    this.ball_y_velocity = currentSpeed;

    BatL.p = {x: 15, y: (h / 2 - 20)};
    BatL.move(0);


    Ball.p = {x: 2, y: 1};
    Ball.v = {x: ball_x_velocity, y: ball_y_velocity};
    Timer = new CTimer(20, update);
}

update = function () {


    // console.log('x',mouse.x);


    var state = Ball.move();
    if (state != 0) {
        Timer.clearTimer();


        if (state == 1) {
            // ScoreL.setValue(ScoreL.value + 1);
            //
            // console.log("score for player 1")


            if (parseInt(player_a_score) < 10) {
                player_a_score = player_a_score + 1;

                $player_a_score.innerHTML = player_a_score + "";
            }
            restartGame();


            if (parseInt(player_a_score) === 10) {
                console.log("GAMNE OVER USER A WON");

//winner_card
                document.getElementById("game_card").style.visibility = 'hidden';

                document.getElementById("winner_card").style.visibility = 'visible';
                document.getElementById("winner").innerHTML = "GAME WINNER PLAYER A";

                puse();

            }


        } else if (state == 2) {


            if (parseInt(player_b_score) < 10) {
                player_b_score = player_b_score + 1;

                $player_b_score.innerHTML = player_b_score + "";

            }


            if (parseInt(player_b_score) === 10) {
                console.log("GAMNE OVER USER B WON");

                //game_card
                document.getElementById("game_card").style.visibility = 'hidden';

                document.getElementById("winner_card").style.visibility = 'visible';

                document.getElementById("winner").innerHTML = "GAME WINNER PLAYER B";

           puse();
            }
            // ScoreR.setValue(ScoreR.value + 1);
            //
            // console.log("score for player 2")
            restartGame();
        }
        // if (ScoreL.value == 9 ||
        //     ScoreR.value == 9) {
        //     Timer.clearTimer()
        // } else {
        // restartGame();
        // }
    }


    BatL.hit(Ball);
    BatR.hit(Ball);
}

function backgroundMusic() {
    var snd = new Audio("sounds/background.mp3");
    snd.autoplay=true
    snd.volume = getVolume()!=null ? getVolume() : 0.3;

    snd.loop = true;

    document.body.addEventListener("mousemove", function () {
        snd.play().then(() => {
        });
    })

}

function setBallSpeed() {

    switch (getLevel()) {
        case  "0" :
            currentSpeed = 2;
            restartGame();
            break;
        case  "1" :
            currentSpeed = 4;
            restartGame();
            break;
        case  "2" :
            currentSpeed = 8;
            restartGame();
            break;

        default :
            currentSpeed = 2;
            restartGame();
    }


}


function playAgain() {
    player_a_score = 0;
    document.getElementById('player_a_score').innerHTML = "0";
    player_b_score = 0;
    document.getElementById('player_b_score').innerHTML = "0";
    document.getElementById("game_card").style.visibility = 'visible';
    document.getElementById("winner_card").style.visibility = 'hidden';
}

function reset() {
    ball_y_velocity += 0;
    ball_x_velocity += 0;
    score = 0;
    Ball.p = {x: 2, y: 1};
    Ball.v = {x: ball_x_velocity, y: ball_y_velocity};
    Timer = new CTimer(20, update);
}


function puse() {
    // document.getElementById('setting').style.marginLeft="70%";
    ball_y_velocity += 0;
    ball_x_velocity += 0;
    Timer.clearTimer();
}


function StartTheGame() {
    // document.getElementById('setting').style.marginLeft = "70%";
    // document.getElementById("setting").style.visibility = "hidden";
    document.getElementById("winner_card").style.visibility = 'hidden';

    run();

    setBallSpeed();
    backgroundMusic();

}


