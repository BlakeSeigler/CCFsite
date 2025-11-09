jQuery( document ).ready( function( $ ) {

	// If debugging is enabled, we've loaded a Story Experience into the DOM
	// Add body classes
	if ( unc_experience.debug ) {
        $( 'body' ).addClass( 'unc-experience-displayed unc-experience-story-displayed' );
        $('#unc-experience-story-content').show();
  }

  // Experience Video, Homepage
  var $homeHeroMedia = $('#unc-experience-header > .media');
  var $homeHeroVideo = $homeHeroMedia.find('video')[0];
  var $homeHeroVideoPauseBtn = $homeHeroMedia.find('.pause');

    // Load the Story Experience when the 'Begin' link is clicked
    $( 'body.unc-experience.unc-experience-story #unc-experience-header' ).on( 'click', 'a.begin', function( e ) {

        // Prevent default action
        e.preventDefault();

        // Send an AJAX request to fetch the Story Post HTML
		$.ajax( {
			url: 	unc_experience.ajax_url,
			type: 	'POST',
			data: {
				action: 		 'unc_experience_story_get',
				nonce: 			  unc_experience.nonce,
				post_id: 		  unc_experience.post_id,
                homepage_post_id: unc_experience.homepage_post_id,
			},
			success: function( data, textStatus, jqXHR ) {

				// Output result if the console is available
				if ( window.console ) {
					console.log( data );
				}

				// Bail if success isn't true
				if ( data.success.length == 0 || data.success != true ) {
					return;
				}

				// Inject content into the DOM
				$( '#unc-experience-story-content' ).hide().html( data.data.content ).fadeIn();

                // Trigger any Initialization events that may be in the main UNC Theme, such as
                // Swiper Carousels or Google Maps.
                $( document ).trigger( 'unc_init' );

				// Add a class to the body tag, advising that the Experience is displayed
                $( 'body' ).addClass( 'unc-experience-displayed unc-experience-story-displayed' );

                // Make sure page is at top
                $( 'html, body' ).animate({scrollTop: 0}, 200);

                // Bring focus to experience
                if ( $( 'html' ).is( '.keyboard-user' ) ) {
                    setTimeout( function() {
                        $( '#unc-experience-story-content' ).focus();
                    }, 1000);
                }

                // If local storage is set to 'paused', stop the video autoplay, and update button
                if (localStorage.getItem('videoHomeHero') === 'paused') {
                  $('#unc-experience-story-content .media .pause').addClass('paused').text('Play Video');
                  $('#unc-experience-story-content .media video')[0].pause();
                }

                if (typeof onYouTubeIframeAPIReady === 'function') {
                    onYouTubeIframeAPIReady();
                }

                if (typeof $homeHeroVideo !== 'undefined') {
                    // Pause home hero video in background
                    $homeHeroVideo.pause();
                    $homeHeroVideoPauseBtn.addClass('paused').text('Play Video');
                }

			},
			error: function( jqXHR, textStatus, errorThrown ) {

				// Output the error to the browser console, if it's available
				if ( window.console ) {
					console.log( 'UNC Experience Story: Error' );
					console.log( textStatus );
					console.log( errorThrown );
				}

			}
		} );

    } );

    // Unload the Story Experience when the 'Close' (Home) link is clicked, or by clicking overlay
    $( 'body' ).on( 'click', '#unc-experience-story-content button.home-button, #overlay', function( e ) {

    	e.preventDefault();

    	// Hide
    	$( '#unc-experience-story-content' ).fadeOut( 'fast', function() {
    		// Destroy HTML content
    		$( this ).html( '' );
        } );

        // Remove body classes
        $( 'body' ).removeClass( 'unc-experience-displayed unc-experience-story-displayed' );

        // If local storage is set to 'playing', play the video, and update button
        if (! $('#unc-experience-story-content .media .pause').is('.paused')) {
          $homeHeroVideoPauseBtn.removeClass('paused').text('Pause Video');
          $homeHeroVideo.play();
          localStorage.setItem('videoHomeHero', 'playing');
        }

    } );

    // Smooth scroll for anchor down
    $( 'body' ).on( 'click', '#unc-experience-header .scroll-for-more', function( e ) {

    	e.preventDefault();

        var target = $(this).data('target');
        var $target = $(target);

        $('#unc-experience-story-content').stop().animate({
            'scrollTop': $target.offset().top
        }, 500, 'swing');

    } );

    // Top Navigation Submenus
    $( 'body' ).on( 'click', '#experience-nav-container .trigger', function( e ) {

        e.preventDefault();

        // open menu
        if ( !$(this).is( '.active' ) ) {
            $(this).addClass('active').attr('aria-expanded',true).siblings('ul').slideDown(250).parents('div').addClass('active');
            // close other triggers
            $(this).parent().siblings('div').removeClass('active').find('.trigger').removeClass('active').attr('aria-expanded',false).siblings('ul').slideUp(250);
        }

        // close menu
        else {
            $(this).removeClass('active').attr('aria-expanded',false).siblings('ul').slideUp(250).parents('div').removeClass('active');
        }

    } );

    // Smooth Scrolling
    $( 'body' ).on( 'click', '.scroll-anchor', function( e ) {

        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

          $('html, body').stop().animate({
              'scrollTop': $target.offset().top - 80
          }, 500, 'swing', function () {
              window.location.hash = target;
          });

          // delayed focus for keyboard users
          if ($('html').is('.keyboard-user')) {
                setTimeout(function(){ $target.focus(); }, 1000);
          }

    });

} );
