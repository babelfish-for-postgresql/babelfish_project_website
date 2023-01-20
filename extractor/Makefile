CXXFLAGS = -g -O0 -Itclap/include
CXXFLAGS += -Wno-c++11-extensions
LDFLAGS = -g


# extract.o: extract.cpp
# 	g++ -g -O0 -Itclap/include  -g  extract.cpp   -o extract 2| /work/camomilla/camomilla -d5

report:
	dos2unix BabelfishFeatures.cfg
	cat BabelfishFeatures.cfg > ./input.tmp
	cat overrides.cfg >> ./input.tmp
	./extract -x ./exclusions.txt ./input.tmp
	ls -ltr *.md

extract: 	extract.o
	g++ $(LDFLAGS) extract.o -o extract

extract.o:	extract.cpp


clean:
	rm -f extract.o extract

kit:
	tar -zcf markdowns.tgz *.md BabelfishFeatures.cfg overrides.cfg exclusions.txt

