
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'admin' },
});
const User = mongoose.model('User', UserSchema);

const mongo_uri = "mongodb+srv://tarcinrobotics301:tarcinrobotics301@cluster0.kpaipm9.mongodb.net/official-website-db?retryWrites=true&w=majority";

async function createAdmin() {
    await mongoose.connect(mongo_uri);
    const hashedPassword = await bcrypt.hash('admin123', 10);

    try {
        await User.updateOne(
            { username: 'admin' },
            { $set: { password: hashedPassword, role: 'admin' } },
            { upsert: true }
        );
        console.log('✅ User "admin" created/updated with password "admin123"');
    } catch (err) {
        console.error(err);
    }

    process.exit();
}

createAdmin().catch(err => {
    console.error(err);
    process.exit(1);
});
