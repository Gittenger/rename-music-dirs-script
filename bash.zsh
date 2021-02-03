#! /usr/bin/zsh

for filename in $1/*; do
[ -e "$filename" ] || continue
   rm $filename
done