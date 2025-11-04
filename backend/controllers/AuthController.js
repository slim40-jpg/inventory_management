const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const generateToken = (userId, role, entreprise) => {
	const secret = process.env.JWT_SECRET;
	return jwt.sign({ 
		id: userId,
		role: role,
		entreprise: entreprise
	}, secret, { expiresIn: '1d' });
};

// Helper to check if user has admin rights for their company
const isCompanyAdmin = async (userId, entreprise) => {
	const user = await User.findOne({ 
		_id: userId, 
		role: 'admin', 
		entreprise: entreprise 
	});
	return !!user;
};

// Register a new user
exports.register = async (req, res) => {
	try {
		const { username, email, password, entreprise, phone_number, role } = req.body;

		if (!username || !email || !password || !entreprise || !phone_number) {
			return res.status(400).json({ success: false, message: 'Missing required fields' });
		}

		const existing = await User.findOne({ $or: [{ email }, { username }, { phone_number }] });
		if (existing) {
			return res.status(400).json({ success: false, message: 'User with given email/username/phone already exists' });
		}

		// Validate role
		if (role && !['admin', 'staff'].includes(role)) {
			return res.status(400).json({ 
				success: false, 
				message: 'Invalid role. Must be either "admin" or "staff"' 
			});
		}

		const user = new User({ 
			username, 
			email, 
			password, 
			entreprise, 
			phone_number, 
			role: role || 'staff' // Default to staff if not specified
		});
		await user.save();

		const token = generateToken(user._id, user.role, user.entreprise);

		return res.status(201).json({
			success: true,
			data: {
				user: {
					id: user._id,
					username: user.username,
					email: user.email,
					role: user.role,
					entreprise: user.entreprise,
					phone_number: user.phone_number,
				},
				token,
			},
		});
	} catch (error) {
		console.error('AuthController.register error:', error);
		return res.status(500).json({ success: false, message: 'Server error', error: error.message });
	}
};

// Login existing user
exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({ success: false, message: 'Email and password are required' });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid credentials' });
		}

		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(401).json({ success: false, message: 'Invalid credentials' });
		}

		const token = generateToken(user._id, user.role, user.entreprise);

		return res.status(200).json({
			success: true,
			data: {
				user: {
					id: user._id,
					username: user.username,
					email: user.email,
					role: user.role,
					entreprise: user.entreprise,
					phone_number: user.phone_number,
				},
				token,
			},
		});
	} catch (error) {
		console.error('AuthController.login error:', error);
		return res.status(500).json({ success: false, message: 'Server error', error: error.message });
	}
};

// Get profile for authenticated user (expects middleware to set req.user)
exports.getProfile = async (req, res) => {
	try {
		const userId = req.user?.id || req.user?._id;
		if (!userId) {
			return res.status(401).json({ success: false, message: 'Unauthorized' });
		}

		const user = await User.findById(userId).select('-password');
		if (!user) return res.status(404).json({ success: false, message: 'User not found' });

		return res.status(200).json({ success: true, data: user });
	} catch (error) {
		console.error('AuthController.getProfile error:', error);
		return res.status(500).json({ success: false, message: 'Server error', error: error.message });
	}
};

// Logout (stateless JWT) - client should discard token. Here we just return success
exports.logout = async (req, res) => {
	return res.status(200).json({ success: true, message: 'Logged out' });
};