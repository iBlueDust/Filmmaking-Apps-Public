# Filmmaking Apps

These are digital props required in the shooting of *The Image*, a film made to fulfill the requirements of a high school filmmaking class.

This repo consists of three projects:
* `server`: Receives messages from all `controller`s and pushes them to all `projector`s. Also hosts images for `projector`.
* `controller`: A simple web dashboard to update `projector` live with WebSockets by sending requests to `server`
* `projector`: A display meant to be projected to a large screen in the movie
* `mobile`: A mobile app that looks like a social media platform

Since these props are intended to be film-specific, I doubt many others will find reusability in this. Nevertheless, it can serve as an example of how WebSockets may be used in this manner.

*) WebSockets cannot push 

## Running the projects
### Server
Simple Node.JS server
```bash
cd server
npm i
npm run start
```
### Controller
Built on Vue
```bash
cd controller
npm i
npm run dev
```

### Mobile
Built on Flutter. Google introduced some breaking changes in later versions, so I recommend running `mobile` on version [2.5.3](https://docs.flutter.dev/development/tools/sdk/releases) ([direct download](https://storage.googleapis.com/flutter_infra_release/releases/stable/windows/flutter_windows_2.5.3-stable.zip)).

Make sure to [install Flutter](https://docs.flutter.dev/get-started/install) first.

To run it on web,
```bash
cd mobile
flutter run -d chrome
```

To run it on other platforms, see [Flutter docs](https://docs.flutter.dev/get-started/editor).

### Projector
Also a Vue app
```bash
cd projector
npm i
npm run dev
```

## Building the projects
### Server
Doesn't apply. [Run the server](#server) instead.
### Controller
```bash
npm dev build
```

### Flutter
For Android, use
```bash
flutter build apk --split-per-abi
```
For web, 
```bash
flutter build web
```

For other platforms, see the Development section in [Flutter docs](https://docs.flutter.dev/).

## License
```
MIT License

Copyright (c) 2019-2023 Peter Raozen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```