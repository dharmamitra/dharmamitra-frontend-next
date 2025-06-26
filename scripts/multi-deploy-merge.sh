#!/bin/bash

# Script to merge the current branch into rnd, lab, and pub
# Usage: ./merge-into-multiple.sh

set -e

DEFAULT_BRANCHES=(rnd lab pub)

# Determine which branches to use
if [[ $# -eq 0 || $1 == "all" ]]; then
    TARGET_BRANCHES=("${DEFAULT_BRANCHES[@]}")
else
    TARGET_BRANCHES=("$@")
fi

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

echo "Current branch: $CURRENT_BRANCH"

git fetch

for BRANCH in "${TARGET_BRANCHES[@]}"; do
    echo -e "\nMerging $CURRENT_BRANCH into $BRANCH..."
    git checkout "$BRANCH"
    git pull
    if git merge --no-ff "$CURRENT_BRANCH"; then
        echo "Merged into $BRANCH successfully."
    else
        echo "Merge conflict or error in $BRANCH. Resolve manually!"
        exit 1
    fi
    git push
    echo "Pushed $BRANCH."
done

git checkout "$CURRENT_BRANCH"
echo -e "\nAll done! Returned to $CURRENT_BRANCH."
