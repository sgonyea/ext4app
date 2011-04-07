#!/bin/bash
if [ $# != 1 ]; then
  cat <<EOF
Usage: $0 ext-js-4-archive
EOF
  exit 1
fi
ARCHIVE=$1

#wget http://downloads.sencha.com/extjs/ext-4.0-beta2.zip
unzip $ARCHIVE $(unzip -l $ARCHIVE | sed -n '/^[^/][^/]*\/[^/][^/]*\.js$/s/.* //p') -d public/javascripts
unzip $ARCHIVE $(unzip -l $ARCHIVE | sed -n '/^[^/][^/]*\/resources/s/.* //p' |egrep '(themes/images|css)/') -d public/stylesheets
