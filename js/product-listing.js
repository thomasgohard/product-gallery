pe.document.one('wb-init-loaded', function() {
	$('#mobile-gallery').dataTable({
		"bDestroy": true,
		"bProcessing": true,
		"asStripeClasses": [],
		"sAjaxSource": "data-" + pe.language + ".json",
		"aoColumns": [
			{
				"mData": function(data, type, val) {
					return "<img src=\"" + data["ProductIcon"] + "\" alt=\"\" />";
				},
				"sClass": "product-icon",
				//"sTitle": "Product icon"
			},
			{
				"mData": function(data, type, val) {
					return data["ProductName"];
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
					return data["ProductDescription"].substr(0, data["ProductDescription"].indexOf(". "));
				},
				"sClass": "product-description",
				//"sTitle": "Description"
			}
		],
		"fnCreatedRow": function(row, data, index) {
			row.className = "product-record module-info module-simplify span-4";
		},
		"fnDrawCallback": function(settings) {
			var rows = this.fnGetNodes();
			if (rows.length !== 0) {
				var tbody_attributes_list = rows[0].parentNode.attributes;
				var tbody_attributes_string = " class=\"product-record-group equalize\"";
				
				var len = tbody_attributes_list.length;
				for (var i = 0; i < len; ++i) {
					tbody_attributes_string += " " + tbody_attributes_list[i].name + "=\"" + tbody_attributes_list[i].value + "\"";
				}

				len = rows.length;
				for (var i = 0; i < len; i += 2) {
					$(rows).slice(i, i + 2).wrapAll("<tbody " + tbody_attributes_string + "></tbody>");
				}
			}
		}
	});
});
