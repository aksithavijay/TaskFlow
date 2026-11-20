# TaskFlow

TaskFlow is a single-page to-do list. Add tasks with the **Add** button or Enter, check them off or reopen them, and use **Edit** or **Delete** to update the list. The **All**, **Active**, and **Completed** buttons filter the list. Progress and the remaining count cover all tasks.

Task names are required and descriptions are optional. Use **Edit** to change either field. Completing a task hides its description, and reopening it shows the saved description again.

## Run locally

Use Node.js 20.9 or later and npm. Run these commands from the `taskflow` directory.

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000) or the URL printed by Next.js. Node.js runs Next.js on your computer, npm installs dependencies and runs scripts, and localhost is the address of your own computer.

## Check the project

```sh
npm run lint
npm run build
```

After a successful build, `npm start` serves the production build locally.

## How tasks are saved

React updates the list as you interact with it. Browser localStorage saves tasks under `taskflow.tasks.v1` so they survive a refresh. Tasks are tied to the current browser profile and site address. Clearing site data removes them, and switching devices, browsers, or domains shows a separate list.

## Deployment after stakeholder approval

Push the approved source to GitHub, then import that repository into Vercel. Select `taskflow` as the root directory if the repository includes the parent workspace. Use the Next.js preset and verify the deployed URL by adding, editing, completing, and refreshing a task. Tasks saved on localhost stay in the local browser's localhost storage.
