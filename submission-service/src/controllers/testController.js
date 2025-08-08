async function pingRequest(req, res) {
  console.log(this.testService);
  const data = await this.testService.pingCheck();
  return res.send({ data });
}

module.exports = { pingRequest };
