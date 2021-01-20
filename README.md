[![CGL & unit tests](https://github.com/TYPO3-Initiatives/structured-content-page-module/workflows/CGL%20&%20unit%20tests/badge.svg?branch=master)](https://github.com/TYPO3-Initiatives/structured-content-page-module/actions)
[![Latest Stable Version](https://poser.pugx.org/typo3-pagemodule/page/v)](//packagist.org/packages/typo3-pagemodule/page)
[![Latest Unstable Version](https://poser.pugx.org/typo3-pagemodule/page/v/unstable)](//packagist.org/packages/typo3-pagemodule/page)
[![License](https://poser.pugx.org/typo3-pagemodule/page/license)](//packagist.org/packages/typo3-pagemodule/page)

# Structured Content Page Module

## Introduction
packagist: typo3-pagemodule/page

extension key: page

autoload: \TYPO3\CMS\Page\

### Status
`alpha` - the main concepts are laid out but nothing is polished yet. We welcome your feedback.
You can reach us in the TYPO3 Slack `#cig-structuredcontent` ❤️.

## Installation

### For developing on this API

This will set up a TYPO3 v10 and install the API extension.

It is a quickstart to explore the feature, too.

1) clone this repository
2) `ddev launch /typo3`

The TYPO3 backend user is "admin", password "adminadmin".

It includes example Content Blocks in a local composer repository that are installed by default.

### For using Content Blocks

#### Requirements
* TYPO3 v10+

#### Installation steps
<pre>
composer req for packagist: "name": "typo3-pagemodule/pagemodule",
</pre>

* Activate the extension `pagemodule`
* Add new database fields: (Backend) `Maintenance` › `Analyze Database Structure`