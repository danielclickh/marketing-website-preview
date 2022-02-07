#!/usr/bin/env bash
set -ex

# We want to run the `mkdocs build` command from the docs folder
# We know the build.sh script is in the docs/tools folder
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
cd $SCRIPT_DIR && cd ..

PUBLISH_DIR="publish/"

for language in en ru ja zh; do
    export LANGUAGE=$language
    mkdocs build -d "$PUBLISH_DIR$LANGUAGE"
done
