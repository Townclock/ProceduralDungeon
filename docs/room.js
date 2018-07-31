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

    this.decorate();
};

Room.prototype.decorate = function(){
    var type = Math.floor(Math.random()*5) + 1;
    walls = this.walls;
    if (type == 1 || type ==2){
        console.log("core and periphery");
        var selected_core = core[Math.floor(Math.random()*core.length)];
        var x = 0, y=0;
        selected_core.forEach(function(column){column.forEach(function(row){
            if (row == "s")
                walls.push({x:x, y:y, display:statue_image, w:32, h:64, offset:32});
            if (row == "n")
                walls.push({x:x, y:y, display:"none"});
            if (row == "i")
                walls.push({x:x, y:y, display:idol_image, w:64, h:96, offset:32});
            if (row == "w")
                walls.push({x:x, y:y, display:wall_image, w:32, h:32, offset:0});
            if (row == "B")
                walls.push({x:x, y:y, display:statue_image, w:96, h:192, offset:128});
            y++;
        })
        x++;y=0;});
    }
    if (type == 3 || type == 4 || type == 5){
        console.log("distribution");
        var x = 2;
        var chosen_layout = layouts[Math.floor(Math.random()*layouts.length)];
        while( x < 8){
            var scatter_layout = chosen_layout[Math.floor(Math.random()*chosen_layout.length)];
            var y = 2;
            while (y < 9) {
                if (scatter_layout[y] == "i")
                    walls.push({x:x, y:y, display:idol_image, w:32, h:48, offset:16})
                if (scatter_layout[y] == "s")
                    walls.push({x:x, y:y, display:statue_image, w:32, h:64, offset:32})
            y++;
            }
        x++;
       }
    }
}

Room.prototype.draw = function(){
    var x = this.x;
    var y = this.y;
    this.walls.forEach(function(wall){
    if (wall.display == undefined) {wall.display = wall_image; wall.w = 32; wall.h=32; wall.offset = 0};
       if (wall.display != "none")
       image(
            wall.display,
            x*320 - cam.x*320 + wall.x*32,
            y*288 - cam.y*288 + wall.y*32 - wall.offset,
            wall.w,
            wall.h
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
        lock.w = 32; lock.h=32;lock.offset=0;
        locks.push(lock);
    });
        while (locks.length > 0){
            var lock = locks.pop();
            var locks_to_remove = [];
            locks.forEach(function(lock_2) {
            if (lock !== lock_2 && lock.x == lock_2.x && lock.y == lock_2.y){
                locks_to_remove.push(lock_2);
                }
                })
            locks_to_remove.forEach(function(l){locks.splice(locks.indexOf(l), 1)});
            final_locks.push(lock);
        };
    this.walls = this.walls.concat(final_locks);
}

function generate_doors(x, y) {
    var doors = [];
    var impossible_doors = [{x:0, y:0},{x:0, y:0},{x:0, y:0},{x:0, y:0}];
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

var core = [
[
[[],[],[],[],[],[],[],[],[]],
[[],"s",[],[],[],[],[],"s",[]],
[[],[],[],[],[],[],[],[],[]],
[[],[],[],[],[],[],[],[],[]],
[[],[],[],[],"i","n",[],[],[]],
[[],[],[],[],"n","n",[],[],[]],
[[],[],[],[],[],[],[],[],[]],
[[],[],[],[],[],[],[],[],[]],
[[],"s",[],[],[],[],[],"s",[]],
[[],[],[],[],[],[],[],[],[]
]
],

[
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ]," ","B","n",[ ],[ ],[ ]],
[[ ],[ ],[ ]," ","n","n",[ ],[ ],[ ]],
[[ ],[ ],[ ]," ","n","n",[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]]
],
[
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],"w","w","w","w","w",[ ],[ ]],
[[ ],[ ],"w","w","w","w","w",[ ],[ ]],
[[ ],[ ],"w","w","w","w","w",[ ],[ ]],
[[ ],[ ],"w","w","w","w","w",[ ],[ ]],
[[ ],[ ],"w","w","w","w","w",[ ],[ ]],
[[ ],[ ],"w","w","w","w","w",[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]]
],
[
[[ ], [],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ], [],"s",[ ],[ ],"s",[ ],[ ],[ ]],
[[ ], [],"s",[ ],[ ],"s",[ ],[ ],[ ]],
[[ ], [],[ ],[ ],[ ],[ ],[ ],"s",[ ]],
[[ ], [],"s",[ ],[ ],"s",[ ],[ ],[ ]],
[[ ], [],"s",[ ],[ ],"s",[ ],[ ],[ ]],
[[ ], [],[ ],[ ],[ ],[ ],[ ],"s",[ ]],
[[ ], [],"s",[ ],[ ],"s",[ ],[ ],[ ]],
[[ ], [],"s",[ ],[ ],"s",[ ],[ ],[ ]],
[[ ], [],[ ],[ ],[ ],[ ],[ ],[ ],[ ]]
],
]

var layouts =[
[
[[ ],[ ],[ ],[ ]," ",[ ]," ",[ ]," "],
[[ ],[ ],"i",[ ]," ",[ ],"i",[ ]," "],
[[ ],[ ],[ ],[ ]," ",[ ],"i",[ ]," "],
[[ ],[ ]," ","i",[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],"i",[ ],[ ],[ ]],
[[ ],"i",[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ]," "," ",[ ],"i",[ ],[ ],[ ],[ ]],
[[ ]," ","i",[ ]," ",[ ],[ ],[ ],[ ]]
],

[
[[ ],[ ]," ",[ ],[ ],"s"," ",[ ],[ ]],
[[ ], [],[ ],[ ],[ ],[ ],[ ],[ ],[ ]],
[[ ],[ ]," ",[ ],"s",[ ]," ",[ ],[ ]],
[[ ],[ ],"s",[ ],[ ],[ ]," ",[ ],[ ]],
[[ ],[ ]," ",[ ],[ ],[ ],"s",[ ],[ ]]
]
]
