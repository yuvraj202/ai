song1 = "";
song2 = "";

rightWristX = "";
rightWristY = "";

leftWristX = "";
leftWristY = "";

scoreleftWrist = 0;
scorerightWrist = 0;


function setup()
{
   canvas = createCanvas(400,400);
   canvas.center();

   video = createCapture(VIDEO);
   video.hide();

   poseNet = ml5.poseNet(video,modelLoaded);
   poseNet.on('pose',gotPoses);
}

function modelLoaded()
{
    console.log("model is loaded");
}

function gotPoses()
{
    if(results.lenght > 0)
    {
        console.log(results);

        scoreleftWrist =results[0].pose.keypoints[9].score;
        scorerightWrist =results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = ",scoreleftWrist)
        console.log("scorerigthWrist = ",scorerightWrist)
        
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX - " + leftWristX + "leftWristY -" + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX - " + rightWristX + "rightWristY -" + rightWristY);
    }
}

function draw()
{
    image(video , 0 , 0 , 400 , 400 );
    yuvraj="";

    if(scoreleftWrist>0.2)
    {
    circle(leftWristX,leftWristY,20);
    song1.play();
    }
    else
    {
     stop(song1);
    }

    if(scorerightWrist>0.2)
    {
    circle(rightWristX,rightWristY,20);
    song2.play();
    }else
    {
     stop(song2);
    }


}

function preload()
{
  song1=loadSound("music2.mp3");
  song2=loadSound("music.mp3");
}
