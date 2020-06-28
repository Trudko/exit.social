#!/usr/bin/env bash
# install mongodb server
apt-get update -y
apt-get install -y gnupg

wget -qO - https://www.mongodb.org/static/pgp/server-4.2.asc | apt-key add -

echo "deb http://repo.mongodb.org/apt/debian buster/mongodb-org/4.2 main" | tee /etc/apt/sources.list.d/mongodb-org-4.2.list
apt-get update -y

apt-get install -y mongodb-org

sed -i 's/127.0.0.1/0.0.0.0/g' /etc/mongod.conf

systemctl enable mongod
systemctl restart mongod
