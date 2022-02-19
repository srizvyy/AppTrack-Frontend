import { useEffect } from "react";

function useQuery({endpoint, options = {}, queryParams = {}, callback = () => {}, errorCallback = () => {}}) {

  const baseUrl = 'http://localhost:9292';
  const urlParams = new URLSearchParams();

  for (const param in queryParams) {
    urlParams.append(param, queryParams[param]);
  }

  useEffect(() => {
    fetch(`${baseUrl}${endpoint}?${urlParams}`, options)
      .then(resp => resp.json())
      .then(data => {
        callback(data);
      })
      .catch(err => {
        errorCallback(err);
      });
  }, [baseUrl, endpoint, urlParams, options, callback, errorCallback]);
}

export default useQuery;