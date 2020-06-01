import express from "express";
import passport from "passport";
import routes from "../routes";
import { 
    home, 
    search 
} from "../controllers/videoController";
import {
    getJoin,
    postJoin,
    getLogin,
    postLogin,
    logout,
    githubLogin,
    postGithubLogin,
    facebookLogin,
    postFacebookLogin,
    kakaoLogin,
    postKakaoLogin,
    naverLogin,
    postNaverLogin,
    googleLogin,
    postGoogleLogin,
    getMe
} from "../controllers/userController";
import { onlyPublic, onlyPrivate } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

globalRouter.get(routes.home, home);

globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

globalRouter.get(routes.logout, onlyPrivate, logout);
globalRouter.get(routes.search, search);

//Github
globalRouter.get(routes.gitHub, githubLogin);
globalRouter.get(
    routes.githubCallback,
    passport.authenticate('github', {failureRedirect: "/login"}),
    postGithubLogin
);
//Facebook
globalRouter.get(routes.facebook, facebookLogin);
globalRouter.get(
    routes.facebookCallback,
    passport.authenticate('facebook', {failureRedirect: "/login"
    }),
    postFacebookLogin
);
//Kakao
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
    routes.kakaoCallback,
    passport.authenticate('kakao', {failureRedirect: "/login"}),
    postKakaoLogin
);
//Naver
globalRouter.get(routes.naver, naverLogin);
globalRouter.get(
    routes.naverCallback,
    passport.authenticate('naver', {failureRedirect: "/login"}),
    postNaverLogin
);
//Google
globalRouter.get(routes.google, googleLogin);
globalRouter.get(
	routes.googleCallback,
	passport.authenticate('google', { failureRedirect: "/login" }),
	postGoogleLogin
);

globalRouter.get(routes.me, getMe);

export default globalRouter;