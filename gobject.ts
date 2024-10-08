class GObject {
    color: number;
    verts: Point3[];
    edges: Edge[];

    location: Point3;

    constructor(color: number, verts: Point3[], edges: Edge[], location: Point3) {
        this.color = color;
        this.verts = verts;
        this.edges = edges;
        this.location = location;
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

            img_buf.drawLine(p1x + 80, p1y + 60, p2x + 80, p2y + 60, this.color)
        }
    }

    render(camera: GCamera) {
        this.project_verts(camera);
        this.draw_lines();
    }
}// Add your code here
