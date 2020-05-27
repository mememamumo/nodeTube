import axios from "axios";
//import routes from "../../routes";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};
const decreaseNum = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};
  let count = 0;

const deleteBtn = async (event, comment) => {
  const btnId = String(event.target.id);
  const content = event.target.previousSibling;
  const text = comment;
  const li = content.parentElement;
  commentList.removeChild(li);
  const data = [btnId, content, text];
  const url = "latest/comment";
  const response = await axios({
    url: `/api/${url}/delete`,
    method: "POST",
    data: {
      data
    }
  });
  if (response.status === 200) {
    decreaseNum();
  }
};

const addComment = (comment, commentData) => {
  const data = commentData;
  console.log(data);
  const li = document.createElement("li");
  // <img class="u-avatar" src=${}></img>
  // <p class="u-name">${}</p>
  const newComment = `
    <div class="comment__content">
      <span class="round sm">
        <img class="u-avatar" src=${data.avatarUrl}></img>
      </span>
      <div class="wrap">
        <p class="u-name">${data.name}</p>
        <div class="jsComment">${comment}</div>
      </div>
    </div>
  `;
  const delBtn = document.createElement("button");
  delBtn.id = String(data._id);
  delBtn.className = "comment__remove";
  delBtn.innerHTML = "❌";
  delBtn.addEventListener("click", () => {
    deleteBtn(event, comment);
  });
  li.innerHTML = newComment;
  li.appendChild(delBtn);
  commentList.prepend(li);
  increaseNumber();
};

const sendComment = async (comment) => {
  count += 1;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
      url: `/api/${videoId}/comment`,
      method: "POST",
      data: {
          comment
      }
  });
  if (response.status === 200) {
      addComment(comment, response, count);
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
}

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
}

if (addCommentForm) {
    init();
}