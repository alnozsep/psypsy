//同志社大学心理学部　津田裕之先生のコードを一部改変して用いました。

let isDebug;
let numTrial;
let fixationDuration;
let judgementDuration;
let explanationDuration;
let adjustingDuration;
let noticeDuration;
let backgroundColor;
let textColor;
let proba; // Variables
let currentState; // variable for controling state
let currentTrial; // current trial id
let baseTime; // variable for controling state duration
let response; // variable for storing participant's response
let RT; // variable for storing RT (reaction time)
let Tempo;
let font;
let kick;
let csize = 60;
let grow = 0;
let n = 1;
let m;
let s = 1;
function setup() {
    createCanvas(800, 600);
    frameRate(30); // Define experimental settings
    isDebug = true;
    numTrial = 5;
    m = 30
    noticeDuration = 6000;
    explanationDuration = 5000;
    adjustingDuration = 10000;
    fixationDuration = 1000; // [milliseconds]
    judgementDuration = 9000; // [milliseconds]
    backgroundColor = 255; // gray-scale value from 0 (black) to 255 (white)
    textColor = 0; // gray-scale value from 0 (black) to 255 (white)
    // initialize valuables
    currentState = 0;
    currentTrial = 0;
    baseTime = 0;
    response = new Array(numTrial);
    RT = new Array(numTrial);
    Tempo = new Array(numTrial);
    textFont(font);
    kick = loadSound('kick.wav');
}
function preload() {
    font = "Georgia";
}
function draw() {
    background(backgroundColor);
    if (currentState == 0) {
        titlePhase();
    } else if (currentState == 1) {
        explanationPhase();
    } else if (currentState == 2) {
        adjustingPhase();
    } else if (currentState == 3) {
         fixationPhase();
    } else if (currentState == 4) {
        responsePhase();
    } else if (currentState == 5) {
        evaluatePhase();
    }else if (currentState == 10) {
        noticePhase();
    } else if (currentState == 6) {
        endPhase();
    }
    if (isDebug) {
        drawDebugInfo();
    }
}
function titlePhase() {
    // draw message
    fill(textColor);
    text("エンターキーを押してください", 200, 300);
}
function explanationPhase() {
    fill(textColor);
    text("気持ち悪くなったら、直ちにブラウザを閉じてください", 100, 300);
    text("この実験は図形の動きに関する実験です", 100, 250);
    let elapsedTime = millis() - baseTime;
    if (elapsedTime > explanationDuration) {
        transitState();
    }
}

function  adjustingPhase() {
    fill(0, 0, 0);
    if (frameCount%30==0){
       kick.play();
    }
    if (frameCount%30 ==0){
        grow = 20;
        }
    noStroke();
    smooth();
    if (csize > 120) {
        csize = 120;
        grow = -20;
    }
    if (csize < 60) {
        csize = 60;
        grow =0 ;
    }
    ellipse(400, 300, csize, csize);
    csize = csize + grow;
    
    text("音量と見え方を調整してください", 100, 50);
    text("この後三回練習試行に移ります", 100, 100);
    let elapsedTime = millis() - baseTime;
    if (elapsedTime > adjustingDuration) {
        transitState();
    }
}

function noticePhase() {
    fill(textColor);
    text("練習試行は終了です", 100, 300);
    text("これから本番試行に入ります", 100, 250);
    let elapsedTime = millis() - baseTime;
    if (elapsedTime > noticeDuration) {
        transitState();
    }
}



