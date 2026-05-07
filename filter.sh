#!/bin/bash
git filter-branch --force --index-filter "git rm --cached --ignore-unmatch 'public/assets/Demo Videos/Pothole.io - Demo Video.mp4' 'public/assets/Demo Videos/Trade Glance - Demo Video.mp4'" --prune-empty --tag-name-filter cat -- 1b74f20..HEAD
