Player = function(){
    this.x = 32;
    this.y = 96;
    this.keys = 100;

    this.tile = {x:0, y:0};
}
Player.prototype.draw = function(){
    image(player_image, this.x, this.y, 32, 32);
    document.getElementById("keys").innerHTML = this.keys;
}


var player = new Player();


function keyPressed() {
    
    var future = {x:player.x, y:player.y};
    var obstacles = world.rooms[player.tile.x+","+player.tile.y].walls;

    if(cam.x == Math.floor(cam.x) && cam.y == Math.floor(cam.y)){
        if (keyCode === 37) {
            future.x-=16;
        } else if (keyCode === 39) {
            future.x+=16;
        }
        if (keyCode === 38) {
            future.y-=16;
        } else if (keyCode === 40) {
            future.y+=16;
        }
    }
    player_collision_points = [
        {x:future.x+4, y:future.y+4},
        {x:future.x+28, y:future.y+4},
        {x:future.x+4, y:future.y+28},
        {x:future.x+28, y:future.y+28}
    ]
    var move = true;
    player_collision_points.forEach(function(point){
        obstacles.forEach(function(wall){
            if (
                point.x >= wall.x*32 &&
                point.x <= (wall.x+1) *32 &&
                point.y >= wall.y*32 &&
                point.y <= (wall.y+1) *32 )
            {
                    move = false;
                    if (wall.locked == true && player.keys > 0){
                        player.keys--;
                        obstacles.splice(obstacles.indexOf(wall), 1);
                    }
            }
        })    
    });
    if (move){
        player.x = future.x;
        player.y = future.y;
    }
}


