// Ladder
// menu functions
//
// var console should be set
//
// code requires from main:
// game_loadlevel(), game_loadlevel_standalone(), game_loadlevelset(),
// game_incspeed(), game_decspeed(), kbd_focus, draw_map(), game, player, env
//
// code requires from levels:
// levelset[], level[]
//
// code requires from screen:
// scale_x, scale_y
//
// code has keycodes hardcoded

/*
type: determines behavior
title: title
data: for submenu - submenu items
init: initial drawing


each menu item has:
1 draw funcs:
- select
- deselect
- hover

2 action funcs:
- action (performs all keystrokes)

the type of menu item declares some standard actions:
- for submenu, 

*/

var _page_length = 5;


var _menu_ls_items = [];
var _menu_l_items = [];



var menu_items = [
  {
    type: 'submenu',
    title: 'Load levelset',
    init: function (i) {
      if (_menu_ls_items.length) return;
      for (var ls in levelset) {
        if (! levelset[ls]['menu_omit']) {
          var llist = [];
          var sidlist = ["menu_" + ls + "_0"];
          var i = 1;
          for (var l = 0; l < levelset[ls].levels.length; l++) {
            var sid = 'menu_' + ls + '_' + i;
            var sidp = ls + '", "' + i;
            llist.push('<span id="' + sid + '" style="padding: 0px 2px; font-weight: bold; color: white">' + levelset[ls].levels[l] + "</span>");
            i++;
          }
          
          _menu_ls_items.push({
            type: 'item',
            title: '<span id="menu_' + ls + '_0" style="padding: 0px 2px; font-weight: bold; color: white">' + ls + '</span><br><hr><font size="-1">' + llist.join(' ') + '</font>',
            ls: ls,
            llength: levelset[ls].levels.length + 1,
            close_menu_on_enter: 1,
            action: function (k) {
              switch (k) {
               case 13:
                 if (_smenu_current_item <= 0) {
                   game_loadlevelset(this.ls);
                 } else {
                   game_loadlevel_standalone(levelset[this.ls].levels[_smenu_current_item - 1]);
                 }
                break;

               case 37: // <: nav left
                if (_smenu_current_item == -1) { kbd_menu_d(8); break; } else {
                  	_smenu_item_dehover(this.ls, _smenu_current_item);
                  _smenu_current_item--;
                  if (_smenu_current_item < 0) _smenu_current_item = this.llength - 1;
                }
                _smenu_item_hover(this.ls, _smenu_current_item);
               break;

               case 39: // >: nav right
                if (_smenu_current_item == -1) { _smenu_current_item = 1 } else {
                  _smenu_item_dehover(this.ls, _smenu_current_item);
                  _smenu_current_item++;
                  if (_smenu_current_item >= this.llength) _smenu_current_item = 0;
                }
                _smenu_item_hover(this.ls, _smenu_current_item);
               break;
              }
            },
            hover: function () {
              if (_smenu_current_ls != this.ls) {
                if (_smenu_current_ls != '') _smenu_item_dehover(_smenu_current_ls, _smenu_current_item);
                _smenu_current_ls = this.ls;
                _smenu_current_item = -1;
              }
            }
          });
        }
      }
    },
    data: _menu_ls_items
  },

  {
    type: 'submenu',
    title: 'Load level',
    init: function (i) {
      if (_menu_l_items.length) return;
      var lsu = {}; for (var ls in levelset) for (var l in levelset[ls].levels) lsu[levelset[ls].levels[l]] = 1;
      for (var l in level) {
        if (lsu[l] == null) {
          _menu_l_items.push({
            type: 'item',
            title: l,
            l: l,
            close_menu_on_enter: 1,
            action: function (k) {
              switch (k) {
               case 13: game_loadlevel_standalone(this.l); break;
               case 37: kbd_menu_d(8); // emulates backspace
              }
            }
          });
        }
      }
    },
    data: _menu_l_items
  },

  {
    type: 'item',
    title: function () {
      var span = [];
      for (var i = 0; i < game.speed_states.length; i++) if (game.speed_states[i] >= game.speed) break;

      if (i < game.speed_states.length - 1) {
        span.push('<span id="menu_speed_l">&lt;</span>');
        span.push('<span id="menu_speed_p" style="font-weight: normal; font-size: 80%">1/' + game.speed_states[i+1] + '</span>');
      } else {
        span.push('<span id="menu_speed_l" style="color: grey">&lt;</span>');
        span.push('<span id="menu_speed_p" style="font-weight: normal; font-size: 80%"></span>');
      }

      span.push('<span id="menu_speed_c">1/' + game.speed + '</span>');

      if (i > 0) {
        span.push('<span id="menu_speed_n" style="font-weight: normal; font-size: 80%">1/' + game.speed_states[i-1] + '</span>');
        span.push('<span id="menu_speed_r">&gt;</span>');
      } else {
        span.push('<span id="menu_speed_n" style="font-weight: normal; font-size: 80%"></span>');
        span.push('<span id="menu_speed_r" style="color: grey">&gt;</span>');
      }

      return 'Speed<br>' + span.join('&nbsp;');
    },
    close_menu_on_enter: 1,
    action: function (k) {
      var _do = 0;
      
      switch (k) {
       case 37: game_decspeed(); _do = 1; break;
       case 39: game_incspeed(); _do = 1; break;
      }

      if (_do) {
        var s;
        for (var i = 0; i < game.speed_states.length; i++) if (game.speed_states[i] >= game.speed) break;

        s = document.getElementById("menu_speed_l"); s.style.color = i == game.speed_states.length - 1 ? 'grey' : 'white';
        s = document.getElementById("menu_speed_r"); s.style.color = i == 0 ? 'grey' : 'white';
        s = document.getElementById("menu_speed_c"); s.innerHTML = '1/' + game.speed;
        s = document.getElementById("menu_speed_p"); s.innerHTML = i < game.speed_states.length - 1 ? '1/' + game.speed_states[i+1] : '';
        s = document.getElementById("menu_speed_n"); s.innerHTML = i > 0 ? '1/' + game.speed_states[i-1] : '';
      }
    }
  },

  {
    type: 'item',
    title: function () {
      var span = [];
      for (var i = 0; i < game.scale_states.length; i++) if (game.scale_states[i] >= scale_x) break;

      if (i > 0) {
        span.push('<span id="menu_scale_l">&lt;</span>');
        span.push('<span id="menu_scale_p" style="font-weight: normal; font-size: 80%">' + game.scale_states[i-1] + '&times;' + game.scale_states[i-1] + '</span>');
      } else {
        span.push('<span id="menu_scale_l" style="color: grey">&lt;</span>');
        span.push('<span id="menu_scale_p" style="font-weight: normal; font-size: 80%"></span>');
      }

      span.push('<span id="menu_scale_c">' + scale_x + '&times;' + scale_y + '</span>');

      if (i < game.scale_states.length - 1) {
        span.push('<span id="menu_scale_n" style="font-weight: normal; font-size: 80%">' + game.scale_states[i+1] + '&times;' + game.scale_states[i+1] + '</span>');
        span.push('<span id="menu_scale_r">&gt;</span>');
      } else {
        span.push('<span id="menu_scale_n" style="font-weight: normal; font-size: 80%"></span>');
        span.push('<span id="menu_scale_r" style="color: grey">&gt;</span>');
      }

      return 'Scale<br>' + span.join('&nbsp;');
    },
    close_menu_on_enter: 1,
    action: function (k) {
      var _do = 0;
      
      switch (k) {
       case 37:
        for (var i = game.scale_states.length - 1; i >= 0; i--)
          if (scale_x > game.scale_states[i]) {
            screen_set_scale(game.scale_states[i], game.scale_states[i]); draw_map();
            _do = 1; break;
          }
       break;
       case 39:
        for (var i = 0; i < game.scale_states.length; i++)
          if (scale_x < game.scale_states[i]) {
            screen_set_scale(game.scale_states[i], game.scale_states[i]); draw_map();
            _do = 1; break;
          }
       break;
      }

      if (_do) {
        var s;
        for (var i = 0; i < game.scale_states.length; i++) if (game.scale_states[i] >= scale_x) break;

        s = document.getElementById("menu_scale_l"); s.style.color = i == 0 ? 'grey' : 'white';
        s = document.getElementById("menu_scale_r"); s.style.color = i == game.scale_states.length - 1 ? 'grey' : 'white';
        s = document.getElementById("menu_scale_c"); s.innerHTML =  scale_x + '&times;' + scale_y;
        s = document.getElementById("menu_scale_p"); s.innerHTML = i > 0 ? game.scale_states[i-1] + '&times;' + game.scale_states[i-1] : '';
        s = document.getElementById("menu_scale_n"); s.innerHTML = i < game.scale_states.length - 1 ? game.scale_states[i+1] + '&times;' + game.scale_states[i+1] : '';
      }
    }
  },

  {
    type: 'item',
    title: function () { return env.console_visible ? 'Console: on' : 'Console: off'; },
    action: function (k) {
      switch (k) {
       case 37: case 39: case 32: case 13: case 8:
        env.console_visible = ! env.console_visible;
        var s = document.getElementById("menu" + _menu_current_item);
        s.innerHTML = env.console_visible ? 'Console: on' : 'Console: off';
        env.console.style.display = env.console_visible ? 'block' : 'none';
      }
    }
  },

  {
    type: 'item',
    title: function () { return "Keyboard mode: " + (player.kbd_mode == 'm' ? 'modern' : 'classic'); },
    action: function (k) {
      switch (k) {
       case 37: case 39: case 32: case 13: case 8:
        player.kbd_mode = player.kbd_mode == 'm' ? 'c' : 'm';
        var s = document.getElementById("menu" + _menu_current_item);
        s.innerHTML = "Keyboard mode: " + (player.kbd_mode == 'm' ? 'modern' : 'classic');
      }
    }
  },
];


