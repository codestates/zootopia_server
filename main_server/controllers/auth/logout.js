module.exports = (req, res) => {
  res
    .clearCookie(
      'token' /* , { 쿠키 set할 때 주었던 option을 그대로 입력해야 함. 배포할 때 체크 } */,
    )
    .status(200);
};
