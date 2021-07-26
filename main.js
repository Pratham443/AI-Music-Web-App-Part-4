var unstoppable = "";
var harryPotter = "";
var leftWristX = 0;
var rightWristX = 0;
var leftWristY = 0;
var rightWristY = 0;  
var leftwristscore = 0;
var unstoppablestatus = "";

function preload() {
    unstoppable = loadSound("Unstoppable.mp3");
    harryPotter = loadSound("Harry Potter.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);

    unstoppablestatus = unstoppable.isPlaying();

    fill("red");
    stroke("red");

    if(leftwristscore > 0.2) {
        circle(leftWristX, leftWristY, 20);
        harryPotter.stop();

        if(unstoppablestatus == false) {
            unstoppable.play();
        }
    }
}

function modelLoaded() {
    console.log("posenet initialized");
}

function gotPoses(results) {
    if(results.length > 0) {
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristY = results[0].pose.rightWrist.y;

        leftwristscore = results[0].pose.keypoints[9].score;
    }
}   