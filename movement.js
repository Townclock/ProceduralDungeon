draw_movement = function(){
    if (player.x >= 320) {
        player.tile.x +=1;
    }
        if (Math.floor(cam.x) < player.tile.x) {
            player.x -=0.3125*32;
            cam.x += .03125;
        }
    if (player.x <= -32) {
        player.tile.x -=1;
    }
        if (Math.ceil(cam.x) > player.tile.x) {
            player.x +=0.3125*32;
            cam.x -= .03125;
        }


    if (player.y >= 288) {
        player.tile.y +=1;
    }
        if (Math.floor(cam.y) < player.tile.y) {
            player.y -=0.3125*28.8;
            cam.y += .03125;
        }
    if (player.y <= -32) {
        player.tile.y -=1;
    }
        if (Math.ceil(cam.y) > player.tile.y) {
            player.y +=0.3125*28.8;
            cam.y -= .03125;
    }
}
