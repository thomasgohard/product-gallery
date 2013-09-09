pe.document.one('wb-init-loaded', function() {
	$('#mobile-gallery').dataTable({
		"bDestroy": true,
		"bProcessing": true,
		"bAutoWidth": false,
		"asStripeClasses": [],
		"sAjaxSource": "data-" + pe.language + ".json",
		"aoColumns": [
			{
				"mData": function(data, type, val) {
					return "<img class=\"product-icon\" src=\"" + data["ProductIcon"] + "\" alt=\"\" />" + data["ProductName"];
				},
				"sClass": "product-name",
				//"sTitle": "Product name"
			},
			{
				"mData": function(data, type, val) {
					var platform_badges = "";
					var len = data["ProductPlatforms"].length;

					for (var i = 0; i < len; ++i) {
						platform_badges += " <span class=\"badge-update font-medium\">" + data["ProductPlatforms"][i] + "</span>";
					}

					return platform_badges;
				},
				"sClass": "product-platforms",
				//"sTitle": "Platform(s)"
			},
			{
				"mData": function(data, type, val) {
					/*
					 * Bug: Assume that more than one sentence will be present in the product description.
					 */
					return data["ProductDescription"].substr(0, data["ProductDescription"].indexOf(". "));
				},
				"sClass": "product-description",
				//"sTitle": "Description"
			}
		],
		"fnCreatedRow": function(row, data, index) {
			row.className = "product-record module-info module-simplify";
		},
		"fnDrawCallback": function(settings) {
			var rows = this.fnGetNodes();
			var mq768 = window.matchMedia("(min-width: 768px)");
			//mq768.addListener(event_handler);
			//event_handler(mq768);

			if (rows.length !== 0 && mq768.matches) {
				var recs_per_row = 2;

				for (var i = 0, len = rows.length, minheight = 0; i < len; ++i) {
					if (i % recs_per_row == 0) {
						if (i !== 0) {
							for (var j = i - 1; j >= i - recs_per_row; --j) {
								$(rows[j]).css({"min-height": minheight});
							}
						}

						minheight = $(rows[i]).innerHeight();
					} else if ($(rows[i]).innerHeight() > minheight) {
						minheight = $(rows[i]).innerHeight();
					
}
				}
			}
		}
	});
});
