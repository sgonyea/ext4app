#!/bin/bash
if [ $# != 1 ]; then
  cat <<EOF
Usage: $0 ext-js-4-archive
EOF
  exit 1
fi
ARCHIVE=$1

unzip $ARCHIVE $(unzip -l $ARCHIVE | sed -n '/^[^/][^/]*\/[^/][^/]*\.js$/s/.* //p') -d public/javascripts
unzip $ARCHIVE $(unzip -l $ARCHIVE | sed -n '/^[^/][^/]*\/resources/s/.* //p' |egrep '(themes/images|css)/') -d public/stylesheets
