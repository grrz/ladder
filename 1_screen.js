// Ladder
// canvas drawing functions
//
// provides: screen_draw_char(), screen_draw_charc(), screen_set_geometry(), screen_set_scale(),
// screen_abs_x(x), screen_abs_y(y), screen_abs_charw(), screen_abs_charh()

var ctx;
var canvas;

var char_width = 6
var char_height = 8
var char_height_gap = 2

var scale_x = 2
var scale_y = 2

var screen_width = 78
var screen_height = 30

var font = new Image();


function screen_draw_char(x, y, ch) {
//   wc(x + ', ' + y + ': ' + ch);
   ctx.drawImage(font,
      2, char_height * ch, char_width, char_height,
      x * char_width * scale_x, y * (char_height + 2) * scale_y, 
      char_width * scale_x, char_height * scale_y
   );
}

function screen_draw_charc(x, y, ch) { screen_draw_char(x, y, ch.charCodeAt(0)) }

function screen_set_geometry(w, h) {
   if (w != null) screen_width = w
   if (h != null) screen_height = h
   canvas.width = screen_width * char_width * scale_x
   canvas.height = screen_height * (char_height + char_height_gap) * scale_y

   back = document.getElementById("back")
   back.style.width = canvas.width + 4
   back.height = canvas.height + 4

   ctx = canvas.getContext("2d");

   ctx.fillStyle = "rgb(0,0,0)";
   ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function screen_set_scale(x, y) {
  wc('old scale: ' + scale_x + ' &times; ' + scale_y + '; new scale: ' + x + ' &times; ' + y);
  scale_x = x;
  scale_y = y;

  var b = document.getElementById('back');
  for (var i = 0; i < b.children.length; i++) {
    if ((b.children[i].tagName == 'DIV') && (b.children[i]._type = "gravestone")) {
      b.children[i].style.left = (b.children[i]._x * char_width * scale_x + 1);
      b.children[i].style.top = (b.children[i]._y * (char_height + 2) * scale_y);
      b.children[i].style.width = char_width * scale_x;
      b.children[i].style.height = char_height * scale_y;
    }
  }
}

function screen_abs_x(x) { return Math.floor(x * char_width * scale_x) }
function screen_abs_y(y) { return Math.floor(y * (char_height + 2) * scale_y) }
function screen_abs_charw() { return char_width  * scale_x }
function screen_abs_charh() { return char_height * scale_y }

font.src = '1.bmp';

/*
font.src = 'data:image/bmp;base64,' +
'Qk0+IAAAAAAAAD4AAAAoAAAACAAAAAAIAAABAAEAAAAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wAAAAAAGAAAABgAAAB+AAAAfgAAABgAAAAYAAAAAAAAAAAAAAABAAAAAQAAAA8AAAAJAAAACQAAAAAAAAAAAAAAAQAAAD8AAAAqAAAAKgAAACoAAAAqAAAAAAAAAAAAAAAAAAAADgAAAAEAAAAHAAAAAQAAAA4A' + 
'AAAAAAAAAAAAAAAAAAAfAAAAFQAAABUAAAAVAAAAFQAAAAAAAAAAAAAAAAAAAA4AAAABAAAAAgAAAAkAAAAGAAAAAAAAAAAAAAAAAAAAGQAAABUAAAAZAAAAEQAAABEAAAAAAAAAAAAAAAAAAAAOAAAACQAAAA4AAAAIAAAACAAAAAAAAAAAAAAAAAAAAA4AAAAJAAAADgAAAAkAAAAOAAAAAAAAAAAAAAAAAAAAFQAAABUA' + 
'AAAOAAAAFQAAABUAAAAAAAAAAAAAAAAAAAAOAAAAAQAAAAcAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAfAAAAAAAAAAAAAAAAAAAABwAAAAgAAAAIAAAACAAAAAcAAAAAAAAAAAAAAAgAAAAIAAAACAAAAA4AAAAJAAAADgAAAAAAAAAAAAAAAAAAAAkAAAAFAAAABwAAAAkAAAAHAAAAAAAAAAAA' + 
'AAAAAAAACQAAAAkAAAAJAAAACQAAAA8AAAAAAAAAAAAAAAAAAAAGAAAACQAAAAkAAAAJAAAABgAAAAAAAAAAAAAAAAAAAAkAAAAJAAAADwAAAAkAAAAJAAAAAAAAAAAAAAAAAAAAEQAAABUAAAAVAAAAGwAAABEAAAAAAAAAAAAAAAAAAAAJAAAACQAAAAkAAAAFAAAAAwAAAAAAAAAAAAAAAAAAAAkAAAAKAAAADAAAAAoA' + 
'AAAJAAAAAAAAAAAAAAAAAAAACQAAAA0AAAALAAAACQAAAAkAAAAAAAAABgAAAAAAAAAJAAAADQAAAAsAAAAJAAAACQAAAAAAAAAAAAAAAAAAAAkAAAAJAAAABgAAAAYAAAAJAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAIAAAACAAAAA8AAAAAAAAAAAAAAAQAAAAEAAAADgAAABUAAAAOAAAABAAAAAAAAAAAAAAAAAAAAAcA' + 
'AAAIAAAADgAAAAkAAAAGAAAAAAAAAAAAAAAAAAAADwAAAAEAAAAHAAAACQAAAAYAAAAAAAAAAAAAAAEAAAAfAAAAEgAAABIAAAASAAAAEgAAAAAAAAAAAAAAAAAAAA4AAAAJAAAADgAAAAgAAAAHAAAAAAAAAAAAAAAAAAAABgAAAAkAAAAHAAAAAQAAAA4AAAAAAAAAAAAAAAAAAAASAAAAFQAAAB0AAAAVAAAAEgAAAAAA' + 
'AAAAAAAAAAAAAAQAAAAMAAAAHgAAAD8AAAAeAAAADAAAAAgAAAAAAAAAAQAAAAMAAAAPAAAADAAAAAgAAAAAAAAAAAAAAAAAAAARAAAACAAAAAgAAAAEAAAACAAAAAgAAAAQAAAAAAAAAAgAAAAIAAAACAAAAAAAAAAIAAAACAAAAAgAAAAAAAAAAQAAAAIAAAACAAAABAAAAAIAAAACAAAAAQAAAAAAAAAPAAAACAAAAAYA' + 
'AAABAAAADwAAAAAAAAAAAAAAAAAAAA4AAAABAAAABwAAAAkAAAAJAAAAAAAAAAAAAAAAAAAAEQAAAAoAAAACAAAACgAAABEAAAAAAAAAAAAAAAAAAAAKAAAAFQAAABUAAAARAAAAEQAAAAAAAAAAAAAAAAAAAAQAAAAKAAAAEQAAABEAAAARAAAAAAAAAAAAAAAAAAAADgAAABEAAAARAAAAEQAAABEAAAAAAAAAAAAAAAAA' + 
'AAAGAAAACQAAAAgAAAAIAAAAHAAAAAgAAAAIAAAAAAAAAA4AAAABAAAABgAAAAgAAAAHAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAIAAAACQAAAA4AAAAAAAAAAAAAAAAAAAABAAAABwAAAAkAAAAJAAAABwAAAAAAAAAAAAAAAAAAAAgAAAAOAAAACQAAAAkAAAAOAAAAAAAAAAAAAAAAAAAABgAAAAkAAAAJAAAACQAAAAYA' + 
'AAAAAAAAAAAAAAAAAAAJAAAACQAAAAkAAAAJAAAADgAAAAAAAAAAAAAAAAAAABUAAAAVAAAAFQAAABUAAAAaAAAAAAAAAAAAAAAAAAAABwAAAAIAAAACAAAAAgAAAAIAAAACAAAABgAAAAAAAAAJAAAACgAAAAwAAAAKAAAACQAAAAgAAAAIAAAAAAAAAAYAAAAJAAAAAQAAAAEAAAABAAAAAAAAAAEAAAAAAAAABwAAAAIA' + 
'AAACAAAAAgAAAAYAAAAAAAAAAgAAAAAAAAAJAAAACQAAAAkAAAAJAAAADgAAAAgAAAAIAAAAAAAAAA4AAAABAAAABwAAAAkAAAAHAAAAAAAAAAAAAAAAAAAACAAAAAgAAAAIAAAAHAAAAAgAAAAJAAAABgAAAAAAAAAHAAAACAAAAA4AAAAJAAAABgAAAAAAAAAAAAAAAAAAAAcAAAAJAAAACQAAAAkAAAAHAAAAAQAAAAEA' + 
'AAAAAAAABwAAAAgAAAAIAAAACAAAAAcAAAAAAAAAAAAAAAAAAAAOAAAACQAAAAkAAAAJAAAADgAAAAgAAAAIAAAAAAAAAA0AAAASAAAAEgAAABIAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAIAAAAEAAAAAAAAAAEAAAAAAAAAAQAAAACAAAAAQAAABEAAAAOAAAAAAAAAAgAAAAEAAAAAgAAAAEA' + 
'AAACAAAABAAAAAgAAAAAAAAAAAAAAAAAAAAfAAAAAAAAAB8AAAAAAAAAAAAAAAAAAAACAAAABAAAAAgAAAAQAAAACAAAAAQAAAACAAAAAAAAAAgAAAAEAAAADAAAAAwAAAAAAAAADAAAAAwAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAcAAAAAgAAAAEAAAAPAAAAEQAAABEAAAAOAAAAAAAAAA4A' + 
'AAARAAAAEQAAAA4AAAARAAAAEQAAAA4AAAAAAAAACAAAAAgAAAAIAAAABAAAAAIAAAABAAAAHwAAAAAAAAAOAAAAEQAAABEAAAAeAAAAEAAAAAgAAAAHAAAAAAAAAA4AAAARAAAAAQAAAAEAAAAeAAAAEAAAAB8AAAAAAAAAAgAAAAIAAAAfAAAAEgAAAAoAAAAGAAAAAgAAAAAAAAAOAAAAEQAAAAEAAAAGAAAAAgAAAAEA' + 
'AAAfAAAAAAAAAB8AAAAQAAAACAAAAAYAAAABAAAAEQAAAA4AAAAAAAAADgAAAAQAAAAEAAAABAAAAAQAAAAMAAAABAAAAAAAAAAOAAAAEQAAABkAAAAVAAAAEwAAABEAAAAOAAAAAAAAAAAAAAAQAAAACAAAAAQAAAACAAAAAQAAAAAAAAAAAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 
'AAAfAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAEAAAADAAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAEAAAAHwAAAAQAAAAEAAAAAAAAAAAAAAAAAAAABAAAABUAAAAOAAAAFQAAAAQAAAAAAAAAAAAAAAgAAAAEAAAAAgAAAAIAAAACAAAABAAAAAgAAAAAAAAAAgAAAAQAAAAIAAAACAAAAAgAAAAEAAAAAgAAAAAA' + 
'AAAAAAAAAAAAAAAAAAAEAAAAAgAAAAYAAAAGAAAAAAAAAA0AAAASAAAAFQAAAAwAAAAKAAAACgAAAAQAAAAAAAAAAwAAABMAAAAIAAAABAAAAAIAAAAZAAAAGAAAAAAAAAAEAAAAHgAAAAUAAAAOAAAAFAAAAA8AAAAEAAAAAAAAAAoAAAAKAAAAHwAAAAoAAAAfAAAACgAAAAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAoA' + 
'AAAKAAAACgAAAAAAAAAEAAAAAAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAAABQAAAD0AAAAnAAAAIAAAACAAAAA4AAAABAAAAAwAAAAdAAAAPwAAAD8AAAAdAAAADAAAAAQAAAAAAAAAAAAAAAAA' + 
'AAA/AAAAPwAAAAAAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8A' + 
'AAA/AAAAPwAAAD8AAAA/AAAABwAAAAcAAAAHAAAABwAAAD8AAAA/AAAAPwAAAD8AAAA4AAAAOAAAADgAAAA4AAAAPwAAAD8AAAA/AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAOAAAADgAAAA4AAAAPwAAAD8AAAA/AAAAPwAAADgAAAA4AAAAOAAAADgAAAAHAAAABwAAAAcAAAAHAAAAOAAAADgAAAA4AAAAOAAAADgA' + 
'AAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAeAAAAPwAAAAwAAAAMAAAADAAAAAwAAAAMAAAACAAAAAwAAAAuAAAAPwAAAD8AAAAuAAAADAAAAAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAAAwA' + 
'AAAMAAAADAAAAAwAAAA/AAAAHgAAAAwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACEAAAASAAAADAAAAAwAAAAtAAAAPwAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAABwAAAAcAAAAHAAAAPwAAAD8AAAA/AAAAPwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcA' + 
'AAAHAAAABwAAAAcAAAAHAAAABwAAADgAAAA4AAAAOAAAADgAAAAHAAAABwAAAAcAAAAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/AAAAPwAAAD8AAAA/AAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAHAAAABwAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAA' + 
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAAAAAAAAQAAAAEAAAABAAAAHwAAABEAAAARAAAAEQAAAAAAAAABAAAAHwAAABUAAAAVAAAAFQAAABUAAAAVAAAAAAAAAA4AAAARAAAAAQAAAAcAAAABAAAAEQAAAA4AAAAAAAAAHwAAABUAAAAVAAAAFQAAABUAAAAVAAAAEQAAAAAA' + 
'AAAOAAAAEQAAAAEAAAAGAAAAEQAAABEAAAAOAAAAAAAAABkAAAAVAAAAFQAAABkAAAARAAAAEQAAABEAAAAAAAAAHgAAABEAAAARAAAAHgAAABAAAAAQAAAAEAAAAAAAAAAeAAAAEQAAABEAAAAeAAAAEQAAABEAAAAeAAAAAAAAABEAAAAVAAAAFQAAAA4AAAAVAAAAFQAAABEAAAAAAAAAEAAAAAgAAAAEAAAACgAAABEA' + 
'AAARAAAAEQAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAfAAAAAAAAAA4AAAARAAAAEAAAABAAAAAQAAAAEQAAAA4AAAAAAAAAEAAAABAAAAAQAAAAHgAAABEAAAARAAAAHgAAAAAAAAARAAAACQAAAAUAAAAPAAAAEQAAABEAAAAPAAAAAAAAABEAAAARAAAAEQAAABEAAAARAAAAEQAAAB8AAAAAAAAADgAAABEA' + 
'AAARAAAAEQAAABEAAAARAAAADgAAAAAAAAARAAAAEQAAABEAAAAfAAAAEQAAABEAAAARAAAAAAAAABEAAAARAAAAEQAAABUAAAAVAAAAGwAAABEAAAAAAAAACQAAAAkAAAAJAAAACQAAAAkAAAAJAAAABwAAAAAAAAARAAAAEgAAABQAAAAYAAAAFAAAABIAAAARAAAAAAAAABEAAAARAAAAGQAAABUAAAATAAAAEQAAABUA' + 
'AAAAAAAAEQAAABEAAAAZAAAAFQAAABMAAAARAAAAEQAAAAAAAAARAAAAEQAAAAoAAAAEAAAACgAAABEAAAARAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEQAAAB8AAAAAAAAABAAAAAQAAAAfAAAAFQAAABUAAAAfAAAABAAAAAAAAAAfAAAAEAAAABAAAAAeAAAAEAAAABAAAAAfAAAAAAAAABEAAAAfAAAACgAAAAoA' + 
'AAAKAAAACgAAAAYAAAAAAAAAAQAAAB8AAAASAAAAEgAAABIAAAASAAAAEgAAAAAAAAAeAAAAEQAAABEAAAAeAAAAEAAAABAAAAAfAAAAAAAAABEAAAARAAAAHwAAABEAAAARAAAACgAAAAQAAAAAAAAAEgAAABUAAAAVAAAAHQAAABUAAAAVAAAAEgAAAAAAAAAfAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 
'AAAAAAAAAAAAAAAAAAAAAAAAEQAAAA4AAAAAAAAADgAAAAIAAAACAAAAAgAAAAIAAAACAAAADgAAAAAAAAAAAAAAAQAAAAIAAAAEAAAACAAAABAAAAAAAAAAAAAAAA4AAAAIAAAACAAAAAgAAAAIAAAACAAAAA4AAAAAAAAAHwAAABAAAAAIAAAADgAAAAIAAAABAAAAHwAAAAAAAAAEAAAABAAAAAQAAAAEAAAACgAAABEA' + 
'AAARAAAAAAAAABEAAAARAAAACgAAAAQAAAAKAAAAEQAAABEAAAAAAAAACgAAABUAAAAVAAAAFQAAABEAAAARAAAAEQAAAAAAAAAEAAAABAAAAAoAAAAKAAAAEQAAABEAAAARAAAAAAAAAA4AAAARAAAAEQAAABEAAAARAAAAEQAAABEAAAAAAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAAHwAAAAAAAAAOAAAAEQAAAAEA' + 
'AAAOAAAAEAAAABEAAAAOAAAAAAAAABEAAAASAAAAFAAAAB4AAAARAAAAEQAAAB4AAAAAAAAADQAAABIAAAAVAAAAEQAAABEAAAARAAAADgAAAAAAAAAQAAAAEAAAABAAAAAeAAAAEQAAABEAAAAeAAAAAAAAAA4AAAARAAAAEQAAABEAAAARAAAAEQAAAA4AAAAAAAAAEQAAABEAAAATAAAAFQAAABkAAAARAAAAEQAAAAAA' + 
'AAARAAAAEQAAABEAAAAVAAAAFQAAABsAAAARAAAAAAAAAB8AAAARAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAAAAAEQAAABIAAAAUAAAAGAAAABQAAAASAAAAEQAAAAAAAAAOAAAAEQAAABEAAAABAAAAAQAAAAEAAAABAAAAAAAAAA4AAAAEAAAABAAAAAQAAAAEAAAABAAAAA4AAAAAAAAAEQAAABEAAAARAAAAHwAAABEA' + 
'AAARAAAAEQAAAAAAAAAPAAAAEQAAABMAAAAQAAAAEAAAABEAAAAOAAAAAAAAABAAAAAQAAAAEAAAAB4AAAAQAAAAEAAAAB8AAAAAAAAAHwAAABAAAAAQAAAAHgAAABAAAAAQAAAAHwAAAAAAAAAeAAAACQAAAAkAAAAJAAAACQAAAAkAAAAeAAAAAAAAAA4AAAARAAAAEAAAABAAAAAQAAAAEQAAAA4AAAAAAAAAHgAAABEA' + 
'AAARAAAAHgAAABEAAAARAAAAHgAAAAAAAAARAAAAEQAAAB8AAAARAAAAEQAAAAoAAAAEAAAAAAAAAA4AAAAQAAAAFwAAABUAAAATAAAAEQAAAA4AAAAAAAAABAAAAAAAAAAEAAAAAgAAAAEAAAARAAAADgAAAAAAAAAIAAAABAAAAAIAAAABAAAAAgAAAAQAAAAIAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAfAAAAAAAAAAAA' + 
'AAAAAAAAAgAAAAQAAAAIAAAAEAAAAAgAAAAEAAAAAgAAAAAAAAAIAAAABAAAAAwAAAAMAAAAAAAAAAwAAAAMAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAMAAAADAAAAAAAAAAAAAAAHAAAAAIAAAABAAAADwAAABEAAAARAAAADgAAAAAAAAAOAAAAEQAAABEAAAAOAAAAEQAAABEAAAAOAAAAAAAAAAgAAAAIAAAACAAAAAQA' + 
'AAACAAAAAQAAAB8AAAAAAAAADgAAABEAAAARAAAAHgAAABAAAAAIAAAABwAAAAAAAAAOAAAAEQAAAAEAAAABAAAAHgAAABAAAAAfAAAAAAAAAAIAAAACAAAAHwAAABIAAAAKAAAABgAAAAIAAAAAAAAADgAAABEAAAABAAAABgAAAAIAAAABAAAAHwAAAAAAAAAfAAAAEAAAAAgAAAAGAAAAAQAAABEAAAAOAAAAAAAAAA4A' + 
'AAAEAAAABAAAAAQAAAAEAAAADAAAAAQAAAAAAAAADgAAABEAAAAZAAAAFQAAABMAAAARAAAADgAAAAAAAAAAAAAAEAAAAAgAAAAEAAAAAgAAAAEAAAAAAAAAAAAAAAwAAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHwAAAAAAAAAAAAAAAAAAAAAAAAAIAAAABAAAAAwAAAAMAAAAAAAAAAAA' + 
'AAAAAAAAAAAAAAAAAAAEAAAABAAAAB8AAAAEAAAABAAAAAAAAAAAAAAAAAAAAAQAAAAVAAAADgAAABUAAAAEAAAAAAAAAAAAAAAIAAAABAAAAAIAAAACAAAAAgAAAAQAAAAIAAAAAAAAAAIAAAAEAAAACAAAAAgAAAAIAAAABAAAAAIAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAIAAAAGAAAABgAAAAAAAAANAAAAEgAAABUA' + 
'AAAMAAAACgAAAAoAAAAEAAAAAAAAAAMAAAATAAAACAAAAAQAAAACAAAAGQAAABgAAAAAAAAABAAAAB4AAAAFAAAADgAAABQAAAAPAAAABAAAAAAAAAAKAAAACgAAAB8AAAAKAAAAHwAAAAoAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACgAAAAoAAAAAAAAABAAAAAAAAAAEAAAABAAAAAQAAAAEAAAABAAAAAAA' + 
'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABQAAAAUAAAA9AAAAJwAAACAAAAAgAAAAOAAAAAQAAAAMAAAAHQAAAD8AAAA/AAAAHQAAAAwAAAAEAAAAAAAAAAAAAAAAAAAAPwAAAD8AAAAAAAAAAAAAAAAAAAAMAAAADAAAAAwAAAAMAAAADAAAAAwA' + 
'AAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAD8AAAA/AAAAPwAAAAcAAAAHAAAABwAAAAcAAAA/AAAAPwAAAD8A' + 
'AAA/AAAAOAAAADgAAAA4AAAAOAAAAD8AAAA/AAAAPwAAAD8AAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAA4AAAAOAAAAD8AAAA/AAAAPwAAAD8AAAA4AAAAOAAAADgAAAA4AAAABwAAAAcAAAAHAAAABwAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAADgAAAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAA' + 
'AAAMAAAAHgAAAD8AAAAMAAAADAAAAAwAAAAMAAAADAAAAAgAAAAMAAAALgAAAD8AAAA/AAAALgAAAAwAAAAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwAAAAMAAAADAAAAAwAAAAMAAAAPwAAAB4AAAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAA' + 
'AAAAAAAAAAAAAAAAAAAhAAAAEgAAAAwAAAAMAAAALQAAAD8AAAAMAAAADAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAAAAcAAAAHAAAABwAAAD8AAAA/AAAAPwAAAD8AAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAAHAAAABwAAAAcAAAA4AAAAOAAAADgAAAA4AAAABwAAAAcA' + 
'AAAHAAAABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPwAAAD8AAAA/AAAAPwAAAAAAAAAAAAAAAAAAAAAAAAAHAAAABwAAAAcAAAAHAAAAAAAAAAAAAAAAAAAAAAAAADgAAAA4AAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==';
*/