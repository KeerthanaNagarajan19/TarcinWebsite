
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: String,
    password: { type: String, required: true },
});
const User = mongoose.model('User', UserSchema);

const mongo_uri = "mongodb+srv://tarcinrobotics301:tarcinrobotics301@cluster0.kpaipm9.mongodb.net/official-website-db?retryWrites=true&w=majority";

async function resetPassword() {
    await mongoose.connect(mongo_uri);
    const hashedPassword = await bcrypt.hash('admin123', 10);

    const result = await User.updateOne(
        { username: 'arsath' },
        { $set: { password: hashedPassword } });

    if (result.matchedCount > 0) {
        console.log('✅ Password for user "arsath" reset to "admin123" successfully');
    } else {
        console.log('❌ User "arsath" not found');
    }

    process.exit();
}

resetPassword().catch(err => {
    console.error(err);
    process.exit(1);
});
