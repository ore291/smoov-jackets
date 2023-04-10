import mysql from "serverless-mysql";

let pool;

// try {
//    pool = mysql({
//   config: {
//     host: "sql8.freemysqlhosting.net",
//     user: "sql8610163",
//     password: "tMv7D2hg46",
//     port: 3306,
//     database: "sql8610163",
//   },
// });
// } catch (error) {
//   console.log(error)
// }


pool = mysql({
  config: {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "smoov_db",
  },
});

export { pool };
