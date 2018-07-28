Room = function (x, y){
    this.x = x;
    this.y = y;
    this.walls  = [
        {x:x, y:y}
    ]
};

Room.prototype.draw = function(){
    var x = this.x;
    var y = this.y;
    this.walls.forEach(function(wall){
        rect(
            x*320 - cam.x*320 + wall.x*32,
            y*288 - cam.y*288 + wall.y*32,
            32,
            32
            )
    });
}
