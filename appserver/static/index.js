require([
    'splunkjs/ready!',
    'splunkjs/mvc/simplexml/ready!',
    '../app/splunk_datatables/components/DataTableView',
    'jquery'
], function(mvc, ignored, DataTableView, $) {

    const dataTableSearch = mvc.Components.getInstance('dataTableSearch');
    const results_obj = dataTableSearch.data('results');
    // Set the 'token' variable to default token instance in the Splunk dashboard
    const tokens = mvc.Components.get("default");
    // Use a ternary operator to check and see if the header tokens are set. If not, then they are
    // Considered 'undefined' in JavaScript, and we can set our 'Default' values for the tokens,
    // otherwise if they are defined we use the values provided in the dashboard
    const header_Date = typeof tokens.get("header_Date") === 'undefined' ?
        'Default Date Header' :
        tokens.get("header_Date");
    const header_Message = typeof tokens.get("header_Message") === 'undefined' ?
        'Default Message Header' :
        tokens.get("header_Message");
    const headers_array = [header_Date, header_Message];

    results_obj.on('data', function() {

         console.log("Has data? ",  results_obj.hasData());
         if(results_obj.hasData()) {
            console.log("Data (rows): ",  results_obj.data().rows);
            console.log("Backbone collection: (rows) ",  results_obj.collection().raw.rows);
            const rows = results_obj.collection().raw.rows;

            new DataTableView({
                data: rows,
                headers: headers_array, // create a new key value pair to pass the header values into the DataTable view
                el: $("#tableWrapper")
            }).render();
         }

    });



});