module.exports = function(RED) {
	var path = require('path');
    var express = require("express");

	function Kibana3Node(n) {
	    RED.nodes.createNode(this,n);
	    var node = this;
	    node.args = JSON.parse(JSON.stringify(n));
        if (RED.settings.httpNodeRoot !== false) {
            if(node.args.override && node.args.override != "")
            {
                RED.httpNode.use(node.args.url,express.static(node.args.override));
            }
            if(node.args.dashboards && node.args.dashboards != "")
            {
                RED.httpNode.use(path.join(node.args.url, 'app/dashboards'),express.static(node.args.dashboards));
            }

            RED.httpNode.use(node.args.url,express.static(path.join(__dirname, 'public')));
        }
	}

	RED.nodes.registerType("kibana3",Kibana3Node);
}
