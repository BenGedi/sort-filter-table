
with webpack...

## pre installation

before running `npm install`
you should delete all the node modules you have
best way is from the command line:

```
mkdir empty_dir
```

```
robocopy empty_dir node-modules /s /mir
```

```
rmdir empty_dir
```

## Installing

`npm install`

## Usage

`npm run dev` - runs a *watch* with a "development version" (without marvells code) on *http://localhost:8080/*

`npm run build` - creates a "production version" in the `build` directory.
