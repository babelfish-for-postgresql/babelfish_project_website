---
layout: default
title: Programming in C 
nav_order: 1
---

## Preparing to write C code 

In this section, we demonstrate how to write a simple C/C++ program to access Babelfish. The example does not create a complete and secure program, but highlights some of the features your program will need to work with Babelfish.

The examples in this section have been written for (Fedora Core 34) Linux using the
FreeTDS library, which is readily available for most Linux distributions. 

To get started, [install and configure the FreeTDS driver](https://www.freetds.org/):

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

If you are coding in C, make sure that you've also installed the `freetds-devel` packages (the header files). The header files are used when compiling the code on your system. 


## Connecting to the database

The first part of our example manages header files, variable definitions, and error handling.  The example uses header files from both the standard C library (stdio.h, stdlib.h, unistd.h, sys/param.h) and the FreeTDS library (sybfront.h, sybdb.h and syberror.h):

```c
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/param.h>
#include <sybfront.h>
#include <sybdb.h>
#include <syberror.h>


#define  UID       "postgres"  
#define  PWD       "verysecret!"
#define  PROGNAME  "demo_prog"
#define  DBSERVER  "sample-host.example.com"
#define  DBNAME    "postgres"


/* handler for messages from the server */
static int
msg_handler(DBPROCESS* dbproc, DBINT msgno, int msgstate, int severity, 
	char *msgtext, char *srvname, char *procname, int line)
{
	/* regular errors are handled by the error handler */
	if (severity < 11)
        	fprintf(stderr, "Server message (severity %d): %s\n", severity, msgtext);

	return 0;
}

/* error handler */
static int err_handler(DBPROCESS* dbproc, int severity, int dberr, int oserr, char *dberrstr, char *oserrstr)
{
	fprintf(stderr, "Server error %d: %s\n", dberr, dberrstr);
	if (oserr != 0)
        	fprintf(stderr, "Caused by system error %d: %s\n", oserr, oserrstr);

	return INT_CANCEL;
}

```

The example also declares local variables before initializing the FreeTDS library:

```c
int main(void)
{
  	LOGINREC 	*login;
  	DBPROCESS 	*dbconn;
  	char 		hostname[MAXHOSTNAMELEN];
  	int 		max_len = MAXHOSTNAMELEN;
  	DBCHAR 		accession[10];
  	DBCHAR 		examdesc[10];
  	DBCHAR 		examcode[255];

  	if (dbinit() == FAIL) 
	{
    		fprintf(stderr, "Could not init db.\n");
    		return 1;
  	}
```

Next, allocate a login structure and set the login ID, password, and host name into the login handle:

```c

  	/* Allocate a login params structure */	
	if ((login = dblogin()) == FAIL) 
	{
		fprintf(stderr, "Could not initialize dblogin() structure.\n");
    		return 2;
  	}

	/* Initialize the login params in the structure */
	DBSETLUSER(login, UID);
	DBSETLPWD(login, PWD);

	if (gethostname(hostname, max_len) == 0)
	{
    		DBSETLHOST(login, hostname);
		fprintf(stderr, "setting login hostname: %s\n", hostname);
	}  
```

Set the TDS port environment variable (not required if you're connecting on the default port, 1433):

```c
	/* the port can only be set via environment variable */

	if (putenv("TDSPORT=1433") != 0)
	{
        	fprintf(stderr, "error setting TDSPORT environment variable\n");
        	return 0;
	}
```

Install an error handler and message handler - the given functions will be invoked by the TDS library if an error/message occurs. Our example sends messages to `stderr`:

```c
	/* install error handler */
	dberrhandle(err_handler);
	dbmsghandle(msg_handler);
```

Call `dbopen` to connect to the server:

```c
	/* Now connect to the DB Server */
	if ((dbconn = dbopen(login, DBSERVER)) == NULL) 
	{
		fprintf(stderr, "Could not connect to DB Server: %s\n", DBSERVER);
    		return 3;
	}

	printf("success\n");
	return 0;
}
```

Compile the code with GCC:

```bash
gcc main_01.c -lsybdb -I/usr/include/ -o main_01
```

Two things are of crucial importance when compiling the code: 

- You should include the -I option to tell the compiler where to look for the header files. 
- Include the -lsydbd option to ensure that the FreeTDS library is properly linked. 

This example creates a binary named `main\_01`.

This is a simple example, but it highlights the behaviors that you'll need to capture as you start developing programs that reach out to Babelfish servers in C.


### FreeTDS configuration issues

The following message is caused by a FreeTDS configuration error:

```bash
[hs@fedora tds_test]$ ./main_01 
setting login hostname: fedora
Server error 20018: General SQL Server error: Check messages from the SQL Server
Caused by system error -1: (null)
Server error 20002: Adaptive Server connection failed (sample-host.example.com)
Server error 20002: Adaptive Server connection failed (sample-host.example.com)
Could not connect to DB Server: sample-host.example.com)
```

If you get this error message, the FreeTDS configuration file is likely to contain errors or doesn't exist. Please see the [FreeTDS documentation](https://www.freetds.org/userguide/freetdsconf.html) for configuration information.

