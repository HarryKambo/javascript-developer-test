const { httpGet } = require('./mock-http-interface');

const getArnieQuotes = async (urls) => {
  // TODO: Implement this function.  
  var promiseArray = await getArnieQuotesPromisesArray(urls);
  var result = [];
  await Promise.allSettled(promiseArray)
          .then((values) => {
            values.forEach(resValue => {                         
              result.push(getQuoteObject(resValue));
            });
          })
          .catch((error) => console.log(error));  
  return result;
};

/**
 * Prepares array of promises by calling Async function.
 * @param {string[]} urls The urls to be requested    
 * @returns {Promise<Object>[]} Array of Promises.
 * @author {harpreet Singh}.
 */
function getArnieQuotesPromisesArray(urls){  
  var httpPromiseCollection = [];
  urls.forEach (element =>  httpPromiseCollection.push(httpGet(element)));
  return httpPromiseCollection;
}

/**
 * Processes a settled Promise and extracts its value or handles its rejection.
 * @param {Promise<string>} settledPromise - A Promise that is already settled (fulfilled or rejected).    
 * @returns {Object} The quote response object.
 * @author {harpreet Singh}.
 */
function getQuoteObject(resValue) {
  if(resValue.status === 'fulfilled' && resValue.value.status === 200){
    return {'Arnie Quote': JSON.parse(resValue.value.body).message};                
  }
  else if(resValue.value.status === 500){
    return {'FAILURE': JSON.parse(resValue.value.body).message};   
  }
}

module.exports = {
  getArnieQuotes,
};
