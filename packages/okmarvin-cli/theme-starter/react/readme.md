## Development

Now that you have initialized the theme, you should install dependencies first:

```sh
$ cd /path/to/theme
$ npm install
```

Then run `npm start` to start theme development server.

## Build for production

Here're some requirements when you build theme for okmarvin:

1. Please use `webpack` to build assets even though we use Parcel for development
2. `main` field in `package.json` should point to a `manifest.json` file generated by `webpack` plugin
