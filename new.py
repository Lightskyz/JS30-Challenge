#!/usr/bin/python

import sys
import os

# 0 - Create a challenge folder
def createChallengeFolder(challenge):
    path = "src/challenge/"
    challenge_directory = path + challenge
    if not os.path.exists(challenge_directory):
        os.makedirs(challenge_directory)
        createPugFile(challenge)
        createSassFile(challenge)
        createJsFile(challenge)
        print challenge + " has been succesfully created."
    else:
        print challenge + " challenge already existing."
        return

# 1 - Create a Pug file for the challenge
def createPugFile(challenge):
    template = "doctype html \n\nhtml(lang='en') \n\thead \n\t\tlink(rel='stylesheet', href='style.min.css')\n\t\tmeta(charset='utf-8')\n\t\ttitle " + challenge + "\n\tbody \n\t\t\n\t\t\n\t\tscript(type='text/javascript')\n\t\t\tinclude script.js"
    path = "src/challenge/" + challenge + "/"
    pug_file = "index.pug"
    challengePug = open(path + pug_file, 'a')
    challengePug.write(template)
    challengePug.close()
    # print challenge + ".pug has been generated."

# 2 - Create a SASS file for the challenge
def createSassFile(challenge):
    path = "src/challenge/" + challenge + "/"
    sass_file = "style.scss"
    open(path + sass_file, 'a').close()

# 3 - Create the JS file for the challenge
def createJsFile(challenge):
    path = "src/challenge/" + challenge + "/"
    js_file = "script.js"
    open(path + js_file, 'a').close()

# 4 - Add the new challenge to index.pug
def addChallenge(challenge):
    challenge_import = "\t\tbr\n\t\ta(href='/" + challenge + "/') " + challenge
    index = "src/index.pug"
    if os.stat(index).st_size == 0:
        open_global = open(index, 'a')
        open_global.write(challenge_import)
    else:
        open_global = open(index, 'a')
        open_global.write('\n' + challenge_import)
    print challenge + " has been imported. Don't forget to check the indentation before convert .pug to .html"

# 5 - Use all the functions to create a challenge
number_of_arg = len(sys.argv)
if number_of_arg == 2:
    challenge = sys.argv[1]
    createChallengeFolder(challenge)
    addChallenge(challenge)
else:
    print "Error: At least one argument expected. `python new.py [challenge_name]`"