export const fetchQuestions = async function () {
  try {
    const requestData = await fetch("http://localhost:8000/questions");
    if(!requestData.ok){
        throw new Error(`opps ${requestData.status} unable to get the requested data`)
    }
    const response = await requestData.json();
    return response;
  } catch (error) {
    console.log(error.message)
    return error
  }
};