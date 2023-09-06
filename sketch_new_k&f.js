let invertColors = false;
var grid;
var next;

var dA = 1;
var dB = 0.5;
var feed = 0.055;
var k = 0.062;

function setup() {
    createCanvas(800, 800);
    pixelDensity(1);
    grid = [];
    next = [];
    for (var x = 0; x < width; x++) {
        grid[x] = [];
        next[x] = [];
        for (var y = 0; y < height; y++) {
            grid[x][y] = { a: 1, b: 0 };
            next[x][y] = { a: 1, b: 0 };
        }
    }

    for (var i = 400; i < 420; i++) {
        for (var j = 400; j < 420; j++) {
            grid[i][j].b = 1;
        }
    }
}

function draw() {
    background(51);                                       // Set background color
  
if (Math.floor(millis() / 1200) % 2 === 1) {
        invertColors = true;
    } else {
        invertColors = false;
    }
    for (var x = 1; x < width - 1; x++) {
        for (var y = 1; y < height - 1; y++) {
            // Calculate gradient values for feed and kill rate
            var gradientX = map(x, 0, width - 1, -0.005, 0.005); // Adjust range as needed
            var gradientY = map(y, 0, height - 1, -0.005, 0.005); // Adjust range as needed

            // Update feed and k based on gradients
            var feedWithGradient = feed + gradientX;
            var kWithGradient = k + gradientY;

            var a = grid[x][y].a;
            var b = grid[x][y].b;
            next[x][y].a =
                a +
                dA * laplaceA(x, y) -
                a * b * b +
                feedWithGradient * (1 - a);
            next[x][y].b =
                b +
                dB * laplaceB(x, y) +
                a * b * b -
                (kWithGradient + feedWithGradient) * b;

            next[x][y].a = constrain(next[x][y].a, 0, 1);
            next[x][y].b = constrain(next[x][y].b, 0, 1);
        }
    }


loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var pix = (x + y * width) * 4;
            var a = next[x][y].a;
            var b = next[x][y].b;

            // Invert colors if invertColors is true
            if (invertColors) {
                a = 1 - a;
                b = 1 - b;
            }

            pixels[pix + 0] = floor(a * 255);
            pixels[pix + 1] = floor(b * 255);
            pixels[pix + 2] = floor((a - b) * 255);
            pixels[pix + 3] = 255;
        }
    }  
  
  
updatePixels();

    swap();
  }

function laplaceA(x, y) {
    var sumA = 0;
 sumA += grid[x][y].a * -1;
 sumA += grid[x-1][y].a * 0.2;
 sumA += grid[x+1][y].a * 0.2;
 sumA += grid[x][y+1].a * 0.2;
 sumA += grid[x][y-1].a * 0.2;
 sumA += grid[x-1][y-1].a * 0.05;
 sumA += grid[x+1][y-1].a * 0.05;
 sumA += grid[x+1][y+1].a * 0.05;
 sumA += grid[x-1][y+1].a * 0.05;
 return sumA;
}

function laplaceB(x, y) {
    var sumB = 0;
 sumB += grid[x][y].b * -1;
 sumB += grid[x-1][y].b * 0.2;
 sumB += grid[x+1][y].b * 0.2;
 sumB += grid[x][y+1].b * 0.2;
 sumB += grid[x][y-1].b * 0.2;
 sumB += grid[x-1][y-1].b * 0.05;
 sumB += grid[x+1][y-1].b * 0.05;
 sumB += grid[x+1][y+1].b * 0.05;
 sumB += grid[x-1][y+1].b * 0.05;
 return sumB;
}

function swap (){
    var temp = grid;
    grid = next;
    next = temp;
}


let lastTime = 0;
let delay = 50; // delay in milliseconds

function mouseDragged() {
    const x = floor(mouseX);
    const y = floor(mouseY);
    const brushSize = 5;

    const xMin = max(x - brushSize, 0);
    const xMax = min(x + brushSize, width - 1);
    const yMin = max(y - brushSize, 0);
    const yMax = min(y + brushSize, height - 1);

    for (let i = xMin; i <= xMax; i++) {
        for (let j = yMin; j <= yMax; j++) {
            if (grid[i][j].b !== 1) {
                grid[i][j].b = 1;
            }
        }
    }
}


