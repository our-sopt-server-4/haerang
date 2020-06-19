const pool = require('../modules/pool');
const table = 'contents';

const contents = {
    infoContents: async(uid) => {
        const query = `SELECT contents_img, contents_position, contents_title, contents_url FROM ${table};`;

        try{
                const result = await pool.queryParam(query);
                return result
        }catch(err){
                console.log('콘텐츠 정보 조회가 실패했습니다.', err.errno, err.code);
                return -1;
        }
        console.log('콘텐츠 정보 조회가 실패했습니다.', err);
        throw err;
    }
}

module.exports = contents;