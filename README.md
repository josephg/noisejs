# NOISE!

This is a simple library for 2d & 3d perlin noise and simplex noise in
javascript. Noise is
[pretty](https://josephg.com/perlin/3/).

The library is pretty fast (10M queries / sec). But its still way slower than
using a shader. For example, if you try and update an entire screen's worth of
pixels, it'll be slow. 

The code is based on Stefan Gustavson's implementation. Do whatever you want
with it, etc.

## How to make noise:

```javascript
seed = Math.random();
//Set seed first time
perlin = new noise(seed);
//Set seed again
perlin.seed(seed);

for (var x = 0; x < canvas.width; x++) {
  for (var y = 0; y < canvas.height; y++) {
    // All noise functions return values in the range of -1 to 1.

    // noise.perlin1 for 1d noise
    var value = perlin.perlin1(x / 100);
    // noise.simplex2 and noise.perlin2 for 2d noise
    var value = perlin.simplex2(x / 100, y / 100);
    // ... or noise.simplex3 and noise.perlin3:
    var value = perlin.simplex3(x / 100, y / 100, time);

    image[x][y].r = Math.abs(value) * 256; // Or whatever. Open demo.html to see it used with canvas.
  }
}
```

The library exposes an object called `noise` with which you can create a new object with any name e.g. `perlin = new noise` with the following properties:

- **simplex2(x, y)**: 2D Simplex noise function
- **simplex3(x, y, z)**: 3D Simplex noise function
- **perlin1(x)**: 1D Perlin noise function
- **perlin2(x, y)**: 2D Perlin noise function
- **perlin3(x, y, z)**: 3D Perlin noise function
- **seed(val)**: Seed the noise functions. 4294967296 different seeds are supported. Use a float between 0 and 1 or an integer from 1 to 4294967296. 

