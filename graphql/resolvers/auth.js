module.exports = {
    createUser: async args => {
        try {
            const userExisting = await User.findOne({ email: args.userInput.email })
            if (userExisting) {
                throw new Error('User exists already.');
            }
            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);
            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });
            const userSaveResult = await user.save();
                return { ...userSaveResult._doc, password: null };
        } catch (err) {
            throw err;
        }
    }
}