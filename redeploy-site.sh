#!/bin/bash
tmux kill-server
python3 -m venv venv

cd /root/AriannaRPortfolio

git fetch && git reset origin/main --hard

source venv/bin/activate

pip install -r requirements.txt


tmux new-session -d -s flask_server

source python3-virtualvenv/bin/activate 

python3 run.py
