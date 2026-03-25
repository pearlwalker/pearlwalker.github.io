let pageTitle, songList, elementArray;
let songFiles = [];

export const retrieveSongFilesJSON = (data) => {
    songList = data.audioFiles;
    for (let element of songList) {
        songFiles.push(element.filename);
    }
    return songFiles;
}
export const handleDataJSON = (data) => {
    pageTitle = data.title;
    songList = data.audioFiles;
    elementArray = data.htmlElements;
    //make HTML elements
    const playButton = elementArray[0];
    const fsButton = elementArray[1];
    const trackSelect = elementArray[2];
    const volume = elementArray[3];
    const highshelf = elementArray[4];
    const lowshelf = elementArray[5];
    const barsCB = elementArray[6];
    const circlesCB = elementArray[7];
    const secretsCB = elementArray[8];
    const freqRadio = elementArray[9];
    const waveRadio = elementArray[10];

    // Set page title
    document.querySelector("#page-title").innerHTML = pageTitle;

    // Initialize play button to paused
    document.querySelector("#btn-play").dataset.playing = playButton.dataPlaying;

    // Set songs in track select
    for (let element of songList) {
        document.querySelector("#select-track").innerHTML +=
            `<option value=${element.filename}>${element.songname}</option>`;
    }

    // Create sliders
    // Volume
    document.querySelector("#section-b").innerHTML +=
        `<label for=${volume.id} class=${volume.class}>Volume</label><span id="label-volume">???</span>
        <input id=${volume.id} type=${volume.type} min=${volume.min} max=${volume.max} 
        value=${volume.value} step=${volume.step}>`;

    // Highshelf
    document.querySelector("#section-b").innerHTML +=
        `<label for=${highshelf.id} class=${highshelf.class}>Highshelf</label><span id="label-highshelf">???</span>
        <input id =${highshelf.id} type=${highshelf.type} min=${highshelf.min} max=${highshelf.max} 
        value=${highshelf.value} step=${highshelf.step}>`;

    // Lowshelf
    document.querySelector("#section-b").innerHTML +=
        `<label for=${lowshelf.id} class=${lowshelf.class}>Lowshelf</label><span id="label-lowshelf">???</span>
        <input id = ${lowshelf.id} type=${lowshelf.type} min=${lowshelf.min} max=${lowshelf.max} 
        value=${lowshelf.value} step=${lowshelf.step}>`;

    // Create checkbox for bars
    document.querySelector("#span-cb-bars").innerHTML =
        `<input type=${barsCB.type} id=${barsCB.id}>
        <label for=${barsCB.id} class=${barsCB.class}>Show Bars?</label>`;
    // Create checkbox for circles
    document.querySelector("#span-cb-circles").innerHTML =
        `<input type=${circlesCB.type} id=${circlesCB.id}>
        <label for=${circlesCB.id} class=${circlesCB.class}>Show Circles?</label>`;

    // Create checkbox for secrets
    document.querySelector("#span-cb-secrets").innerHTML =
        `<input type=${secretsCB.type} id=${secretsCB.id}>
        <label for=${secretsCB.id} class=${secretsCB.class}>Show Secrets?</label>`;

    //Create label for radio
    document.querySelector("#radio-display").innerHTML +=
        `<label for="radio-display" class="label-above">Toggle Visualization</label>`;

    // Create Frequency radio option
    document.querySelector("#radio-display").innerHTML +=
        `<label for=${freqRadio.id} class=${freqRadio.class}>Frequency</label>
         <input type=${freqRadio.type} id=${freqRadio.id} 
         value=${freqRadio.value} name=${freqRadio.name}>`;

    // Create Waveform radio option
    document.querySelector("#radio-display").innerHTML +=
        `<label for=${waveRadio.id} class=${waveRadio.class}>Waveform</label>
         <input type=${waveRadio.type} id=${waveRadio.id} 
         value=${waveRadio.value} name=${waveRadio.name}>`;

    // Init bars and circles as checked
    document.querySelector(`#${barsCB.id}`).checked = barsCB.initChecked;
    document.querySelector(`#${circlesCB.id}`).checked = circlesCB.initChecked;

    // Init frequency as checked, waveform as unchecked
    document.querySelector(`#${freqRadio.id}`).checked = freqRadio.initChecked;
    document.querySelector(`#${waveRadio.id}`).checked = waveRadio.initChecked;

    // Disable secrets (they're secret!)
    document.querySelector(`#${secretsCB.id}`).disabled = secretsCB.disabled;
}

export { songFiles }