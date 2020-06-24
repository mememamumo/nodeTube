document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
           document.getElementById('interactive');
           document.querySelector('.loading').style.display="none";
    }
}

// document.onreadystatechange = function () {
//     const state = document.readyState

//     if (state == "interactive") {
//         document.getElementById("jsMain").style.display = "none";
//     } else if (state == "complete") {
//         setTimeout(function () {
//             document.getElementById('interactive');
//             document.querySelector('.loading').style.display="none";
//             document.getElementById("jsMain").style.display = "block";
//         }, 1000)
//     }
// }