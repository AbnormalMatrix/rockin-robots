img_buf = image.create(scene.screen_width(), scene.screen_height())
img_buf.fill(1)
# Cube dimensions
size = 7

# Cube vertices
cv = [  (-1.000000*size, 0.000000*size, 1.000000*size),
  (1.000000*size, 0.000000*size, 1.000000*size),
  (-1.000000*size, 0.000000*size, -1.000000*size),
  (1.000000*size, 0.000000*size, -1.000000*size),
]
camera_x = 0
camera_y = 0
camera_z = 25

rotation_x = 0
rotation_y = 0

def project_point(x, y, z):
    # Apply rotation transformations
    rotated_x = x * Math.cos(rotation_y) - z * Math.sin(rotation_y)
    rotated_z = x * Math.sin(rotation_y) + z * Math.cos(rotation_y)
    
    rotated_y = y * Math.cos(rotation_x) - rotated_z * Math.sin(rotation_x)
    rotated_z = y * Math.sin(rotation_x) + rotated_z * Math.cos(rotation_x)

    # Perspective projection calculation
    projected_x = (rotated_x - camera_x) * scene.screen_width() / (rotated_z - camera_z)
    projected_y = (rotated_y - camera_y) * scene.screen_height() / (rotated_z - camera_z)

    # img_buf.set_pixel(projected_x, projected_y, 0)
    
    return projected_x, projected_y

def draw_line(x1,y1,z1,x2,y2,z2, color):


    # Project 3D points to 2D screen coordinates
    projected_p1 = project_point(x1,y1,z1)
    projected_p2 = project_point(x2,y2,z2)

    # Move pen to the starting point
    
    img_buf.draw_line(projected_p1[0]+80, projected_p1[1]+60, projected_p2[0]+80, projected_p2[1]+60, color)

def draw_cube():
    draw_line(cv[1][0], cv[1][1], cv[1][2], cv[2][0], cv[2][1], cv[2][2], 2);
    draw_line(cv[1][0], cv[1][1], cv[1][2], cv[0][0], cv[0][1], cv[0][2], 2);
    draw_line(cv[2][0], cv[2][1], cv[2][2], cv[0][0], cv[0][1], cv[0][2], 2);
    draw_line(cv[1][0], cv[1][1], cv[1][2], cv[3][0], cv[3][1], cv[3][2], 2);
    draw_line(cv[1][0], cv[1][1], cv[1][2], cv[2][0], cv[2][1], cv[2][2], 2);
    draw_line(cv[3][0], cv[3][1], cv[3][2], cv[2][0], cv[2][1], cv[2][2], 2);






move_up = True

def on_update():
    img_buf.fill(0)

    draw_cube()
    scene.set_background_image(img_buf)
    

    global rotation_y
    rotation_y +=  0.01

    global rotation_x
    rotation_x += controller.dy() * 0.05

    global camera_z
    if controller.A.is_pressed():
        camera_z -= 1
    elif controller.B.is_pressed():
        camera_z += 1

    # global camera_y
    # global move_up
    # if move_up and camera_y >= 6:
    #     camera_y = 5.9
    #     move_up = False
    
    # if not move_up and camera_y <= -6:
    #     camera_y = -5.9
    #     move_up = True

    # if move_up:
    #     camera_y += 0.1
    # else:
    #     camera_y -= 0.1
        
    

game.on_update(on_update)
