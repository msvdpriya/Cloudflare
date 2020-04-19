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

 - title: the title of the web page is changed to "Priya's CloudFlare Website Variant X".
 - h1#title: the main title of the page is changed to "Priya's CloudFlare Website Variant X".
 - p#description: the description paragraph on the page is changed to "Welcome to my CloudFlare website. I am a Graduate Research Assistant at Penn State University."
 - a#url: I have changed URL to point to my Linkedin Profile page.I have changed the text from "Return to CloudFlare.com" to "Connect with me on Linkedin"


### 5. Persisting variants

If a user visits the site ,it persist  URL which is chosen in a cookie so that they always see the same variant when they return to the application.

