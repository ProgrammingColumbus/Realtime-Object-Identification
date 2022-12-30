//Start

status1 = "";
objects = [];
video = "";

//Preload
function preload(){
    video = createVideo("video.mp4");
}


//Setup
function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video.hide();
}


//Model Loaded
function modelLoaded(){
    console.log("CocoSSD: Model Loaded!");
    status1 = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}


//Got Result
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}


//Draw
function draw(){
    if(status1 != ""){
        objectDetector.detect(video, gotResult);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected.";
            document.getElementById("numberObjects").innerHTML = "Number of Objects Detected: " + objects.length;

            fill("#A097FF");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "% ", objects[i].x, objects[i].y);
            noFill();
            stroke("#86DA09");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}


//Start
function start(){
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects...";
}