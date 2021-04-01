
use strict;


#	вместо <script src /> вставляется код файла. Код обрабатывается -- удаляются элементы между специальными скобками
#	надо или разбирать тег, или заменять элементы в скобках на содержимое файла
#	скобки заменяемые: <!-- #(filename.js) --><!-- /# --> //#(filename.js) ///#
#	скобки удаляемые: <!-- ## --><!-- /# --> //## ///#
#	скобки вставляемые: <!-- #> ... --> //#> ...

my $file_src = '1.html';
my $file_dst = 'ladder.html';

my %ofiles;

sub process_include($) {
 my ($fname) = @_;

 if ($ofiles{$fname}) {
   die "recurrency found for file '$fname'!";
 } else { $ofiles{$fname} = 1 }
 
 my $content = '';
 my $quote = 0;

 open FI, "<$fname" || die "could not open $fname for reaing";
 my @s = <FI>; chomp(@s);
 close FI;

 for my $s (@s) {
   
   if ($quote == 1) {
     if ($s =~ /<!--\s*\/#\s*-->/) { $s = $'; $quote = 0; redo } else { next }
   } elsif ($quote == 2) {
     if ($s =~ /\/\/\/#/) { $quote = 0; next } else { next }
   }

   if ($s =~ /<!--\s*#\(([^>]+)\)\s*-->/) { $content .= $` . process_include($1); $s = $'; $quote = 1; redo }
   elsif ($s =~ /<!--\s*#>\s*(.+)\s*-->/) { $content .= $` . $1; $s = $'; redo }
   elsif ($s =~ /\/\/#\(([^)]+)\)/) { $content .= $` . process_include($1); $quote = 2; next }
   elsif ($s =~ /<!--\s*##\s*-->/) { $content .= $`; $s = $'; $quote = 1; redo }
   elsif ($s =~ /\/\/##/) { $content .= $` . "\n"; $quote = 2; next }
   elsif ($s =~ /\/\/#>/) { $content .= $` . $'; next }
   
   $content .= $s . "\n";
 }
 
 delete $ofiles{$fname};

 return $content;
}

### main

my $result = process_include($file_src);

open FD, ">$file_dst" || die "could not open $file_dst for writing";
print FD $result;
close FD;
