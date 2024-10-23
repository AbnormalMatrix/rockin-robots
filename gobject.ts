class GObject {
    color: number;
    verts: Point3[];
    edges: Edge[];

    location: Point3;

    // Object tag
    tag: string;

    // Physics stuff
    // Velocity
    vx: number;
    vy: number;
    vz: number;
    // Acceleration
    ax: number;
    ay: number;
    az: number;
    // Time of the last physics tick in ms
    lastPhysicsTick = game.runtime();

    constructor(color: number, verts: Point3[], edges: Edge[], location: Point3, tag?: string) {
        this.color = color;

        // Manually copy the verts array
        this.verts = [];
        for (let i = 0; i < verts.length; i++) {
            this.verts.push(new Point3 (verts[i].x, verts[i].y, verts[i].z));
        }

        // Manually copy the edges array
        this.edges = [];
        for (let i = 0; i < edges.length; i++) {
            this.edges.push(new Edge(edges[i].p1, edges[i].p2)); 
        }

        // Manually copy the location object (shallow copy)
        this.location = new Point3(location.x, location.y, location.z); 

        this.tag = tag;

        // Set all physics properties to 0
        this.vx = 0;
        this.vy = 0;
        this.vz = 0;
        
        this.ax = 0;
        this.ay = 0;
        this.az = 0;
    }

    move(deltaTransform: Point3) {
        this.location.x += deltaTransform.x;
        this.location.y += deltaTransform.y;
        this.location.z += deltaTransform.z;
    }

    project_verts(camera: GCamera) {
        for (let i = 0; i < this.verts.length; i++) {
            this.verts[i].project(this.location, camera);
        }
    }

    draw_lines() {
        for (let i = 0; i < this.edges.length; i++) {
            

            let p1x = this.verts[this.edges[i].p1].projected_x;
            let p1y = this.verts[this.edges[i].p1].projected_y;

            let p2x = this.verts[this.edges[i].p2].projected_x;
            let p2y = this.verts[this.edges[i].p2].projected_y;

            if (p1x == -1 || p1y == -1 || p2x == -1 || p2y == -1) {
                break;
            }

            img_buf.drawLine(p1x + 80, p1y + 60, p2x + 80, p2y + 60, this.color)
        }
    }

    render(camera: GCamera) {
        this.project_verts(camera);
        this.draw_lines();
    }

    physicsTick() {
        const dt = game.runtime() - this.lastPhysicsTick;
        this.vx = this.vx + dt * this.ax;
        this.vy = this.vy + dt * this.ay;
        this.vz = this.vz + dt * this.az;
    }
}