var _menu_current;
var _menu_level = [];
var _menu_current_item = 0;
var _smenu_current_ls = '';
var _smenu_current_item = -1;

// <div style="background: #FFFF00; color: black; border: 1px solid #777777; padding: 10px;">menu</div>


// submenu functions
function _menu_submenu_action(i, k) {
  switch (k) {
   case 37: // 
    return false;
   break;

   case 39: // 
   case 13: // enter
    _menu_level.push({i: i, m: _menu_current});
    menu_init(_menu_current[i].data, 0);
    return false;
   break;
   
  }
}

//
// general item functions
//
function _menu_item_init(i) {
  switch (_menu_current[i].type) {
   case 'option':
    return _menu_current[i].init(i);
   break;
  
  default: // item, submenu
   if (typeof(_menu_current[i].init) == 'function') _menu_current[i].init(i);
   return(
    '<div id="menu' + i + '" style="margin: 5px; background: #003F00; border: 1px solid #777777; padding: 10px; font-weight: bold; color: white"'
    + ' onmouseover="_menu_item_mhover(' + i +'); return false" onmousedown="_menu_item_select(' + i + '); return false;" onmouseout="_menu_item_mhover(' + i +'); return false" onmouseup="_menu_item_action(' + i +', 13); return false">'
    + (typeof(_menu_current[i].title) == 'function' ? _menu_current[i].title(i) : _menu_current[i].title)
    + '</div>');
  }
}

