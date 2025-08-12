const axiosInstance = require("../config/axiosInstance");
const { PROBLEM_ADMIN_SERVICE_URL } = require("../config/serverConfig");

async function fetchProblemDetails(problemId) {
  try {
    const uri = `${PROBLEM_ADMIN_SERVICE_URL}/api/v1/problems/${problemId}`;
    const response = await axiosInstance.get(uri);
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Something went wrong while fetching problem details:", error);
  }
}

module.exports = fetchProblemDetails;
