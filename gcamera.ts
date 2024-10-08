class GCamera {
    x: number;
    y: number;
    z: number;

    rotationX: number;
    rotationY: number;

    constructor(x: number, y: number, z: number, rotationX: number, rotationY: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
    }
}