// 3D camera object for 3D scenes
class GCamera {
    x: number;
    y: number;
    z: number;

    rotationX: number;
    rotationY: number;

    fov: number;

    constructor(x: number, y: number, z: number, rotationX: number, rotationY: number, fov: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.rotationX = rotationX;
        this.rotationY = rotationY;
        this.fov = fov;
    }
}