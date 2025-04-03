const isAuthenticated = (req, res, next) => {
    console.log('Session:', req.session);
    console.log('User:', req.user);
    console.log('Session User:', req.session.user);
    

    if (req.isAuthenticated && req.isAuthenticated()) {
        console.log('User is authenticated via passport');
        return next();
      }
      
      if (req.user) {
        console.log('User exists in req.user');
        return next();
      }
      
      if (req.session && req.session.user) {
        console.log('User exists in session');
        return next();
      }

      console.log('Authentication failed - no user found');
      return res.status(401).json({ message: "Authentication required. Please log in." });
};
  
module.exports = {
    isAuthenticated
};