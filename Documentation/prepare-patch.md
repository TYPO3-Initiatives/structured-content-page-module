## @todo clean up

https://review.typo3.org/changes/Packages%2FTYPO3.CMS~70062/revisions/current/archive?format=tgz

# update or check out
cd typo3_src 2> /dev/null && git fetch || ( git clone https://github.com/TYPO3/typo3.git typo3_src && cd typo3_src )

curl 'https://review.typo3.org/changes/70062?o=DOWNLOAD_COMMANDS&o=CURRENT_REVISION' | tail -n+2 | jq -r '.revisions[.current_revision].fetch["anonymous http"].commands.Checkout' | bash -

# would be correct if we based the patch on a released TYPO3 version...
git diff v11.5.1..FETCH_HEAD -- typo3/sysext/backend > ../patches/typo3-cms-backend-70062.patch

# Since we base the patch on master this should work mostly but could bring in unwanted changes from master, too
git diff master..FETCH_HEAD -- typo3/sysext/backend > ../patches/typo3-cms-backend-70062.patch
