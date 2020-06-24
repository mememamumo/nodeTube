const targetInput = document.querySelector(".input__file-img");
const preview = document.getElementById("viewImage");

function handleProfileThumb(e) {
    const getFile = e.target.files;
    const image = document.createElement("img");

    const imageObj = document.querySelector("img");

    // fileReader 객체생성
    const reader = new FileReader();

    // reader 시작시 함수 구현
    reader.onload = (function (aImg) {
        console.log(1);

        return function (e) {
            console.log(3);
            aImg.src = e.target.result;
        }
    })(image)

    if(getFile) {
        reader.readAsDataURL(getFile[0]);
        console.log(2);
    }

    if (imageObj !== null) {
        preview.removeChild(preview.childNodes[0]);
    }
    
    preview.appendChild(image)
}

function init() {
    targetInput.addEventListener("change", handleProfileThumb);
}

if (targetInput) {
    init();
}