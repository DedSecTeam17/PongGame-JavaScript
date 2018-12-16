



var h = 500;
var w = 800;


// ball properties
var ball_x_velocity = 4;
var ball_y_velocity = 4;
mouse = {}



///
var paddle_width = 10;
var paddle_height;


var score = 0;
var  $score=document.getElementById('score');


//

function increase($amoun) {
    ball_x_velocity = $amoun;
    ball_y_velocity = $amoun;
}


run = function () {
    console.log('asd')
    Court = new CCourt({h: h, w: w});
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
        {h: h / 3, w: paddle_width});
    Court.appendChild(BatL);

    BatR = new CBat(
        {
            x: w-20,
            y: (h / 2-300)
        },
        {h: h*2, w: paddle_width});

    Court.appendChild(BatR);

    Timer = new CTimer(20, update);


    document.onkeypress = batupdate;

    ScoreL = new CScore({x: w / 4, y: 5},
        {w: 20, h: 40});
    ScoreL.setValue(0);
    Court.appendChild(ScoreL);
    ScoreR = new CScore({x: 3 * w / 4, y: 5},
        {w: 20, h: 40});
    ScoreR.setValue(0);
    Court.appendChild(ScoreR);


    document.body.addEventListener('mousemove',function (e) {
        // console.log('X axis'+e.pageX)
        // console.log('Y axis'+e.pageY)
        // //
        // // BatL.move(e.pageY);
        // //


        if (BatL.y<e.pageY)
        {
            console.log('down');
            BatL.move(10);

        }else {
            BatL.move(-10);

            console.log('up');

        }

        BatL.y=e.pageY;


    })


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
    DOMObj.style.marginLeft = margin + "%";
    return DOMObj;
}


CCourt = function (size) {
    var DOMObj =
        new CBlock({x: 10, y: 10}, size, "#24252a");
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
            }, "#cf000f");
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
            parseInt(this.parentNode.style.width))
            this.play = 1;
        if (this.p.x < 0)
            this.play = 2;
        if (this.p.y + this.r >
            parseInt(this.parentNode.style.height))
            this.v.y = -this.v.y;
        if (this.p.y < 0)
            this.v.y = -this.v.y;
        return this.play;
    };
    return DOMObj;
};


CBat = function (position, size) {
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


                score+=5*ball_x_velocity;
                $score.innerText=score;
                $score.style.color='white';
                console.log(score);


            }else {
                score-=ball_x_velocity;
                $score.innerText=score;
                $score.style.color='white';
                console.log(score);


                var snd = new Audio("sounds/punch.wav");
                snd.play();
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
            snd.play();
            BatL.move(-10);
            break;
        case (107):
            BatR.move(-10);
            break;
        case (109):
            BatR.move(10);
            break;
    }
}

CScore = function (position, size) {
    DOMObj = new CBlock(position,
        size, "#24252a");
    DOMObj.p = position;
    DOMObj.s = size;
    DOMObj.score = 0;
    DOMObj.dash = [];
    for (i = 0; i < 3; i++) {
        DOMObj.dash[i] = new CBlock(
            {x: 1, y: (i * DOMObj.s.h / 2)},
            {h: 3, w: DOMObj.s.w - 2},
            "white");
        DOMObj.appendChild(DOMObj.dash[i]);
    }
    for (i = 0; i < 2; i++) {
        DOMObj.dash[i + 3] = new CBlock(
            {x: 0, y: i * DOMObj.s.h / 2 + 4},
            {h: DOMObj.s.h / 2 - 5, w: 3},
            "white");
        DOMObj.appendChild(
            DOMObj.dash[i + 3]);
        DOMObj.dash[i + 5] = new CBlock(
            {
                x: DOMObj.s.w - 3,
                y: i * DOMObj.s.h / 2 + 4
            },
            {h: DOMObj.s.h / 2 - 5, w: 3},
            "white");
        DOMObj.appendChild(
            DOMObj.dash[i + 5]);
    }
    var On = new Array(
        [0, 2, 3, 4, 5, 6],
        [3, 4],
        [0, 5, 1, 4, 2],
        [0, 5, 1, 2, 6],
        [1, 3, 5, 6],
        [0, 1, 2, 3, 6],
        [1, 2, 3, 4, 6],
        [0, 5, 6],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 3, 5, 6]);

    DOMObj.setValue = function (value) {
        this.value = value;
        for (i = 0; i < 7; i++) {
            this.dash[i].style.backgroundColor = "#24252a";
        }
        for (i in On[value]) {
            this.dash[On[value][i]].style.backgroundColor = "white";
        }
    }
    return DOMObj;
};


restartGame = function () {
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
        } else {
            // ScoreR.setValue(ScoreR.value + 1);
        }
        if (ScoreL.value == 9 ||
            ScoreR.value == 9) {
            Timer.clearTimer()
        } else {
            restartGame();
        }
    }



    BatL.hit(Ball);
    BatR.hit(Ball);
}

var snd = new Audio("sounds/background.mp3");
snd.volume = 0.3;
snd.play();
snd.loop = true;



function setBallSpeed(){
    $fast=document.getElementById('fast').checked;
    $faster=document.getElementById('faster').checked;
    $normal=document.getElementById('normal').checked;


    if ($normal){
        console.log('normal');
        ball_y_velocity=4;
        ball_x_velocity=4;


    }
     else if ($fast)
    {
        ball_y_velocity=6;
        ball_x_velocity=6;
        console.log('fast');
    }else if ($faster){
        ball_y_velocity=8;
        ball_x_velocity=8;
        console.log('faster');

    }
}



function  puse(){
    // document.getElementById('setting').style.marginLeft="70%";



    ball_y_velocity+=0;
    ball_x_velocity+=0;
    Timer.clearTimer();
}


function StartTheGame(){
    document.getElementById('setting').style.marginLeft="70%";
    run();


}


