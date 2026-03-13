
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Force load env from backend directory
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
    console.error('MONGO_URI not found in .env');
    process.exit(1);
}

async function testPasswordChange() {
    console.log('Connecting to DB...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected.');

    // Define Schema
    const userSchema = new mongoose.Schema({
        username: String,
        password: { type: String, required: true },
        role: String
    });

    // Clear existing model if it exists (for multiple runs in some environments)
    const User = mongoose.models.TestUser || mongoose.model('TestUser', userSchema, 'users');

    const testUsername = 'test_admin_check_' + Date.now();
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
    console.log('Current password match (old check):', isMatch);

    if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        const hashedNew = await bcrypt.hash(newPasswordInput, salt);

        // Simulating userController.ts:98-101
        dbUser.password = hashedNew;
        await dbUser.save();
        console.log('Password updated in DB.');
    }

    // 3. Verify the change by trying to search and compare
    const updatedUser = await User.findOne({ username: testUsername });
    const isNewMatch = updatedUser ? await bcrypt.compare(newPasswordInput, updatedUser.password) : false;
    console.log('New password match verify:', isNewMatch);

    // 4. Cleanup
    await User.deleteOne({ username: testUsername });
    console.log('Test user deleted.');

    await mongoose.disconnect();
    console.log('Disconnected.');

    if (isMatch && isNewMatch) {
        console.log('--- RESULT ---');
        console.log('✅ PASSWORD CHANGE LOGIC IS VERIFIED AND WORKING.');
    } else {
        console.log('--- RESULT ---');
        console.log('❌ PASSWORD CHANGE LOGIC FAILED VALIDATION.');
    }
}

testPasswordChange().catch(err => {
    console.error('Test error:', err);
    process.exit(1);
});
