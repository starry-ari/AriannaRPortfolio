#!/bin/bash
tmux kill-server

cd AriannaRportfolio

git fetch && git reset origin/main --hard

source python3-virtualvenv/bin/activate 

pip install -r requirements.txt


tmux new-session -d -s flask_server

source python3-virtualvenv/bin/activate 

python3 run.py