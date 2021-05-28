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
import $ from 'jquery';


/**
 * Initializes New Content Wizard
 */
class NewContentWizardSwitcher {

  public static initialize(): void {

    //expand / collapse button behaviour for the new contet wizard bar
    const $layoutModule = $('[data-module-name="web_layout"]');
    $('.t3js-new-content-wizard-switcher').on('click', (): void => {
      $layoutModule.toggleClass('new-content-wizard-expanded');
    });
    //load the wizard modale content and adapat the html
    const $newContentURL =  $('.t3js-new-content-wizard-bar-container').attr('data-new-content-url');
    $('.t3js-new-content-wizard-bar-container').load($newContentURL, function(){
	    //filter input minimize
	    $('.t3js-new-content-wizard-bar-container .input-group-addon').remove();
	    $('.t3js-new-content-wizard-bar-container .t3js-contentWizard-search').addClass('form-control-sm');
    });
  }
}
export = new NewContentWizardSwitcher();

$(NewContentWizardSwitcher.initialize);
