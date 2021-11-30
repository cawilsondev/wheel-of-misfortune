let canvas;
let context;
let wheel;

const canvasDimensions = {
    width: 1000, // px
    height: 500 // px
};
const radius = canvasDimensions.width / 6;
const dpr = window.devicePixelRatio;

const init = () => {

    document.addEventListener('DOMContentLoaded', () => {

        canvas = document.getElementById("wheelOfMisfortune");
        context = canvas.getContext("2d");

        setCanvas(() => {

            wheel = new Wheel(canvas, context, canvasDimensions, dpr, radius);
            drawBackground();
            animate();
        });
    });
}

const setCanvas = (done) => {
    console.log('setCanvas() canvas', canvas);

    console.log('setCanvas() dpr', dpr);

    // Set display size (css pixels)
    canvas.style.width = canvasDimensions.width + 'px';
    canvas.style.height = canvasDimensions.height + 'px';

    // Set actual size in memory (scaled to account for extra pixel density)
    // This will prevent it from being all blurry on mobiles
    canvas.width = canvasDimensions.width * dpr;
    canvas.height = canvasDimensions.height * dpr;

    // Normalise coordinate system to use css pixels
    context.scale(dpr, dpr);

    done();
}


const drawBackground = () => {

    context.beginPath();

    // set background
    context.fillStyle = 'grey';

    // fillRect(x, y, width, height)
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect
    context.fillRect(0, 0, (canvasDimensions.width * dpr), (canvasDimensions.height * dpr));

    // draw title
    context.fillStyle = 'white';
    context.font = '45px Roboto';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    
    // fillText(text, x, y [, maxWidth])
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillText
    context.fillText('Wheel of Misfortune', (canvasDimensions.width * dpr / 2), 50);

    context.closePath();
    
}

const animate = () => {

    // this function is called 60 times a second
    // and this is the thing that does it
    // requestAnimationFrame(animate);

    // clear canvas
    // so we're not just overlapping things on top of eachother at 60fps
    // also, set translation and scaling
    // context.setTransform(dpr, 0, 0, dpr, 0, 0);
    // context.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);

    // we've cleared the canvas
    // normalise so a pixel is a pixel regardless of device pixel ratio
    context.scale(dpr, dpr);

    wheel.update();

}