let mainCamera = new GCamera(0, 0, 100, 0.5, Math.PI/2, 0);

let img_buf = image.create(scene.screenWidth(), scene.screenHeight())

img_buf.fill(1)

let moveUp = true;

let mainScene = new GScene([mainCamera], 0, [], []);


forever(function() {
    
    pause(1000);
    switch(randint(1,3)) {
        case 1:
            mainScene.objects.push(new GObject(randint(1, 14), spikeVerts, spikeEdges, new Point3(-250, 0, 25)));
            break;
        case 2:
            mainScene.objects.push(new GObject(randint(1, 14), spikeVerts, spikeEdges, new Point3(-250, 0, 0)));
            break;
        default:
            mainScene.objects.push(new GObject(randint(1, 14), spikeVerts, spikeEdges, new Point3(-250, 0, -25)));
    }
    
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    if (robotHead.location.z > -25) {
        robotHead.move(new Point3(0, 0, -25));
    }
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    if (robotHead.location.z < 25) {
        robotHead.move(new Point3(0, 0, 25));
    }
})


game.onUpdate(function on_update() {
    img_buf.fill(0);

    mainScene.render();

    robotHead.render(mainCamera);

    for (let i = mainScene.objects.length - 1; i >= 0; i--) {
        mainScene.objects[i].move(new Point3(1, 0, 0));
        if (mainScene.objects[i].location.distance(new Point3(0, 0, 0)) > 255) {
            mainScene.objects.splice(i, 1);
        }
    }

    


    scene.setBackgroundImage(img_buf);



    // mainCamera.rotationY += controller.dx() * 0.01;
    
    // mainCamera.rotationX += controller.dy() * 0.01;
    

    
})
