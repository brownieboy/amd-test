$(document).ready(function() {

    //    var crudServiceBaseUrl = "http://localhost:8090/api";
    var crudServiceBaseUrlObj = apiPaths.admin_tables.table09;
    // var currentModel = {};

    var confirmationWindowTemplate = kendo.template($("#confirmationWindowTemplate").html());
    var confirmationWindow = $("#divConfirmationWindow").kendoWindow({
        title: "Are you sure you want to delete this record?",
        visible: false, //the window will not appear before its .open method is called
        width: "400px",
        height: "200px",
    }).data("kendoWindow");

    var dataSourceTable09 = new kendo.data.DataSource({
        autoSync: false,
        transport: {
            read: {
                url: crudServiceBaseUrlObj.read,
                // dataType: "json",        // Not necessary?
                type: "get",
                contentType: "application/json"

            },
            create: {
                url: crudServiceBaseUrlObj.create,
                contentType: "application/json",
                type: "post"
            },
            destroy: {
                url: function(record) {
                    // var deleteURL = crudServiceBaseUrlObj.delete + "/" + record.accountFreqCode;
                    // console.log("deleteURL = " + deleteURL);
                    return crudServiceBaseUrlObj.delete + "/" + record.accountFreqCode;;
                },
                type: "post",
                contentType: "application/json"
            },

            error: function(e) {
                console.log("Status: " + e.status + "; Error message: " + e.errorThrown);
            },


            parameterMap: function(data, type) {
                console.log("parameterMap called, type = " + type);
                console.log("parameterMap called, data = " + JSON.stringify(data));
                return JSON.stringify(data);
            }

            // update: {
            //     url: crudServiceBaseUrl + "/put",
            //     type: "PUT",
            //     contentType: "application/json"
            // },

            // destroy: {
            //     url: function(e) {
            //         return crudServiceBaseUrl + "/franchises/" + e.id;
            //     },
            //     type: "DELETE",
            //     contentType: "application/json"
            // },
            // create: {
            //     url: crudServiceBaseUrl + "/franchises",
            //     type: "POST",
            //     contentType: "application/json"
            // },
            // parameterMap: function(data, type) {
            //     if (type == "read" && data) {
            //         return JSON.stringify(data);
            //     } else if (type !== "read" && data) {
            //         console.log(data);
            //         return JSON.stringify(data);
            //     }
            // }
        },

        requestStart: function() {
            kendo.ui.progress($("#table09"), true);
        },
        requestEnd: function(e) {
            kendo.ui.progress($("#table09"), false);

        },
        change: function() {},
        schema: {
            model: {
                id: "accountFreqCode",

                fields: {
                    accountFreqCode: {
                        validation: {
                            required: true
                                //     accountfreqcodevalidation: function(input) {
                                // No longer needed, since we're making the field non-editable in the kendoGrid.edit() function below.  But
                                // I'll leave code here for future reference
                                //         // currentModel value is set in the kendoGrid.edit() menthod, below.  This is very clunky but was
                                //         // the only way that I could find to access the current model values.
                                //         // And despite being under accountFreqCode field object, it still runs over EVERY COLUMN
                                //         // that's in the edit screen!!!!  So our first test is that we're looking at the one field
                                //         // that we actually want to test.
                                //         if (input.is("[name=accountFreqCode]")) {
                                //             console.log("currentModel.accountFreqCode = " + currentModel.accountFreqCode);

                            //             if (currentModel.accountFreqCode !== "") {
                            //                 if (input.val() !== currentModel.accountFreqCode) {
                            //                     console.log("You cannot change code on an existing model");
                            // see http://dojo.telerik.com/okOki/2 for example.
                            //                     $(input).attr("data-accountfreqcodevalidation-msg", "You cannot change code on an existing model");
                            //                     return false;
                            //                 } else {
                            //                     return true;
                            //                 }
                            //             } else {
                            //                 return true;
                            //             }
                            //         } else {
                            //             return true;
                            //         }
                            //     }
                        }
                    },
                    description: {
                        type: "string",
                        validation: {
                            required: true
                        }
                    },
                    sequence: {
                        type: "number"
                    },
                    rowNumber: {
                        type: "number"
                    }
                }
            }
        }

    });


    var table09Grid = $("#table09").kendoGrid({
        dataSource: dataSourceTable09,
        autoBind: true,
        //height: 500,
        selectable: true,
        scrollable: true,
        pageable: false,
        sortable: true,
        toolbar: ["create"],
        editable: {
            mode: "popup"

            // this is simple, but rubbish.  It uses an alert() so runs straight into Chrome's "Prevent this
            // page from creating additional dialogs" issues.  So replaced with custom dialog.
            // confirmation: function(e) {
            //     return "Are you sure that you want to delete the record '" + e.description + "'?";
            // }
        },
        edit: function(e) {
            // currentModel.accountFreqCode = e.model.accountFreqCode;  // can also use e.model.isNew()
            if (!e.model.isNew()) {
                // $("[name='accountFreqCode']").prop('readonly', true);
                $("[name='accountFreqCode']").parent()
                    .html("<span style='display:inline-block; padding-top:4px'>" + e.model.accountFreqCode + " (not editable for existing records)<\/span>");
            }
        },
        columns: [{
                field: "accountFreqCode",
                title: "Code"
            }, {
                field: "description",
                title: "Description"
            }, {
                field: "sequence",
                title: "Sort Order"
            }, {
                field: "rowNumber",
                title: "New Row Number"
            }, {
                command: [{
                    name: "edit",
                    text: " "
                }, {
                    // http://docs.telerik.com/kendo-ui/web/grid/how-to/Editing/custom-delete-confirmation-dialog
                    name: "customdelete", // Can't use "destroy" or "delete" for this name, otherwise you get default behaviours
                    text: " ",
                    imageClass: "k-delete",
                    iconClass: "k-icon",
                    click: function(e) {
                        console.log("Destroy button clicked!");
                        var tr = $(e.target).closest("tr"); //get the row for deletion
                        var data = this.dataItem(tr); //get the row data so it can be referred later
                        confirmationWindow.content(confirmationWindowTemplate(data)); //send the row data object to the template and render it
                        confirmationWindow.open().center();

                        $("#yesButton").click(function() {
                            dataSourceTable09.remove(data); //prepare a "destroy" request 
                            dataSourceTable09.sync(); //actually send the request (might be ommited if the autoSync option is enabled in the dataSource)
                            confirmationWindow.close();
                        })
                        $("#noButton").click(function() {
                            confirmationWindow.close();
                        })
                    }
                }],
                title: "Record Edit",
                width: "90px"
            }

        ]
    }).data("kendoGrid"); // .data() must be present or kendoSortable doesn't work.

    // http://demos.telerik.com/kendo-ui/sortable/integration-grid
    table09Grid.table.kendoSortable({
        filter: ">tbody >tr",
        hint: $.noop,
        cursor: "move",
        placeholder: function(element) {
            return element.clone().addClass("k-state-hover").css("opacity", 0.65);
        },
        container: "#table09 tbody",
        change: function(e) {
            console.log("kendoSortable.change()");
            // Taken from http://demos.telerik.com/kendo-ui/sortable/integration-grid
            var skip = table09Grid.dataSource.skip() || 0, // bug in example.  .skip() and return undefined
                oldIndex = e.oldIndex + skip,
                newIndex = e.newIndex + skip,
                data = table09Grid.dataSource.data(),
                dataItem = table09Grid.dataSource.getByUid(e.item.data("uid"));

            table09Grid.dataSource.remove(dataItem);
            table09Grid.dataSource.insert(newIndex, dataItem);
            for (var x = 0; x < data.length; x++) {
                data[x].rowNumber = (x + 1);
            }
            table09Grid.refresh();
            commitSortButton.enable(true);
        }
    });


    $("#butCommitSort").kendoButton({
        click: function() {
            $.ajax({
                data: JSON.stringify(table09Grid.dataSource.data()),
                method: "post",
                url: crudServiceBaseUrlObj.sort,
                contentType: "application/json"
            })
            .done(function() {
                console.log("Posting sorted data");
            });

            commitSortButton.enable(false);
        }
    });
    var commitSortButton = $("#butCommitSort").data("kendoButton");
    commitSortButton.enable(false);

    $("#logData").click(function() {
        console.log("sort order change data = " + JSON.stringify(table09Grid.dataSource.data()));
    });




    // Control test, via straight jQuery post.
    // var objToPost = {
    //     "accountFreqCode": "co3",
    //     "description": "Code 3",
    //     "sequence": 0,
    //     "rowNumber": 0
    // };

    // $("#butTestPost").click(function() {
    //     $.ajax({
    //         url: crudServiceBaseUrlObj.create,
    //         data: JSON.stringify(stringToPost),
    //         dataType: "json",
    //         type: "post",
    //         contentType: "application/json"
    //     });

    // });

})
