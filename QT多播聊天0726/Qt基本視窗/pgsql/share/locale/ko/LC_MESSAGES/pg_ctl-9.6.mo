Þ          ¬  Å   <	      P  D   Q  ?         Ö     ÷  &   	     0     P  -   o          ³  =   Æ          !     A     Î  a   î  K   P       A   ·  !   ù  3     ?   O  H     D   Ø  C     E   a  ?   §  ?   ç  >   '  9   f  L      B   í  E   0     v  0   û  F   ,  >   s  8   ²  I   ë  %   5  2   [  O     7   Þ               &  M   8  -     !   ´  >   Ö  E     C   [  y     9     D   S  C     D   Ü  >   !  A   `  (   ¢  ,   Ë  2   ø  6   +  >   b  *   ¡  /   Ì  %   ü  1   "  0   T  #        ©  4   Ç  2   ü  1   /  0   a  ,     .   ¿  3   î     "  +   B  1   n  6      :   ×  1     *   D  "   o  7     "   Ê  $   í  J        ]     y  3     0   Ä     õ  !      $   6       [   -   |      ª   4   Ê   %   ÿ   $   %!  "   J!  !   m!  F   !  u   Ö!  F   L"     "  7   §"  )   ß"  k   	#  `   u#  %   Ö#  &   ü#     #$  d   +$     $  /   ¯$  &   ß$  0   %  .   7%  )   f%  )   %     º%     Ñ%  &   ã%      
&  ,   +&  (   X&     &  !   &     ¾&     Ò&     á&     ó&     '     "'     8'     I'     Y'     j'     z'  "   '     µ'    Ô'  O   g)  V   ·)  <   *     K*  '   _*  4   *  4   ¼*  ,   ñ*     +     5+  J   L+  !   +  -   ¹+  £   ç+  -   ,  l   ¹,  [   &-  (   -  M   «-  %   ù-  >   .  c   ^.  L   Â.  A   /  M   Q/  >   /  >   Þ/  H   0  8   f0  E   0  `   å0  L   F1  M   1     á1  4   v2  Y   «2  A   3  >   G3  W   3     Þ3  W   ú3  b   R4  N   µ4     5     5     5  b   05  ?   5  $   Ó5  I   ø5  N   B6  T   6  ã   æ6  L   Ê7  O   8  l   g8  _   Ô8  o   49  K   ¤9  5   ð9  3   &:  J   Z:  =   ¥:  I   ã:  =   -;  @   k;  *   ¬;  =   ×;  8   <  *   N<  %   y<  >   <  J   Þ<  H   )=  9   r=  5   ¬=  7   â=  I   >  (   d>  6   >  >   Ä>  O   ?  J   S?  F   ?  (   å?     @  Z   ,@  !   @  7   ©@  U   á@  5   7A  #   mA  ?   A  E   ÑA  "   B  '   :B  2   bB  1   B  7   ÇB  .   ÿB  4   .C  &   cC  !   C  $   ¬C  %   ÑC  c   ÷C  ½   [D  J   E     dE  @   E  1   ÅE     ÷E     F  6   *G  *   aG     G     G  2   "H  6   UH  8   H  ?   ÅH  ;   I  4   AI  =   vI     ´I     ÓI  =   òI  *   0J  1   [J  )   J  -   ·J  *   åJ  "   K     3K     EK  (   WK  +   K     ¬K  +   ÄK     ðK     L     L  $   2L  .   WL  1   L     ?   L   y   '   	                 {      V   r                    &   $   o   @                 P   b          [      -   C   U                         "             (   _             .          ;   X           Y   !   6      A   B   =       /   w      %       7   E       K   
       v          J   q   c   M   ,   ~   #      3          )   0   W         F   s          ]   1       `       u   }                   h                 f   x   m       t   d      :      z                  j         *   g   S   O   9           Q   D   <       G   I       4                   >   2   5      N   Z                 |           l       ^   p   i      +      a       H   R       n       8          e               T      \           k           
%s: -w option cannot use a relative socket directory specification
 
%s: -w option is not supported when starting a pre-9.1 server
 
Allowed signal names for kill:
 
Common options:
 
Options for register and unregister:
 
Options for start or restart:
 
Options for stop or restart:
 
Report bugs to <pgsql-bugs@postgresql.org>.
 
Shutdown modes are:
 
Start types are:
   %s init[db]               [-D DATADIR] [-s] [-o "OPTIONS"]
   %s kill    SIGNALNAME PID
   %s promote [-D DATADIR] [-s]
   %s register   [-N SERVICENAME] [-U USERNAME] [-P PASSWORD] [-D DATADIR]
                    [-S START-TYPE] [-w] [-t SECS] [-o "OPTIONS"]
   %s reload  [-D DATADIR] [-s]
   %s restart [-w] [-t SECS] [-D DATADIR] [-s] [-m SHUTDOWN-MODE]
                 [-o "OPTIONS"]
   %s start   [-w] [-t SECS] [-D DATADIR] [-s] [-l FILENAME] [-o "OPTIONS"]
   %s status  [-D DATADIR]
   %s stop    [-W] [-t SECS] [-D DATADIR] [-s] [-m SHUTDOWN-MODE]
   %s unregister [-N SERVICENAME]
   -?, --help             show this help, then exit
   -D, --pgdata=DATADIR   location of the database storage area
   -N SERVICENAME  service name with which to register PostgreSQL server
   -P PASSWORD     password of account to register PostgreSQL server
   -S START-TYPE   service start type to register PostgreSQL server
   -U USERNAME     user name of account to register PostgreSQL server
   -V, --version          output version information, then exit
   -W                     do not wait until operation completes
   -c, --core-files       allow postgres to produce core files
   -c, --core-files       not applicable on this platform
   -e SOURCE              event source for logging when running as a service
   -l, --log=FILENAME     write (or append) server log to FILENAME
   -m, --mode=MODE        MODE can be "smart", "fast", or "immediate"
   -o OPTIONS             command line options to pass to postgres
                         (PostgreSQL server executable) or initdb
   -p PATH-TO-POSTGRES    normally not necessary
   -s, --silent           only print errors, no informational messages
   -t, --timeout=SECS     seconds to wait when using -w option
   -w                     wait until operation completes
   auto       start service automatically during system startup (default)
   demand     start service on demand
   fast        quit directly, with proper shutdown
   immediate   quit without complete shutdown; will lead to recovery on restart
   smart       quit after all clients have disconnected
  done
  failed
  stopped waiting
 %s is a utility to initialize, start, stop, or control a PostgreSQL server.

 %s: -S option not supported on this platform
 %s: PID file "%s" does not exist
 %s: WARNING: cannot create restricted tokens on this platform
 %s: WARNING: could not locate all job object functions in system API
 %s: another server might be running; trying to start server anyway
 %s: cannot be run as root
Please log in (using, e.g., "su") as the (unprivileged) user that will
own the server process.
 %s: cannot promote server; server is not in standby mode
 %s: cannot promote server; single-user server is running (PID: %ld)
 %s: cannot reload server; single-user server is running (PID: %ld)
 %s: cannot restart server; single-user server is running (PID: %ld)
 %s: cannot set core file size limit; disallowed by hard limit
 %s: cannot stop server; single-user server is running (PID: %ld)
 %s: could not access directory "%s": %s
 %s: could not allocate SIDs: error code %lu
 %s: could not create promote signal file "%s": %s
 %s: could not create restricted token: error code %lu
 %s: could not determine the data directory using command "%s"
 %s: could not find own program executable
 %s: could not find postgres program executable
 %s: could not open PID file "%s": %s
 %s: could not open process token: error code %lu
 %s: could not open service "%s": error code %lu
 %s: could not open service manager
 %s: could not read file "%s"
 %s: could not register service "%s": error code %lu
 %s: could not remove promote signal file "%s": %s
 %s: could not send promote signal (PID: %ld): %s
 %s: could not send reload signal (PID: %ld): %s
 %s: could not send signal %d (PID: %ld): %s
 %s: could not send stop signal (PID: %ld): %s
 %s: could not start server
Examine the log output.
 %s: could not start server: %s
 %s: could not start server: error code %lu
 %s: could not start service "%s": error code %lu
 %s: could not unregister service "%s": error code %lu
 %s: could not wait for server because of misconfiguration
 %s: could not write promote signal file "%s": %s
 %s: database system initialization failed
 %s: directory "%s" does not exist
 %s: directory "%s" is not a database cluster directory
 %s: invalid data in PID file "%s"
 %s: missing arguments for kill mode
 %s: no database directory specified and environment variable PGDATA unset
 %s: no operation specified
 %s: no server running
 %s: old server process (PID: %ld) seems to be gone
 %s: option file "%s" must have exactly one line
 %s: server does not shut down
 %s: server is running (PID: %ld)
 %s: service "%s" already registered
 %s: service "%s" not registered
 %s: single-user server is running (PID: %ld)
 %s: the PID file "%s" is empty
 %s: too many command-line arguments (first is "%s")
 %s: unrecognized operation mode "%s"
 %s: unrecognized shutdown mode "%s"
 %s: unrecognized signal name "%s"
 %s: unrecognized start type "%s"
 (The default is to wait for shutdown, but not for start or restart.)

 HINT: The "-m fast" option immediately disconnects sessions rather than
waiting for session-initiated disconnection.
 If the -D option is omitted, the environment variable PGDATA is used.
 Is server running?
 Please terminate the single-user server and try again.
 Server started and accepting connections
 The program "%s" is needed by %s but was not found in the
same directory as "%s".
Check your installation.
 The program "%s" was found by "%s"
but was not the same version as %s.
Check your installation.
 Timed out waiting for server startup
 Try "%s --help" for more information.
 Usage:
 WARNING: online backup mode is active
Shutdown will not complete until pg_stop_backup() is called.

 Waiting for server startup...
 cannot duplicate null pointer (internal error)
 child process exited with exit code %d child process exited with unrecognized status %d child process was terminated by exception 0x%X child process was terminated by signal %d child process was terminated by signal %s command not executable command not found could not change directory to "%s": %s could not find a "%s" to execute could not get current working directory: %s
 could not identify current directory: %s could not read binary "%s" could not read symbolic link "%s" invalid binary "%s" out of memory
 pclose failed: %s server is still starting up
 server promoting
 server shutting down
 server signaled
 server started
 server starting
 server stopped
 starting server anyway
 waiting for server to shut down... waiting for server to start... Project-Id-Version: PostgreSQL 9.6
Report-Msgid-Bugs-To: pgsql-bugs@postgresql.org
POT-Creation-Date: 2016-09-26 14:02+0900
PO-Revision-Date: 2016-09-26 17:02+0900
Last-Translator: Ioseph Kim <ioseph@uri.sarang.net>
Language-Team: Korean <pgsql-kr@postgresql.kr>
Language: ko
MIME-Version: 1.0
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
Plural-Forms: nplurals=1; plural=0;
 
%s: -w ìµìì ìì¼ ëë í°ë¦¬ë¡ ìë ê²½ë¡ë¥¼ ì¬ì©í  ì ìì
 
%s: -w ìµìì 9.1 ì´ì  ë²ì ì ìë²ë¥¼ ì¤íí  ëë ì§ìíì§ ìì
 
ì¬ì©í  ì ìë ì¤ì§ì©(for kill) ìê·¸ë ì´ë¦:
 
ì¼ë° ìµìë¤:
 
ìë¹ì¤ ë±ë¡/ì ê±°ì© ìµìë¤:
 
start, restart ë ì¬ì©í  ì ìë ìµìë¤:
 
stop, restart ë ì¬ì© í  ì ìë ìµìë¤:
 
ì¤ë¥ë³´ê³ : <pgsql-bugs@postgresql.org>.
 
ì¤ì§ë°©ë² ì¤ëª:
 
ììíí ì¤ëª:
   %s init[db]               [-D ë°ì´í°ëë í°ë¦¬] [-s] [-o "ìµì"]
   %s kill    ìê·¸ëì´ë¦ PID
   %s promote [-D ë°ì´í°ëë í°ë¦¬] [-s]
   %s register   [-N ìë¹ì¤ì´ë¦] [-U ì¬ì©ìì´ë¦] [-P ìí¸] [-D ë°ì´í°ëë í°ë¦¬]
                    [-S ììíí] [-w] [-t ì´] [-o "ìµì"]
   %s reload  [-D ë°ì´í°ëë í°ë¦¬] [-s]
   %s restart [-w] [-t ì´] [-D ë°ì´í°ëë í°ë¦¬] [-s] [-m ì¤ì§ëª¨ë]
                 [-o "ìµì"]
   %s start   [-w] [-t ì´] [-D ë°ì´í°ëë í°ë¦¬] [-s] [-l ë¡ê·¸íì¼] [-o "ìµì"]
   %s status  [-D ë°ì´í°ëë í°ë¦¬]
   %s stop    [-W] [-t ì´] [-D ë°ì´í°ëë í°ë¦¬] [-s] [-m ì¤ì§ëª¨ë]
   %s unregister [-N ìë¹ì¤ì´ë¦]
   -?, --help             ì´ ëìë§ì ë³´ì¬ì£¼ê³  ë§ì¹¨
   -D, --pgdata=ë°ì´í°ëë í°ë¦¬  ë°ì´í°ë² ì´ì¤ ìë£ê° ì ì¥ëì´ìë ëë í°ë¦¬
   -N SERVICENAME  ìë¹ì¤ ëª©ë¡ì ë±ë¡ë  PostgreSQL ìë¹ì¤ ì´ë¦
   -P PASSWORD     ì´ ìë¹ì¤ë¥¼ ì¤íí  ì¬ì©ìì ìí¸
   -S ììíí     ìë¹ì¤ë¡ ë±ë¡ë PostgreSQL ìë² ìì ë°©ë²
   -U USERNAME     ì´ ìë¹ì¤ë¥¼ ì¤íí  ì¬ì©ì ì´ë¦
   -V, --version          ë²ì  ì ë³´ë¥¼ ë³´ì¬ì£¼ê³  ë§ì¹¨
   -W                     ììì´ ëë  ëê¹ì§ ê¸°ë¤ë¦¬ì§ ìì
   -c, --core-files       ì½ì´ ë¤í íì¼ì ë§ë¬
   -c, --core-files       ì´ íë«í¼ììë ì¬ì©í  ì ìì
   -e SOURCE              ìë¹ì¤ê° ì¤í ì¤ì¼ë ìì ë¡ê·¸ë¥¼ ìí ì´ë²¤í¸ ìì¤
   -l, --log=ë¡ê·¸íì¼     ìë² ë¡ê·¸ë¥¼ ì´ ë¡ê·¸íì¼ì ê¸°ë¡í¨
   -m, --mode=ëª¨ë        ëª¨ëë "smart", "fast", "immediate" ì¤ íë
   -o ìµìë¤              PostgreSQL ìë²íë¡ê·¸ë¨ì¸ postgresë initdb
                         ëªë ¹ìì ì¬ì©í  ëªë ¹í ìµìë¤
   -p PATH-TO-POSTGRES    ë³´íµì íìì¹ ìì
   -s, --silent           ì¼ë°ì ì¸ ë©ìì§ë ë³´ì´ì§ ìê³ , ì¤ë¥ë§ ë³´ì¬ì¤
   -t, --timeout=ì´      -w ìµì ì¬ì© ì ëê¸° ìê°(ì´)
   -w                     ììì´ ëë  ëê¹ì§ ê¸°ë¤ë¦¼
   auto       ìì¤íì´ ììëë©´ ìëì¼ë¡ ìë¹ì¤ê° ììë¨ (ì´ê¸°ê°)
   demand     ìë ìì
   fast        í´ë¼ì´ì¸í¸ì ì°ê²°ì ê°ì ë¡ ëê³  ì ìì ì¼ë¡ ì¤ì§ ë¨
   immediate   ê·¸ë¥ ë¬´ì¡°ê±´ ì¤ì§í¨; ë¤ì ììí  ë ë³µêµ¬ ììì í  ìë ìì
   smart       ëª¨ë  í´ë¼ì´ì¸í¸ì ì°ê²°ì´ ëê¸°ê² ëë©´ ì¤ì§ ë¨
  ìë£
  ì¤í¨
  ì¤ì§ ê¸°ë¤ë¦¬ë ì¤
 %s íë¡ê·¸ë¨ì PostgreSQL ìë²ë¥¼ ì´ê¸°í, ìì, ì¤ì§, ì ì´íë ëêµ¬ìëë¤.

 %s: -S ìµìì ì´ ì´ìì²´ì ììë ì§ìíì§ ìì
 %s: "%s" PID íì¼ì´ ììµëë¤
 %s: ê²½ê³ : ì´ ì´ìì²´ì ìì restricted tokenì ë§ë¤ ì ìì
 %s: ê²½ê³ : ìì¤í APIìì ëª¨ë  job ê°ì²´ í¨ìë¥¼ ì°¾ì ì ìì
 %s: ë¤ë¥¸ ìë²ê° ê°ë ì¤ì¸ ê² ê°ì; ì´ì§¸ë  ìë² ê°ëì ìëí¨
 %s: rootë¡ ì´ íë¡ê·¸ë¨ì ì¤ííì§ ë§ì­ìì¤
ìì¤íê´ë¦¬ì ê¶íì´ ìë, ìë²íë¡ì¸ì¤ì ìì ì£¼ê° ë  ì¼ë° ì¬ì©ìë¡
ë¡ê·¸ì¸ í´ì("su", "runas" ê°ì ëªë ¹ ì´ì©) ì¤ííì­ìì¤.
 %s: ì´ììë² ì í ì¤í¨; ìë²ê° ëê¸° ëª¨ëë¡ ìíê° ìë
 %s: ì´ììë² ì í ì¤í¨; ë¨ì¼ì¬ì©ì ìë²ê° ì¤í ì¤(PID: %ld)
 %s: ìë² íê²½ì¤ì ì ë¤ì ë¶ë¬ì¬ ì ìì; ë¨ì¼ ì¬ì©ì ìë²ê° ì¤í ì¤ì (PID: %ld)
 %s: ìë²ë¥¼ ë¤ì ìì í  ì ìì; ë¨ì¼ì¬ì©ì ìë²ê° ì¤í ì¤ì (PID: %ld)
 %s: ì½ì´ íì¼ í¬ê¸° íëë¥¼ ì¤ì í  ì ìì, íë ëì¤í¬ ì©ë ì´ê³¼ë¡ íì©ëì§ ìì
 %s: ìë² ì¤ì§ ì¤í¨; ë¨ì¼ ì¬ì©ì ìë²ê° ì¤í ì¤ (PID: %ld)
 %s: "%s" ëë í°ë¦¬ì ì¡ì¸ì¤í  ì ìì: %s
 %s: SIDë¥¼ í ë¹í  ì ìì: ì¤ë¥ ì½ë %lu
 %s: ì´ìì í ìê·¸ë íì¼ì¸ "%s" íì¼ì ë§ë¤ ì ìì: %s
 %s: restricted tokenì ë§ë¤ ì ìì: ì¤ë¥ ì½ë %lu
 %s: "%s" ëªë ¹ìì ì¬ì©í  ë°ì´í° ëë í°ë¦¬ë¥¼ ì ì ìì
 %s: ì¤í ê°ë¥í íë¡ê·¸ë¨ì ì°¾ì ì ììµëë¤
 %s: ì¤í ê°ë¥í postgres íë¡ê·¸ë¨ì ì°¾ì ì ìì
 %s: "%s" PID íì¼ì ì´ ì ìì: %s
 %s: íë¡ì¸ì¤ í í°ì ì´ ì ìì: ì¤ë¥ ì½ë %lu
 %s: "%s" ìë¹ì¤ë¥¼ ì´ ì ìì: ì¤ë¥ ì½ë %lu
 %s: ìë¹ì¤ ê´ë¦¬ìë¥¼ ì´ ì ìì
 %s: "%s" íì¼ì ì½ì ì ìì
 %s: "%s" ìë¹ì¤ë¥¼ ë±ë¡í  ì ìì: ì¤ë¥ ì½ë %lu
 %s: ì´ìì í ìê·¸ë íì¼ì¸ "%s" íì¼ì ì§ì¸ ì ìì: %s
 %s: ì´ìì í ìê·¸ëì ìë²(PID: %ld)ë¡ ë³´ë¼ ì ìì: %s
 %s: reload ìê·¸ëì ë³´ë¼ ì ìì (PID: %ld): %s
 %s: %d ìê·¸ëì ë³´ë¼ ì ìì (PID: %ld): %s
 %s: stop ìê·¸ëì ë³´ë¼ ì ìì (PID: %ld): %s
 %s: ìë²ë¥¼ ìì í  ì ìì
ë¡ê·¸ ì¶ë ¥ì ì´í´ë³´ì­ìì¤.
 %s: ìë²ë¥¼ ìì í  ì ìì: %s
 %s: ìë²ë¥¼ ììí  ì ìì: ì¤ë¥ ì½ë %lu
 %s: "%s" ìë¹ì¤ë¥¼ ììí  ì ìì: ì¤ë¥ ì½ë %lu
 %s: "%s" ìë¹ì¤ë¥¼ ìë¹ì¤ ëª©ë¡ìì ëº ì ìì: ì¤ë¥ ì½ë %lu
 %s: ìëª»ë íê²½ ì¤ì  ëë¬¸ì ëê¸°ë¥¼ ë ì´ì í  ì ìì
 %s: ì´ìì í ìê·¸ë íì¼ì¸ "%s" íì¼ì ì°ê¸° ì¤í¨: %s
 %s: ë°ì´í°ë² ì´ì¤ ì´ê¸°í ì¤í¨
 %s: "%s" ëë í°ë¦¬ ìì
 %s: ì§ì í "%s" ëë í°ë¦¬ë ë°ì´í°ë² ì´ì¤ í´ë¬ì¤í¸ ëë í°ë¦¬ê° ìë
 %s: "%s" PID íì¼ì´ ë¹ìì
 %s: kill ììì íìí ì¸ìê° ë¹ ì¡ìµëë¤
 %s: -D ìµìë ìê³ , PGDATA íê²½ë³ìê°ë ì§ì ëì´ ìì§ ììµëë¤.
 %s: ìíí  ììì ì§ì íì§ ìììµëë¤
 %s: ê°ë ì¤ì¸ ìë²ê° ìì
 %s: ì´ì  ìë² íë¡ì¸ì¤(PID: %ld)ê° ìì´ì¡ìµëë¤
 %s: "%s" íê²½ì¤ì íì¼ì ë°ëì í ì¤ì ê°ì ¸ì¼íë¤?
 %s: ìë²ë¥¼ ë©ì¶ì§ ëª»íì
 %s: ìë²ê° ì¤í ì¤ì (PID: %ld)
 %s: "%s" ìë¹ì¤ê° ì´ë¯¸ ë±ë¡ ëì´ ìì
 %s: "%s" ìë¹ì¤ê° ë±ë¡ëì´ ìì§ ìì
 %s: ë¨ì¼ì¬ì©ì ìë²ê° ì¤í ì¤ì (PID: %ld)
 %s: "%s" PID íì¼ì ë´ì©ì´ ììµëë¤
 %s: ëë¬´ ë§ì ëªë ¹í ì¸ìë¤ (ìì "%s")
 %s: ì ì ìë ìì ëª¨ë "%s"
 %s: ìëª»ë ì¤ì§ ë°©ë² "%s"
 %s: ìëª»ë ìê·¸ë ì´ë¦ "%s"
 %s: ì ì ìë ììíí "%s"
 (ê¸°ë³¸ ì¤ì ì ì¤ì§ í  ëë ê¸°ë¤ë¦¬ê³ , ììì´ë ì¬ììí  ëë ì ê¸°ë¤ë¦¼.)
 íí¸: "-m fast" ìµìì ì¬ì©íë©´ ì ìí ì¸ìë¤ì ì¦ì ì ë¦¬í©ëë¤.
ì´ ìµìì ì¬ì©íì§ ìì¼ë©´ ì ìí ì¸ìë¤ ì¤ì¤ë¡ ëì ëê¹ì§ ê¸°ë¤ë¦½ëë¤.
 -D ìµìì ì¬ì©íì§ ìì¼ë©´, PGDATA íê²½ë³ìê°ì ì¬ì©í¨.
 ìë²ê° ì¤í ì¤ìëê¹?
 ë¨ì¼ ì¬ì©ì ìë²ë¥¼ ë©ì¶ê³  ë¤ì ìëíì­ìì¤.
 ìë²ê° ììëìì¼ë©° ì°ê²°ì íì©í¨
 "%s" íë¡ê·¸ë¨ì %s ìì íìë¡ í©ëë¤. ê·¸ë°ë°, ì´ íì¼ì´
"%s" ëë í°ë¦¬ ìì ììµëë¤.
ì¤ì¹ ìíë¥¼ íì¸í´ ì£¼ì­ìì¤.
 "%s" íë¡ê·¸ë¨ì "%s" ìì íìí´ì ì°¾ìì§ë§ ì´ íì¼ì
%s ë²ì ê³¼ ê°ì§ ììµëë¤.
ì¤ì¹ ìíë¥¼ íì¸í´ ì£¼ì­ìì¤.
 ìë² ììì ê¸°ë¤ë¦¬ë ëì ìê° ì´ê³¼ë¨
 ë³´ë¤ ìì¸í ì¬ì©ë²ì "%s --help"
 ì¬ì©ë²:
 ê²½ê³ : ì¨ë¼ì¸ ë°±ì ëª¨ëê° íì± ìíìëë¤.
pg_stop_backup()ì´ í¸ì¶ë  ëê¹ì§ ì¢ë£ê° ìë£ëì§ ììµëë¤.

 ìë²ë¥¼ ììíê¸° ìí´ ê¸°ë¤ë¦¬ë ì¤...
 null í¬ì¸í°ë¥¼ ë³µì í  ì ìì(ë´ë¶ ì¤ë¥)
 íì íë¡ì¸ì¤ê° ì¢ë£ëìì, ì¢ë£ ì½ë %d íì íë¡ì¸ì¤ê° ì¢ë£ëìì, ìì ìë ìí %d 0x%X ìì¸ì²ë¦¬ë¡ íì íë¡ì¸ì¤ê° ì¢ë£ëìì íì íë¡ì¸ì¤ê° ì¢ë£ëìì, ìê·¸ë %d %s ìê·¸ë ê°ì§ë¡ íì íë¡ì¸ì¤ê° ì¢ë£ëìì ëªë ¹ì ì¤íí  ì ìì ëªë ¹ì´ë¥¼ ì°¾ì ì ìì "%s" ì´ë¦ì ëë í°ë¦¬ë¡ ì´ëí  ì ììµëë¤: %s ì¤íí  "%s" íì¼ì ì°¾ì ì ìì íì¬ ìì ëë í°ë¦¬ë¥¼ ì ì ìì: %s
 íì¬ ëë í°ë¦¬ë¥¼ ì ì ìì: %s "%s" ë°ì´ëë¦¬ íì¼ì ì½ì ì ìì "%s" ì¬ë²ë¦­ ë§í¬ë¥¼ ì½ì ì ìì ìëª»ë ë°ì´ëë¦¬ íì¼ "%s" ë©ëª¨ë¦¬ ë¶ì¡±
 pclose ì¤í¨: %s ìë²ê° ì¬ì í ìì ì¤ìëë¤
 ìë²ë¥¼ ì´ì ëª¨ëë¡ ì íí©ëë¤
 ìë²ë¥¼ ë©ì¶¥ëë¤
 ìë²ê° ìì¤í ìê·¸ëì ë°ìì
 ìë² ììë¨
 ìë²ë¥¼ ììí©ëë¤
 ìë² ë©ì¶ìì
 ì´ì§¸ë  ìë²ë¥¼ ììí©ëë¤
 ìë²ë¥¼ ë©ì¶ê¸° ìí´ ê¸°ë¤ë¦¬ë ì¤... ìë²ë¥¼ ììíê¸° ìí´ ê¸°ë¤ë¦¬ë ì¤... 