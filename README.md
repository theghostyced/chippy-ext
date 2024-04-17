This is a [Plasmo extension](https://docs.plasmo.com/) project bootstrapped with [`plasmo init`](https://www.npmjs.com/package/plasmo).

## Getting Started
Install
```
Create `.env.development` file and copy / paste from 1password
yarn install
yarn build # to generate types via `background/port`
```

Run the development server:
```bash
yarn dev
```

Load extension in chrome: See https://docs.plasmo.com/framework#loading-the-extension-in-chrome


## Making production build

Run the following:

```bash
yarn build
```

This should create a production bundle for your extension, ready to be zipped and published to the stores.

## Submit to the webstores

The easiest way to deploy your Plasmo extension is to use the built-in [bpp](https://bpp.browser.market) GitHub action. Prior to using this action however, make sure to build your extension and upload the first version to the store to establish the basic credentials. Then, simply follow [this setup instruction](https://docs.plasmo.com/framework/workflows/submit) and you should be on your way for automated submission!


### Formatting

We are going to try out https://rome.tools to not deal with both eslint + prettier (plus its much faster). I recommend installing [VSCode Extension](https://marketplace.visualstudio.com/items?itemName=rome.rome#:~:text=Rome%20respects%20VS%20Code's%20Format,formatOnSave%20%2C%20and%20enable%20the%20option.) and see Usage section on how to update your vscode.