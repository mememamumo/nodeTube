import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteButton = document.querySelectorAll(".comment__remove");

const decreaseNum = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const deleteCommentBlock = comment => {
    comment.parentNode.removeChild(comment);
    decreaseNum();
};

const deleteComment = async event => {
    event.preventDefault();
    const comment = event.target.parentNode;
    const commentId = String(event.target.id);
    const response = await axios({
        url: `/api/${commentId}/comment/delete`,
        method: "POST",
        data: {
            commentId
        }
    });
    if (response.status === 200) {
        deleteCommentBlock(comment);
    } else {
        console.log(response);
    }
};

function init() {
    deleteButton.forEach(currentComment => {
        currentComment.addEventListener("click", deleteComment);
    });
}

if (commentList) {
    init();
}