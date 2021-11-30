class Wheel {

    timeStamp = 0;
    touchY = 0;
    lastY = 0;
    angle = 0;

    constructor(canvas, context, canvasDimensions, dpr, radius) {
        this.radius = radius;
        this.context = context;
        this.canvasDimensions = canvasDimensions;
        this.dpr = dpr;

        this.subscribeEvents();
    }

    subscribeEvents() {

        let mouseDown = false;
        
        canvas.addEventListener('mousedown', () => {
            // console.log('canvas mousedown');
            mouseDown = true;
        });

        canvas.addEventListener('mouseup', () => {
            // console.log('canvas mouseup');
            mouseDown = false;
        });

        canvas.addEventListener('mousemove', (event) => {
            if (!mouseDown) return;
            // console.log('canvas mousemove', event);

            // TODO
            // if mouse moves out the canvas while mousedown
            // no mouseup event happens

            // angle
            this.setAngle(this.radiansToDegrees(event.clientY), this.getVelocity(event.clientY));
        });
    }

    update() {
        this.draw();
    }

    draw() {

        // set translation and scaling before rotating context
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
        context.rotate(this.angle);

        // create a new path
        this.context.beginPath();

        // create arc
        this.context.arc(
            (this.canvasDimensions.width / 2 * dpr), // our x start point (centre of arc)
            (this.canvasDimensions.height / 1.8 * dpr), // our y start point (centre of arc)
            this.radius, // the radius from centre of arc
            0, // start of arc line
            Math.PI * 1.8, // end of line (Math.PI * 2 === full circle)
            false // draw anti-clockwise? doesn't matter in this case
        );

        // how fat do we want the stroke?
        this.context.lineWidth = 20;

        // the colour of the stroke
        this.context.strokeStyle = 'white'

        // close the path
        this.context.closePath();

        // draw it
        this.context.stroke();
    }

    getVelocity(clientY) {

        const timeNow = Date.now();
        const currentY = clientY;

        const dt = timeNow - this.timeStamp;
        const distance = Math.abs(currentY - this.touchY);
        const speed = distance / dt;

        this.touchY = currentY;
        this.timeStamp = timeNow;

        return speed / 20;
    }

    setAngle(yRadians, velocity) {

        // console.log('Wheel.setAngle() yRadians', yRadians);
        // console.log('Wheel.setAngle() velocity', velocity);

        if (yRadians < this.lastY) {
            // console.log('Wheel.setAngle() going up');
            // this.angle -= velocity;
            this.angle -= 0.01;
        }

        if (yRadians > this.lastY) {
            // console.log('Wheel.setAngle() going down');
            // this.angle += velocity;
            this.angle += 0.01;
        }

        this.lastY = yRadians;

        // console.log('Wheel.setAngle() angle', this.angle);

    }

    radiansToDegrees(yPos) {
        return yPos * Math.PI / 180;
    }

}
