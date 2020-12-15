
#!/bin/bash

if [ "$1" == "up" ]
  then docker-compose -f ./docker/docker-compose.yml up -d
fi

if [ "$1" == "stop" ]
  then docker-compose -f ./docker/docker-compose.yml stop
fi

if [ "$1" == "ps" ]
  then docker-compose -f ./docker/docker-compose.yml ps
fi


