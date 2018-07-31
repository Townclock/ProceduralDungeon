Room = function (x, y){
    this.x = x;
    this.y = y;
    this.walls  = [
        {x:0, y:0},{x:1, y:0},{x:2, y:0},{x:3, y:0}, {x:4, y:0},
        {x:5, y:0},{x:6, y:0},{x:7, y:0},{x:8, y:0},{x:9, y:0},
        {x:0, y:8},{x:1, y:8},{x:2, y:8},{x:3, y:8}, {x:4, y:8},
        {x:5, y:8},{x:6, y:8},{x:7, y:8},{x:8, y:8}, {x:9, y:8},
  {x:0, y:1},{x:0, y:2},{x:0, y:3},{x:0, y:4},{x:0, y:5},{x:0, y:6},{x:0, y:7},{x:9, y:1},{x:9, y:2},{x:9, y:3},{x:9, y:4},{x:9, y:5},{x:9, y:6},{x:9, y:7}

    ]
    var walls = this.walls;
    var doors = generate_doors(this.x, this.y).slice();
    this.doors = doors.slice();
    doors.forEach(function(door){
        walls.forEach(function(wall){
            if (wall.x == door.x && wall.y == door.y)
                walls.splice(walls.indexOf(wall), 1);
        })
    });
    this.walls = walls;
    if (Math.random() < 0.5) {this.lock_doors()}
};

Room.prototype.draw = function(){
    var x = this.x;
    var y = this.y;
    this.walls.forEach(function(wall){
    if (!wall.display) wall.display = wall_image;
       image(
            wall.display,
            x*320 - cam.x*320 + wall.x*32,
            y*288 - cam.y*288 + wall.y*32,
            32,
            32
            );
    });
}
Room.prototype.lock_doors = function(){
    var locks = [];
    var final_locks = [];
    this.doors.forEach(function(door){
        var lock = {}; lock.x = door.x; lock.y = door.y;
        if (lock.x == 0) lock.x++;
        if (lock.x == 9) lock.x--;
        if (lock.y == 0) lock.y++;
        if (lock.y == 8) lock.y--;
        lock.locked = true;
        lock.display = lock_image;
        locks.push(lock);
    });
    console.log(locks)
        while (locks.length > 0){
            var lock = locks.pop();
            console.log(lock);
            var locks_to_remove = [];
            locks.forEach(function(lock_2) {
            if (lock !== lock_2 && lock.x == lock_2.x && lock.y == lock_2.y){
                locks_to_remove.push(lock_2);
                console.log("redundant lock destoyed", lock, lock_2);}
                })
            locks_to_remove.forEach(function(l){locks.splice(locks.indexOf(l), 1)});
            final_locks.push(lock);
            console.log(locks.length);
        };
                console.log(final_locks);
    this.walls = this.walls.concat(final_locks);
}

function generate_doors(x, y) {
    var doors = [];
    var impossible_doors = [{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0}];
        console.log(impossible_doors, "impdoor");
        if (world.rooms[(x+1)+","+y]){
                    impossible_doors[0] = {x:9, y:4};
            world.rooms[(x+1)+","+y].doors.forEach(function(r){
                if (r.x == 0 && r.y == 4)
                {
                    doors.push({x:9, y:4});
                    impossible_doors[0] = {x:0, y:0};

                }
               })
        }
        console.log(impossible_doors, "impdoor 1");
        if (world.rooms[(x-1)+","+y]){
                    impossible_doors[1] = {x:0, y:4};
            world.rooms[(x-1)+","+y].doors.forEach(function(r){
                if (r.x == 9 && r.y == 4)
                {
                    doors.push({x:0, y:4});
                    impossible_doors[1] = {x:0, y:0};
                }
               })
        }
        console.log(impossible_doors, "impdoor 2");

        if (world.rooms[x+","+(y+1)]){
                    impossible_doors[2] = {x:5, y:8};
            world.rooms[x+","+(y+1)].doors.forEach(function(r){
                if (r.x == 5 && r.y == 0)
                {
                    doors.push({x:5, y:8});
                    impossible_doors[2] = {x:0, y:0};
                }
               })
        }
        console.log(impossible_doors, "impdoor 3");
        if (world.rooms[x+","+(y-1)]){
                    impossible_doors[3] = {x:5, y:0};
            world.rooms[x+","+(y-1)].doors.forEach(function(r){
                if (r.x == 5 && r.y == 8)
                {
                    doors.push({x:5, y:0});
                    impossible_doors[3] = {x:0, y:0};
                }
               })
        }
        console.log(impossible_doors, "impdoor 4");
    //if (impossible_doors.lengt == 4) {console.log("Warning: all doors impossibe"); impossible_doors = [];}
    while (doors.length < 2){
        if (Math.random() > 0.5){
            doors.push({x:0, y:4});
        }
        if (Math.random() > 0.5){
            doors.push({x:9, y:4});
        }
        if (Math.random() > 0.5){
            doors.push({x:5, y:0});
        }
        if (Math.random() > 0.5){
            doors.push({x:5, y:8});
        }
        impossible_doors.forEach(function(i_d){
            doors.forEach(function(d){
                if (d.x == i_d.x && d.y == i_d.y)
                    doors.splice(doors.indexOf(d), 1);
            });
        });
    }
    return doors;
}

var room_components = [
];
