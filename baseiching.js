(function() {
  var mapping = {
    'cht': {
      map: '坤 剝 比 觀 豫 晉 萃 否 謙 艮 蹇 漸 小過 旅 咸 遯 師 蒙 坎 渙 解 未濟 困 訟 升 蠱 井 巽 恆 鼎 大過 姤 復 頤 屯 益 震 噬嗑 隨 無妄 明夷 賁 既濟 家人 豐 離 革 同人 臨 損 節 中孚 歸妹 睽 兌 履 泰 大畜 需 小畜 大壯 大有 夬 乾'.split(' '),
      matcher: /[^坤剝比觀豫晉萃否謙艮蹇漸小過旅咸遯師蒙坎渙解未濟困訟升蠱井巽恆鼎大姤復頤屯益震噬嗑隨無妄明夷賁既家人豐離革同臨損節中孚歸妹睽兌履泰畜需壯有夬乾]/g,
      splitter1: '，',
      splitter2: '；\n',
      end: '。'
    },
    'chs': {
      map: '坤 剥 比 观 豫 晋 萃 否 谦 艮 蹇 渐 小过 旅 咸 遁 师 蒙 坎 涣 解 未济 困 讼 升 蛊 井 巽 恒 鼎 大过 姤 复 颐 屯 益 震 噬嗑 随 无妄 明夷 贲 既济 家人 丰 离 革 同人 临 损 节 中孚 归妹 睽 兑 履 泰 大畜 需 小畜 大壮 大有 夬 乾'.split(' '),
      matcher: /[^坤剥比观豫晋萃否谦艮蹇渐小过旅咸遁师蒙坎涣解未济困讼升蛊井巽恒鼎大姤复颐屯益震噬嗑随无妄明夷贲既家人丰离革同临损节中孚归妹睽兑履泰畜需壮有夬乾]/g,
      splitter1: '，',
      splitter2: '；\n',
      end: '。'
    },
    'ja': {
      map: '坤 剥 比 観 豫 晋 萃 否 謙 艮 蹇 漸 小過 旅 咸 遯 師 蒙 坎 渙 解 未済 困 訟 升 蠱 井 巽 恒 鼎 大過 姤 復 頤 屯 益 震 噬嗑 随 无妄 明夷 賁 既済 家人 豊 離 革 同人 臨 損 節 中孚 帰妹 睽 兌 履 泰 大畜 需 小畜 大壮 大有 夬 乾'.split(' '),
      matcher: /[^坤剥比観豫晋萃否謙艮蹇漸小過旅咸遯師蒙坎渙解未済困訟升蠱井巽恒鼎大姤復頤屯益震噬嗑随无妄明夷賁既家人豊離革同臨損節中孚帰妹睽兌履泰畜需壮有夬乾]/g,
      splitter1: '、',
      splitter2: '；\n',
      end: '。'
    }
  }, currentLang = 'cht';

  var fromUtf8 = function fromUtf8(str) {
    var utf8 = [], i, l;
    for(i = 0, l = str.length; i < l; i++) {
      var charcode = str.charCodeAt(i);
      if(charcode < 0x80) {
        utf8.push(charcode);
      } else if(charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
      } else if(charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      } else {
        i++;
        charcode = 0x10000 + (((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18), 0x80 | ((charcode >> 12) & 0x3f), 0x80 | ((charcode >> 6) & 0x3f), 0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  };

  var toUtf8 = function toUtf8(array) {
    var out = '', i = 0, len = array.length, c, c2, c3;
    while(i < len) {
      c = array[i++];
      switch(c >> 4) {
        case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
          out += String.fromCharCode(c);
          break;
        case 12: case 13:
          c2 = array[i++];
          out += String.fromCharCode(((c & 0x1F) << 6) | (c2 & 0x3F));
          break;
        case 14:
          c2 = array[i++];
          c3 = array[i++];
          out += String.fromCharCode(((c & 0x0F) << 12) | ((c2 & 0x3F) << 6) | ((c3 & 0x3F) << 0));
          break;
      }
    }
    return out;
  };

  var encode = function encode(input, compress) {
    if(typeof input === 'string')
      input = fromUtf8(input);
    else if(!!ArrayBuffer && input instanceof ArrayBuffer)
      input = new Uint8Array(input);
    var output = '';
    var chr1, chr2, chr3;
    var hasChr2 = true, hasChr3 = true;
    var i, l, flag = true, ended = false;
    for(i = 0, l = input.length; i < l;) {
      chr1 = chr2 = chr3 = 0;
      if(output && !compress) output += flag ? mapping[currentLang].splitter2 : mapping[currentLang].splitter1;
      chr1 = input[i++];
      output += mapping[currentLang].map[chr1 >> 2];
      if(i < input.length) chr2 = input[i++];
      else ended = true;
      output += mapping[currentLang].map[((chr1 & 3) << 4) | (chr2 >> 4)];
      if(ended) break;
      if(i < input.length) chr3 = input[i++];
      else ended = true;
      output += mapping[currentLang].map[((chr2 & 15) << 2) | (chr3 >> 6)];
      if(ended) break;
      output += mapping[currentLang].map[chr3 & 63];
      flag = !flag;
    }
    return output + (compress ? '' : mapping[currentLang].end);
  };

  var findIndex = function findIndex(source) {
    if(source.index >= source.input.length)
      return 64;
    var index = -1;
    index = mapping[currentLang].map.indexOf(source.input.substr(source.index, 2));
    if(index >= 0) {
      source.index += 2;
      return index;
    }
    index = mapping[currentLang].map.indexOf(source.input.substr(source.index, 1));
    if(index >= 0) {
      source.index += 1;
      return index;
    }
    return 64;
  };

  var decode = function decode(input, asUtf8) {
    var output = [];
    var enc1, enc2, enc3, enc4 = 0;
    var i, l;
    var source = {
      input: input.replace(mapping[currentLang].matcher, ''),
      index: 0
    };
    do {
      enc1 = findIndex(source);
      enc2 = findIndex(source);
      output.push((enc1 << 2) | (enc2 >> 4));
      enc3 = findIndex(source);
      if(enc3 == 64) break;
      output.push(((enc2 & 15) << 4) | (enc3 >> 2));
      enc4 = findIndex(source);
      if(enc4 == 64) break;
      output.push(((enc3 & 3) << 6) | enc4);
      enc1 = enc2 = enc3 = enc4 = 64;
    } while(source.index < source.input.length);
    return asUtf8 ? toUtf8(output) : output;
  };

  var setLang = function setLang(lang) {
    if(lang in mapping)
      currentLang = lang;
  };

  var exports = {
    setLang: setLang,
    decode: decode,
    encode: encode
  };

  if(typeof module !== 'undefined' && typeof module.exports !== 'undefined') module.exports = exports;
  else if(typeof window !== 'undefined') window.baseiching = exports;
  else return exports;
})();
