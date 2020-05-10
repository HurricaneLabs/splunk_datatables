require.config({
    paths: {
        datatables: "../app/splunk_datatables/components/DataTables-1.10.20/js/jquery.dataTables",
        bootstrapDataTables: "../app/splunk_datatables/components/DataTables-1.10.20/js/dataTables.bootstrap",
        text: "../app/splunk_datatables/components/text",
        dataTableTemplate: '../app/splunk_datatables/components/templates/data_table.html'
    },

    shim: {
        'bootstrapDataTables': {
            deps: ['datatables']
        }
    }
});

define([
    'splunkjs/ready!',
    'splunkjs/mvc/simplexml/ready!',
    'underscore',
    'backbone',
    'datatables',
    'text!dataTableTemplate',
    'jquery'
], function (mvc, ignored, _, Backbone, DataTables, DataTableTemplate, $) {

    var DataTableView = Backbone.View.extend({

        className: 'data-table-view',

        initialize: function (options) {
            this.options = _.extend({}, options);
            options = this.options;
            this.data = options.data;
            this.data_table = null;
            // pull the headers array passed in when we created the new instance of the DataTable View in index.js
            this.headers = options.headers;
        },

        render: function () {
            console.log('DataTables Data: ', this.data);
            this.$el.html(DataTableTemplate);
            this.renderDT();
        },

        renderDT: function () {
            var DT_Template = $('#data-table-template', this.$el).text();
            console.log('renderDT ::: ', this.data);
            $("#data-table-wrapper", this.$el).html(_.template(DT_Template, {
                data: this.data
            }));

            this.data_table = $('#table', this.$el).DataTable({
                "iDisplayLength": 20,        // length of data per page
                "bLengthChange": false,      // would allow users to select page size with dropdown menu
                "searching": true,           // allows users to filter results with a text input
                "sDom": "ftp",               // saying we only want to show the filter input, table and pagination elements
                "oLanguage": {
                    "sSearch": "",                // no placeholder text for filter input
                    "oPaginate": {
                        "sPrevious": "Prev"          // change 'Previous' text to 'Prev'
                    }
                },
                "bStateSave": true,          // sets cookie to save table display information
                "aaSorting": [[1, "asc"]],  // controls sorting
                // Set your columns here pulling out the values from the index of header tokens
                "columns": [
                    { "title" : this.headers[0] },
                    { "title" : this.headers[1] }
                ]
            });
        },

    });

    return DataTableView;

});