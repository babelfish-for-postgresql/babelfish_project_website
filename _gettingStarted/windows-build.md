---
layout: default
title: Installation from source code on Windows
nav_order: 3
has_children: false
permalink: /docs/gettingstarted/windowsbuild
---


### Requirements
To be able to compile Babelfish on Windows. you would need to install:
- Visual Studio 2019. 
- ActiveState Perl
- libxml2
- libxslt
- iconv


#### Visual Studio 
You can download Visual Studio from [here](https://visualstudio.microsoft.com/). 

#### ActiveState Perl
You can download ActiveState Perl from [here](https://www.activestate.com/products/perl/).
 Make sure that the installer configures the binaries in the environment variable `PATH`

#### libxml, libxslt and inconv
You can download these 3 libraries from [here](https://zlatkovic.com/pub/libxml/). Take note of where did you extracted the libraries, because we will need them later.

### Configuring the build
To be able to build Babelfish we need to configure the paths of the extra libraries that are required. 

To do that, go to the path src\tool\msvc, inside the Babelfish source code folder. 

Copy the file config_default.pl to create a new file named config.pl. 

Change the config.pl to add the paths of where you have extracted the libraries. 

Suppose that you have extracted the libraries in the following paths:

- libxml: D:\libxml2\libxml2-2.7.8.win32
- xstl: D:\libxslt\libxslt-1.1.26.win32
- iconv: D:\iconv\iconv-1.9.2.win32

The config.pl file should look something like these:

``` perl
# Configuration arguments for vcbuild.
use strict;
use warnings;

our $config = {
        asserts => 0,    # --enable-cassert

        # blocksize => 8,         # --with-blocksize, 8kB by default
        # wal_blocksize => 8,     # --with-wal-blocksize, 8kB by default
        ldap      => 1,        # --with-ldap
        extraver  => undef,    # --with-extra-version=<string>
        gss       => undef,    # --with-gssapi=<path>
        icu       => undef,    # --with-icu=<path>
        nls       => undef,    # --enable-nls=<path>
        tap_tests => undef,    # --enable-tap-tests
        tcl       => undef,    # --with-tcl=<path>
        perl      => undef,    # --with-perl=<path>
        python    => undef,    # --with-python=<path>
        openssl   => undef,    # --with-openssl=<path>
        uuid      => undef,    # --with-uuid=<path>
        xml       => 'D:\libxml2\libxml2-2.7.8.win32',    # --with-libxml=<path>
        xslt      => 'D:\libxslt\libxslt-1.1.26.win32',    # --with-libxslt=<path>
        iconv     => 'D:\iconv\iconv-1.9.2.win32',    # (not in configure, path to iconv)
        zlib      => undef     # --with-zlib=<path>
};

1;
```

### Compiling Babelfish
Open the [Developer Command Prompt for VS 2019](https://docs.microsoft.com/en-gb/visualstudio/ide/reference/command-prompt-powershell?view=vs-2019). 
  It should be located in the path `C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Visual Studio 2019\Visual Studio Tools`

In the command promt, navigate to the folder in which you downloaded the Babelfish 
code. Once there, go to the msvc folder with the command:

``` cmd
cd src\tools\msvc
```

Now you can build Babelfish by executing:
``` cmd
build
```

### Installing Babelfish 

Once Babelfish is compiled, to install it we just need to run from the `src\tools\msvc` using the Developer Command Prompt, the following command:
``` cmd
install C:\destination\directory
```