addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * Respond with one of the 2 URLs
 * @param {Request} request
 */
async function handleRequest(request) {
  
  const COOKIE_NAME = 'variant';
  let url = `https://cfw-takehome.developers.workers.dev/api/variants`;

  // Get Cookie 'variant' to determine which variant the user was already served
  const cookie = request.headers.get('cookie');

  // fetch /api/variants to get the 2 variants
  let variantsResponse = await fetch(url);
  let variantsJSON = await variantsResponse.json();
  variants =  variantsJSON['variants'];

  if(variantsResponse.status == 200){
    //Variable to hold the website variant
    let VARIANT = 1;

    //Check if variant already has a cookie 'variant' with value varianta or variantb
    if (cookie && cookie.includes(`${COOKIE_NAME}=2`)) {
      VARIANT = 2;
    } else if (cookie && cookie.includes(`${COOKIE_NAME}=1`)) {
      VARIANT = 1;
    } else {
      // if no cookie, then this is a new user. pick a variant with 50/50 chance
      VARIANT = Math.random() < 0.5 ? 1 : 2;
    }

    // fetch the variant chosen and return response to the user
    let res = await fetch(variants[VARIANT-1], request);

    // Rewrite HTML page with custom text
    const REWRITER = new HTMLRewriter()
    .on('title', new ElementHandler(`Priya's CloudFlare Website Variant ${VARIANT}`))
    .on('h1#title', new ElementHandler(`Priya's CloudFlare Website Variant ${VARIANT}`))
    .on('p#description', new ElementHandler(`Welcome to my CloudFlare website. I am a Graduate Research Assistant at Penn State University.`))
    .on('a#url', new ElementHandler('Connect with me on LinkedIn'))
    .on('a#url', new AttributeRewriter('href','https://www.linkedin.com/in/priyadarshini-murugan-94331a60/'));

    let response = REWRITER.transform(await res);

    // If no cookie, then Set-Cookie header
    if(!cookie){
      response.headers.append('Set-Cookie', `${COOKIE_NAME}=${VARIANT}; path=/`);
    }

    return response;
  }
  else{
    return new Response(`Error in workers script ${err.message}`, {
      status: 500
    });
  }
  
}

// Modify Element's Content
class ElementHandler {
  constructor(content) {
    this.content = content;
  }

  element(element) {
    element.setInnerContent(this.content);
  }
}

// Modify Attribute's Value
class AttributeRewriter {
  constructor(attributeName, attributeValue) {
    this.attributeName = attributeName;
    this.attributeValue = attributeValue;
  }

  element(element) {
    const attribute = element.getAttribute(this.attributeName);
    if (attribute) {
      element.setAttribute(
        this.attributeName,
        this.attributeValue
      );
    }
  }
}
