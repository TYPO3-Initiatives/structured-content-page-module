# Update patch


## update or check out
    # in a Linux environment (e.g. "ddev ssh")    

    cd typo3_src 2> /dev/null && git fetch || ( git clone https://github.com/TYPO3/typo3.git typo3_src && cd typo3_src )

    curl 'https://review.typo3.org/changes/71965?o=DOWNLOAD_COMMANDS&o=CURRENT_REVISION' | tail -n+2 | jq -r '.revisions[.current_revision].fetch["anonymous http"].commands.Checkout' | bash -


## create .patch file

### would be correct if we based the patch on a released TYPO3 version...

    git diff v11.5.2..FETCH_HEAD -- typo3/sysext/backend > ../patches/typo3-cms-backend-71965.patch

### Since we base the patch on master this should work mostly but could bring in unwanted changes from master, too

    git diff master..FETCH_HEAD -- typo3/sysext/backend > ../patches/typo3-cms-backend-71965.patch



# Release new version of this package

Update the URL `https://raw.githubusercontent.com/TYPO3-Initiatives/structured-content-page-module/v0.1.4/patches/typo3-cms-backend-71965.patch` in `composer.json` with the new version (`vx.x.x`) you are about to release (Notice: the external URL instead of just `./patches/...` is necessary because of a problem for patches supplied by non-root composer packages https://github.com/cweagans/composer-patches/issues/292)

After committing that, tag a release:

    # add a new release tag
    git tag v0.5.6

Push the tags

    git push --tags

Then packagist will automatically pick up the new released version. https://packagist.org/packages/typo3-ux/page-module-pilot
