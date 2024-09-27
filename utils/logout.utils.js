const logoutUser = (req) => {
    req.session = null; // Clear session or token
    console.log('User logged out');
};

module.exports = {
    logoutUser,
};
