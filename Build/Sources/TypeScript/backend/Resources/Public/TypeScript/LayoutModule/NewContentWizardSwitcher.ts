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
	    
	    //transform tabs to accordions
	    $('.t3js-new-content-wizard-bar-container .t3js-tabmenu-item a').each(function( index: number, element: HTMLElement ) {
		    
		    
	      //change link attributes 
	      $(element).attr('data-bs-toggle','collapse');
	      $(element).attr('role','button');
	      if(index === 0){
	        $(element).attr('aria-expanded','true');
	      }else{
	        $(element).attr('aria-expanded','false');
	      }
		    

	      
	      //add accordion link before each content list
	      $( '.t3js-new-content-wizard-bar-container .tab-content .tab-pane:nth-of-type(' + (index + 1) + ')' ).before($( element ).parent().html());
		    
	     //change content list class
	      if(index === 0){
	        $( '.t3js-new-content-wizard-bar-container .tab-content .tab-pane:nth-of-type(' + (index + 1) + ')' ).attr('class','collapse show');
	      }else{
	        $( '.t3js-new-content-wizard-bar-container .tab-content .tab-pane:nth-of-type(' + (index + 1) + ')' ).attr('class','collapse');
	      }
	      
	    });
	    
	    //make all content type draggable
	    $('.t3js-new-content-wizard-bar-container .t3js-media-new-content-element-wizard').each(function( index: number, element: HTMLElement ) {
	      $( element ).wrap( '<div class="t3js-page-ce"></div>' ).wrap( '<div class="t3-page-ce-dragitem"></div>' ).wrap( '<div class="t3-page-ce-header-draggable t3js-page-ce-draghandle ui-draggable-handle"></div>' );
	    });
    });
  }
}
export = new NewContentWizardSwitcher();

$(NewContentWizardSwitcher.initialize);
