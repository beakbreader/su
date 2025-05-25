let mediaRecorder;
let recordedChunks = [];

const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const video = document.getElementById('recordedVideo');

startBtn.onclick = async () => {
    const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { mediaSource: "screen" }
    });
    mediaRecorder = new MediaRecorder(stream);

    mediaRecorder.ondataavailable = function(event) {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunks, {
            type: "video/webm"
        });
        const url = URL.createObjectURL(blob);
        video.src = url;
        const a = document.createElement("a");
        a.href = url;
        a.download = "recorded_video.webm";
        a.click();
        recordedChunks = [];
    };

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
};

stopBtn.onclick = () => {
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
};
