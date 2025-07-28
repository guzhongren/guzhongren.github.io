# Centos 安装 vim8.2


## 删除已有的 vim

```shell
yum remove vim
```

## 下载最新的 vim 到你的 centos 上

vim 官网：https://www.vim.org/
Vim8.2 下载：https://ftp.nluug.nl/pub/vim/unix/vim-8.2.tar.bz2

```shell
wget https://ftp.nluug.nl/pub/vim/unix/vim-8.2.tar.bz2
```

## 解压

```shell
tar -jxvf vim-8.2.tar.bz2
```
解压生成 vim82 文件夹
进入 cd /vim82/src

## 配置

```
./configure
```

如果遇到如下问题
```
no terminal library found
checking for tgetent()… configure: error: NOT FOUND!
You need to install a terminal library; for example ncurses.
Or specify the name of the library with –with-tlib.
```

请执行如下命令安装依赖

```shell
yum install ncurses ncurses-devel
```

## 编译

```shell
make
```

## 安装

```shell
sudo make install
```

不出意外就安装完成了。

```shell
 tencent@VM-0-9-centos  ~  vim --version                               ✔  242  23:14:30
VIM - Vi IMproved 8.2 (2019 Dec 12, compiled Dec 16 2020 23:04:31)
编译者 tencent@VM-0-9-centos
巨型版本 无图形界面。  可使用 (+) 与不可使用 (-) 的功能：
+acl               -farsi             -mouse_sysmouse    -tag_old_static
+arabic            +file_in_path      +mouse_urxvt       -tag_any_white
+autocmd           +find_in_path      +mouse_xterm       -tcl
+autochdir         +float             +multi_byte        +termguicolors
-autoservername    +folding           +multi_lang        +terminal
-balloon_eval      -footer            -mzscheme          +terminfo
+balloon_eval_term +fork()            +netbeans_intg     +termresponse
-browse            +gettext           +num64             +textobjects
++builtin_terms    -hangul_input      +packages          +textprop
+byte_offset       +iconv             +path_extra        +timers
+channel           +insert_expand     -perl              +title
+cindent           +job               +persistent_undo   -toolbar
-clientserver      +jumplist          +popupwin          +user_commands
-clipboard         +keymap            +postscript        +vartabs
+cmdline_compl     +lambda            +printer           +vertsplit
+cmdline_hist      +langmap           +profile           +virtualedit
+cmdline_info      +libcall           -python            +visual
+comments          +linebreak         -python3           +visualextra
+conceal           +lispindent        +quickfix          +viminfo
+cryptv            +listcmds          +reltime           +vreplace
+cscope            +localmap          +rightleft         +wildignore
+cursorbind        -lua               -ruby              +wildmenu
+cursorshape       +menu              +scrollbind        +windows
+dialog_con        +mksession         +signs             +writebackup
+diff              +modify_fname      +smartindent       -X11
+digraphs          +mouse             -sound             -xfontset
-dnd               -mouseshape        +spell             -xim
-ebcdic            +mouse_dec         +startuptime       -xpm
+emacs_tags        -mouse_gpm         +statusline        -xsmp
+eval              -mouse_jsbterm     -sun_workshop      -xterm_clipboard
+ex_extra          +mouse_netterm     +syntax            -xterm_save
+extra_search      +mouse_sgr         +tag_binary
     系统 vimrc 文件："$VIM/vimrc"
     用户 vimrc 文件："$HOME/.vimrc"
 第二用户 vimrc 文件："~/.vim/vimrc"
      用户 exrc 文件："$HOME/.exrc"
       defaults file: "$VIMRUNTIME/defaults.vim"
         $VIM 预设值："/usr/local/share/vim"
编译方式：gcc -c -I. -Iproto -DHAVE_CONFIG_H     -g -O2 -U_FORTIFY_SOURCE -D_FORTIFY_SOURCE=1
链接方式：gcc   -L/usr/local/lib -Wl,--as-needed -o vim        -lm -ltinfo -lelf  -ldl

```

## 引用

* [博客：https://guzhongren.github.io/](https://guzhongren.github.io/)

## 免责声明

本文仅代表个人观点，与本人所供职的公司无任何关系。

