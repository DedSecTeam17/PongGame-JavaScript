var height = 500;
var width = 800;
var currentSpeed = 4;
var  lastCurrentSpeed=4;
var ball_x_velocity = currentSpeed;
var ball_y_velocity = currentSpeed;


var last_ball_x_velocity = currentSpeed;
var last_ball_y_velocity = currentSpeed;
mouse = {}
var paddle_width = 10;
var paddle_height = 10;
var score = 0;
main = document.getElementById('main');

var $score = document.getElementById('score');
let $bestScore = document.getElementById('best_score');


//best_score


function fast() {
    currentSpeed=4;


    this.ball_x_velocity = currentSpeed;
    this.ball_y_velocity = currentSpeed;

    gameBall.velocity = {x: ball_x_velocity, y: ball_y_velocity};

    Timer.clearTimer();
    // restartGame();

}
function normal() {
    currentSpeed=2;


    this.ball_x_velocity = currentSpeed;
    this.ball_y_velocity = currentSpeed;

    gameBall.velocity = {x: ball_x_velocity, y: ball_y_velocity};

    Timer.clearTimer();    // restartGame();


}
function faster() {
    currentSpeed=8;


    this.ball_x_velocity = currentSpeed;
    this.ball_y_velocity = currentSpeed;

    gameBall.velocity = {x: ball_x_velocity, y: ball_y_velocity};

    Timer.clearTimer();    // restartGame();

}







function gameInit() {

    playGround = new PlayGround({height: height, width: width}, 25);
    // document.body.appendChild(playGround);
    main.appendChild(playGround);


    separator = new Separator(
        {x: width / 2, y: 0},
        {height: height, width: 3},
        20);


    playGround.appendChild(separator);

    gameBall = new GameBall(
        {x: 2, y: 1},
        {x: this.ball_x_velocity, y: this.ball_y_velocity},
        25);
    playGround.appendChild(gameBall);


    // paddle
    leftPaddle = new Paddle(
        {x: 15, y: (height / 2 - 20)},
        {height: height / 3, width: paddle_width}, false);
    playGround.appendChild(leftPaddle);

    rightPaddle = new Paddle(
        {
            x: width - 20,
            y: (height / 2 - 300)
        },
        {height: height / 3, width: paddle_width}, true);

    playGround.appendChild(rightPaddle);

    timer = new GameFpsSystem(20, uiUpdate);


    document.onkeypress = paddleUiUpdate;



    // document.body.addEventListener('mousemove',function (e) {
    //     // console.log('X axis'+e.pageX)
    //     // console.log('Y axis'+e.pageY)
    //     // //
    //     // // leftPaddle.move(e.pageY);
    //     // //
    //
    //
    //     if (leftPaddle.y<e.pageY)
    //     {
    //         console.log('down');
    //         leftPaddle.move(10);
    //
    //     }else {
    //         leftPaddle.move(-10);
    //
    //         console.log('up');
    //
    //     }
    //
    //     leftPaddle.y=e.pageY;
    //
    //
    // })


}


function CreateObject(position, size, c, margin) {
    var object =
        document.createElement("div");
    object.style.position = "absolute";
    object.style.width = size.width + 'px';
    object.style.height = size.height + 'px';
    object.style.top = position.y + 'px';
    object.style.left = position.x + 'px';
    object.style.backgroundColor = c;
    object.style.borderRadius = 50 + 'px';
    return object;
}


function PlayGround(size, margin) {
    return new CreateObject({x: 10, y: 10}, size, "#24252a", margin);
}

function Separator(position,
                   size, nodash) {
    var object = new CreateObject(position,
        size, "#24252a");

    object.s = size;
    for (i = 0; i < nodash; i++) {
        dash = new CreateObject(
            {
                x: 0, y: i  * object.s.height /
                    (nodash)
            }, {
                height: 15, width: size.width
            }, "#ff9478");
        object.appendChild(dash);
    }
    return object;
};

