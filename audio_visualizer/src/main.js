import * as page from "./page.js"
import * as utils from "./utilities.js";
import * as audio from "./audio.js";
import * as visuals from "./visuals.js"

import * as dancer from "./Dancer.js";

const playButton = document.querySelector("#btn-play");
const fsButton = document.querySelector("#btn-fs");
const trackSelect = document.querySelector("#select-track");
let volumeSlider, volumeLabel,
    highshelfSlider, highshelfLabel,
    lowshelfSlider, lowshelfLabel,
    barsCB, circlesCB, secretsCB,
    freqValue, waveValue;
let datasetPlaying;
const imgRef = document.querySelector("#sprite-img");
const perroDancer = new dancer.Dancer(imgRef, 100);
const setupUI = (canvasElement) => {
    //friend()
    //    const imgReference = document.querySelector("#sprite-img");
    //    imgReference.src = "./media/animations/perro-awake.gif";
    //    imgReference.width = 100;

    // Handle fullscreen
    fsButton.onclick = e => { utils.goFullscreen(canvasElement); }

    // Handle play button
    playButton.onclick = e => {
        // If suspended, then resume
        if (audio.audioCtx.state == "suspended") { audio.audioCtx.resume(); }
        if (e.target.dataset.playing == "no") {
            // If paused, then play
            audio.playCurrentSound();
            e.target.dataset.playing = "yes";
            datasetPlaying = "awake";
        } else {
            // If playing, then pause
            audio.pauseCurrentSound();
            e.target.dataset.playing = "no";
            datasetPlaying = "sleeping";
        };
    };

    // Handle volume slider
    volumeSlider.oninput = e => {
        audio.setGain(e.target.value);
        volumeLabel.innerHTML = Math.round((e.target.value / 10) * 100);
    };
    volumeSlider.dispatchEvent(new Event("input"));

    // Handle highshelf slider
    highshelfSlider.oninput = e => {
        audio.setHighshelf(e.target.value);
        highshelfLabel.innerHTML = Math.round(e.target.value);
    }
    highshelfSlider.dispatchEvent(new Event("input"));

    // Handle lowshelf slider
    lowshelfSlider.oninput = e => {
        audio.setLowshelf(e.target.value);
        lowshelfLabel.innerHTML = Math.round(e.target.value);
    }
    lowshelfSlider.dispatchEvent(new Event("input"));

    // Handle track select
    trackSelect.onchange = e => {
        audio.loadSoundFile(`${e.target.value}`);
        if (playButton.dataset.playing == "yes") {
            playButton.dispatchEvent(new MouseEvent("click"));
        };
    };

    // Handle bars checkbox
    barsCB.onchange = e => {
        console.log(`barsCB.checked: ${e.target.checked}`)
    }

    // Handle circles checkbox
    circlesCB.onchange = e => {
        console.log(`circlesCB.checked: ${e.target.checked}`)
    }

    // Handle 

}

const loop = () => {
    setTimeout(loop, 1000 / 120);
    freqValue = document.querySelector("#frequency").checked;
    waveValue = document.querySelector("#waveform").checked;
    const displayType = {
        displayFreq: freqValue,
        displayWave: waveValue
    }
    const drawParams = {
        showBars: barsCB.checked,
        showCircles: circlesCB.checked,
        showSecrets: secretsCB.checked
    }
    // debugger;
    visuals.draw(displayType, drawParams);
    perroDancer.update(datasetPlaying);
}

export const init = async () => {
    // Await av-data JSON retrieval
    const avData = await fetch("./data/av-data.json")
        .then(response => response.json())
        .catch(error => console.log(`Error fetching JSON: ${error}`));
    // Setup page, create elements
    page.handleDataJSON(avData);

    // Set default song to first song in JSON
    const songs = page.retrieveSongFilesJSON(avData);
    audio.setupWebAudio(songs[0]);

    // Assign HTML references to empty variables
    volumeSlider = document.querySelector("#slider-volume");
    volumeLabel = document.querySelector("#label-volume");
    highshelfSlider = document.querySelector("#slider-highshelf");
    highshelfLabel = document.querySelector("#label-highshelf");
    lowshelfSlider = document.querySelector("#slider-lowshelf");
    lowshelfLabel = document.querySelector("#label-lowshelf");
    barsCB = document.querySelector("#cb-bars");
    circlesCB = document.querySelector("#cb-circles");
    secretsCB = document.querySelector("#cb-secrets");

    // Create canvasElement, pass through to setupUI and setCanvas
    const canvasElement = document.querySelector("canvas");
    setupUI(canvasElement);
    visuals.setCanvas(canvasElement, audio.analyserNode);
    loop();

}