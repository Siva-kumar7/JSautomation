const puppeteer = require('puppeteer');
// Make sure to install the 'node-fetch' package using npm or yarn
const fetch = require('node-fetch'); 
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Replace  with API URLs
  const getUrl = 'https://www.openanswers.co.uk/api/v1/join-us' \
  -H 'authority: www.openanswers.co.uk' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'cookie: gaEnabled=true; _ga=GA1.3.66014859.1698136662; _gid=GA1.3.1343982468.1698136662' \
  -H 'referer: https://www.openanswers.co.uk/join-us' \
  -H 'sec-ch-ua: "Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36' \
  --compressed'; // URL to fetch calculation data
  // URL to submit the calculation result
  const postUrl = 'https://www.openanswers.co.uk/api/v1/join-us' \
  -H 'authority: www.openanswers.co.uk' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'content-type: application/json' \
  -H 'cookie: gaEnabled=true; _ga=GA1.3.66014859.1698136662; _gid=GA1.3.1343982468.1698136662' \
  -H 'origin: https://www.openanswers.co.uk' \
  -H 'referer: https://www.openanswers.co.uk/join-us' \
  -H 'sec-ch-ua: "Chromium";v="118", "Google Chrome";v="118", "Not=A?Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36' \
  --data-raw '{"answer":727805,"key":"ad5c8fab9340bc0545ebcf9b999e4f0d6e3c2e8b310d55dfe322942f9470cbf5e76f317b6a88c02ccfb91d79bfc2c32dd163b75a457fa3034aa11d5c2d2a9d65626632eb589028cf09564bf304c7e6434c12cb34687f3ff544fee72a77080376ecf2f470e10e667975b415e0c5830d6f0f066766230535d54e13caad17cb768c976a838c0f97"}' \
  --compressed';  
  // Make a GET request to fetch the calculation data
  const response = await fetch(getUrl, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'ACCESS_TOKEN',
    },
  });
  
  if (response.status !== 200) {
    console.error('Failed to fetch data from the API.');
    await browser.close();
    return;
  }

  const calculationData = await response.json();

  // Perform the calculation
  const result = performCalculation(calculationData);

  // Make a POST request to submit the result
  const postResponse = await fetch(postUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'ACCESS_TOKEN',
    },
    body: JSON.stringify({ result }),
  });

  if (postResponse.status === 200) {
    console.log('Calculation result submitted successfully.');
  } else {
    console.error('Failed to submit the calculation result.');
  }

  // Close the browser
  await browser.close();
})();

// Function to perform the calculation
function performCalculation(calculationData) {
  // Perform the calculation based on the data received from the API
  // Now JavaScript's eval() function to calculate the result
  return eval(calculationData);
}
