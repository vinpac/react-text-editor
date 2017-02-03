export default (app, passport) => {
  app.post('/api/test', (req, res) => {
    res.json(req.body);
  });

  app.post('/api/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/enter',
  }));
};
