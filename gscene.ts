class GScene {
    /**
     * Contains objects and cameras to be grouped together
     */

    cameras: GCamera[];
    currentCameraIndex: number;

    objects: GObject[];

    uiLines: UiLine[];

    constructor(cameras: GCamera[], currentCameraIndex: number, objects: GObject[], uiLines: UiLine[]) {
        this.cameras = cameras;
        this.currentCameraIndex = currentCameraIndex;
        this.objects = objects;
        this.uiLines = uiLines;
    }

    /** Renders the entire scene */
    render() {
        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].render(this.cameras[this.currentCameraIndex]);
        }
    }

    /** Select the current (active) camera */
    setCurrentCamera(newCameraIndex: number) {
        if (newCameraIndex <= this.cameras.length) {
            this.currentCameraIndex = newCameraIndex;
        }
    } 
}