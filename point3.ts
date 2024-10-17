class Point3 {
    x: number;
    y: number;
    z: number;

    projected_x: number;
    projected_y: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;

        // These will be set by the project method
        this.projected_x = 0;
        this.projected_y = 0;
    }
    project(transform: Point3, camera: GCamera) {
        // Apply rotation transformations
        let rotated_x = (this.x + transform.x) * Math.cos(camera.rotationY) - (this.z + transform.z) * Math.sin(camera.rotationY);
        let rotated_z = (this.x + transform.x) * Math.sin(camera.rotationY) + (this.z + transform.z) * Math.cos(camera.rotationY);
        let rotated_y = (this.y + transform.y) * Math.cos(camera.rotationX) - rotated_z * Math.sin(camera.rotationX);
        rotated_z = (this.y + transform.y) * Math.sin(camera.rotationX) + rotated_z * Math.cos(camera.rotationX);

        // Check if the point is behind the camera
        if (rotated_z >= camera.z) {
            this.projected_x = -1;
            this.projected_y = -1;
        } else {
            // Perspective projection calculation
            this.projected_x = (rotated_x - camera.x) * scene.screenWidth() / (rotated_z - camera.z);
            this.projected_y = (rotated_y - camera.y) * scene.screenHeight() / (rotated_z - camera.z);
        }
    }


}// Add your code here
