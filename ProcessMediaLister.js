$(document).ready(function() {

	const $body = $('body');

	// Return early if this is the module config screen (ProcessModule)
	if($body.hasClass('ProcessModule')) return;

	let table;
	let table_settings;
	const $type_input = $('#wrap_Inputfield_media_type input');
	const $selector_input = $('#Inputfield_pages_selector');
	let filters = {
		type: 'images' // Default
	};
	const $mode_buttons = $('#Inputfield_view_mode button');

	// Get current DataTable settings
	function getDataTableSettings(table) {
		let settings = {};
		settings.limit = table.page.len();
		settings.sort = table.order();
		settings.search_builder = {};
		const predefined_search = table.searchBuilder.getDetails();
		if(!$.isEmptyObject(predefined_search)) settings.search_builder.preDefined = predefined_search;
		settings.hidden_cols = [];
		table.columns().visible().toArray().forEach(function(item, index) {
			if(item === false) settings.hidden_cols.push(index);
		});
		settings.mode = $('#pml-results-table').attr('data-mode');
		return settings;
	}

	// Save DataTable settings to local storage
	function saveDataTableSettings() {
		let settings = getDataTableSettings(table);
		settings.bookmark = table_settings.bookmark;
		localStorage.setItem('pml_' + filters.type, JSON.stringify(settings));
	}

	// Set images mode
	function setImagesMode(mode) {
		$mode_buttons.removeClass('active');
		$mode_buttons.filter('[data-mode=' + mode + ']').addClass('active');
		$('#pml-results-table').attr('data-mode', mode);
		// Destroy any existing tooltips if switching to list mode
		if(mode === 'pml-table') {
			$('.tooltipstered').tooltipster('destroy');
		}
	}

	// Get results via AJAX request
	function getResults() {
		filters.type = $type_input.filter(':checked').val();
		filters.selector = $selector_input.val();
		table_settings = ProcessWire.config.ProcessMediaLister.table[filters.type];
		$('#media-lister-results').html('<i class="fa fa-lg fa-spin fa-spinner"></i>');
		$.ajax({
			url: './results/',
			type: 'POST',
			data: filters,
			success: function(markup) {

				// Insert markup
				$('#media-lister-results').html(markup);

				// DataTables init
				let dt_settings = {
					buttons: [
						'colvis',
					],
				};
				let hidden_cols = [];

				// Get any saved table settings from localStorage
				const stored = JSON.parse(localStorage.getItem('pml_' + filters.type));
				// If the stored settings are for the same bookmark (or lack of bookmark)
				if(stored && stored.bookmark === table_settings.bookmark) {
					setImagesMode(stored.mode);
					hidden_cols = stored.hidden_cols;
					dt_settings.searchBuilder = stored.search_builder;
					dt_settings.pageLength = stored.limit;
					dt_settings.order = stored.sort;
				} else {
					setImagesMode(table_settings.mode);
					hidden_cols = table_settings.hidden_cols;
					dt_settings.searchBuilder = table_settings.search_builder ?? {};
					dt_settings.pageLength = table_settings.limit;
					dt_settings.order = table_settings.sort;
				}

				// Images
				if(filters.type === 'images') {
					dt_settings.dom = '<"top-controls-wrap"QB>lfr<"table-wrap"t>ip';
					dt_settings.columnDefs = [
						{
							targets: hidden_cols,
							visible: false,
						},
						{
							targets: 3, // Thumbnail column
							orderable: false,
						},
					];
					dt_settings.searchBuilder.columns = table_settings.search_cols;
					// Open thumbnail links in Magnific
					$(document).magnificPopup({
						delegate: '.pml-thumb',
						type: 'image',
						gallery: {
							enabled: true
						},
					});
				}
				// Files
				else {
					dt_settings.dom = '<"top-controls-wrap"QB>lfr<"table-wrap"t>ip';
					dt_settings.columnDefs = [
						{
							targets: hidden_cols,
							visible: false,
						},
					];
				}

				// Initialise DataTable
				table = $('#pml-table').DataTable(dt_settings);
				// Save table settings when they change
				table.on('draw column-visibility', function() {
					saveDataTableSettings();
				});
			}
		});
	}

	getResults();
	// Get results on DOM ready if InputfieldSelector populated from bookmark
	if($('#wrap_Inputfield_pages_selector').hasClass('has-selector')) {
		getResults();
	}

	// Debounce getting results if InputfieldSelector changes due to keyup
	let allow_get_results = true;
	let debounce;
	$(document).on('keyup', '#wrap_Inputfield_pages_selector input.input-value', function() {
		allow_get_results = false;
		clearTimeout(debounce);
		debounce = setTimeout(function() {
			allow_get_results = true;
			getResults();
		}, 1000);
	});

	// Get results when InputfieldSelector changes, unless disallowed because of debouncing
	$selector_input.change(function() {
		if(!allow_get_results) return;
		getResults();
	});

	// Get results when type input changes
	$type_input.change(function() {
		getResults();
	});

	// Images mode changed
	$mode_buttons.on('click', function() {
		setImagesMode($(this).data('mode'));
		saveDataTableSettings();
	});

	// Tooltipster
	$body.on('click', '.pml-info', function() {
		const data = table.row($(this).closest('tr')).data();
		let content = '<table>';
		const visible = table.columns().visible();
		table.columns().header().each(function(item, index) {
			if(!visible[index]) return; // Skip hidden columns
			if(index === 4) return; // Skip thumbnail
			if(index === 0) {
				content += '<tr><th>' + item.textContent + '</th><td>' + data[index]['@data-order'] + '</td></tr>'
			} else {
				content += '<tr><th>' + item.textContent + '</th><td>' + data[index] + '</td></tr>'
			}
		});
		content += '</table>';

		if($(this).hasClass('tooltipstered')) {
			// Tooltipster already initialised so just update the content and open
			$(this).tooltipster('content', content).tooltipster('open');
		} else {
			// Initialise Tooltipster and open
			$(this).tooltipster({
				content: content,
				contentAsHTML: true,
				distance: 0,
				interactive: true,
				delay: 500,
				updateAnimation: null,
				trigger: 'click',
			}).tooltipster('open');
		}
	});

	// Filter bookmark submission
	$('#pml-filters').submit(function() {
		$('#pml-table-settings').val(JSON.stringify(getDataTableSettings(table)));
	});

	// Reset
	$('.pml-reset-link').click(function(event) {
		event.preventDefault();
		localStorage.removeItem('pml_images');
		localStorage.removeItem('pml_files');
		window.location.href = $(this).attr('href');
	});

});
