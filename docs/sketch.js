var cam = {x:0, y:0};
var world = {
    rooms : {
        },
    draw_rooms: function(){
        this.rooms[cam.x+","+cam.y].draw();
    },
};


function setup() {
    createCanvas(320, 288);
    background(0);
}

function draw() {
    if(!world.rooms[cam.x+","+cam.y]){
        world.rooms[cam.x+","+cam.y] = new Room(cam.x, cam.y); 
    }


    fill(0, 200, 0);
    background(0)
    world.draw_rooms();
}

mouseClicked = function(){
}

function keyPressed() {
    console.log(keyCode, cam);
    if (keyCode === 37) {
        cam.x--;
    } else if (keyCode === 39) {
        cam.x++;
    }
    if (keyCode === 38) {
        cam.y--;
    } else if (keyCode === 40) {
        cam.y++;
    }
}

