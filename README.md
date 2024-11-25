## Deel Frontend Engineer (React.js) Position Test

This test consists of preparing an <strong>auto-complete component</strong> using <strong>React and TypeScript.</strong>

I chose to create a monorepo to include both a <strong>frontend React application</strong> and a <strong>backend Express application.</strong> This setup allows for requests to be made to a real API.

### Installing the Application

1. Select Node.js Version

This project includes a `.nvmrc` file specifying Node.js version 20. To ensure you are using the correct version, run the following command in the terminal (if Node.js 20 is already installed):

```bash
nvm use
```
If you don't have Node.js version 20 installed, you can install and select it by running:

```bash
nvm install 20
```
Note: This project also works with Node.js versions 18 and 19.

2. Install Dependencies

Since this is a monorepo with both frontend and backend applications, you need to install dependencies for both. Use the following command to install all dependencies:

```bash
npm run install:both
```

### Running the Applications

You can start both applications simultaneously with the following command:

```bash
npm run start:both
```

- The <strong>frontend application</strong> will be accessible at `http://localhost:3000` in your browser.

- The <strong>backend application</strong> will be running at `http://localhost:4000`.

