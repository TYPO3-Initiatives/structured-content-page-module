<?php

declare(strict_types=1);

/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */

namespace TYPO3\CMS\Page\Controller;

use Psr\Http\Message\ResponseInterface;
use Psr\Http\Message\ServerRequestInterface;
use TYPO3\CMS\Backend\Template\ModuleTemplate;
use TYPO3\CMS\Core\Authentication\BackendUserAuthentication;
use TYPO3\CMS\Core\Http\HtmlResponse;
use TYPO3\CMS\Core\Imaging\IconFactory;
use TYPO3\CMS\Core\Localization\LanguageService;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Fluid\View\StandaloneView;
use TYPO3Fluid\Fluid\View\ViewInterface;

/**
 * @internal This class is a specific TYPO3 Backend controller implementation and is not part of the Public TYPO3 API.
 */
class ModuleController
{
    protected ?ModuleTemplate $moduleTemplate = null;
    protected ?ViewInterface $view = null;
    protected ?ServerRequestInterface $request = null;
    protected ?IconFactory $iconFactory = null;

    public function __construct(
        ModuleTemplate $moduleTemplate,
        IconFactory $iconFactory
    ) {
        $this->moduleTemplate = $moduleTemplate;
        $this->moduleTemplate->setModuleName('page');
        $this->iconFactory = $iconFactory;
        $this->moduleTemplate->getPageRenderer()->loadRequireJsModule('TYPO3/CMS/Page/Page');
        $this->getLanguageService()->includeLLFile(
            'EXT:page/Resources/Private/Language/locallang_module_page.xlf'
        );
    }

    public function handleRequest(ServerRequestInterface $request): ResponseInterface
    {
        $this->request = $request;
        $this->showAction($request);
        $this->moduleTemplate->setContent($this->view->render());
        return new HtmlResponse($this->moduleTemplate->renderContent());
    }

    protected function showAction(ServerRequestInterface $request): void
    {
        $this->initializeView('main');
        //$this->getButtons();
        $this->view->assignMultiple(
            [
            ]
        );
    }

    protected function initializeView(string $templateName): void
    {
        $this->view = GeneralUtility::makeInstance(StandaloneView::class);
        $this->view->setTemplate($templateName);
        $this->view->setTemplateRootPaths(['EXT:page/Resources/Private/Templates']);
        $this->view->setPartialRootPaths(['EXT:page/Resources/Private/Partials']);
        $this->view->setLayoutRootPaths(['EXT:page/Resources/Private/Layouts']);
    }

    protected function getLanguageService(): LanguageService
    {
        return $GLOBALS['LANG'];
    }

    protected function getBackendUserAuthentication(): BackendUserAuthentication
    {
        return $GLOBALS['BE_USER'];
    }
}
