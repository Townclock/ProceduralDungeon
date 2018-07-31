var terrain = [
[],[],[],[],[],[],[],[],[],[],
[],[],[],[],[],[],[],[],[],[]
];
function fill_terrain(){
    for (var i = 1; i < 19; i++){
        for (var j = 1; j < 17; j++){
            var neighbors = [[i-1, j-1], [i, j-1], [i+1, j-1], 
                             [i-1, j],             [i+1, j],
                             [i-1, j+1], [i, j+1], [i+1, j+1]];
            var live_neighbors = 0;
            neighbors.forEach(function(neighbor){
                if (terrain[neighbor[0]][neighbor[1]] > 0)
                live_neighbors+=1;
            })
            if (live_neighbors>= 4){ terrain[i][j] = -1;}
        }
    }
}



function setup() {
    createCanvas(630, 576);
    background(0);
    
    for (var i = 0; i < 20; i++){
        for (var j = 0; j < 18; j++){
            console.log("terain");
            terrain[i][j] = (Math.random()-0.6);
        }
    } 

}

function draw() {
    background(0);
    fill(0, 200, 0);
    for (var i = 0; i < 20; i++){
        for (var j = 0; j < 18; j++){
                if (terrain[i][j] > 0){
                    rect(i*32, j*32, 32, 32);
                }

        }
    } 
}

mouseClicked = function(){
    var terrain_temp = terrain.slice();
    console.log(terrain_temp);
    for (var i = 1; i < 19; i++){
        for (var j = 1; j < 17; j++){
            var neighbors = [[i-1, j-1], [i, j-1], [i+1, j-1], 
                             [i-1, j],             [i+1, j],
                             [i-1, j+1], [i, j+1], [i+1, j+1]];
            var live_neighbors = 0;
            neighbors.forEach(function(neighbor){
                if (terrain[neighbor[0]][neighbor[1]] > 0)
                live_neighbors+=1;
            })
            console.log(live_neighbors);
            if (terrain[i][j] > 0){
                if (live_neighbors < 0 || live_neighbors > 1) {
                    if (Math.random() > .3)
                        terrain_temp[i][j] = -1;}
                else {terrain_temp[i][j] = 1};
            }
            else 
                if (live_neighbors == 5) {
                    if (Math.random() > .8)
                        terrain_temp[i][j] = 1
                    
                };
        }
    } 
    terrain = terrain_temp;
}


