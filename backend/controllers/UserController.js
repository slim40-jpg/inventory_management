const User = require('../models/UserModel');
const bcrypt = require('bcryptjs');

//  Get all users of the same company (for "See staff members" page)
exports.getCompanyUsers = async (req, res) => {
    try {
        const { company, id: currentUserId } = req.user;

        // Get all users in the same company
        const users = await User.find({ company }).select('-password').sort({ createdAt: -1 });

        // Format data for frontend
        const formatted = users.map((user) => ({
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
            company: user.company,
            phone_number: user.phone_number,
            label:
                user._id.toString() === currentUserId.toString()
                    ? `${user.username} (you)`
                    : user.role === 'admin'
                    ? `${user.username} (admin)`
                    : user.username,
        }));

        return res.status(200).json({
            success: true,
            data: formatted,
        });
    } catch (error) {
        console.error('UserController.getCompanyUsers error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message,
        });
    }
};

//  Search company users by username (real-time search)
exports.searchCompanyUsers = async (req, res) => {
    try {
        const { company } = req.user;
        const { username } = req.query;

        if (!username) {
            return res.status(200).json({ success: true, data: [] });
        }

        // Case-insensitive regex search
        const regex = new RegExp('^' + username, 'i');
        const users = await User.find({ company, username: regex }).select('-password');

        return res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        console.error('UserController.searchCompanyUsers error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error searching users',
            error: error.message,
        });
    }
};

//  Get single user by ID (profile page)
exports.getUserById = async (req, res) => {
    try {
        const { company } = req.user;
        const { id } = req.params;

        const user = await User.findOne({ _id: id, company }).select('-password');
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        return res.status(200).json({ success: true, data: user });
    } catch (error) {
        console.error('UserController.getUserById error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching user profile',
            error: error.message,
        });
    }
};

//  Update own info (username, password, company, phone_number)
exports.updateOwnProfile = async (req, res) => {
    try {
        const { id } = req.user; // logged-in user
        const { username, password, company, phone_number } = req.body;

        const user = await User.findById(id);
        if (!user)
            return res.status(404).json({ success: false, message: 'User not found' });

        // Update allowed fields
        if (username) user.username = username;
        if (phone_number) user.phone_number = phone_number;
        if (company) user.company = company; // allowed since each company manages its own users
        if (password) user.password = await bcrypt.hash(password, 12);

        await user.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: user._id,
                username: user.username,
                company: user.company,
                phone_number: user.phone_number,
            },
        });
    } catch (error) {
        console.error('UserController.updateOwnProfile error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating profile',
            error: error.message,
        });
    }
};

//  Admin adds a staff member
exports.addStaff = async (req, res) => {
    try {
        const { role, company } = req.user; // logged-in admin
        const { username, email, password, phone_number } = req.body;

        if (role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Only admins can add staff members' });
        }

        const exists = await User.findOne({ $or: [{ email }, { username }, { phone_number }] });
        if (exists)
            return res.status(400).json({ success: false, message: 'User with given credentials already exists' });

        const newStaff = new User({
            username,
            email,
            password,
            company,
            phone_number,
            role: 'staff',
        });

        await newStaff.save();

        return res.status(201).json({
            success: true,
            message: 'Staff member added successfully',
            data: {
                id: newStaff._id,
                username: newStaff.username,
                email: newStaff.email,
                company: newStaff.company,
            },
        });
    } catch (error) {
        console.error('UserController.addStaff error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error adding staff member',
            error: error.message,
        });
    }
};

//  Admin removes a staff member (not admins)
exports.removeStaff = async (req, res) => {
    try {
        const { role, company } = req.user;
        const { id } = req.params;

        if (role !== 'admin')
            return res.status(403).json({ success: false, message: 'Only admins can remove staff members' });

        const userToDelete = await User.findOne({ _id: id, company });
        if (!userToDelete)
            return res.status(404).json({ success: false, message: 'User not found' });

        // Prevent deleting other admins
        if (userToDelete.role === 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admins cannot be deleted by other users',
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'Staff member removed successfully',
        });
    } catch (error) {
        console.error('UserController.removeStaff error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error removing staff member',
            error: error.message,
        });
    }
};