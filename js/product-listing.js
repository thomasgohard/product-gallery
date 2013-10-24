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
			}
		})
	}
}]);








