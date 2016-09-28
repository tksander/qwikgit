const helpers = {
  checkStatus,
  parseJson
}


function checkStatus(res) {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }

  let error = new Error(res.statusText);
  error.res = res;
  throw error;
}

 function parseJson(res) {
  return res.json();
}

export default helpers;
