# NOISE!

This is a simple library for 2d perlin & simplex noise in javascript. Its pretty fast (10M queries / sec).

The code is based on Stefan Gustavson's implementation. Do whatever you want with it, etc.

I'm happy to add 3d noise functions if anyone wants to throw me a pull request.

## How to make noise:

```javascript
noise.seed(Math.random());

for (var x = 0; x < canvas.width; x++) {
  for (var y = 0; y < canvas.height; y++) {
    var value = Math.abs(noise.simplex2(x / 100, y / 100));
    value *= 256;

    color[x][y].r = value;
  }
}
```

The library exposes an object called `noise` with 3 properties:

- **simplex2(x, y)**: 2D Simplex noise function
- **perlin2(x, y)**: 2D Perlin noise function
- **seed(val)**: Seed the noise functions with the specified value. Either use a value between 0 and 1 or an integer between 1 and 65536. Only 65536 different seeds are supported.

