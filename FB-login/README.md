# FBLogin Example

This is a simple example app that shows how to use the FB Login button widget.

## Running this Sample

1. Download it.
2. Run `npm install`
3. Run `node index.js` to start server of localhost
4. Open `index.html` in your browser
5. Click the button!

### Running on Localhost

To run this on localhost, do the following in your FB app settings:

1. In 'Settings' > 'Basic', click '+Add Platform'
2. Click 'Website'
3. Enter `http://localhost:<port>` as the URL, where `<port>` is whatever port you're running on
4. In the 'App Domains' field, enter `localhost`
5. Click the 'Save Changes` button

## Scopes

This sample is configured to auth the following scopes:

- `manage_pages`
- `public_profile`
- `email`

See the FB docs for a [complete set of scopes](https://developers.facebook.com/docs/facebook-login/permissions).