function _menu_item_hover(i) {
//  switch (_menu_current[i].type) {
//   default: // item, submenu
    var m = document.getElementById('menu' + i);
    m.style.background = '#7F7F00'; // %%% hardcoded style


    if (typeof(_menu_current[i].hover) == 'function') _menu_current[i].hover();
//  }
}

function _menu_item_dehover(i) {
//  switch (_menu_current[i].type) {
//   default: // item, submenu
    var m = document.getElementById('menu' + i);
    m.style.background = '#003F00'; // %%% hardcoded style
//  }
}

function _menu_item_mhover(i) {
  _menu_item_dehover(_menu_current_item);
  _menu_current_item = i;
  _menu_item_hover(_menu_current_item);
}

function _menu_item_select(i) {
//  switch (_menu_current[i].type) {
//   default: // item, submenu
    var m = document.getElementById('menu' + i);
    m.style.background = '#AFAF00'; // %%% hardcoded style
//  }
}

function _menu_item_deselect(i) { _menu_item_hover(i); }

function _menu_item_action(i, k) {
  _menu_item_deselect(i);

  switch (_menu_current[i].type) {
   case 'submenu':
    _menu_submenu_action(i, k);
   break;

   case 'item':
    _menu_current[i].action(k);
    if (k == 13 && _menu_current[i].close_menu_on_enter) { menu_off(); kbd_focus = 'p' }
   break;

//   default do nothing
  }
}

