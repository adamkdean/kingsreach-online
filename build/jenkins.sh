#!/bin/bash

BRANCH=$(echo $GIT_BRANCH | cut -d "/" -f 2)
IMAGE="$JOB_NAME-$BRANCH"

docker build -t $IMAGE .

OUT=$?
if [ $OUT -eq 0 ]; then
    docker kill $IMAGE 2>/dev/null || true
    docker rm -f $IMAGE 2>/dev/null || true
    docker run -d \
        --restart=on-failure:5 \
        --name $IMAGE \
        --env HTTP_PORT=$HTTP_PORT \
        --env MYSQL_HOST=$MYSQL_HOST \
        --env MYSQL_PORT=$MYSQL_PORT \
        --env MYSQL_USER=$MYSQL_USER \
        --env MYSQL_PASSWORD=$MYSQL_PASSWORD \
        --env MYSQL_DATABASE=$MYSQL_DATABASE \
        --publish $HTTP_PORT:$HTTP_PORT \
        $IMAGE
else
    exit $OUT
fi
