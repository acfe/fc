#!/bin/bash
if [ $1 == "server" ]
	then
	node scripts/build/conf.js local
	npm run start
else
	if [ $2 == "test" ]
		then
		node scripts/build/conf.js test
	elif [ $2 == "online" ]
		then
		node scripts/build/conf.js online
	else
		node scripts/build/conf.js local
	fi
	
	if [ $1 == "build" ]
		then
		if [ $3 == "watch" ]
			then
			npm run watch
		else
			npm run build
		fi
		node scripts/build/html.js
	fi
fi