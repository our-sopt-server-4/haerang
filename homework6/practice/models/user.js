const pool = require('../modules/pool');
const table = 'user';

const user = {
    recommendUser: async (uid) => {
        //if(uid == "")
        const query = `SELECT user_name, user_company, user_img FROM ${table};`;
        
        try{
            const result = await pool.queryParam(query);
            return result;
        }catch(err){
            console.log('유저 추천 에러', err.errno, err.code);
            return -1;
        }
        console.log('유저 추천 에러', err);
        throw err;
    }
}

module.exports = user;