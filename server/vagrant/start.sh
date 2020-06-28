#!/usr/bin/env bash
cd $(dirname "$0")

VAGRANT_RUNNING=`vagrant status | grep "running"`

if [ -z "$VAGRANT_RUNNING" ]
then
vagrant up
else
vagrant reload
fi
