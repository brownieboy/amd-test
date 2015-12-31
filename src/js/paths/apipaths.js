 // var localFieldLookupsPath = "js/jsons/keyword_lookups/";

 // The APIs map to the backend tables as follows:
 //  * brokers - REF.TABLE.AGNT_INFO
 //  * program - RIREF.TABLE.PROGRAM
 //  * treaty types - RIREF.TABLE.TREATY_BUSINESS_TYPE
 //  * documentTypes - RIREF.TABLE.DOC_CATEGORY

 // APIs are fairly self-explanatory.  docCateory is odd man out as it populates the docCategory field, and
 // based on the code that the user selected from the program field.  So, you don't call
 // /reference/docCategory on its own.  It must always be followed by a forward slash and a two-letter code to limit
 // the categories that are returned, like so:
 // 	reference/programCode/CA - returns all doc categories relating to Casualty (code=CA)
 // 	reference/programCode/FI - returns all doc categories relating to Financial (code=FI)
 // NB: at time of writing, 11/11/2015, not of all of this data is in the back-end tables.

 // var apiPaths = {
 // 	"admin_tables": {
 // 		"table09": "./js/jsons/dummydata/table09.json"
 // 	}
 // };
 //    "create": "http://localhost/save"


 var apiPaths = {
     "admin_tables": {
         "table09": {
             "read": "http://aal44097:8080/admin/accountfreq/all",
             "create": "http://aal44097:8080/admin/accountfreq/save",
             "delete":"http://aal44097:8080/admin/accountfreq/delete",
             "sort": "http://aal44097:8080/admin/accountfreq/savesort"
         }
     }
 };
