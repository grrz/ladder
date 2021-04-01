// Ladder
// balls chatter layer functions
//
// provides: 
// chatter(x, y, params)
//
// code requires from main:
// game.chatter, env.b
//
// code requires from screen:
// screen_abs_x(x), screen_abs_y(y), screen_abs_charw(), screen_abs_charh()

/*
params:

size: font size
color: font color
d: max distance to a ball
*/

var _chatter_event = {
  _random: function(a) { return a[Math.floor(Math.random() * a.length)] },

  luck: 'wow!',
  o: 'you bastard!',
  bonus_big_adds_ball: 'yeeeeeeeeeeehaw!',
  doh: new Array('ha-ha!', 'take that!', 'that must be heart'),
  scoreO12: 'hi there!',
  scoreO: 'watch your head!',
  score_more: 'hey, stop scoring on me!',
  
  gotcha: function(b, params) { // %%% planned to be complex
    return {
      b: b,
      text: this._random([
        '"eeek", he said',
        'another one bites the dust!',
        'geesh',
        'weird',
        'dead',
        'finished'
      ])
    };
  },

};

var _chatter = {
  start: function(b, text, params) {
    if (b == null) return;
    if (params == null) params = {};

    var e = document.createElement("div");
    e.style.position = "absolute";
    e._type = "chatter";
    e.id = "_chatter_" + Math.floor(Math.random() * 1000);

    e._l = screen_abs_x(balls[b].x);
    e._t = screen_abs_y(balls[b].y - 1) + 2;
    e.style.left = e._l + "px";
    e.style.top = e._t + "px";
    e.style.opacity = 0.8;

    e.style.font = (params.size == null ? "10" : params.size) + "px sans-serif";
    e.style.color = params.color == null ? "#FFFFAA" : params.color;
//    e.style.border = "1px solid grey";
    e.style['background-color'] = "#777777";
    e.style['font-weight'] = "bold";

    e._dir = balls[b].s;
    e._step = 0;
    e.innerHTML = text;

    env.b.appendChild(e);

    return [e.id, 50];
  },

  step: function(n) {
    var e = document.getElementById(n);
    if (e == null) return;
    
    e._step++;

    switch (e._dir) {
     case 'l': e._l--; e.style.left = e._l + 'px'; break;
     case 'r': e._l++; e.style.left = e._l + 'px'; break;
     case 'd': e._t++; e.style.top  = e._t + 'px'; break;
     case 'j': e._t--; e.style.top  = e._t + 'px'; break;
    }
//      e.style.top = Math.floor(e._t - e._heght + Math.pow(e._heght / 2 - e._step, 2) / e._heght * 4)) + "px";
    if (e._step > 20) {
      e.style.opacity -= 0.1;
    }

    if (e._step > 30) return 0;
    
    return 50;
  },
};

function _do_chatter(n) {
  var t = _chatter.step(n);
  
  if (t > 0) {
    window.setTimeout("_do_chatter('" + n + "')", t);
  } else {
    var e = document.getElementById(n);
    if (e == null) return;
    env.b.removeChild(e);
  }
}

function chatter_direct(b, text, params) {
  if (game.chatter == 0) return;
  
  var id = _chatter.start(b, text, params);
  
  if (id != null)
    window.setTimeout("_do_chatter('" + id[0] + "')", id[1]);
}

function chatter(type, b, params) {
  if (game.chatter == 0) return;
  if (balls.length == 0) return;
  
  var id;
  
  if (b == null)
    // nearest ball
    b = _nearest_ball(params != null ? params.d : null);
    if (b == null) return;
  else if (b == -1)
    // random ball
    b = Math.floor(Math.random() * balls.length);

  switch (typeof(_chatter_event[type])) {
    case 'string': id = _chatter.start(b, _chatter_event[type]); break;
    case 'object': id = _chatter.start(b, _chatter_event[type][Math.floor(Math.random() * _chatter_event[type].length)]); break;

    case 'function':
      var data = _chatter_event[type](b, params);
      if (data != null)
        id = _chatter.start(data.b, data.text, data.params);
    break;
  }

  if (id != null)
    window.setTimeout("_do_chatter('" + id[0] + "')", id[1]);
}

function _nearest_ball(d) {
  var bn = null;
  var distance = 1000000;

  for (var b = 0; b < balls.length; b++) {
    var d2 = Math.pow(balls[b].x - player.x, 2) + Math.pow(balls[b].y - player.y, 2);
    if (d2 < distance) {
      distance = d2;
      bn = b;
    }
  }
  
  if (d == null || (d != null && distance < d * d)) return bn;

  return null;
}
