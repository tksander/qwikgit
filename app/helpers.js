const helpers = {
  checkStatus,
  parseJson
}


function checkStatus(res) {
  debugger
  // if (res.status >= 200 && res.status < 300) {
    return res;
  // }

  // let error = new Error(res.statusText);
  // error.res = res;
}

 function parseJson(res) {
   debugger
  return res.json();
}

export default helpers;
