<?php

$EM_CONF[$_EXTKEY] = [
    'title' => 'Page',
    'description' => 'New page module interface.',
    'category' => 'module',
    'state' => 'alpha',
    'clearCacheOnLoad' => 0,
    'author' => 'TYPO3 Structured Content Initiative Team',
    'version' => '0.0.1',
    'constraints' => [
        'depends' => [
            'typo3' => '11.0.0-11.99.99',
        ],
        'conflicts' => [],
        'suggests' => [],
    ],
    'autoload' => [
       'psr-4' => [
          'TYPO3\\CMS\\Page\\' => 'Classes',
       ],
    ],
];
