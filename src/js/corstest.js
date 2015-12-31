//Detect browser support for CORS
if ('withCredentials' in new XMLHttpRequest()) {
    /* supports cross-domain requests */
    document.write("CORS supported (XHR)");
} else {
    if (typeof XDomainRequest !== "undefined") {
        //Use IE-specific "CORS" code with XDR
        document.write("CORS supported (XDR)");
    } else {
        //Time to retreat with a fallback or polyfill
        document.write("No CORS Support!");
    }
}

// Detect Kendoui
if (window.kendo) {
	console.log("kendo in use");
}
else {
	console.log("kendo not in use")
}
