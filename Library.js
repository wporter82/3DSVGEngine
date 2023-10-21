class Triangle {
    constructor(a = new Vec3(), b = new Vec3(), c = new Vec3()) {
        this.p = [a,b,c];
        this.col = "white";
    }
}

class Mesh {
    tris = [];
}

class Matrix44 {
    constructor(m = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]) {
        this.m = m;
    }
}

class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y);
    }

    normalize() {
        var len = this.length();
        if (len > 0) {
            var invLen = 1 / len;
            this.x *= invLen;
            this.y *= invLen;
        }
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y;
    }

    cross(v) {
        return this.x * v.y - this.y * v.x;
    }

    distance(v) {
        return Math.sqrt((v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y));
    }

    scale(s) {
        this.x *= s;
        this.y *= s;
        return this;
    }

    rotate(deg) {
        let angle = (deg * Math.PI) / 180;
        let newX = 0;
        let newY = 0;

        let cs = Math.cos(angle);
        let sn = Math.sin(angle);

        newX = this.x * cs - this.y * sn;
        newY = this.x * sn + this.y * cs;
        this.x = newX;
        this.y = newY;
        return;
    }

    add(v) {
        return new Vec2(this.x + v.x, this.y + v.y);
    }

    subtract(v) {
        return new Vec2(this.x - v.x, this.y - v.y);
    }

    multiply(r) {
        return new Vec2(this.x * r, this.y * r);
    }

    divide(r) {
        return new Vec2(this.x / r, this.y / r);
    }
}

class Vec3 {
    constructor(x = 0, y = 0, z = 0, w = 1) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z);
    }

    normalize() {
        var len = this.length();
        if (len > 0) {
            var invLen = 1 / len;
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
        }
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z;
    }

    cross(v) {
        return new Vec3(
            this.y * v.z - this.z * v.y,
            this.z * v.x - this.x * v.z,
            this.x * v.y - this.y * v.x
        );
    }

    distance(v) {
        return Math.sqrt((v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y) + (v.z - this.z) * (v.z - this.z));
    }

    scale(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        return this;
    }

    add(v) {
        return new Vec3(this.x + v.x, this.y + v.y, this.z + v.z);
    }

    subtract(v) {
        return new Vec3(this.x - v.x, this.y - v.y, this.z - v.z);
    }

    multiply(r) {
        return new Vec3(this.x * r, this.y * r, this.z * r);
    }

    divide(r) {
        return new Vec3(this.x / r, this.y / r, this.z / r);
    }
}

