## Getting Started

Clone the repository:

```bash
git clone <repository_url>
cd ubet
```

Then install dependencies:

```bash
npm install
```

Now you can run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Work on separate branches

To avoid conflicts, each person should create a new branch for each of their features:

```bash
git checkout -b <branch-name>
```

After done working with a feature:

```bash
git add .
git commit -m "Description of the feature"
git push origin <branch-name>
```

Then create a pull request:

1. Go to GitHub ➝ Pull Requests ➝ New Pull Request
2. Select your branch and request review from Vadym
3. Briefly describe the added feature and attach screenshots if possible

## Before starting working
Always pull the latest changes:

```bash
git checkout main
git pull
```
