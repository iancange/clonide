### General Considerations

* Try to avoid forking files! Can you do what you want via an extension?
* Put a comment at the head of forked files to indicate the version hash and file they were forked from.
See any of the existing forked files as an example.
* Put the forked file in src/forked directory so everyone knows it's a fork.
* Minimize changes to forked files to minimize merge conflicts.
* Comment out, rather than delete, code which doesn't apply to GHEdit.
VS Code changes within comment blocks will merge without conflicting.

### How To Merge A New Version Of Visual Studio Code

```bash
# Get the VS Code version you want to merge with (e.g. release/1.1 branch).
cd vscode
git pull https://github.com/Microsoft/vscode.git release/1.1

# Build it.
./scripts/npm.sh install
./node_modules/.bin/gulp compile

# One by one, "three way merge" vscode changes into our forked files.
# Forked file headers indicate the version hash and file they were forked from.
# E.g. <hash of version at time of fork>:<file>. Use this to get the common ancestor.
git show 31ce12f023580d67a66d14843e7f9983caadbe56:./src/vs/workbench/services/files/electron-browser/fileService.ts >../ghedit/src/forked/fileService.root.ts

# Do the three-way merge.
cd ../ghedit/src/forked
diff3 -m fileService.ts fileService.root.ts ../vs/workbench/services/files/electron-browser/fileService.ts >fileService.merged.ts

# Review the merge and fix conflicts.

# Accept the merged file and clean up.
cp fileService.merged.ts fileService.ts
rm fileService.root.ts fileService.merged.ts

# Merge the rest of the files (everything in the src/forked directory).

# Update file headers with the hash of the merged version.
perl -i -pe 's/(Forked from ).*:/\1c212f0908f3d29933317bbc3233568fbca7944b1:/ig' *

# Make a clean build of ghedit.
cd ghedit
npm run clean
npm run build

# Test the heck out of it!

# Push the updated vscode.
cd ../vscode
git push

# Commit and push updated ghedit.
cd ../ghedit
git commit -am 'Merge with vscode release/1.1 (SHA c212f0908f3d29933317bbc3233568fbca7944b1)'
git push

# Publish the new version.
npm run push

# Let everyone know they must update their vscode, build it, and clean build ghedit.


----
# How to merge the merge branch back into master

git checkout master
git merge-base master merge-1.4
<commit hash>
git checkout <commit hash> .
git commit -m 'Roll back 1.4 branch changes'
git merge merge-1.4
git push

```