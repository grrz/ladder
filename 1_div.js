// Ladder
// div layer functions
//
// provides: 
// gravestone_set(x, y), gravestone_cleanup(), start_effect(effect_name, x, y, params)
//
// code requires from main:
// env.b
//
// code requires from screen:
// screen_abs_x(x), screen_abs_y(y), screen_abs_charw(), screen_abs_charh()

// cleanup gravestones
function gravestone_cleanup() {
  for (var i = 0; i < env.b.children.length; i++) {
    if ((env.b.children[i].tagName == 'DIV') && (env.b.children[i]._type == "gravestone")) {
      env.b.removeChild(env.b.children[i]);
//      b.children[i].destroy()
      i--;
    }
  }
}


function gravestone_set(x, y) {
  if (game.gravestones == 0) return;

  // find existing gravestone
  for (var i = 0; i < env.b.children.length; i++)
    if ((env.b.children[i]._type == "gravestone") && (env.b.children[i]._x == x) && (env.b.children[i]._y == y)) {
      env.b.children[i].innerHTML = ++env.b.children[i]._n;
      i = -1;
      break;
    }
  
  if (i == -1) return;

  // put a new gravestone
  var e = document.createElement("div");
  e.style.position = "absolute";
  e.style.left = (screen_abs_x(x) + 1) + "px";
  e.style.top = screen_abs_y(y) + "px";
  e.style.background = "#1F0000";
  e.style.border = "1px solid #770000";
  e.style.width = screen_abs_charw() - 2;
  e.style.height = screen_abs_charh();
  e.style.opacity = 0.50;
  e.style.font = "8px sans-serif";
  e.style.padding = "0 1px";
  e.align = "right";
  e._type = "gravestone";
  e._x = x;
  e._y = y;
  e._n = 1;
  e.innerHTML = '';
  env.b.appendChild(e);
}


/*
effects
*/

