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

var idol_image, wall_image, lock_image, statue_image;
function setup() {
    createCanvas(320, 288);
    background(0);
    idol_image = loadImage("images/idol.png");
    wall_image = loadImage("images/wall.png");
    lock_image = loadImage("images/lock.png");
    statue_image = loadImage("images/statue.png");
    player_image = loadImage("images/player.png");
}

function draw() {
    draw_movement();
    if(!world.rooms[player.tile.x+","+player.tile.y]){
        world.rooms[player.tile.x+","+player.tile.y] = new Room(player.tile.x, player.tile.y);
    }


    background("#0f380f");
    player.draw();
    world.draw_rooms();
}



