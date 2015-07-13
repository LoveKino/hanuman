/**
 * @author  ddchen chenjunyu@baidu.com
 * @goal convert token stream to token tree
 */

var build = function(tokens) {
	var root = {
	};
	var currentParentNode = root;
	for (var i = 0; i < tokens.length; i++) {
		var token = tokens[i];
		var node = {
			token: token
		}
		if (token.block && token.block.type === "start") {
			addChild(currentParentNode, node);
			currentParentNode = node;
		} else if (token.block && token.block.type === "end") {
			if (typeof token.type !== "undefined" &&
				token.type !== currentParentNode.token.type) {
				throw new Error("End tag is not matching for token " + JSON.stringify(currentParentNode.token));
			}
			currentParentNode.endBlock = node;
			currentParentNode = currentParentNode.parent;
		} else {
			addChild(currentParentNode, node);
		}
	}
	return root;
};

var addChild = function(parentNode, childNode) {
	if (!parentNode.children) parentNode.children = [];
	parentNode.children.push(childNode);
	childNode.parent = parentNode;
}

module.exports = {
	build: build
};