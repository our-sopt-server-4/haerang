const pool = require("../modules/pool");
const table = "user";
const table1 = "post";

const blog = {
  checkBlogIdx: async (blogidx) => {
    const query = `SELECT * FROM ${table1} WHERE blogidx = ${blogidx}`;
    try {
      const result = await pool.queryParam(query);
      console.log(result.length);
      if (result[0] === undefined) return true;
      else return false;
    } catch (err) {
      console.log("checkBlogIdx Error: ", err);
      throw err;
    }
  },
  getBlogByIdx: async (blogidx) => {
    const query = `SELECT * FROM ${table}, ${table1}
        WHERE ${table}.useridx = ${table1}.useridx AND ${table1}.blogidx = ${blogidx}`;
    // console.log(query);
    try {
      return await pool.queryParam(query);
    } catch (err) {
      console.log("getBlogByIdx Error: ", err);
      throw err;
    }
  },
  newPost: async (userIdx, content, createdAt) => {
    const fields = "useridx, content, createdAt";
    const questions = "?, ?, ?";
    const values = [userIdx, content, createdAt];
    const query = `INSERT INTO ${table1}(${fields}) VALUES(${questions})`;

    try {
      const result = await pool.queryParamArr(query, values);
      // INSERT 문이 실행되었을 때 삽입된 데이터의 id 얻는 방법
      const insertId = result.insertId;
      return insertId;
    } catch (err) {
      if (err.errno == 1062) {
        console.log("newPost ERROR: ", err.errno, err.code);
        return -1;
      }
      console.log("newPost ERROR: ", err);
      throw err;
    }
  },
  // body에서 content 값 가져옴
  updateBlog: async (blogidx, content) => {
    const value = [content];
    const query = `UPDATE ${table1} SET content = ? WHERE blogidx = ${blogidx}`;
    try {
      return await pool.queryParamArr(query, value);
    } catch (err) {
      if (err.errno == 1062) {
        console.log("updateBlog ERROR: ", err.errno, err.code);
        return -1;
      }
      console.log("updateBlog ERROR: ", err);
      throw err;
    }
  },
  deleteBlog: async (blogidx) => {
    const query = `DELETE FROM ${table1} WHERE blogidx = ${blogidx}`;
    try {
      return await pool.queryParam(query);
    } catch (err) {
      if (err.errno == 1062) {
        console.log("deleteBlog ERROR: ", err.errno, err.code);
        return -1;
      }
      console.log("deleteBlog ERROR: ", err);
      throw err;
    }
  },
};

module.exports = blog;
