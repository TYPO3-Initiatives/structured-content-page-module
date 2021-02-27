<?php

defined('TYPO3') or die();

\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addModule(
    'web',
    'page',
    'top',
    null,
    [
        'routeTarget' => \TYPO3\CMS\Page\Controller\ModuleController::class . '::handleRequest',
        'access' => 'user,group',
        'name' => 'web_page',
        'icon' => 'EXT:page/Resources/Public/Icons/module-page.svg', // 'EXT:backend/Resources/Public/Icons/module-page.svg'
        'labels' => 'LLL:EXT:backend/Resources/Private/Language/locallang_mod.xlf'
    ]
);

// TODO
//$GLOBALS['TBE_STYLES']['skins']['page'] = [
//    'name' => 'page',
//    'stylesheetDirectories' => [
//        'css' => 'EXT:page/Resources/Public/Css/'
//    ]
//];
