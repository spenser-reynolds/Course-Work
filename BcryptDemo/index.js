const bcrypt = require('bcrypt');

const hashPassword = async (pw) => {
    const salt = await bcrypt.genSalt(12);
    const hash = await bcrypt.hash(pw, salt);
    console.log(salt);
    console.log(hash);
}

const login = async (pw, hashPw) => {
    const result = await bcrypt.compare(pw, hashPw);
    if (result) {
        console.log('logged you in. successful match.')
    } else {
        console.log('incorrect')
    }
}

// hashPassword('monkey');

login('monkey', '$2b$12$CSJ3veAAtWuilelBjOvW6uuaASlbuT04ZyGVGxOlRFLSDbPhUB3VS');
// Password , hashed password