function menu_init(menu, ci) {
  var f = document.getElementById('menu_field');
  if (! f) return;

  _menu_current = menu;
  _menu_current_item = ci;
  
  var mc = '';
  
  for (var i = 0; i < menu.length; i++)
    mc += _menu_item_init(i);

  f.innerHTML = mc;
  _menu_item_hover(ci);
}


function menu_on() {
  var menu = document.getElementById('menu');
  if (! menu) return;
  
  _menu_level = [];
  menu_init(menu_items, 0);

  _smenu_current_ls = '';
  _smenu_current_item = -1;

  menu.style.display = 'block';
}

function menu_off(menu_items) {
  var menu = document.getElementById('menu');
  if (! menu) return;

  menu.style.display = 'none';
}

//
// Level submenu functions
//
function _smenu_item_hover(ls, i) {
  var m = document.getElementById('menu_' + ls + '_' + i);
  m.style.background = '#7FAF00'; // %%% hardcoded style
}

function _smenu_item_dehover(ls, i) {
  if (i == -1) return;
  var m = document.getElementById('menu_' + ls + '_' + i);
  m.style.background = ''; // %%% hardcoded style
}


//
// keyboard functions
//
function kbd_menu_d(keycode) {
  switch(keycode) {
   case 38: // : nav up
    _menu_item_dehover(_menu_current_item);
    _menu_current_item--;
    if (_menu_current_item < 0) _menu_current_item = _menu_current.length - 1;
    _menu_item_hover(_menu_current_item);
    return false;
   break;

   case 40: // : nav down
    _menu_item_dehover(_menu_current_item);
    _menu_current_item++;
    if (_menu_current_item >= _menu_current.length) _menu_current_item = 0;
    _menu_item_hover(_menu_current_item);
    return false;
   break;

   case 34: // pgup: nav page up
    if (_menu_current_item + 1 < _menu_current.length) {
      _menu_item_dehover(_menu_current_item);
      _menu_current_item += _page_length;
      if (_menu_current_item >= _menu_current.length) _menu_current_item = _menu_current.length - 1;
      _menu_item_hover(_menu_current_item);
    }
    return false;
   break;

   case 33: // pgdn: nav page down
    if (_menu_current_item != 0) {
      _menu_item_dehover(_menu_current_item);
      _menu_current_item -= _page_length;
      if (_menu_current_item < 0) _menu_current_item = 0;
      _menu_item_hover(_menu_current_item);
    }
    return false;
   break;

   case 36: // home: nav top
    if (_menu_current_item != 0) {
      _menu_item_dehover(_menu_current_item);
      _menu_current_item = 0;
      _menu_item_hover(_menu_current_item);
    }
    return false;
   break;
 
   case 35: // home: nav bottom
    if (_menu_current_item + 1 < _menu_current.length) {
      _menu_item_dehover(_menu_current_item);
      _menu_current_item = _menu_current.length - 1;
      _menu_item_hover(_menu_current_item);
    }
    return false;
   break;
 
   case 8: case 81: // backspace, q: up menu level / close menu
    if (_menu_level.length == 0) { menu_off(); kbd_focus = 'p'; } // close menu
    else {
      var m = _menu_level.pop();
      menu_init(m.m, m.i);
    }

    return false;
   break;

   default:
    _menu_item_action(_menu_current_item, keycode);
  }

  return true;
}

function kbd_menu_u(keycode) {
  return true;
}
