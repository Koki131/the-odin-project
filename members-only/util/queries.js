const pool = require("./pool");


const getArticles = async (offset) => {

    const { rows } = await pool.query("select post from articles order by timestamp desc limit 10 offset $1;", [offset]);
    
    return rows;

};

const getArticlesWithUser = async (offset) => {

    const sql = "select users.username, articles.post, articles.timestamp from users join articles on users.id=articles.user_id order by articles.timestamp desc limit 10 offset $1;";
    const { rows } = await pool.query(sql, [offset]);

    

    return rows;

};

const registerUser = async (user) => {

    const { username, password, role } = user;

    await pool.query("insert into users (username, password, role) values ($1, $2, $3)", [username, password, role]);

};

const saveArticle = async (article) => {

    const { post, timestamp, userId } = article;

    await pool.query("insert into articles (post, timestamp, user_id) values ($1, $2, $3)", [post, timestamp, userId]);

};

const userExists = async (username) => {

    const { rows } = await pool.query("select username from users where username=$1", [username]);

    return rows;

};

module.exports = {
    getArticles,
    getArticlesWithUser,
    registerUser,
    saveArticle,
    userExists
};