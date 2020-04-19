# Cloudflare Workers Internship Application: Full-Stack


## What is it?

Using Cloudflare Workers, this deploys an application that will randomly send users to one of two webpages.

## URL to test the link

You can test the above project at : https://cloudflare-ab-router.priyadarshini.workers.dev/

## Features implemented

### 1. Requests the URLs from the API
### 2. Requests a (random: see #3) variant

Fetches request to one of the two URLs, and return it as the response from the script.


### 3. Distribute requests between variants

Requests are evenly distributed between the two urls, in A/B testing style. This means that when a client makes a request to the Workers script, the script should roughly return each variant around 50% of the time.

### 4.Changing copy/URLs

For each variant page, there are a number of items on the page that can be customized. The following values inside of the variant are customized:

 - title: the title of the web page, displayed on the window or tab title in your browser.
 - h1#title: the main title of the page. By default, this displays "Variant 1" or "Variant 2"
 - p#description: the description paragraph on the page. By default, this displays the text "This is variant X of the take home project!".
 - a#url: a Call to Action link with strong emphasis on the page. Try changing this to a URL of your choice, such as your personal website, and make sure to update the text "Return to cloudflare.com" as well!


### 5. Persisting variants

If a user visits the site ,it persist  URL which is chosen in a cookie so that they always see the same variant when they return to the application.

