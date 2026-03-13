
const bcrypt = require('bcryptjs');
const hash = '$2b$10$MBuuFMpM4nbhjyyGAfLAwO5KK0C0Qx5z0H/X/Gkc7VbtdJ33wky52';
const password = 'admin123';

async function verify() {
    const isMatch = await bcrypt.compare(password, hash);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}`);
    console.log(`Match: ${isMatch}`);
}

verify().catch(console.error);
