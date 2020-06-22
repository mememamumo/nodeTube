import routes from "../routes";
import User from "../models/User";
import passport from "passport";

const defaultAvatar = "https://img.icons8.com/ios-filled/500/888888/cat.png";

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "Join"})
};

export const postJoin = async (req, res, next) => {
    const {
        body: {
            name,
            email,
            password,
            password2
        } 
    } = req

    if(password !== password2) {
        res.status(400);
        req.flash("error", "비밀번호가 맞지 않습니다.")
        res.render("join", {pageTitle: "Join"});
    } else {
        try {
            const user = await User({
                name,
                email,
                avatarUrl: defaultAvatar
            });
            await User.register(user, password);
            next();
        } catch (error) {
            console.log(error);
        }
        // res.redirect(routes.home);
    }
};

export const getLogin = (req, res) => {
    res.render("Login", {pageTitle: "Log In"});
};

export const postLogin = passport.authenticate('local',{
    failureRedirect: routes.login,
    successRedirect: routes.home,
    successFlash: "Welcome!",
    failureFlash: "로그인 할 수 없습니다. 이메일 또는 비밀번호를 확인해주세요."
});

//Github
export const githubLogin = passport.authenticate("github",{
    successFlash: "Welcome!",
    failureFlash: "Can't log in at this time."
});

export const githubLoginCallback = async (_, __, profile, cb) => {
    // console.log(profile, cb);
    const {
        _json: { id, avatar_url: avatarUrl, name, email }
    } = profile;
    
    try {
        const user = await User.findOne({ githubId: id });
        if (user) {
            user.githubId = id;
            user.email;
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            githubId: id,
            avatarUrl
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

//Facebook
export const facebookLogin = passport.authenticate("facebook",{
    successFlash: "Welcome!",
    failureFlash: "Can't log in at this time."
});

export const facebookLoginCallback = async (_, __, profile, cb) => {
    const {
        _json: {
            id,
            displayName: name,
            email
        }
    } = profile;
    try {
        const user = await User.findOne({ facebookId: id });
        if (user) {
            user.facebookId = id;
            user.email;
            user.avatarUrl = `https://graph.facebook.com/${id}/picture?type=large`;
            return cb(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avatarUrl: `https://graph.facebook.com/${id}/picture?type=large`
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};

//Kakao
export const kakaoLogin = passport.authenticate("kakao",{
    successFlash: "Welcome!",
    failureFlash: "Can't log in at this time."
});

export const kakaoLoginCallback = async (_, __, profile, done) => {
    // console.log(profile, done);
    const {
        _json: {
            id,
            properties: {
                nickname: name,
                profile_image: avatarUrl
            },
            account_email: email
        }
    } = profile;

    try {
        const user = await User.findOne({ kakaoId: id });
        if (user) {
            user.kakaoId = id;
            return done(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            kakaoId: id,
            avatarUrl
        });
        return done(null, newUser)
    } catch (error) {
        return done(error);
    }
};

export const postKakaoLogin = (req, res) => {
    res.redirect(routes.home);
};

//Naver
export const naverLogin = passport.authenticate("naver",{
    successFlash: "Welcome!",
    failureFlash: "Can't log in at this time."
});

export const naverLoginCallback = async (_, __, profile, done) => {
    const {
        _json: {
            id,
            nickname: name,
            email,
            profile_image
        }
    } = profile;
    // console.log(profile);

    try {
        const user = await User.findOne({ naverId: id });
        if (user) {
            user.naverId = id;
            return done(null, user);
        }
        const newUser = await User.create({
            email,
            name,
            naverId: id,
            avatarUrl: profile_image
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};

export const postNaverLogin = (req, res) => {
    res.redirect(routes.home);
};

//Google
export const googleLogin = passport.authenticate("google",{
    scope: ["profile"],
    successFlash: "Welcome!",
    failureFlash: "Can't log in at this time."
});

export const googleLoginCallback = async (_, __, profile, done) => {
    const {
        _json: {
            sub: id,
            name,
            picture: avatarUrl
        }
    } = profile;

    try {
        const user = await User.findOne({ googleId: id });
        if (user) {
            user.googleId = id;
            return done(null, user);
        }
        const newUser = await User.create({
            name,
            googleId: id,
            avatarUrl
        });
        return done(null, newUser);
    } catch (error) {
        return done(error);
    }
};
export const postGoogleLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    req.logout();
    req.flash("info", "로그아웃 되었습니다. 다음에 또 봬요!")
    res.redirect(routes.home);
};

// export const getMe = (req, res) => {
//     res.render("userDetail", { pageTitle: "User Detail", user:req.user })
// };

export const getMe = async (req, res) => {
    const {
        params: { id },
        user
    } = req;
    try {
        const user = await User.findById(req.user.id).populate("videos");
        res.render("userDetail", { pageTitle: "User Detail", user});
    } catch (error) {
        res.redirect(routes.home);
    }
};

export const userDetail = async (req, res) => {
    const {
        params: { id }
    } = req;
    try {
        const user = await User.findById(id).populate("videos");
        // console.log("user", user);
        res.render("userDetail", {pageTitle: "User Detail", user });
    } catch (error) {
        console.log(error);
        req.flash("error", "유저를 찾을 수 없습니다.")
        res.redirect(routes.home);
    }
};

export const getEditProfile = (req, res) => {
    const {
        user
    } = req;
    res.render("editProfile", { pageTitle: "Edit Profile", user });
};

export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file
    } = req;
    try {
        await User.findByIdAndUpdate(
            req.user.id, {
                name,
                email,
                avatarUrl: file ? file.path : req.user.avatarUrl
                // avatarUrl: `/`+`${file ? file.path : req.user.avatarUrl}`
            }
        );
        req.flash("success", "프로필 수정 완료!")
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        console.log(error);
        req.flash("error", "프로필을 수정할 수 없습니다.")
        res.redirect(`/users` + routes.editProfile);
    }
};

export const getChangePassword = (req, res) => {
    const {
        user
    } = req;
    res.render("changePassword", { pageTitle: "Change Password", user });
};

export const postChangePassword = async (req, res) => {
    const {
        body: {
            oldPassword,
            newPassword,
            newPassword1
        }
    } = req;
    try {
        if (newPassword !== newPassword1) {
            res.status(400);
            req.flash("error", "비밀번호가 맞지 않습니다.")
            res.redirect(`/users/${routes.changePassword}`);
            return;
        }
        await
        req.user.changePassword(oldPassword, newPassword);
        res.redirect(routes.me);
    } catch (error) {
        res.status(400);
        req.flash("error", "비밀번호를 변경할 수 없습니다.")
        res.redirect(`/users/${routes.changePassword}`);
    }
};