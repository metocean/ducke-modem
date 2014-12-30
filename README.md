# Ducke Modem

A low level nodejs API for talking with docker.

Request types:
- GET
- POST
- DELETE

Request payloads:
- Data
- Stream
- File

Response payloads:
- Data
- Stream
- Duplex Stream

If you are looking for a high level nodejs docker API use [ducke](https://github.com/metocean/ducke) or [dockerode](https://github.com/apocas/dockerode/).

[![NPM version](https://badge.fury.io/js/ducke-modem.svg)](http://badge.fury.io/js/ducke-modem)

Insipred by [docker-modem](https://github.com/apocas/docker-modem).

## Install

```sh
npm install ducke-modem
```

Ducke Modem depends on `readable-stream`.

## Examples

```js
var duckemodem = require('ducke-modem');
modem = new duckemodem.API(duckemodem.Parameters());

// get all available containers
modem
    .get('/containers/json?all=1')
    .result(function(err, containers) {
        console.log(containers);
    });

// stream logs
modem
    .get("/containers/my_container/logs?stderr=1&stdout=1&follow=1&tail=10")
    .stream(function(err, stream) {
        duckemodem.DemuxStream(stream, process.stdout, process.stderr);
    });

// attach to a container
modem
    .post("/containers/my_container/attach?stream=true&stdin=true&stdout=true&stderr=true", {})
    .connect(function(err, stream) {
        stream.pipe(process.stdout);
        process.stdin.resume()
        process.stdin.setEncoding('utf8');
        process.stdin.setRawMode(true);
        process.stdin.pipe(stream);
    });
```

## Todo

- Fix DemuxStream
- Test against all docker API methods
- Write Tests