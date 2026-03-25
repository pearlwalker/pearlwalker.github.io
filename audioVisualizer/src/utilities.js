/**
 * @param {number} red value from 0 to 255
 * @param {number} green value from 0 to 255 
 * @param {number} blue value from 0 to 255
 * @param {number} alpha value from 0.00 to 1.00
 * @returns {string} color
 */
export const makeRGBA = (red = 0, green = 0, blue = 0, alpha = 1) => {
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
};

/**
 * @param {number} min 
 * @param {number} max 
 * @returns {number}
 */
export const getRandom = (min, max) => {
    return Math.random() * (max - min) + min;
};

/**
 * @param {number} floor minimum rgb value
 * @returns {string} random rgba value
 */
export const getRandomRGBA = (floor = 35) => {
    const getByte = () => getRandom(floor, 255 - floor);
    return makeRGBA(getByte(), getByte(), getByte(), 1);
};

/**
 * 
 * @param {object} ctx 
 * @param {number} startX 
 * @param {number} startY 
 * @param {number} endX 
 * @param {number} endY 
 * @param {array} colorStops 
 * @returns 
 */
export const getLinearGradient =
    (ctx, startX, startY, endX, endY, colorStops) => {
        let linearGradient = ctx.createLinearGradient(startX, startY, endX, endY);
        for (let stop of colorStops) {
            linearGradient.addColorStop(stop.percent, stop.color);
        }
        return linearGradient;
    };

// https://developer.mozilla.org/en-US/docs/Web/API/Fullscreen_API
export const goFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullscreen) {
        element.mozRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
};