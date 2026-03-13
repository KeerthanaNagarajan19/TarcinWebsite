
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: String,
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

const mongo_uri = "mongodb+srv://tarcinrobotics301:tarcinrobotics301@cluster0.kpaipm9.mongodb.net/official-website-db?retryWrites=true&w=majority";

async function checkUser() {
    await mongoose.connect(mongo_uri);
    const user = await User.findOne({ username: 'arsath' });
    console.log('--- USER INFO ---');
    console.log(JSON.stringify(user, null, 2));
    console.log('------------------');
    process.exit();
}

checkUser().catch(err => {
    console.error(err);
    process.exit(1);
});
