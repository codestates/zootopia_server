module.exports = (req, res) => {
  res //
    .status(200)
    .cookie('token', 'null', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: '.codestates-project.tk',
    })
    .json({ msg: 'logout' });
};