function fixationPhase() {
    // draw fixation cross
    stroke(200); // define gray scale color (0 to 255) of lines
    strokeWeight(3);
    line(width / 2 - 10, height / 2, width / 2 + 10, height / 2); // orizontal line
    line(width / 2, height / 2 - 10, width / 2, height / 2 + 10); // vertical line
    // check elapsed time to transit state
    let elapsedTime = millis() - baseTime;
    if (elapsedTime > fixationDuration) {
        transitState();
    }
}
function responsePhase() {
    // draw message
    fill(textColor);
    text("この円の動きをどう思いますか?", 200, 100); // draw stimuli
    if (s == 1) {
        proba = int(random(21));
        if (proba < 3) {
            Tempo[currentTrial] = 1;
            m = 10;
        } else if (proba < 6){
            Tempo[currentTrial] = 2;
            m = 12;
        } else if (proba < 9){
            Tempo[currentTrial] = 3;
            m = 15;
        } else if (proba <12){
            Tempo[currentTrial] = 4;
            m =  18;
        } else if (proba <15){
            Tempo[currentTrial] = 5;
            m = 20;
        } else if (proba <18){
            Tempo[currentTrial] = 6;
            m = 30;
        } else if (proba <21){
            Tempo[currentTrial] = 7;
            kick.setVolume(0);
            m= 10;
        }
    }
    fill(0, 0, 0);
    if (n%m==0){
       kick.play();
    }
    if (n% 10 ==0){
        grow = 20;
        }
    noStroke();
    smooth();
    if (csize > 120) {
        csize = 120;
        grow = -20;
    }
    if (csize < 60) {
        csize = 60;
        grow =0 ;
    }
    ellipse(400, 300, csize, csize);
    csize = csize + grow;
    n = n + 1;
    s = 0; // check elapsed time to transit state
    let elapsedTime = millis() - baseTime;
    if (elapsedTime > judgementDuration) {
        s = 1;
        transitState();
    }
}
function evaluatePhase() {
    fill(textColor);
    text("5段階で先ほどの円を評価してください", 50, 300);
    let elapsedTime = millis() - baseTime;
}
function endPhase() {
    // draw message
    fill(textColor);
    text("実験に協力していただきありがとうございました", 50, 300);
}
function transitState() {
    if (currentState == 1) {
        currentState = 2;
        baseTime = millis();
    } else if (currentState == 2) {
        currentState = 3;
        baseTime = millis();
    } else if (currentState == 3) {
        currentState = 4;
        baseTime = millis();
    } else if (currentState == 4) {
        currentState = 5;
        baseTime = millis();
    } else if (currentTrial == 3) {
        currentState = 10;
        baseTime = millis();
    }else if (currentState == 10) {
        currentState = 3;
        baseTime = millis();
    }else {
        if (currentTrial == numTrial - 1) {
            // if all the trials have done, save data and transit to state 3.
            saveData();
            currentState = 7;
        } else {
            // move on to next trial
            currentTrial++;
            currentState = 3;
            baseTime = millis();
        }
    }
}
function keyPressed() {
    if (keyCode == ENTER || keyCode == RETURN) {
        if (currentState == 0) {
            currentState = 1;
            baseTime = millis();
        }
    } else if (key == "1") {
        if (currentState == 5) {
            // record performance
            response[currentTrial] = 1;
            RT[currentTrial] = millis() - baseTime;
            transitState();
        }
    } else if (key == "2") {
        if (currentState == 5) {
            // record performance
            response[currentTrial] = 2;
            RT[currentTrial] = millis() - baseTime;
            transitState();
        }
    } else if (key == "3") {
        if (currentState == 5) {
            // record performance
            response[currentTrial] = 3;
            RT[currentTrial] = millis() - baseTime; // transit state
            transitState();
        }
    } else if (key == "4") {
        if (currentState == 5) {
            // record performance
            response[currentTrial] = 4;
            RT[currentTrial] = millis() - baseTime;
            transitState();
        }
    } else if (key == "5") {
        if (currentState == 5) {
            // record performance
            response[currentTrial] = 5;
            RT[currentTrial] = millis() - baseTime;
            transitState();
        }
    }
}
function saveData() {
    let dataStrings = new Array(numTrial + 1);
    dataStrings[0] = "\tResponse\tRT\tTempo";
    for (let i = 0; i < numTrial; i++) {
        dataStrings[i + 1] =
            "\t" +
            nf(response[i], 1) +
            "\t" +
            nf(RT[i], 4, 4) +
            "\t" +
            nf(Tempo[i], 1) 
    }
    saveStrings(dataStrings,"data_result","csv");
}
function drawDebugInfo() {
    let elapsedTime = (millis() - baseTime) / 1000.0;
    fill(textColor); // set font color
    text("currentState: " + currentState, 20, 25);
    text("currentTrial: " + currentTrial, 20, 50);
    text("elapsedTime: " + nf(elapsedTime, 1, 2), 20, 75);
    text("Tempo: " + Tempo, 20, 100);
}
