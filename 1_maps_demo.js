// Ladder
// demo maps set
//

// vars level and levelset should be declared

levelset['demo'] = {
  levels: ['demo1', 'demo2', 'demo3', 'demo4', 'demo5'],
  // other parameters: speed, score
  score_O1: 0,
  score_O2: 0,
  score_O: 0,
  score_bonus: 0,
  score_bonus_big: 0,
  lives: '#',
  play_type: 'cycle'
};

level['demo1'] = {
  map: [
"               U               ",
"       ----===###===----       ",
"#     H                 H     #",
" H=====-  L A D D E R  -=====H ",
"#       -------*-------       #",
" #                           # ",
"  #-----------H#H-----------#  ",
" H    H                 H    H ",
"*-----------------------------*",
"#$             $             $#",
"#            +++++            #",
"#P     -+--+---.---+--+-      #",
"#..............#..............#",
"#=============================#"
  ],
  balls_max: 10
};

level['demo2'] = {
  map: [
"# U                        U                        U #",
" #                   #H#H#H#H#H#H#                   # ",
"  H=======----------               ----------=======H  ",
" #                    L A D D E R                    # ",
"  #                                                 #  ",
"   #HH=====------    *=====*=====*    ------=====HH#   ",
"    =              ####$@@@.@@@$####              =    ",
"     =            ##@@@@@.@.@.@@@@@##            =     ",
"      -HH===--    #@@@.@.@@.@@.@.@@@#    --===HH-      ",
"       -         ##@@.@.@.@.@.@.@.@@##         -       ",
"        -        #@@@@.@.@.@.@.@.@@@@#        -        ",
"       H       # #+...=.=.=.=.=.=...+# #       H       ", 
"  -----=======H# #.+++.+++++++++.+++.# #H=======-----  ",
"        H      # ##P+++.+.+.+.+.++++## #               ",
"   -----=====H=#  #.++--.-.-.-.--++.#  #=H=====-----   ",
"         H     #  ##...+-.-.-.-+...##  #               ",
"#   -----===H==#   ####.........####   #==H===-----   #",
" #               H   *===========*   H               # ",
"  # *           HHH                 HHH           * #  ",
"   ###===---===#####=====-----=====#####===---===###   "
  ],
  balls_max: 20
};

level['demo3'] = {
  map: [
"# U #$$$$$$# U #",
"#HHH#..++..#HHH#",
"#   #@@..@@#   #",
"#   #@@..@@#   #",
"# L #..++..# L #",
"#   #@+..+@#   #",
"# A #..##..# A #",
"#   #+....+#   #",
"# D #@@..@@# D #",
"#   #+....+#   #",
"# D #..++..# D #",
"#   #.@..@.#   #",
"# E #=.++.=# E #",
"#   #.@..@.#   #",
"# R #@+P@+@# R #",
"#   #......#   #",
"#    ######    #",
" ##    **    ## ",
"   ###=--=###   "
  ],
  balls_max: 20
};

level['demo4'] = {
  map: [
"              #                       #              ",
"              #                       #              ",
"                --==#H#H#H#H#H#H#==--                ",
"               ^                     ^               ",
"#              ^     L A D D E R     ^              #",
"#=-   ^ ^      ^          $          ^      ^ ^   -=#",
"#   ^     ^ ---^         *+*         ^--- ^     ^   #",
"#              ^        *#.#*        ^              #",
"##==-- ^ --=#=--       *#@.@#*       --=#=-- ^ --==##",
"#      ^              *#+.P.+#*              ^      #",
"#      ^             *#+.@.@.+#*             ^      #",
"#      ^            *#+.@.-.@.+#*            ^      #",
"#=#   >^<   #=#     ##++.@.@.++##     #=#   >^<   #=#", 
"#     ###     #     ##.+..-..+.##     #     ###     #",
"# >  ^ * ^  < #     #@+.+...+.+@#     # >  ^ * ^  < #",
"# ---     --- #     #@.-.+-+.-.@#     # ---     --- #",
"#^           ^#     #.+.-...-.+.#     #^           ^#",
"#===--- ---===#     ##.........##     #===--- ---===#",
"       ^            *===========*            ^       ",
"       ^        -        <U>        -        ^       ",
"        ---===#####=====-----=====#####===---        "
  ],
  balls_max: 40
};

level['demo5'] = {
  map: [
"#######    U    #######",
"####    -=###=-    ####",
"##                   ##",
"#     L A D D E R     #",
"#                     #",
"#/^^^^^^^^^^^^^^^^^^^`#",
"#@     $       $     @#",
"#@@                 @@#",
"#.@@@      .      @@@.#",
"##...@@@  .P.  @@@...##",
"#####.............#####",
"#########=====#########"
  ],
  bonus_big_adds_ball: 1,
  balls_max: 0
};
