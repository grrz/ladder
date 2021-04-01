// Ladder
// console functions
//
// provides: wc(), ci()
//
// code requires from main:
// game_loadlevel(), game_loadlevel_standalone(), game_loadlevelset(), env.console
//
// code requires from screen:
// screen_set_scale()
//
// code requires from levels:
// levelset[], level[]
//
// code has ties to main:
// game, canvas, draw_map()

var console_length = 10;
var _console_data = [];
var _console_history = [];
var _console_history_i = -1;

function _hex2num(s) {
  function _hex2numc(_ch) {
    _ch = _ch.charCodeAt(0);
    if ((_ch > 47) && (_ch <  58)) return _ch - 48;
    if ((_ch > 64) && (_ch <  71)) return _ch - 55;
    if ((_ch > 96) && (_ch < 103)) return _ch - 87;
    return null;
  }
  var c = [0, 0, 0];
  
  for (var n = 0; n < 3; n++)
    c[n] = _hex2numc(s.charAt(n * 2)) * 16 + _hex2numc(s.charAt(n * 2 + 1));

  return c;
}

function _num2hex(r, g, b) {
  return(
    (r < 16 ? '0' : '' ) + r.toString(16) +
    (g < 16 ? '0' : '' ) + g.toString(16) +
    (b < 16 ? '0' : '' ) + b.toString(16)
  );
}

function wc(s, f, cs, cf) {
  if (s == null) return;

  var out = '';
  var n_fade = Math.floor(console_length / 2);
  
  if (f == null) f = '==='; else if (f != '>') f += ':';
  if (cs == null) cs = '00FF00';
  if (cf == null) cf = cs;
  
  if ((_console_data.length == 0) || (s != _console_data[0].s) || (f != _console_data[0].f)) {
    _console_data.unshift({s: s, f: f, cs: _hex2num(cs), cf: _hex2num(cf), n: 1});
  } else {
    _console_data[0].n++;
  }
  if (_console_data.length > 10) _console_data.pop();
  
  var nx = n_fade < _console_data.length ? n_fade : _console_data.length;
  for (var x = 0; x < nx; x++) {
    var _cc = (n_fade - 1 - x) / (n_fade - 1);
    var fcolor = _num2hex(Math.round((255 - _console_data[x].cf[0]) * _cc + _console_data[x].cf[0]), Math.round((255 - _console_data[x].cf[1]) * _cc + _console_data[x].cf[1]), Math.round((255 - _console_data[x].cf[2]) * _cc + _console_data[x].cf[2]));
    var scolor = _num2hex(Math.round((255 - _console_data[x].cs[0]) * _cc + _console_data[x].cs[0]), Math.round((255 - _console_data[x].cs[1]) * _cc + _console_data[x].cs[1]), Math.round((255 - _console_data[x].cs[2]) * _cc + _console_data[x].cs[2]));
    
    out = '<font color="' + fcolor + '"><b>' + _console_data[x].f + '</b></font><font color="' + scolor + '"> ' + _console_data[x].s + (_console_data[x].n > 1 ? ' [' + _console_data[x].n + ']' : '') + '</font><br>' + out;
  }
  
  n_fade = console_length - n_fade;
  for (var x = nx; x < _console_data.length; x++) {
    var _cc = (console_length - nx - (x - nx) / 1.5) / n_fade;
    var fcolor = _num2hex(Math.round(_console_data[x].cf[0] * _cc), Math.round(_console_data[x].cf[1] * _cc), Math.round(_console_data[x].cf[2] * _cc));
    var scolor = _num2hex(Math.round(_console_data[x].cs[0] * _cc), Math.round(_console_data[x].cs[1] * _cc), Math.round(_console_data[x].cs[2] * _cc));
    
    out = '<font color="' + fcolor + '"><b>' + _console_data[x].f + '</b></font><font color="' + scolor + '"> ' + _console_data[x].s + (_console_data[x].n > 1 ? ' [' + _console_data[x].n + ']' : '') + '</font><br>' + out;
  }
  
  env.console.innerHTML = out;
}

