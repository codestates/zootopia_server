module.exports = (req, res) => {
  res
    .clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.codestates-project.tk',
    })
    .status(200)
    .end();
};
