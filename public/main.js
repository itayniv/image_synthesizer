
let onLoad = false;
let container;

let classifier;
// let video;
let stream;
let pitch = [];
let noteArr = [];
let pattern = [];
let thingsArr = [];
let yoloLoaded = false;
let yolo;
let resultArray1 = [];
let started = false;

let synthOne;
let synthTwo;
let synthThree;
let closenessArr = [];

// src="http://58.94.253.150:60001/cgi-bin/snapshot.cgi?chn=0&u=admin&p=&q=0&1539648491"
const imagestodetect = '/images/cat.jpg';
// const crossorigin = 'crossorigin="anonymous"';

const synth1 = window.speechSynthesis;

// const classifier = ml5.imageClassifier('MobileNet', modelLoaded);

/// on page load do the next things:

$.ajax({
  url: "/GetGridSize",
  context: document.body
}).done(function(data) {

});

//on page load finish do the next things:

window.onload = function() {
  onLoad = true;
  console.log('hello from script');
  init();
};




function convertRange( value, r1, r2 ) {
  return ( value - r1[ 0 ] ) * ( r2[ 1 ] - r2[ 0 ] ) / ( r1[ 1 ] - r1[ 0 ] ) + r2[ 0 ];
}




// When the model is loaded
function modelLoaded() {
  console.log('Model Loaded!');
}


let image = document.getElementById('MediaStreamVideo');


function init(){

}


// Promise
const assignVideo = new Promise((resolve, reject) => { // fat arrow
  resolve(image.src);
}
);

const playVideo = function () {
  console.log("here");
};


const yoloInt = function () {
  // Create a YOLO method
  classifier = ml5.imageClassifier('MobileNet',  { version: 1, alpha: 1.0, topk: 8 }, modelLoaded);
  yoloLoaded = true;
  console.log("classifierLoaded",yoloLoaded)
  return Promise.resolve(classifier);
};



// call our promise
const playvideoandClassify = function () {
  assignVideo
  .then(yoloInt)
  .catch(error => console.log("error",error.videoAction)); // fat arrow
};


function predict1(predImage){
  if(yoloLoaded == true){
    classifier.predict(predImage, gotResult1);
  }
}

function predict2(predImage){
  if(yoloLoaded == true){
    classifier.predict(predImage, gotResult2);
  }
}

function predict3(predImage){
  if(yoloLoaded == true){
    classifier.predict(predImage, gotResult3);
  }
}

function predict4(predImage){
  if(yoloLoaded == true){
    classifier.predict(predImage, gotResult4);
  }
}


// setInterval(predict, 20000);

playvideoandClassify();


function gotResult1(err, results) {
  console.log("gotResult1");
  if (err) {
    console.error(err);
  }
  // The results are in an array ordered by probability.
  console.log("results", results)
  closenessArr = [];
  for (var i = 0; i < results.length; i++) {
    closenessArr.push(results[i].probability);
    // console.log(results[i].probability);
  }

  console.log(closenessArr);
  let newNotes = convertDiamToNote(closenessArr);
  console.log("newNotes", newNotes);

  ////////

  if (started){
    Tone.Transport.stop();
    // seq.stop();
    console.log("stop");
  }



  Tone.Transport.bpm.value = 120;
  Tone.Transport.start();
  synthOne = createSyntOnehWithEffects();

  let newNotelength1 = [];
  newNotelength1 = noteLength(closenessArr);
  console.log("newNotelength1", newNotelength1);



  if(newNotes != null){
    var seq = new Tone.Sequence(playNote1, newNotes, newNotelength1[0]);
    seq.start();
    console.log("start this sequencer1");
  }



  started = true;
  ////////
}



