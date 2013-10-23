Modernizr.load( [{
    load: ["site!deps/jquery.dataTables.min.js"],
    complete: function(){
		$('#mobile-gallery').dataTable({
			"bDestroy": true,
			"bProcessing": true,
			"bAutoWidth": false,
			"asStripeClasses": [],
			"sAjaxSource": "data-" + document.documentElement.lang + ".json",
			"aoColumns": [
				{
					"mData": function(data, type, val) {
						return "<a href=\"#record-" + data["ProductID"] + "\"><img class=\"product-icon\" src=\"" + data["ProductIcon"] + "\" alt=\"\" />" + data["ProductName"] + "</a><a class=\"record-close\" href=\"#" + data["ProductID"] + "_0\">close</a>";
					},
					"sClass": "product-name product-data-persistant"
					//"sTitle": "Product name"
				},
				{
					"mData": function(data, type, val) {
						var platform_badges = "";
						var len = data["ProductPlatforms"].length;
						for (var i = 0; i < len; ++i) {
							platform_badges += " <span class=\"label label-default font-medium\">" + data["ProductPlatforms"][i] + "</span>";
						}
						return platform_badges;
					},
					"sClass": "product-platforms product-data-persistant"
					//"sTitle": "Platform(s)"
				},
				{
					"mData": function(data, type, val) {
						/*
						 * Bug: Assume that more than one sentence will be present in the product description.
						 */
						//return data["ProductDescription"].substr(0, data["ProductDescription"].indexOf(". "));
						return data["ProductShortDescription"];
					},
					"sClass": "product-shortdescription product-data-compressed"
					//"sTitle": "Description"
				},
				{
					"mData": function(data, type, val) {
						return data["ProductDescription"];
					},
					"sClass": "product-description product-data-expanded"
					//"sTitle": "Description"
				},
				{
					"mData": function(data, type, val) {
						return "Published by: " + data["ProductDepartment"];
					},
					"sClass": "product-department product-data-expanded"
					//"sTitle": "Description"
				}
			],
			"fnCreatedRow": function(row, data, index) {
				row.className = "product-record well";
				row.id = "record-" + data["ProductID"];
			},
			"fnDrawCallback": function(settings) {
				var rows = this.fnGetNodes();
				var recs_per_row = 1;
				var mq768 = window.matchMedia("(min-width: 768px)");
				var mq1200 = window.matchMedia("(min-width: 1200px)");
				//mq768.addListener(event_handler);
				//event_handler(mq768);
				if (mq1200.matches) {
					recs_per_row = 3;
				} else if (mq768.matches) {
					recs_per_row = 2;
				}
				if (rows.length !== 0 && recs_per_row !== 1) {
					for (var i = 0, len = rows.length, minheight = 0; i < len; ++i) {
						if (i % recs_per_row === 0) {
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
		})
	}
}]);








