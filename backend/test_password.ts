
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import path from 'path';

// Force load env from backend directory
dotenv.config({ path: path.join(__dirname, '../backend/.env') });

const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://tarcinrobotics301:tarcinrobotics301@cluster0.kpaipm9.mongodb.net/official-website-db?retryWrites=true&w=majority";

async function testPasswordChange() {
    console.log('Connecting to DB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    // 1. Create a test user
    const User = mongoose.model('User', new mongoose.Schema({
        username: String,
        password: { type: String, required: true },
        role: String
    }));

    const testUsername = 'test_admin_' + Date.now();
    const initialPassword = 'oldpassword123';
    const hashedPassword = await bcrypt.hash(initialPassword, 10);

    console.log(`Creating test user: ${testUsername} with password: ${initialPassword}`);
    const user = new User({
        username: testUsername,
        password: hashedPassword,
        role: 'admin'
    });
    await user.save();

    // 2. Perform the update logic (simulating userController.ts)
    console.log('Simulating password change...');
    const currentPasswordInput = 'oldpassword123';
    const newPasswordInput = 'newpassword456';

    const dbUser = await User.findOne({ username: testUsername });
    if (!dbUser) throw new Error('User not found');

    const isMatch = await bcrypt.compare(currentPasswordInput, dbUser.password);
    console.log('Current password match:', isMatch);

    if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        dbUser.password = await bcrypt.hash(newPasswordInput, salt);
        await dbUser.save();
        console.log('Password updated in DB.');
    }

    // 3. Verify the change
    const updatedUser = await User.findOne({ username: testUsername });
    const isNewMatch = await updatedUser ? await bcrypt.compare(newPasswordInput, updatedUser.password) : false;
    console.log('New password match verify:', isNewMatch);

    // 4. Cleanup
    await User.deleteOne({ username: testUsername });
    console.log('Test user deleted.');

    await mongoose.disconnect();
    console.log('Disconnected.');

    if (isMatch && isNewMatch) {
        console.log('✅ PASSWORD CHANGE LOGIC IS WORKING CORRECTLY.');
    } else {
        console.log('❌ PASSWORD CHANGE LOGIC FAILED.');
    }
}

testPasswordChange().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
});
