Base易經
--------
A base64-like encoding method but it uses [hexagrams in I Ching](https://en.wikipedia.org/wiki/Hexagram_(I_Ching)).

## How to Install
In node.js:
```sh
npm install baseiching
```
, then
```javascript
var baseiching = require('basaeiching');
```
Or in browsers:
```html
<script src="baseiching.js"></script>
```
## How to Use
```javascript
baseiching.encode(source, [compress]);
```
Convert string / array or bytes / array buffer into base易經
parameters:
- source:string / array / array buffer, the source
- compress:boolean, compressed output?
returns:
- string, converted base易經 data.

```javascript
baseiching.decode(source, [tostring]);
```
Convert the base易經 back to string / array of bytes
parameters:
- source:string, the base易經 encoded data
- tostring:boolean, should convert the result into string?
returns:
- string / array of bytes, raw data.

```javascript
baseiching.setLang(lang);
```
Set the language varient
parameters:
- lang:string, which varient should be used? Possible values are 'cht' (Traditional Chinese), 'chs' (Simplified Chinese) and 'ja' (Japanese).

## License
[MIT](LICENSE)
