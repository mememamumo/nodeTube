//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const SEARCH = "/search";
const LOGOUT = "/me/logout";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete"

//Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

//Facebook
const FB = "/auth/facebook";
const FB_CALLBACK = "/auth/facebook/callback";

//Kakao
const KAKAO = "/auth/kakao";
const KAKAO_CALLBACK = "/oauth";

//Naver
const NAVER = "/auth/naver";
const NAVER_CALLBACK = "/auth/naver/callback";

//Google
const GOOGLE = "/auth/google";
const GOOGLE_CALLBACK = "/auth/google/callback";

//API
const API = "/api";
const LATEST_COMMENT = "/latest/comment/delete";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/comment/delete";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if (id) {
            return `/users/${id}`;
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if (id) {
            return `/videos/${id}`;
        } else {
            return VIDEO_DETAIL;
        }
    },
    editVideo: id => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            return EDIT_VIDEO;
        }
    },
    deleteVideo: id => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },
    me: ME,
    gitHub: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    facebook: FB,
    facebookCallback: FB_CALLBACK,
    kakao: KAKAO,
    kakaoCallback: KAKAO_CALLBACK,
    naver: NAVER,
    naverCallback: NAVER_CALLBACK,
    google: GOOGLE,
    googleCallback: GOOGLE_CALLBACK,
    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT,
    latestComment: LATEST_COMMENT
}

export default routes;