///convert daim to note
function convertDiamToNote(diamArray){

  let myArr = [];
  if (diamArray != undefined ){
    for (var i = 0; i < diamArray.length; i++) {
      let note;
      switch (Math.floor(convertRange( diamArray[i], [ -.01, .9 ], [ 1, 22 ] ))) {
        case 1:
        note = 196.00;
        break;
        case 2:
        note = 220.00;
        break;
        case 3:
        note = 246.94;
        break;
        case 4:
        note = 261.63;
        break;
        case 5:
        note = 293.66;
        break;
        case 6:
        note = 329.63;
        break;
        case 7:
        note = 369.99;
        break;
        case 8:
        note = 392.00;
        break;
        case 9:
        note = 440.00;
        break;
        case 10:
        note = 493.88;
        break;
        case 11:
        note = 523.25;
        break;
        case 12:
        note = 587.33;
        break;
        case 13:
        note = 659.25;
        break;
        case 14:
        note = 739.99;
        break;
        case 15:
        note = 783.99;
        break;
        case 16:
        note = 880.00;
        break;
        case 17:
        note = 987.77;
        break;
        case 18:
        note = 1046.50;
        break;
        case 19:
        note = 1174.66;
        break;
        case 20:
        note = 1318.51;
        break;
        case 21:
        note = 1479.98;
        break;
        case 22:
        note = 1567.98;
      }
      myArr.push(note);
    }

  }
  return myArr;
}





function noteLength(arrLength){

  let noteArraylength = [];
  let noteLength;

  for (var i = 0; i < arrLength.length; i++) {
    let note;
    switch ( Math.floor( convertRange( arrLength[i], [ 0.0, 0.8 ], [ 0, 22 ] ))) {
      case 0:
      noteLength = "1n";
      break;
      case 1:
      noteLength = "1n";
      break;
      case 2:
      noteLength = "2n";
      break;
      case 3:
      noteLength = "2n";
      break;
      case 4:
      noteLength = "4n";
      break;
      case 5:
      noteLength = "4n";
      break;
      case 6:
      noteLength = "4n";
      break;
      case 7:
      noteLength = "4n";
      break;
      case 8:
      noteLength = "6n";
      break;
      case 9:
      noteLength = "6n";
      break;
      case 10:
      noteLength = "6n";
      break;
      case 11:
      noteLength = "8n";
      break;
      case 12:
      noteLength = "8n";
      break;
      case 13:
      noteLength = "8n";
      break;
      case 14:
      noteLength = "10n";
      break;
      case 15:
      noteLength = "10n";
      break;
      case 16:
      noteLength = "12n";
      break;
      case 17:
      noteLength = "12n";
      break;
      case 18:
      noteLength = "12n";
      break;
      case 19:
      noteLength = "14n";
      break;
      case 20:
      noteLength = "16n";
      break;
      case 21:
      noteLength = "16n";
      break;
      case 22:
      noteLength = "18n";

    }
    noteArraylength.push(noteLength);

  }
  // console.log("noteArraylength", noteArraylength)
  return noteArraylength;
}


//////// --------> Tone Js Stuff



function playNote1(time, note) {
  if (note != undefined) {
    synthOne.triggerAttackRelease(note, "4n");
    console.log("play notes1");
  }
}





function createSyntOnehWithEffects()  {
  let vol = new Tone.Volume(0).toMaster();

  let reverb = new Tone.Freeverb(0.2).connect(vol);
  reverb.wet.value = 0.2;

  let delay = new Tone.FeedbackDelay(0.304, 0.5).connect(reverb);
  delay.wet.value = 0.2;

  let vibrato = new Tone.Vibrato(5, 0.1).connect(delay);

  let polySynth = new Tone.PolySynth(3, Tone.Synth, {
    "oscillator": {
      "type": "sine"
    },
    "envelope": {
      "attack": 0.8,
      "decay": 0.9,
      "sustain": 0.6,
      "release": 7,
    }
  });
  return polySynth.connect(vibrato);
}







var synth11 = new Tone.Synth({
  "oscillator" : {
    "type" : "amtriangle",
    "harmonicity" : 0.5,
    "modulationType" : "sine"
  },
  "envelope" : {
    "attackCurve" : 'exponential',
    "attack" : 0.05,
    "decay" : 0.2,
    "sustain" : 0.2,
    "release" : 0.5,
  },
  "portamento" : 0.05
}).toMaster();
