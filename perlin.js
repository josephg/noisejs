/*
 * A speed-improved perlin and simplex noise algorithms for 2D.
 *
 * Based on example code by Stefan Gustavson (stegu@itn.liu.se).
 * Optimisations by Peter Eastman (peastman@drizzle.stanford.edu).
 * Better rank ordering method by Stefan Gustavson in 2012.
 * Converted to Javascript by Joseph Gentle.
 * Added local seed and 65536 times more possibilities, and added 1D noise by Stratton Jelley (stratjel@gmail.com).
 *
 * Version 2022-04-10
 *
 * This code was placed in the public domain by its original author,
 * Stefan Gustavson. You may use it as you see fit, but
 * attribution is appreciated.
 *
 */

function noise(seed) {
  this.p = [
    677, 306, 938, 594, 642, 917,  39, 473, 688, 286, 347, 235, 791, 918, 352, 748, 408, 219, 450, 279, 247, 828, 850, 518, 706, 821, 862, 950, 521, 615, 227, 397,
    869, 293, 851,1006, 162, 899, 908, 190, 631, 824, 852, 660, 488, 805, 271, 746, 691, 902, 757, 785, 470, 359, 919, 612, 268, 883, 277, 197, 965, 388, 210, 554,
    979, 978,  97, 121, 682, 931, 369, 453, 997, 407, 916, 728, 339, 505, 304, 822, 765, 411, 763, 295,  60, 816, 871,  35, 952, 313, 783, 350, 264, 241, 147, 123,
    721, 570, 112, 712, 182, 240,   2, 795, 716, 135, 932, 711, 508, 455, 613, 117, 837, 506, 178, 429, 157, 386, 139, 515, 472, 126, 272, 680, 841, 579, 623, 144,
    633, 998,  45, 780, 204, 448, 525, 777, 274, 432, 970, 105, 535, 129, 269, 221, 629, 654,  55, 725, 238, 194, 158, 545, 639, 258, 740, 762, 422, 775,  30, 957,
    255, 842,1018, 459, 493, 379, 661, 557, 149, 770, 433, 980, 228, 774, 983, 559, 107, 394,  19, 963,  91, 150, 346, 415, 609, 616, 790, 573, 328, 330, 793,   8,
    357, 694,1019, 582, 533, 512,  40, 476, 741, 684, 625,1017, 326, 310, 375,1016,   4,  77, 844, 362, 541, 118, 302, 443, 480,1022, 933, 282, 361, 897, 497, 624,
    549, 337, 401, 406, 751, 287, 323, 380, 893, 651, 734, 811, 540, 727, 233, 399, 969, 236,  46, 960, 353, 673, 201, 130, 571,  17, 104, 995, 552, 421, 466, 792,
    154, 591, 807, 926, 368, 371, 345, 705, 794, 320, 140, 789,  94, 529, 636,1001, 992, 710, 913, 880, 325,  50, 208, 303, 191, 467, 733, 632, 344, 856, 859, 803,
    924, 137, 500, 317, 872, 316, 700, 377, 597, 297, 253,  11, 590, 713, 234, 183, 635, 226, 127, 296,  36, 572,1021, 289, 108, 124, 342, 941, 161,  83, 404, 788,
    863, 495,1004, 714, 209,  23, 718, 114, 830,  98, 866, 806,  42, 400, 773,  53, 332, 300, 966, 825, 555, 329,   9, 882, 281, 686, 921, 199, 864, 100, 689, 498,
    764, 923, 225, 315, 267, 853,1015,  29, 244, 471, 976, 831, 319, 756, 583, 887, 198, 888, 265, 732, 109, 485, 672,  10, 567, 180, 447, 256, 134, 523, 854, 410,
    630, 171,  85, 973, 120, 356, 136, 514, 754, 659, 106, 810, 809,  78, 160, 503, 895, 959, 739,1009, 188, 891, 322,1011,  92, 374,1005, 996, 318, 292, 504, 561,
    284, 412, 307, 985, 551, 207, 670, 626, 768, 835, 968, 222, 930, 378, 769, 308, 288, 593, 262, 668, 487, 745,   6, 558, 836, 164, 942,1003, 605, 520, 698, 855,
    693, 524, 489, 418, 224, 580, 604, 128, 599,  12, 767, 252, 141, 760, 340, 355,  52, 886, 243,1002, 536, 687, 275,  95, 474, 750, 460, 860, 392, 172,  34,1008,
    611, 461, 829,  86, 367, 940, 925,  87, 539, 838, 143, 715, 695, 363, 870, 766, 431,  14, 896, 273, 920, 665, 585, 170, 906, 814, 808,  79, 290, 568, 784, 213,
    669, 445, 384, 747, 491, 903, 994, 649, 702, 532, 782, 889, 426, 817, 653, 988, 683, 797, 761, 915,  37, 231, 436, 602, 755, 223, 955, 475, 722, 177, 743, 640,
    370, 840, 967, 800, 420, 934, 405, 358, 904, 972, 823, 291, 257, 519, 155,  65, 928,  57, 618, 189, 103, 484, 939, 961, 584,  73, 641, 671,  21, 617, 564, 437,
    879, 395, 220, 259, 205, 812, 174, 260, 977, 832, 444, 278, 343, 848, 936, 181, 548, 216, 122, 251, 946,  81, 776, 542,  75, 949, 857, 254, 338, 675, 619, 299,
    373, 305, 984, 974, 381, 389, 892, 146, 159, 622, 737, 280, 425, 720, 266,  72, 270, 168, 423, 758, 876, 187,1023, 354, 586,1013, 778, 398, 621, 550, 538,  44,
     59, 569, 446, 607,  49, 546,   7, 912, 119,  70, 577, 462,  41, 875, 430, 169, 801,   5, 574, 477, 944,1014, 601, 991, 212,  43, 454, 527, 145, 681, 664, 543,
    697, 565, 562, 478,  66, 483, 905, 417, 826, 701, 246, 779, 153, 796,  68, 349, 990, 717, 603, 804, 393,  88,  18,  61, 413, 382, 696, 839, 427, 215,  67, 634,
    372, 496, 576, 678, 324, 442, 206, 439, 648, 726,  32, 101,  56, 163,  47, 239, 414, 652, 771, 537, 981, 237, 935,   3, 283, 987, 657, 494, 481, 409, 947, 723,
    650, 113, 759, 464, 167, 742, 575, 165, 402, 492, 900, 884, 458,  25, 667, 203, 321, 620, 186, 833, 261, 218, 901, 922, 501, 463, 945, 692, 298, 285, 909, 314,
     24, 200, 195, 679, 482,  64, 724, 666, 799, 456, 911,  31, 242, 587, 566, 781, 115, 798,   1, 954, 102, 628, 598, 644, 845, 142,  27, 341, 138, 749, 211, 858,
    440, 647, 993, 151, 348, 383,   0, 707, 815, 827,  76,  90, 563, 953, 847,  62, 881, 813, 301,  93, 148,  33, 676, 360, 531, 656, 744, 468, 849,  15, 510, 556,
    125, 507,  38, 907, 868,  96, 312, 638, 674, 982, 276,  48, 894, 385, 658, 528,  54, 435, 214, 457, 152, 175, 469, 989, 699,  63, 731, 592, 645, 133, 490, 877,
   1010, 890, 434, 334, 627, 509, 560, 229, 685, 419,1000, 365,  51, 927, 787, 534, 753, 416,  99, 608, 248,  16, 351, 390, 735, 202, 391, 867,  82, 311, 396, 999,
    786, 449, 451, 910, 403, 511, 530, 802, 110, 929, 951, 336, 637, 606, 736, 526,  20,  71, 730, 752, 553, 479, 820, 486, 581, 861, 614, 646,  84, 596, 662, 971,
    176,  58, 956,  28,1020,  13, 846, 898, 499, 376, 986, 196, 937,  26, 865, 249, 331, 309, 834, 517, 663, 516, 173, 958, 179, 595, 366, 578, 818, 547, 166, 513,
    424, 156, 230, 729, 703, 948, 943, 387, 327, 874, 364, 914, 588, 610, 544,  69, 719, 192, 819, 708, 333, 232,  74, 452, 704,  80, 465, 193, 962, 738, 690, 709,
    964, 772, 263, 843, 522, 132,  22, 335, 185, 600, 250, 294, 111, 873, 502, 428,1012, 116, 589, 655, 131, 184, 217, 975, 643,1007, 441,  89, 878, 885, 245, 438
  ];
    
  this.F2 = 0.5*(Math.sqrt(3)-1);
  this.G2 = (3-Math.sqrt(3))/6;

  this.F3 = 1/3;
  this.G3 = 1/6;
    
  function Grad(x, y, z) {
    this.x = x; this.y = y; this.z = z;
  }
  
  Grad.prototype.dot1 = function(x) {
    return this.x*x;
  };
  
  Grad.prototype.dot2 = function(x, y) {
    return this.x*x + this.y*y;
  };

  Grad.prototype.dot3 = function(x, y, z) {
    return this.x*x + this.y*y + this.z*z;
  };

  this.grad3 = [new Grad(1,1,0),new Grad(-1,1,0),new Grad(1,-1,0),new Grad(-1,-1,0),
    new Grad(1,0,1),new Grad(-1,0,1),new Grad(1,0,-1),new Grad(-1,0,-1),
    new Grad(0,1,1),new Grad(0,-1,1),new Grad(0,1,-1),new Grad(0,-1,-1)];
  this.perm = new Array(512);
  this.gradP = new Array(512);
  
  // To remove the need for index wrapping, double the permutation table length
  
  this.seed = function(seed) {
    if(seed > 0 && seed < 1) {
      // Scale the seed out
      seed *= 4294967296;
    }

    seed = Math.floor(seed);
    if (seed < 1024) {
      seed |= seed << 8;
    }

    for(var i = 0; i < 1024; i++) {
      var v;
      if (i & 1) {
        v = this.p[i] ^ (seed & 1023);
      } else {
        v = this.p[i] ^ ((seed>>8) & 1023);
      }

      this.perm[i] = this.perm[i + 1024] = v;
      this.gradP[i] = this.gradP[i + 1024] = this.grad3[v % 12];
    }
  };
  
  if (seed == undefined) {
    this.seed(Math.random());
  } else {
    this.seed(seed);
  }


  /*
  for(let i = 0; i<256; i++) {
    this.perm[i] = this.perm[i + 256] = this.p[i];
    this.gradP[i] = this.gradP[i + 256] = this.grad3[this.perm[i] % 12];
  }*/

  // Skewing and unskewing factors for 2, 3, and 4 dimensions

  // 2D simplex noise
  this.simplex2 = function(xin, yin) {
    let n0, n1, n2; // Noise contributions from the three corners
    // Skew the input space to determine which simplex cell we're in
    let s = (xin+yin)*this.F2; // Hairy factor for 2D
    let i = Math.floor(xin+s);
    let j = Math.floor(yin+s);
    let t = (i+j)*this.G2;
    let x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    let y0 = yin-j+t;
    // For the 2D case, the simplex shape is an equilateral triangle.
    // Determine which simplex we are in.
    let i1, j1; // Offsets for second (middle) corner of simplex in (i,j) coords
    if(x0>y0) { // lower triangle, XY order: (0,0)->(1,0)->(1,1)
      i1=1; j1=0;
    } else {    // upper triangle, YX order: (0,0)->(0,1)->(1,1)
      i1=0; j1=1;
    }
    // A step of (1,0) in (i,j) means a step of (1-c,-c) in (x,y), and
    // a step of (0,1) in (i,j) means a step of (-c,1-c) in (x,y), where
    // c = (3-sqrt(3))/6
    let x1 = x0 - i1 + this.G2; // Offsets for middle corner in (x,y) unskewed coords
    let y1 = y0 - j1 + this.G2;
    let x2 = x0 - 1 + 2 * this.G2; // Offsets for last corner in (x,y) unskewed coords
    let y2 = y0 - 1 + 2 * this.G2;
    // Work out the hashed gradient indices of the three simplex corners
    i &= 1023;
    j &= 1023;
    let gi0 = this.gradP[i+this.perm[j]];
    let gi1 = this.gradP[i+i1+this.perm[j+j1]];
    let gi2 = this.gradP[i+1+this.perm[j+1]];
    // Calculate the contribution from the three corners
    let t0 = 0.5 - x0*x0-y0*y0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot2(x0, y0);  // (x,y) of grad3 used for 2D gradient
    }
    let t1 = 0.5 - x1*x1-y1*y1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot2(x1, y1);
    }
    let t2 = 0.5 - x2*x2-y2*y2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot2(x2, y2);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 70 * (n0 + n1 + n2);
  };

  // 3D simplex noise
  this.simplex3 = function(xin, yin, zin) {
    let n0, n1, n2, n3; // Noise contributions from the four corners

    // Skew the input space to determine which simplex cell we're in
    let s = (xin+yin+zin)*this.F3; // Hairy factor for 2D
    let i = Math.floor(xin+s);
    let j = Math.floor(yin+s);
    let k = Math.floor(zin+s);

    let t = (i+j+k)*this.G3;
    let x0 = xin-i+t; // The x,y distances from the cell origin, unskewed.
    let y0 = yin-j+t;
    let z0 = zin-k+t;

    // For the 3D case, the simplex shape is a slightly irregular tetrahedron.
    // Determine which simplex we are in.
    let i1, j1, k1; // Offsets for second corner of simplex in (i,j,k) coords
    let i2, j2, k2; // Offsets for third corner of simplex in (i,j,k) coords
    if (x0 >= y0) {
      if (y0 >= z0)      { i1=1; j1=0; k1=0; i2=1; j2=1; k2=0; }
      else if (x0 >= z0) { i1=1; j1=0; k1=0; i2=1; j2=0; k2=1; }
      else               { i1=0; j1=0; k1=1; i2=1; j2=0; k2=1; }
    } else {
      if (y0 < z0)       { i1=0; j1=0; k1=1; i2=0; j2=1; k2=1; }
      else if (x0 < z0)  { i1=0; j1=1; k1=0; i2=0; j2=1; k2=1; }
      else               { i1=0; j1=1; k1=0; i2=1; j2=1; k2=0; }
    }
    // A step of (1,0,0) in (i,j,k) means a step of (1-c,-c,-c) in (x,y,z),
    // a step of (0,1,0) in (i,j,k) means a step of (-c,1-c,-c) in (x,y,z), and
    // a step of (0,0,1) in (i,j,k) means a step of (-c,-c,1-c) in (x,y,z), where
    // c = 1/6.
    let x1 = x0 - i1 + this.G3; // Offsets for second corner
    let y1 = y0 - j1 + this.G3;
    let z1 = z0 - k1 + this.G3;

    let x2 = x0 - i2 + 2 * this.G3; // Offsets for third corner
    let y2 = y0 - j2 + 2 * this.G3;
    let z2 = z0 - k2 + 2 * this.G3;

    let x3 = x0 - 1 + 3 * this.G3; // Offsets for fourth corner
    let y3 = y0 - 1 + 3 * this.G3;
    let z3 = z0 - 1 + 3 * this.G3;

    // Work out the hashed gradient indices of the four simplex corners
    i &= 1023;
    j &= 1023;
    k &= 1023;
    let gi0 = this.gradP[i+   this.perm[j+   this.perm[k   ]]];
    let gi1 = this.gradP[i+i1+this.perm[j+j1+this.perm[k+k1]]];
    let gi2 = this.gradP[i+i2+this.perm[j+j2+this.perm[k+k2]]];
    let gi3 = this.gradP[i+ 1+this.perm[j+ 1+this.perm[k+ 1]]];

    // Calculate the contribution from the four corners
    let t0 = 0.6 - x0*x0 - y0*y0 - z0*z0;
    if(t0<0) {
      n0 = 0;
    } else {
      t0 *= t0;
      n0 = t0 * t0 * gi0.dot3(x0, y0, z0);  // (x,y) of grad3 used for 2D gradient
    }
    let t1 = 0.6 - x1*x1 - y1*y1 - z1*z1;
    if(t1<0) {
      n1 = 0;
    } else {
      t1 *= t1;
      n1 = t1 * t1 * gi1.dot3(x1, y1, z1);
    }
    let t2 = 0.6 - x2*x2 - y2*y2 - z2*z2;
    if(t2<0) {
      n2 = 0;
    } else {
      t2 *= t2;
      n2 = t2 * t2 * gi2.dot3(x2, y2, z2);
    }
    let t3 = 0.6 - x3*x3 - y3*y3 - z3*z3;
    if(t3<0) {
      n3 = 0;
    } else {
      t3 *= t3;
      n3 = t3 * t3 * gi3.dot3(x3, y3, z3);
    }
    // Add contributions from each corner to get the final noise value.
    // The result is scaled to return values in the interval [-1,1].
    return 32 * (n0 + n1 + n2 + n3);

  };
  
  // ##### Perlin noise stuff

  this.fade = function(t) {
    return t*t*t*(t*(t*6-15)+10);
  }

  this.lerp = function(a, b, t) {
    return (1-t)*a + t*b;
  }
  
  // 1D Perlin Noise
  this.perlin1 = function(x) {
    // Find unit grid cell containing point
    let X = Math.floor(x);
    // Get relative x coordinate of point within that cell
    x = x - X;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 1023;

    // Calculate noise contributions from each of the four corners
    let n0 = this.gradP[X  ].dot1(x  );
    let n1 = this.gradP[X+1].dot1(x-1);

    // Compute the fade curve value for x
    let u = this.fade(x);

    // Interpolate the four results
    return this.lerp(n0, n1, u);
  };

  // 2D Perlin Noise
  this.perlin2 = function(x, y) {
    // Find unit grid cell containing point
    let X = Math.floor(x), Y = Math.floor(y);
    // Get relative xy coordinates of point within that cell
    x = x - X; y = y - Y;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 1023; Y = Y & 1023;

    // Calculate noise contributions from each of the four corners
    let n00 = this.gradP[X+  this.perm[Y  ]].dot2(x  , y  );
    let n01 = this.gradP[X+  this.perm[Y+1]].dot2(x  , y-1);
    let n10 = this.gradP[X+1+this.perm[Y  ]].dot2(x-1, y  );
    let n11 = this.gradP[X+1+this.perm[Y+1]].dot2(x-1, y-1);

    // Compute the fade curve value for x
    let u = this.fade(x);

    // Interpolate the four results
    return this.lerp(
      this.lerp(n00, n10, u),
      this.lerp(n01, n11, u),
      this.fade(y));
  };

  // 3D Perlin Noise
  this.perlin3 = function(x, y, z) {
    // Find unit grid cell containing point
    let X = Math.floor(x), Y = Math.floor(y), Z = Math.floor(z);
    // Get relative xyz coordinates of point within that cell
    x = x - X; y = y - Y; z = z - Z;
    // Wrap the integer cells at 255 (smaller integer period can be introduced here)
    X = X & 1023; Y = Y & 1023; Z = Z & 1023;

    // Calculate noise contributions from each of the eight corners
    let n000 = this.gradP[X+  this.perm[Y+  this.perm[Z  ]]].dot3(x,   y,     z);
    let n001 = this.gradP[X+  this.perm[Y+  this.perm[Z+1]]].dot3(x,   y,   z-1);
    let n010 = this.gradP[X+  this.perm[Y+1+this.perm[Z  ]]].dot3(x,   y-1,   z);
    let n011 = this.gradP[X+  this.perm[Y+1+this.perm[Z+1]]].dot3(x,   y-1, z-1);
    let n100 = this.gradP[X+1+this.perm[Y+  this.perm[Z  ]]].dot3(x-1,   y,   z);
    let n101 = this.gradP[X+1+this.perm[Y+  this.perm[Z+1]]].dot3(x-1,   y, z-1);
    let n110 = this.gradP[X+1+this.perm[Y+1+this.perm[Z  ]]].dot3(x-1, y-1,   z);
    let n111 = this.gradP[X+1+this.perm[Y+1+this.perm[Z+1]]].dot3(x-1, y-1, z-1);

    // Compute the fade curve value for x, y, z
    let u = this.fade(x);
    let v = this.fade(y);
    let w = this.fade(z);

    // Interpolate
    return this.lerp(
        this.lerp(
          this.lerp(n000, n100, u),
          this.lerp(n001, n101, u), w),
        this.lerp(
          this.lerp(n010, n110, u),
          this.lerp(n011, n111, u), w),
       v);
  };
  
  function divider(x, y) {
  let val;
  
  if (x == y) {
      val = Math.pow(2, x-1);
    } else {
      val = Math.pow(2, x);
    }
    return val;
  }
  
  this.octave = function(mode, iterations, x, y, z) {
    const picker = {
      "s2"  : this.simplex2.bind(this),
      "s3"  : this.simplex3.bind(this),
      "p1"  : this.perlin1.bind(this),
      "p2"  : this.perlin2.bind(this),
      "p3"  : this.perlin3.bind(this),
    }[mode];
    
    let val = 0;
    let div;
    
    for (let i = 0; i < iterations; i++) {
      div = divider(i+1, iterations);
      val += picker?.(x*div, y*div, z*div)/div;
    }
    
    return val;
  };
}
