$(document).ready(function() {

    var crudServiceBaseUrl = "http://localhost:8090/api";

    var dataSourceFR = new kendo.data.DataSource({
        autoSync: false,
        transport: {
            read: {
                url: function(e) {
                    console.log(e);
                    return crudServiceBaseUrl + "/franchises";
                },
                dataType: "json",
                //data: e,
                type: "GET",
                contentType: "application/json"
                    //accepts: "application/json"

            },
            update: {
                url: crudServiceBaseUrl + "/franchises",
                type: "PUT",
                contentType: "application/json"
            },
            destroy: {
                url: function(e) {
                    return crudServiceBaseUrl + "/franchises/" + e.id;
                },
                type: "DELETE",
                contentType: "application/json"
            },
            create: {
                url: crudServiceBaseUrl + "/franchises",
                type: "POST",
                contentType: "application/json"
            },
            parameterMap: function(data, type) {
                if (type == "read" && data) {
                    return JSON.stringify(data);
                } else if (type !== "read" && data) {
                    console.log(data);
                    return JSON.stringify(data);
                }
            }
        },

        requestStart: function() {
            kendo.ui.progress($("#franchise"), true);
        },
        requestEnd: function(e) {
            kendo.ui.progress($("#franchise"), false);

        },
        change: function() {},
        schema: {
            model: {
                id: "id",

                fields: {
                    id: {
                        editable: false,
                        nullable: true
                    },
                    dimCode: {
                        type: "string"
                    },
                    dimName: {
                        type: "string"
                    }
                }
            }
        }

    });




    $("#franchise").kendoGrid({
        dataSource: dataSourceFR,
        autoBind: true,
        //height: 500,
        selectable: true,
        scrollable: true,
        pageable: false,
        sortable: true,
        toolbar: ["create"],
        editable: {
            mode: "popup"
        },
        columns: [{
                field: "dimCode",
                title: "Franchise Code",
                width: "50%"
            }, {
                field: "dimName",
                title: "Franchise Name",
                width: "50%"
            }, {
                command: [{
                    name: "edit",
                    text: " "
                }, {
                    name: "destroy",
                    text: " "
                }],
                title: "Record Edit",
                width: "90px"
            }

        ]
    });



})
