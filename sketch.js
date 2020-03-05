var drawing = [];
var currentPath = [];
var savebutton;
var isDrawing = false;
var old_drawing = [];
function setup() {
    database = firebase.database();
    dh = displayHeight / 3;
    dw = displayWidth / 30;


    canvas = createCanvas(displayWidth - dw,displayHeight - dh);
    canvas.mousePressed(startPath);
    canvas.mouseReleased(endPath);
    canvas.parent('canvasContainer');

    bg = prompt("Enter bg colour");
    clr = prompt("Enter pen colour");
    console.log(bg+clr);
    if (bg === 0) {
        bg = "black";
    }
    if (clr === 0) {
        clr = "white";
    }
    var drawing_done = database.ref('drawings/drawing')
    drawing_done.once("value",drawn,showError);
   
}

function draw(){
    background(bg);
    if(isDrawing === true){
        var point = {
            x : mouseX,
            y : mouseY 
        }
        currentPath.push(point);
    }

    stroke(clr);
    noFill();

    for (var i = 0; i < drawing.length;i++) {
        var path = drawing[i];
        beginShape();
        for (var a = 0; a < path.length;a++) {
            vertex(path[a].x,path[a].y);
        }
        endShape();
    }
    for (var i = 0; i < old_drawing.length;i++) {
        var path1 = old_drawing[i];
        beginShape();
        for (var a = 0; a < path1.length;a++) {
            vertex(path1[a].x,path1[a].y);
        }
        endShape();
    }

}

function startPath() {
    isDrawing = true;
    currentPath = [];
    drawing.push(currentPath);
}


function endPath() {
    var ref = database.ref('drawings').set({
        name : "TD",
        drawing : drawing
    });
    isDrawing = false;
}

function showError(){
    console.log("Error");
    
}

function drawn(data) {
    old_drawing  = data.val();
    console.log(old_drawing);
}
