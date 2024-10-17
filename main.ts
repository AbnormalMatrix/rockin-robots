let mainCamera = new GCamera(0, 0, 25, 0, 0, 60);

let img_buf = image.create(scene.screenWidth(), scene.screenHeight())



img_buf.fill(1)

let moveUp = true;



game.onUpdate(function on_update() {
    img_buf.fill(0);

    planeObj.render(mainCamera);
    spikeObj.render(mainCamera);


    spikeObj.move(new Point3(0, 0, 0.5));

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
    
    mainCamera.rotationY += controller.dx() * 0.05;
    
    mainCamera.rotationX += controller.dy() * 0.05;
    
    if (controller.A.isPressed()) {
        mainCamera.z -= 1;
    } else if (controller.B.isPressed()) {
        mainCamera.z += 1;
    }
    
})