function ci(input) {
  var val = input.value;
  val = val.replace(/^\s+/, ""); val = val.replace(/\s+$/, "");
  
  _console_history_i = -1;
  if ((_console_history.length == 0) || (val != _console_history[_console_history.length - 1]))
    _console_history.push(val);
  
  input.value = '';
  
  if (val.length == 0) return;

  wc(val, '>', 'AAAAAA', 'FFFFFF');

  var items = val.split(/\s+/);
  var command = items.shift();

  switch (command) {
   case 'level': case 'l': case 'map': case 'm':
     if (items.length == 1)
       game_loadlevel_standalone(items[0]);
     else
       wc('usage: ' + command + ' &lt;level&gt;', null, '777777');
   break;

   case 'levelset': case 'ls':
     if (items.length == 1)
       game_loadlevelset(items[0]);
     else
       wc('usage: ' + command + ' &lt;levelset&gt;', null, '777777');
   break;

   case 'balls':
     if ((items.length == 1) && (items[0].match(/^\d+$/)) && (items[0] <= 100))
       game.balls_max = items[0] - 0;
     else
       if (items.length == 0)
         wc('balls: ' + game.balls_max, null, '777777');
       else
         wc('usage: ' + command + ' &lt;number, less than 100&gt;', null, '777777');
   break;
   
   case 'speed': case 's':
     if ((items.length == 1) && (items[0].match(/^\d+$/)) && (items[0] >= 10))
       game.speed = items[0];
     else
       wc('usage: ' + command + ' &lt;number, more than 10&gt;', null, '777777');
   break;
   
   case 'scale':
     if (items.length == 1) items.push(items[0])

     if ((items.length == 2) && (items[0].match(/^\d+(\.\d+)?$/)) && (items[1].match(/^\d+(\.\d+)?$/)) && (items[0] > 0) && (items[0] <= 10) && (items[1] > 0) && (items[1] <= 10)) {
       screen_set_scale(items[0], items[1]);
       draw_map();
     } else
       wc('usage: ' + command + ' &lt;number, 1..10&gt; [number, 1..10]', null, '777777');
   break;

   case 'levelsetlist': case 'lsl':
     var list = [];
     for (var i in levelset) list.push(i);
     wc('levelsets: ' + list.join(' '));
   break;
   
   case 'levellist': case 'll':
     var list = [];
     if (items.length == 0) {
       for (var i in level) list.push(i);
       wc('levels: ' + list.join(' '));
     } else if (levelset[items[0]] != null)
       wc('levels in "' + items[0] + '": ' + levelset[items[0]].levels.join(' '));
     else
       wc('levellist not found: ' + items[0], null, '777777')
   break;
   
   default:
     wc('command not recognized: ' + command, null, '777777')
  }
}

function console_on() {
  var cin = document.getElementById('console_in');
  var cinp = document.getElementById('console_input');
  if (! cin || ! cinp) return;

  env.console.style.display = 'block';
  console_in.style.display = 'block';
  console_input.focus();
}

function console_off() {
  var cin = document.getElementById('console_in');
  var cinp = document.getElementById('console_input');
  if (! cin || ! cinp) return;
  
  console_in.style.display = 'none';
  console_input.value = '';
  if (! env.console_visible) env.console.style.display = 'none';
  canvas.focus();
}

function kbd_console_d(keycode) {
  switch(keycode) {
   case 38: // 
    var cinp = document.getElementById('console_input');
    if (_console_history_i > 0)
      _console_history_i--;
    else if (_console_history_i == -1)
      _console_history_i = _console_history.length - 1;
    
    if (_console_history_i >= 0)
      cinp.value = _console_history[_console_history_i];

    return false;
   break;

   case 40: // 
    var cinp = document.getElementById('console_input');
    if (_console_history_i >= 0)
      if (_console_history_i < _console_history.length - 1) {
        _console_history_i++;
        cinp.value = _console_history[_console_history_i];
      } else {
        _console_history_i = -1;
        cinp.value = '';
      }

    return false;
   break;
  }

  return true;
}

function kbd_console_u(keycode) {
  return true;
}
