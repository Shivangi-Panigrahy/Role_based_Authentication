const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { sendVerificationEmail } = require('../services/email.service');
const crypto = require('crypto');

const resolvers = {
  Query: {
    me: async (_, __, { user }) => {
      if (!user) {
        throw new Error('Not authenticated');
      }
      return await User.findByPk(user.id);
    }
  },
  Mutation: {
    registerCustomer: async (_, { firstName, lastName, email, password }) => {
      try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error('Email already registered');
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');
        
        // Create user
        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
          role: 'customer',
          verificationToken
        });

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        return {
          message: 'Registration successful. Please verify your email.'
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },
    
    registerAdmin: async (_, { firstName, lastName, email, password }) => {
      try {
        // Check if user exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
          throw new Error('Email already registered');
        }

        // Generate verification token
        const verificationToken = crypto.randomBytes(20).toString('hex');
        
        // Create user
        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
          role: 'admin',
          verificationToken
        });

        // Send verification email
        await sendVerificationEmail(email, verificationToken);

        return {
          message: 'Registration successful. Please verify your email.'
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    loginAdmin: async (_, { email, password }) => {
      try {
        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
          throw new Error('Invalid email or password');
        }

        // Check if user is verified
        if (!user.isVerified) {
          throw new Error('Please verify your email before logging in');
        }

        // Check if user is admin
        if (user.role !== 'admin') {
          throw new Error('You are not allowed to login from here');
        }

        // Validate password
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error('Invalid email or password');
        }

        // Generate token
        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return {
          token,
          user,
          message: 'Login successful'
        };
      } catch (error) {
        throw new Error(error.message);
      }
    },

    verifyEmail: async (_, { token }) => {
      try {
        const user = await User.findOne({ where: { verificationToken: token } });
        if (!user) {
          throw new Error('Invalid verification token');
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        // Generate token
        const authToken = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: '1d' }
        );

        return {
          token: authToken,
          user,
          message: 'Email verified successfully'
        };
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }
};

module.exports = resolvers;