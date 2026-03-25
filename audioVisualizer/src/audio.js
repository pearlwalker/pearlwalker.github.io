export let audioCtx, analyserNode, gainNode, biquadFilterNode;
let audioElement, sourceNode

const DEFAULTS = Object.freeze({ gain: 0.5, numSamples: 256 });
let audioData = new Uint8Array(DEFAULTS.numSamples / 2);

export const playCurrentSound = () => {
    audioElement.play();
};

export const pauseCurrentSound = () => {
    audioElement.pause();
};

/**
 * loadSoundFile:
 * @param {string} filePath 
 */
export const loadSoundFile = (filePath) => {
    audioElement.src = filePath;
};

/**
 * setGain:
 * @param {number} value set to Gain
 */
export const setGain = (value) => {
    value = Number(value); // Pass in number;
    gainNode.gain.value = value; // Set gain to value
};

export const setHighshelf = (value) => {
    value = Number(value);
    biquadFilterNode.type = "highshelf"
    biquadFilterNode.gain.value = value
}

/**
 * 
 * @param {number} value 
 */
export const setLowshelf = (value) => {
    value = Number(value);
    biquadFilterNode.type = "lowshelf"
    biquadFilterNode.gain.value = value
}
/**
 * setupWebAudio:
 * @param {string} filePath 
 */
export const setupWebAudio = (filePath) => {
    console.log(`setupWebAudio(filePath) = ${filePath}`)
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    audioCtx = new AudioContext();

    audioElement = new Audio(); // Create <audio> element

    loadSoundFile(filePath); // Set audioElement src

    // Add a "media element source" node to <audio> 
    sourceNode = audioCtx.createMediaElementSource(audioElement);

    // Add a "analyser" node to <audio>
    analyserNode = audioCtx.createAnalyser();
    analyserNode.fftSize = DEFAULTS.numSamples;

    // Add a "biquad filter node"
    biquadFilterNode = audioCtx.createBiquadFilter();

    // Add a "gain" node to <audio>
    gainNode = audioCtx.createGain();
    gainNode.gain.value = DEFAULTS.gain;

    // Connect the nodes to create an audio graph
    // Input -> Source -> Analyser -> Gain -> Output
    sourceNode.connect(analyserNode);
    analyserNode.connect(gainNode);
    gainNode.connect(biquadFilterNode);
    biquadFilterNode.connect(audioCtx.destination);
}