

The extractor.tgz file iterates through the BabelfishFeatures.cfg file and generates a series of files that list the unsupported features for the versions listed in line 18 of the file.  The program runs on MacOS and Linux, and requires that you:

	* Install dos2unix

To use the program:

	* Update the exclusions.txt file to include additional features that should be omitted from the report; these are not resolved features, but are features that are too large to include in the table so have a page of their own.

	* Update the overrides.cfg file to include any stanzas that should be modified in the reports; this is where you can add an entry for the workaround column.

Open a command line tool, navigate into the folder that contains the program files and enter: 

	make

The program generates a set of usf_version.md files in the same location as the program files. 

