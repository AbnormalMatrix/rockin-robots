let mainCamera = new GCamera(0, 0, 25, 0, 0);

let img_buf = image.create(scene.screenWidth(), scene.screenHeight())

let bodyObj = new GObject(3, bodyVerts, bodyEdges, new Point3(0, 0, 0));

img_buf.fill(1)

let moveUp = true;

game.onUpdate(function on_update() {
    img_buf.fill(0);

    planeObj.render(mainCamera);
    bodyObj.render(mainCamera);

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
    
    mainCamera.rotationY += 0.01;
    
    mainCamera.rotationX += controller.dy() * 0.05;
    
    if (controller.A.isPressed()) {
        mainCamera.z -= 1;
    } else if (controller.B.isPressed()) {
        mainCamera.z += 1;
    }
    
})