class Vec4 {
    constructor(x = 0, y = 0, z = 0, w = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    length() {
        return Math.sqrt(this.x*this.x + this.y*this.y + this.z*this.z + this.w*this.w);
    }

    normalize() {
        var len = this.length();
        if (len > 0) {
            var invLen = 1 / len;
            this.x *= invLen;
            this.y *= invLen;
            this.z *= invLen;
            this.w *= invLen;
        }
        return this;
    }

    dot(v) {
        return this.x * v.x + this.y * v.y + this.z * v.z + this.w * v.w;
    }

    distance(v) {
        return Math.sqrt((v.x - this.x) * (v.x - this.x) + (v.y - this.y) * (v.y - this.y) + (v.z - this.z) * (v.z - this.z) + (v.w - this.w) * (v.w - this.w));
    }

    scale(s) {
        this.x *= s;
        this.y *= s;
        this.z *= s;
        this.w *= s;
        return this;
    }

    add(v) {
        return new Vec4(this.x + v.x, this.y + v.y, this.z + v.z, this.w + v.w);
    }

    subtract(v) {
        return new Vec4(this.x - v.x, this.y - v.y, this.z - v.z, this.w - v.w);
    }

    multiply(r) {
        return new Vec4(this.x * r, this.y * r, this.z * r, this.w * r);
    }

    divide(r) {
        return new Vec4(this.x / r, this.y / r, this.z / r, this.w / r);
    }
}

function GetIdentityMatrix() {
    var matrix = new Matrix44();
    matrix.m[0][0] = 1;
    matrix.m[1][1] = 1;
    matrix.m[2][2] = 1;
    matrix.m[3][3] = 1;
    return matrix;
}

function GetScaleMatrix(sx, sy, sz) {
    var result = new Matrix44();
    result.m[0][0] = sx;
    result.m[1][1] = sy;
    result.m[2][2] = sz;
    result.m[3][3] = 1;
    return [[sx,0,0,0],[0,sy,0,0],[0,0,sz,0],[0,0,0,1]];
}

function GetTranslationMatrix(x, y, z) {
    var matrix = new Matrix44();
    matrix.m[0][0] = 1;
    matrix.m[1][1] = 1;
    matrix.m[2][2] = 1;
    matrix.m[3][3] = 1;
    matrix.m[3][0] = x;
    matrix.m[3][1] = y;
    matrix.m[3][2] = z;
    return matrix;
}

function GetRotationXMatrix(angle) {
    var matrix = new Matrix44();
    matrix.m[0][0] = 1;
    matrix.m[1][1] = Math.cos(angle * 0.5);
    matrix.m[1][2] = Math.sin(angle * 0.5);
    matrix.m[2][1] = -Math.sin(angle * 0.5);
    matrix.m[2][2] = Math.cos(angle * 0.5);
    matrix.m[3][3] = 1;
    return matrix;
}

function GetRotationYMatrix(angle) {
    var matrix = new Matrix44();
    matrix.m[0][0] = Math.cos(angle);
    matrix.m[0][2] = Math.sin(angle);
    matrix.m[2][0] = -Math.sin(angle);
    matrix.m[1][1] = 1;
    matrix.m[2][2] = Math.cos(angle);
    matrix.m[3][3] = 1;
    return matrix;
}

function GetRotationZMatrix(angle) {
    var matrix = new Matrix44();
    matrix.m[0][0] = Math.cos(angle);
    matrix.m[0][1] = Math.sin(angle);
    matrix.m[1][0] = -Math.sin(angle);
    matrix.m[1][1] = Math.cos(angle);
    matrix.m[2][2] = 1;
    matrix.m[3][3] = 1;
    return matrix;
}

function GetProjectionMatrix(fov, aspect, near, far) {
    var fovRad = 1 / Math.tan(fov * 0.5 / 180 * Math.PI);
    var matrix = new Matrix44();
    matrix.m[0][0] = aspect * fovRad;
    matrix.m[1][1] = fovRad;
    matrix.m[2][2] = far / (far - near);;
    matrix.m[3][2] = (-far * near) / (far - near);
    matrix.m[2][3] = 1;
    return matrix;
}

function MultiplyMatrices(M1, M2) {
    var result = new Matrix44();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            result.m[i][j] = M1[i][0] * M2[0][j] +
                           M1[i][1] * M2[1][j] +
                           M1[i][2] * M2[2][j] +
                           M1[i][3] * M2[3][j];
        }
    }

    return result;
}

function MultiplyVecMatrix(v, m) {
    var result = new Vec3(0,0,0);
    result.x = v.x * m[0][0] + v.y * m[1][0] + v.z * m[2][0] + m[3][0];
    result.y = v.x * m[0][1] + v.y * m[1][1] + v.z * m[2][1] + m[3][1];
    result.z = v.x * m[0][2] + v.y * m[1][2] + v.z * m[2][2] + m[3][2];
    result.w = v.x * m[0][3] + v.y * m[1][3] + v.z * m[2][3] + m[3][3];
    return result;
}

function MultiplyDirMatrix(v, m) {
    return new Vec3(
        v.x * m[0][0] + v.y * m[1][0] + v.z * m[2][0],
        v.x * m[0][1] + v.y * m[1][1] + v.z * m[2][1],
        v.x * m[0][2] + v.y * m[1][2] + v.z * m[2][2]
    );
}

function TransposeMatrix(m) {
    var result = new Matrix44();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            result[i][j] = m[j][i];
        }
    }
    return result;
}

function MatrixPointAt(vPos, vTarget, vUp) {
    var newForward = vTarget.subtract(vPos);
    newForward.normalize();

    var a = newForward.multiply(vUp.dot(newForward));
    var newUp = vUp.subtract(a);
    newUp.normalize();

    var newRight = newUp.cross(newForward);

    // manually create "point at" matrix
    var pointAtMatrix = new Matrix44();
    pointAtMatrix.m[0][0] = newRight.x;     pointAtMatrix.m[0][1] = newRight.y;    pointAtMatrix.m[0][2] = newRight.z;
    pointAtMatrix.m[1][0] = newUp.x;        pointAtMatrix.m[1][1] = newUp.y;       pointAtMatrix.m[1][2] = newUp.z;
    pointAtMatrix.m[2][0] = newForward.x;   pointAtMatrix.m[2][1] = newForward.y;  pointAtMatrix.m[2][2] = newForward.z;
    pointAtMatrix.m[3][0] = vPos.x;         pointAtMatrix.m[3][1] = vPos.y;        pointAtMatrix.m[3][2] = vPos.z;         pointAtMatrix.m[3][3] = 1;
    return pointAtMatrix;
}

