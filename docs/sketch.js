var cam = {x:0, y:0};
var world = {
    rooms : {
        },
    draw_rooms: function(){

    if(world.rooms[player.tile.x+","+player.tile.y])
        world.rooms[player.tile.x+","+player.tile.y].draw();
    if(world.rooms[(player.tile.x+1)+","+player.tile.y])
        world.rooms[(player.tile.x+1)+","+player.tile.y].draw();
    if(world.rooms[(player.tile.x-1)+","+player.tile.y])
        world.rooms[(player.tile.x-1)+","+player.tile.y].draw();
    if(world.rooms[player.tile.x+","+(player.tile.y+1)])
        world.rooms[player.tile.x+","+(player.tile.y+1)].draw();
    if(world.rooms[player.tile.x+","+(player.tile.y-1)])
        world.rooms[player.tile.x+","+(player.tile.y-1)].draw();
    },
}

var idol, wall, lock,statue;
function setup() {
    createCanvas(320, 288);
    background(0);
    idol_image = loadImage("images/idol.png");
    wall_image = loadImage("images/wall.png");
    lock_image = loadImage("images/lock.png");
    statue_image = loadImage("images/statue.png");
}

function draw() {
    draw_movement();
    if(!world.rooms[player.tile.x+","+player.tile.y]){
        world.rooms[player.tile.x+","+player.tile.y] = new Room(player.tile.x, player.tile.y);
    }


    fill(0, 200, 0);
    background(0)
    world.draw_rooms();
    player.draw();
}



