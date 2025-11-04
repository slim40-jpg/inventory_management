const User = require('../models/UserModel');

// Get all users from the same company
exports.getCompanyUsers = async (req, res) => {
    try {
        const { entreprise } = req.user;
        
        // Only return non-sensitive user data
        const users = await User.find({ entreprise })
            .select('-password')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('UserController.getCompanyUsers error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching users',
            error: error.message
        });
    }
};

// Get user by ID (only from same company)
exports.getUserById = async (req, res) => {
    try {
        const { entreprise } = req.user;
        const userId = req.params.id;

        const user = await User.findOne({
            _id: userId,
            entreprise
        }).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        console.error('UserController.getUserById error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error fetching user',
            error: error.message
        });
    }
};

// Update user (admin can update any user in their company, users can only update themselves)
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const { role: currentUserRole, entreprise, id: currentUserId } = req.user;

        // Check if user exists and belongs to same company
        const userToUpdate = await User.findOne({ _id: id, entreprise });
        if (!userToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Only allow admins to update other users
        if (currentUserRole !== 'admin' && id !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update other users'
            });
        }

        // Prevent role changes unless admin
        if (updates.role && currentUserRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can change user roles'
            });
        }

        // Prevent changing entreprise
        delete updates.entreprise;
        
        // Remove sensitive fields from updates
        delete updates.password;

        // Update user
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { $set: updates },
            { new: true }
        ).select('-password');

        return res.status(200).json({
            success: true,
            data: updatedUser
        });
    } catch (error) {
        console.error('UserController.updateUser error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error updating user',
            error: error.message
        });
    }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { role: currentUserRole, entreprise } = req.user;

        // Only admins can delete users
        if (currentUserRole !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can delete users'
            });
        }

        // Check if user exists and belongs to same company
        const userToDelete = await User.findOne({ _id: id, entreprise });
        if (!userToDelete) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // Prevent deleting the last admin
        const adminCount = await User.countDocuments({ 
            entreprise, 
            role: 'admin'
        });
        
        if (adminCount <= 1 && userToDelete.role === 'admin') {
            return res.status(400).json({
                success: false,
                message: 'Cannot delete the last admin user'
            });
        }

        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('UserController.deleteUser error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error deleting user',
            error: error.message
        });
    }
};

// Change user password (users can change their own, admins can change any user in their company)
exports.changePassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { currentPassword, newPassword } = req.body;
        const { role: currentUserRole, entreprise, id: currentUserId } = req.user;

        if (!newPassword || newPassword.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'New password must be at least 6 characters long'
            });
        }

        // Check if user exists and belongs to same company
        const userToUpdate = await User.findOne({ _id: id, entreprise });
        if (!userToUpdate) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        // If not admin and not changing own password, deny
        if (currentUserRole !== 'admin' && id !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to change other users passwords'
            });
        }

        // If changing own password, verify current password
        if (id === currentUserId) {
            if (!currentPassword) {
                return res.status(400).json({
                    success: false,
                    message: 'Current password is required'
                });
            }

            const isMatch = await userToUpdate.comparePassword(currentPassword);
            if (!isMatch) {
                return res.status(401).json({
                    success: false,
                    message: 'Current password is incorrect'
                });
            }
        }

        // Update password
        userToUpdate.password = newPassword;
        await userToUpdate.save();

        return res.status(200).json({
            success: true,
            message: 'Password updated successfully'
        });
    } catch (error) {
        console.error('UserController.changePassword error:', error);
        return res.status(500).json({
            success: false,
            message: 'Error changing password',
            error: error.message
        });
    }
};
