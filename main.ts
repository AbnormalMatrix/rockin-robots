let camera_x = 0
let camera_y = 0
let camera_z = 25
let rotation_x = 0
let rotation_y = 0

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
    project(transform: Point3) {
        // Apply rotation transformations
        let rotated_x = (this.x + transform.x) * Math.cos(rotation_y) - (this.z + transform.z) * Math.sin(rotation_y)
        let rotated_z = (this.x + transform.x) * Math.sin(rotation_y) + (this.z + transform.z) * Math.cos(rotation_y)
        let rotated_y = (this.y + transform.y) * Math.cos(rotation_x) - rotated_z * Math.sin(rotation_x)
        rotated_z = (this.y + transform.y) * Math.sin(rotation_x) + rotated_z * Math.cos(rotation_x)
        // Perspective projection calculation
        this.projected_x = (rotated_x - camera_x) * scene.screenWidth() / (rotated_z - camera_z)
        this.projected_y = (rotated_y - camera_y) * scene.screenHeight() / (rotated_z - camera_z)

    }
}

class Edge {
    p1: number;
    p2: number;

    constructor(p1: number, p2: number) {
        this.p1 = p1;
        this.p2 = p2;
    }
}

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

    project_verts() {
        for (let i = 0; i < this.verts.length; i++) {
            this.verts[i].project(this.location);
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

    render() {
        this.project_verts();
        this.draw_lines();
    }
}

class GScene {

}

let verts: Point3[] = [];
verts.push(new Point3(-0.684551, -1.0807930000000001, -4.086873));
verts.push(new Point3(-0.201194, 1.0807930000000001, -4.587611));
verts.push(new Point3(0.684551, -1.0807930000000001, -4.086873));
verts.push(new Point3(0.201194, 1.0807930000000001, -4.587611));
verts.push(new Point3(-4.310768, 3.605749, -4.086873));
verts.push(new Point3(-4.310768, -3.605749, -4.086873));
verts.push(new Point3(4.310768, -3.605749, -4.086873));
verts.push(new Point3(4.310768, 3.605749, -4.086873));
verts.push(new Point3(-0.201194, 1.0807930000000001, -4.895933));
verts.push(new Point3(-0.684551, -1.0807930000000001, -5.3966709999999996));
verts.push(new Point3(0.684551, -1.0807930000000001, -5.3966709999999996));
verts.push(new Point3(0.201194, 1.0807930000000001, -4.895933));
verts.push(new Point3(-0.684551, 1.0807930000000001, -4.086873));
verts.push(new Point3(0.684551, 1.0807930000000001, -4.086873));
verts.push(new Point3(-0.684551, 1.0807930000000001, -5.3966709999999996));
verts.push(new Point3(0.684551, 1.0807930000000001, -5.3966709999999996));
verts.push(new Point3(-0.201194, 5.486082000000001, -4.587611));
verts.push(new Point3(0.201194, 5.486082000000001, -4.587611));
verts.push(new Point3(-0.201194, 5.486082000000001, -4.895933));
verts.push(new Point3(0.201194, 5.486082000000001, -4.895933));
verts.push(new Point3(-0.684551, -1.0807930000000001, 4.086873));
verts.push(new Point3(-0.201194, 1.0807930000000001, 4.587611));
verts.push(new Point3(0.684551, -1.0807930000000001, 4.086873));
verts.push(new Point3(0.201194, 1.0807930000000001, 4.587611));
verts.push(new Point3(-4.310768, 3.605749, 4.086873));
verts.push(new Point3(-4.310768, -3.605749, 4.086873));
verts.push(new Point3(4.310768, -3.605749, 4.086873));
verts.push(new Point3(4.310768, 3.605749, 4.086873));
verts.push(new Point3(-0.201194, 1.0807930000000001, 4.895933));
verts.push(new Point3(-0.684551, -1.0807930000000001, 5.3966709999999996));
verts.push(new Point3(0.684551, -1.0807930000000001, 5.3966709999999996));
verts.push(new Point3(0.201194, 1.0807930000000001, 4.895933));
verts.push(new Point3(-0.684551, 1.0807930000000001, 4.086873));
verts.push(new Point3(0.684551, 1.0807930000000001, 4.086873));
verts.push(new Point3(-0.684551, 1.0807930000000001, 5.3966709999999996));
verts.push(new Point3(0.684551, 1.0807930000000001, 5.3966709999999996));
verts.push(new Point3(-0.201194, 5.486082000000001, 4.587611));
verts.push(new Point3(0.201194, 5.486082000000001, 4.587611));
verts.push(new Point3(-0.201194, 5.486082000000001, 4.895933));
verts.push(new Point3(0.201194, 5.486082000000001, 4.895933));

let edges: Edge[] = [];
edges.push(new Edge(8, 19));
edges.push(new Edge(8, 11));
edges.push(new Edge(19, 11));
edges.push(new Edge(5, 26));
edges.push(new Edge(5, 25));
edges.push(new Edge(26, 25));
edges.push(new Edge(6, 27));
edges.push(new Edge(6, 26));
edges.push(new Edge(27, 26));
edges.push(new Edge(25, 4));
edges.push(new Edge(25, 5));
edges.push(new Edge(4, 5));
edges.push(new Edge(0, 4));
edges.push(new Edge(0, 12));
edges.push(new Edge(4, 12));
edges.push(new Edge(0, 6));
edges.push(new Edge(0, 5));
edges.push(new Edge(6, 5));
edges.push(new Edge(13, 4));
edges.push(new Edge(13, 7));
edges.push(new Edge(4, 7));
edges.push(new Edge(13, 6));
edges.push(new Edge(13, 2));
edges.push(new Edge(6, 2));
edges.push(new Edge(14, 10));
edges.push(new Edge(14, 9));
edges.push(new Edge(10, 9));
edges.push(new Edge(12, 9));
edges.push(new Edge(12, 0));
edges.push(new Edge(9, 0));
edges.push(new Edge(2, 15));
edges.push(new Edge(2, 13));
edges.push(new Edge(15, 13));
edges.push(new Edge(0, 10));
edges.push(new Edge(0, 2));
edges.push(new Edge(10, 2));
edges.push(new Edge(3, 12));
edges.push(new Edge(3, 13));
edges.push(new Edge(12, 13));
edges.push(new Edge(8, 15));
edges.push(new Edge(8, 14));
edges.push(new Edge(15, 14));
edges.push(new Edge(11, 13));
edges.push(new Edge(11, 15));
edges.push(new Edge(13, 15));
edges.push(new Edge(1, 14));
edges.push(new Edge(1, 12));
edges.push(new Edge(14, 12));
edges.push(new Edge(17, 18));
edges.push(new Edge(17, 16));
edges.push(new Edge(18, 16));
edges.push(new Edge(11, 17));
edges.push(new Edge(11, 3));
edges.push(new Edge(17, 3));
edges.push(new Edge(3, 16));
edges.push(new Edge(3, 1));
edges.push(new Edge(16, 1));
edges.push(new Edge(1, 18));
edges.push(new Edge(1, 8));
edges.push(new Edge(18, 8));
edges.push(new Edge(39, 28));
edges.push(new Edge(39, 31));
edges.push(new Edge(28, 31));
edges.push(new Edge(24, 20));
edges.push(new Edge(24, 32));
edges.push(new Edge(20, 32));
edges.push(new Edge(25, 22));
edges.push(new Edge(25, 20));
edges.push(new Edge(22, 20));
edges.push(new Edge(27, 32));
edges.push(new Edge(27, 33));
edges.push(new Edge(32, 33));
edges.push(new Edge(26, 33));
edges.push(new Edge(26, 22));
edges.push(new Edge(33, 22));
edges.push(new Edge(30, 34));
edges.push(new Edge(30, 29));
edges.push(new Edge(34, 29));
edges.push(new Edge(29, 32));
edges.push(new Edge(29, 20));
edges.push(new Edge(32, 20));
edges.push(new Edge(35, 22));
edges.push(new Edge(35, 33));
edges.push(new Edge(22, 33));
edges.push(new Edge(30, 20));
edges.push(new Edge(30, 22));
edges.push(new Edge(20, 22));
edges.push(new Edge(33, 21));
edges.push(new Edge(33, 23));
edges.push(new Edge(21, 23));
edges.push(new Edge(34, 31));
edges.push(new Edge(34, 28));
edges.push(new Edge(31, 28));
edges.push(new Edge(35, 23));
edges.push(new Edge(35, 31));
edges.push(new Edge(23, 31));
edges.push(new Edge(32, 28));
edges.push(new Edge(32, 21));
edges.push(new Edge(28, 21));
edges.push(new Edge(38, 37));
edges.push(new Edge(38, 36));
edges.push(new Edge(37, 36));
edges.push(new Edge(37, 31));
edges.push(new Edge(37, 23));
edges.push(new Edge(31, 23));
edges.push(new Edge(36, 23));
edges.push(new Edge(36, 21));
edges.push(new Edge(23, 21));
edges.push(new Edge(38, 21));
edges.push(new Edge(38, 28));
edges.push(new Edge(21, 28));
edges.push(new Edge(7, 24));
edges.push(new Edge(7, 27));
edges.push(new Edge(24, 27));
edges.push(new Edge(8, 18));
edges.push(new Edge(8, 19));
edges.push(new Edge(18, 19));
edges.push(new Edge(5, 6));
edges.push(new Edge(5, 26));
edges.push(new Edge(6, 26));
edges.push(new Edge(6, 7));
edges.push(new Edge(6, 27));
edges.push(new Edge(7, 27));
edges.push(new Edge(25, 24));
edges.push(new Edge(25, 4));
edges.push(new Edge(24, 4));
edges.push(new Edge(0, 5));
edges.push(new Edge(0, 4));
edges.push(new Edge(5, 4));
edges.push(new Edge(0, 2));
edges.push(new Edge(0, 6));
edges.push(new Edge(2, 6));
edges.push(new Edge(13, 12));
edges.push(new Edge(13, 4));
edges.push(new Edge(12, 4));
edges.push(new Edge(13, 7));
edges.push(new Edge(13, 6));
edges.push(new Edge(7, 6));
edges.push(new Edge(14, 15));
edges.push(new Edge(14, 10));
edges.push(new Edge(15, 10));
edges.push(new Edge(12, 14));
edges.push(new Edge(12, 9));
edges.push(new Edge(14, 9));
edges.push(new Edge(2, 10));
edges.push(new Edge(2, 15));
edges.push(new Edge(10, 15));
edges.push(new Edge(0, 9));
edges.push(new Edge(0, 10));
edges.push(new Edge(9, 10));
edges.push(new Edge(3, 1));
edges.push(new Edge(3, 12));
edges.push(new Edge(1, 12));
edges.push(new Edge(8, 11));
edges.push(new Edge(8, 15));
edges.push(new Edge(11, 15));
edges.push(new Edge(11, 3));
edges.push(new Edge(11, 13));
edges.push(new Edge(3, 13));
edges.push(new Edge(1, 8));
edges.push(new Edge(1, 14));
edges.push(new Edge(8, 14));
edges.push(new Edge(17, 19));
edges.push(new Edge(17, 18));
edges.push(new Edge(19, 18));
edges.push(new Edge(11, 19));
edges.push(new Edge(11, 17));
edges.push(new Edge(19, 17));
edges.push(new Edge(3, 17));
edges.push(new Edge(3, 16));
edges.push(new Edge(17, 16));
edges.push(new Edge(1, 16));
edges.push(new Edge(1, 18));
edges.push(new Edge(16, 18));
edges.push(new Edge(39, 38));
edges.push(new Edge(39, 28));
edges.push(new Edge(38, 28));
edges.push(new Edge(24, 25));
edges.push(new Edge(24, 20));
edges.push(new Edge(25, 20));
edges.push(new Edge(25, 26));
edges.push(new Edge(25, 22));
edges.push(new Edge(26, 22));
edges.push(new Edge(27, 24));
edges.push(new Edge(27, 32));
edges.push(new Edge(24, 32));
edges.push(new Edge(26, 27));
edges.push(new Edge(26, 33));
edges.push(new Edge(27, 33));
edges.push(new Edge(30, 35));
edges.push(new Edge(30, 34));
edges.push(new Edge(35, 34));
edges.push(new Edge(29, 34));
edges.push(new Edge(29, 32));
edges.push(new Edge(34, 32));
edges.push(new Edge(35, 30));
edges.push(new Edge(35, 22));
edges.push(new Edge(30, 22));
edges.push(new Edge(30, 29));
edges.push(new Edge(30, 20));
edges.push(new Edge(29, 20));
edges.push(new Edge(33, 32));
edges.push(new Edge(33, 21));
edges.push(new Edge(32, 21));
edges.push(new Edge(34, 35));
edges.push(new Edge(34, 31));
edges.push(new Edge(35, 31));
edges.push(new Edge(35, 33));
edges.push(new Edge(35, 23));
edges.push(new Edge(33, 23));
edges.push(new Edge(32, 34));
edges.push(new Edge(32, 28));
edges.push(new Edge(34, 28));
edges.push(new Edge(38, 39));
edges.push(new Edge(38, 37));
edges.push(new Edge(39, 37));
edges.push(new Edge(37, 39));
edges.push(new Edge(37, 31));
edges.push(new Edge(39, 31));
edges.push(new Edge(36, 37));
edges.push(new Edge(36, 23));
edges.push(new Edge(37, 23));
edges.push(new Edge(38, 36));
edges.push(new Edge(38, 21));
edges.push(new Edge(36, 21));
edges.push(new Edge(7, 4));
edges.push(new Edge(7, 24));
edges.push(new Edge(4, 24));

let img_buf = image.create(scene.screenWidth(), scene.screenHeight())
let planeLocation = new Point3(0, -10, 0);
let planeObj = new GObject(7, verts, edges, planeLocation);
planeObj.project_verts();
planeObj.draw_lines();

let bodyVerts: Point3[] = [];
bodyVerts.push(new Point3(0.0, -7.0, -7.0));
bodyVerts.push(new Point3(0.0, 7.0, -7.0));
bodyVerts.push(new Point3(4.949749000000001, -7.0, -4.949749000000001));
bodyVerts.push(new Point3(4.949749000000001, 7.0, -4.949749000000001));
bodyVerts.push(new Point3(7.0, -7.0, 0.0));
bodyVerts.push(new Point3(7.0, 7.0, 0.0));
bodyVerts.push(new Point3(4.949749000000001, -7.0, 4.949749000000001));
bodyVerts.push(new Point3(4.949749000000001, 7.0, 4.949749000000001));
bodyVerts.push(new Point3(0.0, -7.0, 7.0));
bodyVerts.push(new Point3(0.0, 7.0, 7.0));
bodyVerts.push(new Point3(-4.949749000000001, -7.0, 4.949749000000001));
bodyVerts.push(new Point3(-4.949749000000001, 7.0, 4.949749000000001));
bodyVerts.push(new Point3(-7.0, -7.0, 0.0));
bodyVerts.push(new Point3(-7.0, 7.0, 0.0));
bodyVerts.push(new Point3(-4.949749000000001, -7.0, -4.949749000000001));
bodyVerts.push(new Point3(-4.949749000000001, 7.0, -4.949749000000001));

let bodyEdges: Edge[] = [];
bodyEdges.push(new Edge(1, 2));
bodyEdges.push(new Edge(1, 0));
bodyEdges.push(new Edge(2, 0));
bodyEdges.push(new Edge(3, 4));
bodyEdges.push(new Edge(3, 2));
bodyEdges.push(new Edge(4, 2));
bodyEdges.push(new Edge(5, 6));
bodyEdges.push(new Edge(5, 4));
bodyEdges.push(new Edge(6, 4));
bodyEdges.push(new Edge(7, 8));
bodyEdges.push(new Edge(7, 6));
bodyEdges.push(new Edge(8, 6));
bodyEdges.push(new Edge(9, 10));
bodyEdges.push(new Edge(9, 8));
bodyEdges.push(new Edge(10, 8));
bodyEdges.push(new Edge(11, 12));
bodyEdges.push(new Edge(11, 10));
bodyEdges.push(new Edge(12, 10));
bodyEdges.push(new Edge(13, 9));
bodyEdges.push(new Edge(13, 5));
bodyEdges.push(new Edge(9, 5));
bodyEdges.push(new Edge(13, 14));
bodyEdges.push(new Edge(13, 12));
bodyEdges.push(new Edge(14, 12));
bodyEdges.push(new Edge(15, 0));
bodyEdges.push(new Edge(15, 14));
bodyEdges.push(new Edge(0, 14));
bodyEdges.push(new Edge(6, 10));
bodyEdges.push(new Edge(6, 14));
bodyEdges.push(new Edge(10, 14));
bodyEdges.push(new Edge(1, 3));
bodyEdges.push(new Edge(1, 2));
bodyEdges.push(new Edge(3, 2));
bodyEdges.push(new Edge(3, 5));
bodyEdges.push(new Edge(3, 4));
bodyEdges.push(new Edge(5, 4));
bodyEdges.push(new Edge(5, 7));
bodyEdges.push(new Edge(5, 6));
bodyEdges.push(new Edge(7, 6));
bodyEdges.push(new Edge(7, 9));
bodyEdges.push(new Edge(7, 8));
bodyEdges.push(new Edge(9, 8));
bodyEdges.push(new Edge(9, 11));
bodyEdges.push(new Edge(9, 10));
bodyEdges.push(new Edge(11, 10));
bodyEdges.push(new Edge(11, 13));
bodyEdges.push(new Edge(11, 12));
bodyEdges.push(new Edge(13, 12));
bodyEdges.push(new Edge(5, 3));
bodyEdges.push(new Edge(5, 1));
bodyEdges.push(new Edge(3, 1));
bodyEdges.push(new Edge(1, 15));
bodyEdges.push(new Edge(1, 13));
bodyEdges.push(new Edge(15, 13));
bodyEdges.push(new Edge(13, 11));
bodyEdges.push(new Edge(13, 9));
bodyEdges.push(new Edge(11, 9));
bodyEdges.push(new Edge(9, 7));
bodyEdges.push(new Edge(9, 5));
bodyEdges.push(new Edge(7, 5));
bodyEdges.push(new Edge(5, 1));
bodyEdges.push(new Edge(5, 13));
bodyEdges.push(new Edge(1, 13));
bodyEdges.push(new Edge(13, 15));
bodyEdges.push(new Edge(13, 14));
bodyEdges.push(new Edge(15, 14));
bodyEdges.push(new Edge(15, 1));
bodyEdges.push(new Edge(15, 0));
bodyEdges.push(new Edge(1, 0));
bodyEdges.push(new Edge(14, 0));
bodyEdges.push(new Edge(14, 2));
bodyEdges.push(new Edge(0, 2));
bodyEdges.push(new Edge(2, 4));
bodyEdges.push(new Edge(2, 6));
bodyEdges.push(new Edge(4, 6));
bodyEdges.push(new Edge(6, 8));
bodyEdges.push(new Edge(6, 10));
bodyEdges.push(new Edge(8, 10));
bodyEdges.push(new Edge(10, 12));
bodyEdges.push(new Edge(10, 14));
bodyEdges.push(new Edge(12, 14));
bodyEdges.push(new Edge(14, 2));
bodyEdges.push(new Edge(14, 6));
bodyEdges.push(new Edge(2, 6));


let bodyObj = new GObject(3, bodyVerts, bodyEdges, new Point3(0, 0, 0));
bodyObj.project_verts();
bodyObj.draw_lines();
img_buf.fill(1)
//  Cube dimensions
let size = 7;


let moveUp = true;

game.onUpdate(function on_update() {
    img_buf.fill(0);

    planeObj.render();
    bodyObj.render();

    if (moveUp) {
        planeObj.move(new Point3(0, 0.1, 0));
        if (planeObj.location.y >= 10) {
            moveUp = false;
        }
    } else {
        planeObj.move(new Point3(0, -0.1, 0));
        if (planeObj.location.y <= -10) {
            moveUp = true;
        }
    }

    scene.setBackgroundImage(img_buf);
    
    rotation_y += 0.01;
    
    rotation_x += controller.dy() * 0.05;
    
    if (controller.A.isPressed()) {
        camera_z -= 1;
    } else if (controller.B.isPressed()) {
        camera_z += 1;
    }
    
})
