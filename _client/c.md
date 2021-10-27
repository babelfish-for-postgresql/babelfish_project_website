---
layout: default
title: Programming in C 
nav_order: 1
---

## Preparing to write C code 

Babelfish can be accessed using pretty much every programming language known to
man. This logically includes C / C++. In this section, you will learn how to
write simple C programs to access Babelfish.

All examples shown in this section have been written for and on Linux using the
FreeTDS library, which is readily available for all widespread Linux
distributions. To get started, it's important to install the FreeTDS driver.

On Fedora Linux this works as follows (as of Fedora Core 34):

```bash
[root@fedora ~]# dnf install freetds*
Last metadata expiration check: 0:02:52 ago on Fr 24 Sep 2021 11:11:43 CEST.
Dependencies resolved.
====================================================================================================================================================
 Package                               Architecture                   Version                                  Repository                      Size
====================================================================================================================================================
Installing:
 freetds                               x86_64                         1.1.20-4.fc34                            fedora                         373 k
 freetds-devel                         x86_64                         1.1.20-4.fc34                            fedora                          39 k
 freetds-doc                           noarch                         1.1.20-4.fc34                            fedora                         1.0 M
Installing dependencies:
 freetds-libs                          x86_64                         1.1.20-4.fc34                            fedora                         423 k
```

If you are coding in C, make sure that the -devel packages (= header files) are
also installed. These header files will be needed to compile the code on your
system. 


## Connecting to the database

The first thing we want to achieve is to connect to the database and check the
connection. The following listing contains a small C program to make that
happen:

```C
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/param.h>
#include <sybfront.h>
#include <sybdb.h>
#include <syberror.h>


#define  UID       "postgres"  // Information censored
#define  PWD       "verysecret!"
#define  PROGNAME  "demo_prog"
#define  DBSERVER  "sample-host.example.com"
#define  DBNAME    "postgres"


/* handler from messages from the server */
static int
msg_handler(DBPROCESS* dbproc, DBINT msgno, int msgstate, int severity, 
	char *msgtext, char *srvname, char *procname, int line)
{
	/* regular errors are handled by the error handler */
	if 	(severity < 11)
        	fprintf(stderr, "Server message (severity %d): %s\n", severity, msgtext);

	return 0;
}

/* error handler */
static int err_handler(DBPROCESS* dbproc, int severity, int dberr, int oserr, char *dberrstr, char *oserrstr)
{
	fprintf(stderr, "Server error %d: %s\n", dberr, dberrstr);
	if 	(oserr != 0)
        	fprintf(stderr, "Caused by system error %d: %s\n", oserr, oserrstr);

	return INT_CANCEL;
}

int main(void)
{
  	LOGINREC 	*login;
  	DBPROCESS 	*dbconn;
  	char 		hostname[MAXHOSTNAMELEN];
  	int 		max_len = MAXHOSTNAMELEN;
  	DBCHAR 		accession[10];
  	DBCHAR 		examdesc[10];
  	DBCHAR 		examcode[255];
	char 		portstr[20];
	int 		rc;


  	if (dbinit() == FAIL) 
	{
    		fprintf(stderr, "Could not init db.\n");
    		return 1;
  	}

  	/* Allocate a login params structure */	
	if 	((login = dblogin()) == FAIL) 
	{
		fprintf(stderr, "Could not initialize dblogin() structure.\n");
    		return 2;
  	}

	/* Initialize the login params in the structure */
	DBSETLUSER(login, UID);
	DBSETLPWD(login, PWD);
	//  DBSETLAPP(login, PROGNAME);
	if 	(gethostname(hostname, max_len) == 0)
	{
    		DBSETLHOST(login, hostname);
		fprintf(stderr, "setting login hostname: %s\n", hostname);
	}  

	/* the port can only be set via environment variable */
	rc = snprintf(portstr, 20, "TDSPORT=%d", 1433);
	if 	(rc < 0 || rc >= 20)
	{
        	fprintf(stderr, "error composing string for environment variable TDSPORT\n");
        	return 0;
	}

	if 	(putenv(portstr) != 0)
	{
        	fprintf(stderr, "error setting TDSPORT environment variable\n");
        	return 0;
	}

	/* install error handler */
	dberrhandle(err_handler);
	dbmsghandle(msg_handler);

	/* Now connect to the DB Server */
	if 	((dbconn = dbopen(login, DBSERVER)) == NULL) 
	{
		fprintf(stderr, "Could not connect to DB Server: %s\n", DBSERVER);
    		return 3;
	}

	printf("success\n");
	return 0;
}
```

In our example, we have compiled the code using GCC:

```bash
gcc main_01.c -lsybdb -I/usr/include/ -o main_01
```

Two things are of crucial importance to compile the code: The -I flag tells the
compiler where to look for the header files. -lsydbd ensures that the FreeTDS
library is properly linked. The binary created is called main\_01.

The first thing the code does is to include some header files. What we see here
are sybfront.h, sybdb.h and syberror.h. In the next step, we define message and
error handlers. Without these functions, the code can be executed normally, but the
user experience won't be what people usually expect from a proper application.
That's why it makes sense to have such functions around. In our case, all they do
is to send messages to stderr. However, it is up to you how you want to handle
the log.

Then we can already get into the structures and continue the creation of our
connection. It is usually not strictly necessary to set the desired port as
an environment variable, but we have found it useful to do that in many cases. An
example how to achieve that has been included in this sample.

Finally the connection is opened (dbopen) and we check for errors. Overall more
code is needed than in the case of a simple libpq program, but it is not too
complicated either. 



### What can go wrong?

FreeTDS does not want to work out of the box without a configuration file. In
case things go wrong, the error message might look like this:


```bash
[hs@fedora tds_test]$ ./main_01 
setting login hostname: fedora
Server error 20018: General SQL Server error: Check messages from the SQL Server
Caused by system error -1: (null)
Server error 20002: Adaptive Server connection failed (sample-host.example.com)
Server error 20002: Adaptive Server connection failed (sample-host.example.com)
Could not connect to DB Server: sample-host.example.com)
```

In this case, the FreeTDS config is wrong or simply doesn't exist in the desired
form. The error message is pretty obscure, therefore it is important to
understand where to look for the error. 


### Configuring FreeTDS

Please see https://www.freetds.org/userguide/freetdsconf.html