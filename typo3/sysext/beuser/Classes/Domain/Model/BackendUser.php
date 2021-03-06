<?php

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

namespace TYPO3\CMS\Beuser\Domain\Model;

use TYPO3\CMS\Backend\Authentication\PasswordReset;
use TYPO3\CMS\Core\Utility\GeneralUtility;
use TYPO3\CMS\Extbase\Persistence\ObjectStorage;

/**
 * Model for backend user
 * @internal This class is a TYPO3 Backend implementation and is not considered part of the Public TYPO3 API.
 */
class BackendUser extends \TYPO3\CMS\Extbase\Domain\Model\BackendUser
{
    /**
     * Comma separated list of uids in multi-select
     * Might retrieve the labels from TCA/DataMapper
     *
     * @var string
     */
    protected $allowedLanguages = '';

    /**
     * @var string
     */
    protected $dbMountPoints = '';

    /**
     * @var string
     */
    protected $description;

    /**
     * @var string
     */
    protected $fileMountPoints = '';

    /**
     * @var ObjectStorage<BackendUserGroup>
     */
    protected $backendUserGroups;

    /**
     * @param string $allowedLanguages
     */
    public function setAllowedLanguages($allowedLanguages)
    {
        $this->allowedLanguages = $allowedLanguages;
    }

    /**
     * @return string
     */
    public function getAllowedLanguages()
    {
        return $this->allowedLanguages;
    }

    /**
     * @param string $dbMountPoints
     */
    public function setDbMountPoints($dbMountPoints)
    {
        $this->dbMountPoints = $dbMountPoints;
    }

    /**
     * @return string
     */
    public function getDbMountPoints()
    {
        return $this->dbMountPoints;
    }

    /**
     * @param string $fileMountPoints
     */
    public function setFileMountPoints($fileMountPoints)
    {
        $this->fileMountPoints = $fileMountPoints;
    }

    /**
     * @return string
     */
    public function getFileMountPoints()
    {
        return $this->fileMountPoints;
    }

    /**
     * Check if user is active, not disabled
     *
     * @return bool
     */
    public function isActive()
    {
        if ($this->getIsDisabled()) {
            return false;
        }
        $now = new \DateTime('now');
        return !$this->getStartDateAndTime() && !$this->getEndDateAndTime() || $this->getStartDateAndTime() <= $now && (!$this->getEndDateAndTime() || $this->getEndDateAndTime() > $now);
    }

    /**
     * @param ObjectStorage<BackendUserGroup> $backendUserGroups
     */
    public function setBackendUserGroups($backendUserGroups)
    {
        $this->backendUserGroups = $backendUserGroups;
    }

    /**
     * @return ObjectStorage<BackendUserGroup>
     */
    public function getBackendUserGroups()
    {
        return $this->backendUserGroups;
    }

    /**
     * Check if user is currently logged in
     *
     * @return bool
     */
    public function isCurrentlyLoggedIn()
    {
        return $this->getUid() === (int)$this->getBackendUser()->user['uid'];
    }

    /**
     * Check if the user is allowed to trigger a password reset
     *
     * Requirements:
     * 1. The user for which the password reset should be triggered is not the currently logged in user
     * 2. Password reset is enabled for the user (Email+Password are set)
     * 3. The currently logged in user is allowed to reset passwords in the backend (Enabled in user TSconfig)
     *
     * @return bool
     */
    public function isPasswordResetEnabled(): bool
    {
        return !$this->isCurrentlyLoggedIn()
            && GeneralUtility::makeInstance(PasswordReset::class)->isEnabledForUser((int)$this->getUid())
            && ($this->getBackendUser()->getTSConfig()['options.']['passwordReset'] ?? true);
    }

    /**
     * Gets the currently logged in backend user
     *
     * @return \TYPO3\CMS\Core\Authentication\BackendUserAuthentication
     */
    public function getBackendUser()
    {
        return $GLOBALS['BE_USER'];
    }
}
