# Welcome to the Integrating With HubSpot I: Foundations Practicum

This repository is for the Integrating With HubSpot I: Foundations course. This practicum is one of two requirements for receiving your Integrating With HubSpot I: Foundations certification. You must also take the exam and receive a passing grade (at least 75%).

To read the full directions, please go to the [practicum instructions](https://app.hubspot.com/academy/l/tracks/1092124/1093824/5493?language=en).

**Custom object list:** [Plants in the test account](https://app-na2.hubspot.com/contacts/247845811/objects/2-271005007/views/all/list)

## Run locally

Install the dependencies with `npm install`. Create a `.env` file in the repository folder and add your test account private app token:

```ini
PRIVATE_APP_ACCESS_TOKEN=your-token-here
```

The private app needs custom object read and write scopes. Keep the real token private; `.env` is ignored by Git. Start the app with `node index.js`, then open [http://localhost:3000](http://localhost:3000).

___
## Tips:
- Commit to your repository often. Even if you make small tweaks to your code, it’s best to be committing to your repository frequently.
- The subject of the custom object is up to you. Feel free to get creative!
- Please create a test account. Do not commit your private app access token.
- Ensure you re-merge any working branches into the main branch.
- DO NOT ADD YOUR PRIVATE APP TOKEN TO YOUR REPOSITORY. 

## Pre-requisites:
- Using [Node](https://nodejs.org/en/download) and node packages
- Using [Express](https://expressjs.com/en/starter/installing.html)
- Using [Axios](https://axios-http.com/docs/intro)
- Using [Pug templating system](https://pugjs.org/api/getting-started.html)
- Using the command line
- Using [Git and GitHub](https://product.hubspot.com/blog/git-and-github-tutorial-for-beginners)

## Requirements
- All work must be your own. During the grading process we will check the revision history. Submissions that do not meet this requirement will not be considered.
- You must have three routes in `index.js` and two Pug templates: one for the homepage and one for the form.
- You must create a developer test account and link to it in your README.md file. Submissions that do not meet this requirement will not be considered.
