const pool = require("../modules/pool");
const table = "company";

const company = {
  popularCompany: async (uid) => {
    const query = `SELECT company_idx,company_name, company_industry, company_img,recruit_position, company_location,company_follow,company_hearts,carousel_view_title FROM ${table};`;

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log("인기 회사 조회가 실패했습니다.", err.errno, err.code);
      return -1;
    }
  },
  interestedCompany: async (uid) => {
    const query = `SELECT company_idx,company_name, company_industry, company_img,recruit_position, company_location,company_follow,company_hearts,carousel_view_title FROM ${table};`;

    try {
      const result = await pool.queryParam(query);
      return result;
    } catch (err) {
      console.log("인기 회사 조회가 실패했습니다.", err.errno, err.code);
      return -1;
    }
  },
  changeCompanyHearts: async (company_idx, company_hearts) => {
    const query = `UPDATE ${table} SET company_hearts="${company_hearts}" WHERE company_idx="${company_idx}";`;
    const query2 = `SELECT company_name, company_hearts FROM ${table} WHERE company_idx="${company_idx}";`;
    try {
      await pool.queryParam(query);
      const result = await pool.queryParam(query2);
      return result;
    } catch (err) {
      console.log("회사 하트개수 업데이트 실패", err.errno, err.code);
      throw err;
    }
  },
  changeCompanyFollowing: async (company_idx, company_follow) => {
    const query = `UPDATE ${table} SET company_follow="${company_follow}" WHERE company_idx="${company_idx}";`;
    const query2 = `SELECT company_name, company_follow FROM ${table} WHERE company_idx="${company_idx}";`;
    try {
      await pool.queryParam(query);
      const result = await pool.queryParam(query2);
      return result;
    } catch (err) {
      console.log("회사 팔로우 개수 업데이트 실패", err.errno, err.code);
      throw err;
    }
  },
};

module.exports = company;
