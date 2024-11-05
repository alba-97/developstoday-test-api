## Getting Started

First, install the dependencies:

```bash
npm install
```

Now create a folder called "env" and add the development.env file:

```bash
NODE_ENV=development

PORT=8000
HOST=localhost

ORIGIN=http://localhost:3000

COOKIE_DOMAIN=localhost
COOKIE_PATH=/
SECURE_COOKIE=false
JWT_SECRET=xxxxxxxxxxxxxx
COOKIE_SECRET=xxxxxxxxxxxxxx
COOKIE_EXP=259200000
```

Then, run the project with:

```bash
npm run dev
```

The server will run at [http://localhost:8000](http://localhost:8000).