// Only for Rotation/Translation Matrices
function MatrixQuickInverse(m) {
    var matrix = new Matrix44();
    matrix.m[0][0] = m.m[0][0]; matrix.m[0][1] = m.m[1][0]; matrix.m[0][2] = m.m[2][0]; matrix.m[0][3] = 0;
    matrix.m[1][0] = m.m[0][1]; matrix.m[1][1] = m.m[1][1]; matrix.m[1][2] = m.m[2][1]; matrix.m[1][3] = 0;
    matrix.m[2][0] = m.m[0][2]; matrix.m[2][1] = m.m[1][2]; matrix.m[2][2] = m.m[2][2]; matrix.m[2][3] = 0;
    matrix.m[3][0] = -(m.m[3][0] * matrix.m[0][0] + m.m[3][1] * matrix.m[1][0] + m.m[3][2] * matrix.m[2][0]);
    matrix.m[3][1] = -(m.m[3][0] * matrix.m[0][1] + m.m[3][1] * matrix.m[1][1] + m.m[3][2] * matrix.m[2][1]);
    matrix.m[3][2] = -(m.m[3][0] * matrix.m[0][2] + m.m[3][1] * matrix.m[1][2] + m.m[3][2] * matrix.m[2][2]);
    matrix.m[3][3] = 1;
    return matrix;
}

function VecPlaneIntersect(vPlane_p, vPlane_n, vLineStart, vLineEnd) {
    vPlane_n.normalize();
    var plane_d = -vPlane_n.dot(vPlane_p);
    var ad = vLineStart.dot(vPlane_n);
    var bd = vLineEnd.dot(vPlane_n);
    var t = (-plane_d - ad) / (bd - ad);
    var vLineStartToEnd = vLineEnd.subtract(vLineStart);
    var vLineToIntersect = vLineStartToEnd.multiply(t);
    return vLineStart.add(vLineToIntersect);
}

function TriangleClipAgainstPlane(vPlane_p, vPlane_n, tri) {
    vPlane_n.normalize();

    var dist = function(p) {
        return (vPlane_n.x * p.x + vPlane_n.y * p.y + vPlane_n.z * p.z - vPlane_n.dot(vPlane_p));
    }

    var insidePoints = [];
    var outsidePoints = [];

    for (var i = 0; i < 3; i++) {
        var d = dist(tri.p[i]);
        if (d >= 0)
            insidePoints.push(tri.p[i]);
        else
            outsidePoints.push(tri.p[i]);
    }

    // Triangle is outside of view so return and empty array
    if (insidePoints.length == 0)
        return [];

    // Triangle is fully inside view, so just return it
    if (insidePoints.length == 3)
        return [tri];

    // Triangle is partially out of view so return a subset of it
    if (insidePoints.length == 1 && outsidePoints.length == 2) {
        var newTri = new Triangle();
        
        newTri.col = tri.col;
        // newTri.col = 'rgb(255,0,255)';
        
        newTri.p[0] = insidePoints[0];
        newTri.p[1] = VecPlaneIntersect(vPlane_p, vPlane_n, insidePoints[0], outsidePoints[0]);
        newTri.p[2] = VecPlaneIntersect(vPlane_p, vPlane_n, insidePoints[0], outsidePoints[1]);

        return [newTri];
    }

    // Need to split up into 2 smaller triangles
    if (insidePoints.length == 2 && outsidePoints.length == 1) {
        var newTri1 = new Triangle();
        var newTri2 = new Triangle();
        
        newTri1.col = tri.col;
        newTri2.col = tri.col;
        // newTri1.col = 'rgb(0,0,255)';
        // newTri2.col = 'rgb(0,255,0)';

        newTri1.p[0] = insidePoints[0];
        newTri1.p[1] = insidePoints[1];
        newTri1.p[2] = VecPlaneIntersect(vPlane_p, vPlane_n, insidePoints[0], outsidePoints[0]);

        newTri2.p[0] = insidePoints[1];
        newTri2.p[1] = newTri1.p[2];
        newTri2.p[2] = VecPlaneIntersect(vPlane_p, vPlane_n, insidePoints[1], outsidePoints[0]);

        return [newTri1, newTri2];
    }
}
