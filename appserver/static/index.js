require([
    'splunkjs/ready!',
    'splunkjs/mvc/simplexml/ready!',
    '../app/splunk_datatables/components/DataTableView',
    'jquery'
], function(mvc, ignored, DataTableView, $) {

    const dataTableSearch = mvc.Components.getInstance('dataTableSearch');
    const results_obj = dataTableSearch.data('results');

    results_obj.on('data', function() {

         console.log("Has data? ",  results_obj.hasData());
         if(results_obj.hasData()) {
            console.log("Data (rows): ",  results_obj.data().rows);
            console.log("Backbone collection: (rows) ",  results_obj.collection().raw.rows);
            const rows = results_obj.collection().raw.rows;

            new DataTableView({
                data: rows,
                el: $("#tableWrapper")
            }).render();
         }

    });



});