function GameBall(position,
                  velocity, radius) {
    var object = new CreateObject(position,
        {height: radius, width: radius}, "#00b5cc");
    object.position = position;
    object.velocity = velocity;
    object.radius = radius;


    object.move = function () {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.style.top = this.position.y + 'px';
        this.style.left = this.position.x + 'px';
        this.play = 0;


        // console.log("gameBall x" + this.position.x);


        let newP = this.position;
        // console.log("gameBall y" + newP.y);
        rightPaddle.move(newP.y);


        if (this.position.x + this.radius >
            parseInt(this.parentNode.style.width)) {
            this.play = 1;
            console.log("hit r wall" + this.play)

        }

        if (this.position.x < 0) {
            this.play = 2;
            console.log("hit left " + this.play)

        }






        // upper zero
        if (this.position.y + this.radius >
            parseInt(this.parentNode.style.height)) {

            this.velocity.y = -this.velocity.y;
            console.log("hit y on the bottom " + this.play)

        }


        //under zero
        if (this.position.y < 0) {
            this.velocity.y = -this.velocity.y;
            console.log("hit y on the top " + this.play)

        }

        return this.play;
    };
    return object;
};


function Paddle(position, size, computer) {
    object = CreateObject(position,
        size, "#ff9478");
    object.position = position;
    object.s = size;
    object.move = function (d) {


        if (computer) {
            this.position.y = d;
        } else {
            this.position.y += d;
        }
        this.style.top = this.position.y + 'px';
    };
    object.hit = function (gameBall) {
        if (((gameBall.position.x + gameBall.radius) >= this.position.x) &&
            (gameBall.position.x <= (this.position.x + this.s.width))) {





            if (gameBall.position.y >= this.position.y &&
                gameBall.position.y <= (this.position.y + this.s.height)) {
                gameBall.velocity.x = -gameBall.velocity.x;
                var snd = new Audio("sounds/sonar.mp3");
                snd.volume = 0.4;
                snd.play();


                score += 5 * ball_x_velocity;

                if (getHeightScore() != null) {
                    if (score > getHeightScore()) {
                        setHeightScore(score);
                        $bestScore.innerHTML = score;

                    }
                } else {
                    setHeightScore(score);

                    $bestScore.innerHTML = score;
                }


                $score.innerText = score;
                $score.style.color = 'white';
                console.log(score);


            } else {
                score -= ball_x_velocity;
                $score.innerText = score;
                $score.style.color = 'white';
                console.log(score);
            }
        }
    }
    return object;
};


function GameFpsSystem(tick, code) {
    this.timer = window.setInterval(
        code, tick);
    this.clearTimer = function () {
        window.clearInterval(this.timer)
    };
}


function paddleUiUpdate(e) {
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
            leftPaddle.move(15);
            break;
        case (97):
            var snd = new Audio("sounds/wall.mp3");
            snd.play().then(() => {
            });
            leftPaddle.move(-15);
            break;
        case (107):
            rightPaddle.move(-15);
            var snd = new Audio("sounds/wall.mp3");
            snd.play().then(() => {
            });
            break;
        case (109):
            rightPaddle.move(15);
            var snd = new Audio("sounds/wall.mp3");
            snd.play().then(() => {
            });
            break;
    }
}


function stop(){


    this.ball_x_velocity = 0;
    this.ball_y_velocity = 0;
    gameBall.velocity = {x: ball_x_velocity, y: ball_y_velocity};

    timer.clearTimer();

}
function resume(){


    this.ball_x_velocity = last_ball_x_velocity;
    this.ball_y_velocity = last_ball_y_velocity;

    gameBall.velocity = {x: ball_x_velocity, y: ball_y_velocity};

    Timer.clearTimer();

}

restartGame = function () {

    this.ball_x_velocity = currentSpeed;
    this.ball_y_velocity = currentSpeed;

    leftPaddle.position = {x: 15, y: (height / 2 - 20)};

    leftPaddle.move(0);


    gameBall.position = {x: 2, y: 1};
    gameBall.velocity = {x: ball_x_velocity, y: ball_y_velocity};
    timer = new GameFpsSystem(20, uiUpdate);
}

function uiUpdate() {
    var state = gameBall.move();
    if (state != 0) {
        timer.clearTimer();


        if (state == 1) {
            restartGame();
        } else if (state == 2) {
            restartGame();
        }
    }
    leftPaddle.hit(gameBall);
    rightPaddle.hit(gameBall);
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

function StartTheGame() {
    gameInit();
    backgroundMusic();
    setBallSpeed();
    let bestScore = getHeightScore() !== undefined ? getHeightScore() : 0;
    if (bestScore > 0) {
        document.getElementById('best_score').innerHTML = bestScore;
    }
}


