import * as utils from "./utilities.js";

let ctx, cWidth, cHeight, gradientBasic, analyserNode, audioData;
export const setCanvas = (canvasElement, node) => {
    ctx = canvasElement.getContext("2d");
    cWidth = canvasElement.width;
    cHeight = canvasElement.height;
    gradientBasic = utils.getLinearGradient(ctx, 0, 0, 0, cHeight,
        [
            { percent: 0, color: `rgb(244, 244, 244)` },
            { percent: 1, color: `rgb(203, 203, 203)` }
        ]
    );

    console.log(`node: ${node}`)
    analyserNode = node;
    audioData = new Uint8Array(analyserNode.fftSize / 2);
};

export const draw = (display, params = {}) => {
    const perro01 = new Image();
    perro01.src = "./media/images/perro01.png";
    const perro02 = new Image();
    perro02.src = "./media/images/perro02.png";

    const gradientRainbow = utils.getLinearGradient(ctx, 0, 0, 0, cHeight, [
        { percent: 0, color: `rgba(255,30,5,0.8)` },
        { percent: 0.2, color: `rgba(255,180,35,0.8)` },
        { percent: 0.4, color: `rgba(255,255,60,0.8)` },
        { percent: 0.6, color: `rgba(165, 242, 120, 0.8)` },
        { percent: 0.8, color: `rgba(30,255,255,0.8)` },
        { percent: 1, color: `rgba(0,0,255,0.8)` }
    ]);
    const gradientTrans = utils.getLinearGradient(ctx, 0, 0, 0, cHeight, [
        { percent: 0, color: `rgb(150, 251, 255)` },
        { percent: 0.5, color: `rgb(246, 143, 226)` },
        { percent: 0.75, color: "white" }
    ])
    let freqBool;
    if (display.displayFreq == true) {
        analyserNode.getByteFrequencyData(audioData);
        freqBool = true;
    } else {
        analyserNode.getByteTimeDomainData(audioData);
        freqBool = false;
    }

    // Create background
    ctx.save();
    ctx.fillStyle = gradientBasic;
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, cWidth, cHeight);
    ctx.restore();

    // Show circles
    if (params.showCircles) {
        // Circles, no bars, frequency display
        if (freqBool === true && params.showBars == false) {
            let maxRadius = cHeight;
            ctx.save();
            for (let i = 0; i < audioData.length; i+=16) {
                let percent = audioData[i] / 255;
                let circleRadius = percent * maxRadius;
                // Outer circle (rainbow gradient)
                ctx.fillStyle = gradientRainbow;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.arc(cWidth / 2, cHeight / 2, circleRadius + (10 * audioData[i] / 128), 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();

                // Inner circle (background color)
                ctx.fillStyle = gradientBasic;
                ctx.beginPath();
                ctx.arc(cWidth / 2, cHeight / 2, circleRadius + (2.5 * audioData[i] / 128), 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }
            ctx.restore();
        } else if (freqBool === false && params.showBars == false) {
            let maxRadius = cHeight / 4;
            ctx.save();
            for (let i = 0; i < audioData.length; i+=16) {
                let percent = audioData[i] / 255;
                let circleRadius = percent * maxRadius;
                ctx.beginPath();
                ctx.fillStyle = gradientTrans;
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;
                ctx.arc(
                    cWidth / 2,
                    (cHeight / 2) ,
                    circleRadius + (100* (audioData[i] / 128)),
                    0,
                    (Math.PI * 2),
                    false);
                ctx.fill();
                ctx.stroke();
                ctx.closePath();
            }

            ctx.restore();
        }
    }
    // Show bars
    if (params.showBars) {
        if (freqBool === true) {
            if (params.showCircles) {
                let maxRadius = cHeight;
                ctx.save();
                for (let i = 0; i < audioData.length; i+=16) {
                    let percent = audioData[i] / 255;
                    let circleRadius = percent * maxRadius;
                    // Outer circle (rainbow gradient)
                    ctx.fillStyle = gradientRainbow;
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(cWidth / 2, cHeight / 2, circleRadius + (10 * audioData[i] / 128), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();

                    // Inner circle (background color)
                    ctx.fillStyle = gradientBasic;
                    ctx.beginPath();
                    ctx.arc(cWidth / 2, cHeight / 2, circleRadius + (2.5 * audioData[i] / 128), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                }
                ctx.restore();
            }
            if (params.showBars) {
                const imageSize = 50;
                ctx.save();
                for (let i = 0; i < audioData.length; i += 2) {
                    ctx.fillStyle = `rgb(${255 - (i * 5)},25,${i * 15})`
                    ctx.strokeStyle = "black"
                    ctx.fillRect(i * imageSize / 2, cHeight, imageSize, (-1 * audioData[i] / 2) - imageSize / 8);
                    ctx.drawImage(perro01, (i * imageSize / 2), (-1 * audioData[i] / 2) + cHeight - imageSize, imageSize, imageSize);
                }
                ctx.restore();
            }
        } else if (freqBool === false) {
            if (params.showCircles) {
                let maxRadius = cHeight / 2;
                ctx.save();
                for (let i = 0; i < audioData.length; i+=16) {
                    let percent = audioData[i] / 255;
                    let circleRadius = percent * maxRadius;
                    ctx.beginPath();
                    ctx.fillStyle = gradientTrans;
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 2;
                    ctx.arc(
                        cWidth / 2,
                        (cHeight / 2) ,
                        circleRadius +(100* (audioData[i] / 128)),
                        0,
                        (Math.PI * 2),
                        false);
                    ctx.fill();
                    ctx.stroke();
                    ctx.closePath();
                }
                ctx.restore();
            }
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 5;
            for (let i = 0; i < audioData.length; i++) {
                const imageSize = 40;
                ctx.strokeStyle = `rgb(${audioData[i] + 150}, 55, 205)`
                ctx.lineTo(
                    i * imageSize / 4,
                    (7 * cHeight / 16) + (audioData[i] / 2)
                )
                ctx.drawImage(
                    perro02,
                    i * imageSize,
                    (7 * cHeight / 16) + (audioData[i] / 2) - imageSize,
                    imageSize,
                    imageSize
                )
                ctx.stroke();

            }
            ctx.closePath();
            ctx.globalAlpha = 0.5
            ctx.fillStyle = gradientBasic
            ctx.fillRect(0, 0, cWidth, cHeight);
            ctx.restore();

            // Middle row
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 10;
            for (let i = 0; i < audioData.length; i += 4) {
                const imageSize = 75;
                ctx.strokeStyle = `rgb(${audioData[i] + 50}, 55, 255)`
                ctx.lineTo(
                    i * imageSize / 4,
                    (9 * cHeight / 16) + (audioData[i] / 2)
                )
                ctx.drawImage(
                    perro02,
                    i * imageSize / 4,
                    (9 * cHeight / 16) + (audioData[i] / 2) - imageSize,
                    imageSize,
                    imageSize
                )
                ctx.stroke();

            }
            ctx.closePath();
            ctx.globalAlpha = 0.5
            ctx.fillStyle = gradientBasic
            ctx.fillRect(0, 0, cWidth, cHeight);
            ctx.restore();

            // Front row
            ctx.save();
            ctx.beginPath();
            ctx.lineWidth = 25;
            for (let i = 0; i < audioData.length; i += 8) {
                const imageSize = 150;
                ctx.strokeStyle = `rgb(${audioData[i]}, 55, 255)`
                ctx.lineTo(
                    i * imageSize / 4,
                    (7 * cHeight / 8) + (audioData[i] / 8)
                )
                ctx.drawImage(
                    perro02,
                    i * imageSize / 8,
                    (7 * cHeight / 8) + (audioData[i] / 8) - imageSize,
                    imageSize,
                    imageSize
                )
                ctx.stroke();
            }
            ctx.closePath();
            ctx.restore();
        }
    }
}