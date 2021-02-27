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

import {Another} from './SubModule/Another'

/**
 * Module: TYPO3/CMS/Page/Page
 * @exports TYPO3/CMS/Page/Page
 */
class Page {
  constructor() {
    this.initialize();
  }

  private initialize(): void {
    const node = document.createElement('em');
    node.textContent = 'added from JS';
    document.querySelector('[data-module-name="page"] .module-body').appendChild(node);

    new Another();
  }
}

export = new Page();
