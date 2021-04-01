// Ladder
// maps
//

// vars level and levelset should be declared

level['test1'] = {
  map: [
"     U       U                ",
"                              ",
"                              ",
"   >           -H             ",
"   -======H=======           @",
"                H   <P       @",
"    ==================H      @",
"$                        H####",
"#                          ooo",
"#P >                    *  ###",
"#============================#"
  ],
  balls_max: 3,
  ball_passes_lightstep: 0,
  bonus_big_adds_ball: 1
};

level['test2'] = {
  map: [
"   U         ",
"             ",
"0123456789   ",
"      ####   ",
"        .   H",
"#===========H",
"            H",
"  ####I#####H",
"$HHHH   .. HP",
"     --====H=",
"     #     H ",
"           H*",
"#===========#",
"0123456789   "
  ],
  balls_max: 0
};

level['test3'] = {
  map: [
"                   U         ",
"P   @@@    H          # #    ",
"=   @@@                      ",
"H       /    ` H  H   H^    *",
"H=H=====     -========H======",
"                             ",
"%%%%%        %%%%%%  `       ",
"======H=-H-  ================",
"H                            ",
"H        /                   ",
"H=======HHH=====H============",
"H                            ",
"H                            ",
"H       ---      ====        ",
"H==========  //      =====   ",
"H           /  \\             ",
"#          /    \\          *$",
"#===========================#"
  ],
  wraparound_walls: 1,
  balls_encount: 1,
  bonus_big_adds_ball: 2,
  balls_max: 0
};


// stack of ideas

level['idea1'] = {
  map: [                                   
"P                                                                                U",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                                                  ",
"                                                         H H H H                  ",
"*                                                       H H H H H                $"
  ],
  balls_max: 10
};

level['idea2'] = {
  map: [                                   
" H #                                                             U       U        ",
"  -#                                                                              ",
"H -#                                                           >           H      ",
"  -#                                                           -======H=======    ",
" H-#                                                            HH          H     ",
"  -#                                                            ================  ",
"H -                                                                               ",
"  -                                                                               ",
"P#-*                                                        H   H                $"
  ],
  gravestones: 0,
  balls_max: 12
};

level['reclassic2a'] = {
  title: 'Спокойная прогулка - 3',
  map: [
"                      U    XXXXXXXXX  XXXXXXXX  XXX  XXX  XXX  XXX  XXX                 ", // Спокойная прогулка
"                      o                                                                 ",
"                       H                                                                ",
"                    ====                                                   $   @        ",
"                     H .                                                                ",
"                -=-  ---==H-=H-=H-=H-=H-    U                                  H        ",
"       >H                                  I-        ..I..                oU#  H        ",
"       =H=====H=======  --===========H======-=====H================  ===========        ",
"        h                                 I    #                                        ",
"@       H            #                         I             -  I                       ",
"-       H          + #       %%%%%..%..%%..%.%%%%           --- I  . .      H           ",
" -     ============= =====   ====H===============   =========H======-=======H====       ",
"  -                             -I-              /^`                            +   bbb ",
"   -     @@   .H           @  `                                             H           ",
"    -   I=====I=====H====     =========/`========-I-================H=========H         ",
"              H            @            .         H                                     ",
"              .              H                        -      -      H       H           ",
"       =H===========^=====   ====H========================H=========-=======H           ",
"        H                                         #                                     ",
"        H            #                            #                                     ",
"        H          I #           .I.....                           . .      H           ",
"       ============= =====I==================H==========H=========== =======H=          ",
"       #                            %                                       H  #-#      ",
"+I I<.>I                   #      -%-%-                                     H  #H#      ",
"==H===-= H                 #     -%-%-%-     I                    .  .      H  #H. .I. @",
"  H   I =H=======    =======  ============H============I^I=========  ===H====  #H#######",
"  H   #  H                         .      h            =.=                     #H       ",
"  H      H         #               =            I                                       ",
"  H      H         #I             .+.           I                .   .       H          ",
"  H     =========  ======   ====================H=================   ========H=         ",
"                                                                             H          ",
"P                         I                                                  H          ",
"#/               *        #  `                                      *           I      `",
"================================================^======================================="
  ],
  balls_max: 15
};
