# spaghetti-ui :spaghetti:

[![Coverage Status](https://coveralls.io/repos/github/Srynetix/spaghetti-ui/badge.svg?branch=main)](https://coveralls.io/github/Srynetix/spaghetti-ui?branch=main)

Web app around the [spaghetti](https://github.com/Srynetix/spaghetti) Python module dependencies tracer.

## Tech stack

- Backend: [FastAPI](https://fastapi.tiangolo.com/)
- Frontend: [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [react-force-graph](https://github.com/vasturiano/react-force-graph) and [Blueprint](https://blueprintjs.com/).

## Demo

![animation](./docs/animation.gif)

## How to use

You only need [Python 3.9+](https://www.python.org/) and [Poetry](https://python-poetry.org/).

Then, do:

```bash
poetry install
poetry run spaghetti-ui <your_code_path>
```

## Next steps

I'm currently looking for a solution where you don't need Poetry, so check the project later!