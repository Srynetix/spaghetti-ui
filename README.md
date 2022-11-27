# spaghetti-ui :spaghetti:

[![Coverage Status](https://coveralls.io/repos/github/Srynetix/spaghetti-ui/badge.svg?branch=main)](https://coveralls.io/github/Srynetix/spaghetti-ui?branch=main)

Web app around the [spaghetti](https://github.com/Srynetix/spaghetti) Python module dependencies tracer.

## Tech stack

- Backend: [FastAPI](https://fastapi.tiangolo.com/)
- Frontend: [Vite](https://vitejs.dev/), [React](https://reactjs.org/), [Redux Toolkit](https://redux-toolkit.js.org/), [react-force-graph](https://github.com/vasturiano/react-force-graph) and [Blueprint](https://blueprintjs.com/).

## Demo

![animation](./docs/animation.gif)

## How to use

You only need [Python 3.9+](https://www.python.org/).

Then, do:

```bash
pip install git+https://github.com/Srynetix/spaghetti-ui#v0.1.1

spaghetti-ui <your_code_path>
```