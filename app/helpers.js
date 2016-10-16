const helpers = {
  checkStatus,
  parseJson
}


function checkStatus(res) {
  console.log('[Helpers] checkStatus: ' + res.status)
  // if (res.status >= 200 && res.status < 300) {
    return res;
  // }

  // let error = new Error(res.statusText);
  // error.res = res;
}

 function parseJson(res) {
  // console.log('[Helpers] parseJson: ' + res)
  return res.json();
}

export default helpers;
