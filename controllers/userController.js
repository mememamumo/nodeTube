import routes from "../routes";

// export const join = (req, res) => res.render("join");

export const getJoin = (req, res) => {
    res.render("join", {pageTitle: "Join"})
};

export const postJoin = (req, res) => {
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
        res.render("join", {pageTitle: "Join"});
    } else {
        res.redirect(routes.home);
    }
};

// export const login = (req, res) => res.render("login");

export const getLogin = (req, res) => {
    res.render("Login", {pageTitle: "Log In"});
};

export const postLogin = (req, res) => {
    res.redirect(routes.home);
};

export const logout = (req, res) => {
    // 임시
    res.redirect(routes.home);
};

export const userDetail = (req, res) => {
    res.render("userDetail", {pageTitle: "User Detail"});
};