var _effects = {
  _random: function(a) { return a[Math.floor(Math.random() * a.length)] },

  _test: {
    start: function(x, y, params) {
      var e = document.createElement("div");
      e.style.position = "absolute";
      e._l = screen_abs_x(x) + 1;
      e._t = screen_abs_y(y);
      e._w = screen_abs_charw();
      e._h = screen_abs_charh();
      e.style.left = e._l + "px";
      e.style.top = e._t + "px";
      e.style.background = "#007700";
      e.style.border = "1px solid #007700";
      e.style.width = e._w;
      e.style.height = e._h;
      e.style.opacity = 0.60;
      e.style.font = "12px sans-serif";
      e._type = "effect";
      e.id = "_effect_" + Math.floor(Math.random() * 1000);
      e._x = x;
      e._y = y;
      e._timing = 30;
      e._step_init = 30;
      e._step = 30;
      e.innerHTML = '';
      env.b.appendChild(e);

      return [e.id, e._timing];
    },

    step: function(n) {
      var e = document.getElementById(n);
      if (e == null) return;
      
      var i = e._step_init - e._step;
      e.style.opacity -= 0.02;
      e.style.left = (e._l - i) + "px";
      e.style.top = (e._t - i) + "px";
      e.style.width = e._w + i * 2;
      e.style.height = e._h + i * 2;
      
      e._step--;
      
      return e._step > 0 ? e._timing : 0;
    },
    finish: function(n) {
      var e = document.getElementById(n);
      if (e == null) return;

      env.b.removeChild(e);
    }
  },

  score: {
    start: function(x, y, params) {
      var e = document.createElement("div");
      e.style.position = "absolute";
      e._type = "effect";
      e.id = "_effect_" + Math.floor(Math.random() * 1000);

      e._l = screen_abs_x(x);
      e._t = screen_abs_y(y);
      e.style.left = e._l + "px";
      e.style.top = e._t + "px";

      e.style.opacity = 1;
      e.style.font = (params.size == null ? "10" : params.size) + "px sans-serif";
      e.style.color = params.color == null ? "#FFFF00" : params.color;
      e.style['font-weight'] = "bold";

      e._step = 0;
      e.innerHTML = params.score;

      e._heght = params.height == null ? 60 : params.height;

      env.b.appendChild(e);

      return [e.id, 30];
    },

    step: function(n) {
      var e = document.getElementById(n);
      if (e == null) return;

      e._step++;
      if (e._step > e._heght) return 0;
 
      if (e._step < e._heght / 2) {
        e.style.top = Math.floor(e._t - e._heght + Math.pow(e._heght / 2 - e._step, 2) / e._heght * 4) + "px";
      } else {
        e.style.opacity -= 0.03;
      }
      
      return 30;
    }
  },

  pointer: {
    start: function(x, y, params) {
      var e = document.createElement("div");
      e.style.position = "absolute";
      e._type = "effect";
      e.id = "_effect_" + Math.floor(Math.random() * 1000);

      e._l = screen_abs_x(x) + 1;
      e._t = screen_abs_x(y) - 33;
      e.style.left = e._l + "px";
      e.style.top = e._t + "px";

      e.style.opacity = 0;
      e.style.font = "20px sans-serif";
      e.style.color = "#00FF00";
      e.style['font-weight'] = "bold";

      e._step = 0;
      e.innerHTML = 'V';

      e.style.width = 20;
      env.b.appendChild(e);

      return [e.id, 30];
    },

    step: function(n) {
      var e = document.getElementById(n);
      if (e == null) return;

      e._step++;
      if (e._step > 90) return 0;
 
      if (e._step <= 10) { e.style.opacity = e._step / 10; }
      else if (e._step > 80) { e.style.opacity = (90 - e._step) / 10; }
      
      var t = e._step % 16; if (t > 7) t = 15 - t;
      e.style.top = Math.floor(e._t + Math.pow(t, 3) / 32) + "px";
      
      return 30;
    }
  },

  sparkles: {
    start: function(x, y, params) {
      var n = Math.floor(Math.random() * 10) + 10; // number of sparkles
      
      var id = "_effect_" + Math.floor(Math.random() * 1000) + 'n' + n + '_';

      for (var i = 0; i < n; i++) {
        var e = document.createElement("div");

        e._type = "effect";
        e.id = id + i;
        e._n = n;

        e._l = screen_abs_x(x + 0.5);
        e._t = screen_abs_y(y);

        e.style.position = "absolute";
        e.style.left = e._l + "px";
        e.style.top = e._t + "px";

        e._step_x = Math.random() * 6 - 3;
        e._step_y_a = Math.random() * 0.3;
        e._step_y_b = Math.random() * 2 + 3;
        switch (params.dir) {
          case 'l': e._step_x -= 3; break;
          case 'r': e._step_x += 3; break;
//          case 'u': e._step_y_b += 3; break;
//          case 'd': e._step_y_b = 0 - e._step_y_b; break;
        }
        e._step_max = Math.floor(Math.random() * 25) + 15;
        e._step = 0;

        e.style.font = _effects._random([8, 10, 12, 14]) + "px sans-serif";
        e.style['font-weight'] = "bold";
        e.style.color = _effects._random(['#FFFF00', '#FF0000', '#FFAF00', 'white', '#AFFF00']);
        e.innerHTML = _effects._random(['.', 'o', '*', '&times;', 'O', '&diams;']);
        e.align = 'center';
        e.style.opacity = _effects._random([0.6, 0.8, 1]);

        e.style.width = 10;
        e.style.height = 10;
        env.b.appendChild(e);
      }

      return [id, 30];
    },

    step: function(id) {
      var n = id.match(/n(\d+)/)[1];

      var ok = 0;
      
      for (var i = 0; i < n; i++) {
        var e = document.getElementById(id + i);
        if (e != null) {
          ok = 1;

          e._step++;
          if (e._step > e._step_max) {
            env.b.removeChild(e);
          } else {
            e.style.left = Math.floor(e._l + e._step * e._step_x) + 'px';
            e.style.top = Math.floor(e._t + e._step * e._step * e._step_y_a - e._step * e._step_y_b) + 'px';
          }
        }
      }

      return ok > 0 ? 30 : 0;
    },

    finish: function(n) { }
  },

  circle: {
    start: function(x, y, params) {      
      var id = "_effect_" + Math.floor(Math.random() * 1000) + '_';

      var _l = screen_abs_x(x + 0.5);
      var _t = screen_abs_y(y);

      for (var i = 0; i < 20; i++) {
        var e = document.createElement("div");

        e._type = "effect";
        e.id = id + i;

        e._l = _l;
        e._t = _t;

        e.style.position = "absolute";
        e.style.left = e._l + "px";
        e.style.top = e._t + "px";

        e._step = 0;

        e.style.font = "10px sans-serif";
        e.style['font-weight'] = "bold";
        e.style.color = '#FFFF00';
        e.innerHTML = '*';
        e.align = 'center';
        e.style.opacity = 1;

        e.style.width = 10;
        e.style.height = 10;
        env.b.appendChild(e);
      }

      return [id, 30];
    },

    step: function(id) {
      
      var ok = 0;

      for (var i = 0; i < 20; i++) {
        var e = document.getElementById(id + i);
        if (e == null) continue;

        e._step++;
        if (e._step < 120) {
          var s2;
          var angle;
          if (e._step < 30) {
            s2 = 35 - Math.pow(35 - e._step, 3) / 1250;
          } else if (e._step < 90) {
            s2 = 35;
          } else {
            s2 = 35 + Math.pow(e._step - 90, 3) / 120;
            e.style.opacity = 1 - (e._step - 90) / 30;
          }

          if (e._step < 10) {
            angle = 3.14 / 10 * i;
          } else if (e._step < 100) {
            angle = 3.14 / 10 * (i + e._step / 5 - 2);
          } else {
            angle = 3.14 / 10 * (i + 18);
          }

          e.style.left = Math.floor(e._l + s2 * Math.cos(angle)) + 'px';
          e.style.top  = Math.floor(e._t + s2 * Math.sin(angle)) + 'px';

          ok = 1;
        } else {
            env.b.removeChild(e);
        }
      }

      return ok > 0 ? 30 : 0;
    },

    finish: function(n) {}
  },

  pointer2: {
    _id: '',
    _points: [ [-14, -30], [14, -30], [0, 0] ], // %%% const
    _step: function (t) {
      var pc = Math.floor(t / 15) % 3; // %%% const
      var pn = pc >= 2 ? 0 : pc + 1;
      var i = t % 15; // %%% const

      return [
        this._points[pc][0] + Math.floor((this._points[pn][0] - this._points[pc][0]) * i / 15), // %%% const
        this._points[pc][1] + Math.floor((this._points[pn][1] - this._points[pc][1]) * i / 15)  // %%% const
      ];
    },
    start: function(x, y, params) {
      if (this._id != '') return this._restart(x, y, params);

      var id = "_effect_" + Math.floor(Math.random() * 1000) + '_';

      var _l = screen_abs_x(x + 0.25);
      var _t = screen_abs_y(y - 0.5);

      var t = 0;

      for (var i = 0; i < 15; i++) { // %%% const
        var e = document.createElement("div");

        e._type = "effect";
        e.id = id + i;

        e._l = _l;
        e._t = _t;

        e._step = 0;
        e._shift = t;

        e.style.position = "absolute";
        var coords = this._step(t);
        e.style.left = (_l + coords[0]) + "px";
        e.style.top = (_t + coords[1] + - 20) + "px"; // %%% const

        e.style.font = "10px sans-serif";
        e.style['font-weight'] = "bold";
        e.style.color = '#00FF00';
        e.innerHTML = '*';
        e.align = 'center';
        e.style.opacity = 1;

        e.style.width = 10;
        e.style.height = 10;
        env.b.appendChild(e);

        t += 3;
      }
      
      this._id = id;

      return [id, 100];
    },

    _restart: function(x, y, params) {
      var _l = screen_abs_x(x + 0.25);
      var _t = screen_abs_y(y - 0.5);

      var t = 0;

      for (var i = 0; i < 15; i++) { // %%% const
        var e = document.getElementById(this._id + i);
        if (e == null) continue;

        e._l = _l;
        e._t = _t;

        var coords = this._step(t);
        e.style.left = (_l + coords[0]) + "px";
        e.style.top = (_t + coords[1] + - 20) + "px"; // %%% const

        e._step = 0;

        t += 3;
      }

      return [this._id, 100];
    },

    step: function(id) {
      
      var ok = 1;

      for (var i = 0; i < 15; i++) { // %%% const
        var e = document.getElementById(id + i);
        if (e == null) continue;

        e._step++;

        var coords = this._step(e._step + e._shift);
        var t = e._step % 16; if (t > 7) t = 15 - t;
        e.style.left = (e._l + coords[0]) + "px";
        e.style.top = (e._t + coords[1] + Math.floor((Math.pow(t + 5, 4) - 625) / 1024 - 20)) + "px";

        if (e._step > 30) {
          if (e._step < 40) {
            e.style.opacity = 1 - (e._step - 30) / 10;
          } else {
            env.b.removeChild(e);
            ok = 0;
            this._id = '';
          }
        }
      }

      return ok > 0 ? 100 : 0;
    },

    finish: function(n) {}
  },
};


function start_effect(type, x, y, params) {
  if (_effects[type] == null) return;

  var id = _effects[type].start(x, y, params);
  
  if (id != null)
    window.setTimeout("_do_effect('" + type + "', '" + id[0] + "')", id[1]);
}

function _do_effect(type, n) {
  var t = _effects[type].step(n);
  
  if (t > 0) {
    window.setTimeout("_do_effect('" + type + "', '" + n + "')", t);
  } else {
    if (typeof(_effects[type].finish) == 'function') {
      _effects[type].finish(n);
    } else {
      var e = document.getElementById(n);
      if (e == null) return;
      env.b.removeChild(e);
    }
  }
}
