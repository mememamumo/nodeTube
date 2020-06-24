const targetInput = document.querySelector(".input__file");
const preview = document.getElementById("viewVideo");

function handleVideoThumb(e) {
    let videoMetaData = (file) => {
        return new Promise(function(resolve, reject) {
            const source = document.createElement("source");
            const video = document.createElement("video");

            const videoObj = preview.querySelector("video");

            // video.preload = 'metadata';

            source.addEventListener("canplay", function () {
                resolve({
                    video: source,
                    duration: Math.round(source.duration * 1000),
                    height: source.videoHeight,
                    width: source.videoWidth
                });
            });

            source.src = URL.createObjectURL(file);

            video.controls = 'controls';  
            
            if (videoObj !== null) {
                preview.removeChild(preview.childNodes[0]);
                console.log("remove");
            }
            preview.appendChild(video);
            video.appendChild(source);
            console.log("비디오!!");
            
            video.play();

        })
    }

    videoMetaData(this.files[0]).then(function(value) {
        let videoCanvas = document.createElement("canvas");

        videoCanvas.height = value.height;
        videoCanvas.width = value.width;
        videoCanvas.getContext("2d").drawImage(value.video, 0, 0);
        var snapshot = videoCanvas.toDataURL("image/png");

        var img = new Image();
        
        // img.onload = function () {
        //     preview.appendChild(this);
        // };
        
        img.src = snapshot;
    })
}

function init() {
    targetInput.addEventListener("change", handleVideoThumb);
}

if (targetInput) {
    init();
}



