import routes from "./routes";
import passport from "passport";
import GithubStrategy from "passport-github";
import FacebookStrategy from "passport-facebook";
import KakaoStrategy from "passport-kakao";
import NaverStrategy from "passport-naver";
import GoogleStrategy from "passport-google-oauth20";
import {
    githubLoginCallback,
    facebookLoginCallback,
    kakaoLoginCallback,
    naverLoginCallback,
    googleLoginCallback
} from "./controllers/userController";
import User from "./models/User";

passport.use(User.createStrategy());
passport.use(
    new GithubStrategy({
        clientID: process.env.GH_ID,
        clientSecret: process.env.GH_SECRET,
        callbackURL: process.env.PRODUCTION 
        ? `https://desolate-bastion-42349.herokuapp.com${routes.githubCallback}` 
        : `http://localhost:4000${routes.githubCallback}`
    },
        githubLoginCallback
    )
);

passport.use(
    new FacebookStrategy({
        clientID: process.env.FB_ID,
        clientSecret: process.env.FB_SECRET,
        callbackURL: process.env.PRODUCTION
        ? `https://desolate-bastion-42349.herokuapp.com${routes.facebookCallback}`
        : `http://localhost:4000${routes.facebookCallback}`,
        // callbackURL: "https://localhost:4000/auth/facebook/callback",
        profileFields: ["id", "displayName", "photos", "email"],
        scope: ["public_profile", "email"]
    },
        facebookLoginCallback
    )
);

passport.use(
    new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        clientSecret: process.env.KAKAO_SECRET,
        callbackURL: process.env.PRODUCTION
        ? `https://desolate-bastion-42349.herokuapp.com${routes.kakaoCallback}`
        : `http://localhost:4000${routes.kakaoCallback}`
    },
        kakaoLoginCallback
    )
);

passport.use(
    new NaverStrategy({
        clientID: process.env.NAVER_ID,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.PRODUCTION
        ? `https://desolate-bastion-42349.herokuapp.com${routes.naverCallback}`
        : `http://localhost:4000${routes.naverCallback}`
    },
        naverLoginCallback
    )
);

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: process.env.PRODUCTION
        ? `https://desolate-bastion-42349.herokuapp.com${routes.googleCallback}`
        : `http://localhost:4000${routes.googleCallback}`
    },
        googleLoginCallback
    )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// passport.serializeUser((user,done) => done(null, user));
// passport.deserializeUser((user, done) => done(null, user));