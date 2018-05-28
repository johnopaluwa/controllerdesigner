let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
var iirFilter = audioCtx.createIIRFilter([1.0000 ,  -1.8372   , 0.8461], [1.0000 ,  -1.9890 ,   0.9897]);
let magResponseOutput  =new Float32Array(4097)
let phaseResponseOutput = new Float32Array(4097)

var myFrequencyArray = new Float32Array(4097);
fs = 48 * Math.pow(10, 3);
for (var i = 0; i <= 4096; i++) {
   // list.push((fs/2)*(i/4096));
   myFrequencyArray[i] = (fs/2)*(i/4096)
}



 iirFilter.getFrequencyResponse(myFrequencyArray, magResponseOutput, phaseResponseOutput)



 // console.log(phaseResponseOutput)


//console.log(ph)