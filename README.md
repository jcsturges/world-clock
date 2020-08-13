# World Clock
A simple time zone comparrison app in React using Redux.

## Getting Started
To get started, run `npx run start` to start a live server for development. Use `npx run build` to build a production version of the app.

There's a deployment script in [`deploy.sh`](deploy.sh) which will build and deploy code to AWS. This assumes an AWS CloudFront distribution serving static content from S3 but can be customized.

## Notes
* Your preferences are saved with a cookie when added/removed
* Defaults to a few select time zones to start (US & India)
* Drag and drop capabilities to reorder clocks
* This presents DST aware time zones
