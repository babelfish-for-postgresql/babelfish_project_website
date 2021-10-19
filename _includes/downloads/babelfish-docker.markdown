The easiesy way to get Babelfish installed is by running it as Docker Container. 

By running the following command you can have a Babelfish node running:

``` sh
docker run --name babelfish  \
  -e POSTGRES_PASSWORD=secretbabelfishpassword \
  -d {{site.data.images[0].image}} \
  -p 5432:5432 \
  -p 1433:1433
```

After the above command completes Babelfish should be up and running. The port `5432` would listen for 
  FE/BE connections (PostgreSQL protocol) while `1433` whould listen for TDS conncetions (MSSQL Server protocol)