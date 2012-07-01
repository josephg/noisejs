# NOISE!

This is a simple library for 2d perlin & simplex noise in javascript. Perlin noise is [pretty](https://dl.dropbox.com/u/2494815/perlin/index.html).

The library is pretty fast (10M queries / sec). But its still way slower than using a shader.

The code is based on Stefan Gustavson's implementation. Do whatever you want with it, etc.

I'm happy to add 3d noise functions - throw me a pull request.

## How to make noise:

```javascript
noise.seed(Math.random());

for (var x = 0; x < canvas.width; x++) {
  for (var y = 0; y < canvas.height; y++) {
    // noise.simplex2 and noise.perlin2 return values between -1 and 1.
    var value = noise.simplex2(x / 100, y / 100);

    image[x][y].r = Math.abs(value) * 256; // Or whatever. Open demo.html to see it used with canvas.
  }
}
```

The library exposes an object called `noise` with 3 properties:

- **simplex2(x, y)**: 2D Simplex noise function
- **perlin2(x, y)**: 2D Perlin noise function
- **seed(val)**: Seed the noise functions. Only 65536 different seeds are supported. Use a float between 0 and 1 or an integer from 1 to 65536. 

