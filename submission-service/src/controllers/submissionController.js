async function pingRequest(req, res) {
  console.log(this.testService);
  const data = await this.testService.pingCheck();
  return res.send({ data });
}

async function createSubmission(req, res) {
  try {
    const response = await this.submissionService.addSubmission(req.body);
    if (!response) {
      console.log("adfjasdk");
    }
    return res.status(201).send({
      error: {},
      data: response,
      success: true,
      message: "Created submission successfully",
    });
  } catch (error) {
    console.log(error);
    throw "Ncte";
  }
}

module.exports = { pingRequest, createSubmission };
