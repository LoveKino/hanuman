hanuman
=================================== 
Hanuman is token spliter which can build a token tree or a token array.<br>
Hanuman is simple and flexible.

What can hanuman do?
-----------------------------------
There is a text.
```
hello world!
<#b1#> 
    Ok, this is block one.
	<#b2#>
		This is block2
	<#/b2#>
<#/b1#>
```
<#b1#> and <#/b1#> are a pair of tags. <#b2#> and <#/b2#> are a pair of tags. Obviously, when we analysis that text, we expect a structured object like this:
```
|-{root}
|  |-(hello world!)
|  |-{b1}
|  |  |-(Ok, this is block one.)
|  |  |-{b2}
|  |  |  |-(This is block2)
```
Here, we imitate directory structure to express tree. It means root has two chidlren, "hello world" and b1. B1 has two children, "Ok, this is block one." and b2. B2 has one child "This is block2".

This is hanuman's main job, to make text structured.

install and require
-------------------------------------------------------------------
```
npm install hanuman
```
```
var TokenSpliter = require("hanuman");
```
A example
---------------------------------------------------------------------
Text like this: 
```
hello world!
<#b1#> 
    Ok, this is block one.
    <#b2#>
        This is block2
    <#/b2#>
<#/b1#>
<#include name="ok!"#>
```
Define a token spliter and build a token tree.
```
var TokenSpliter = require("hanuman");
var _left = "<#";
var _right = "#>";
var tokenSpliter = new TokenSpliter([{
	leftDelimiter: _left + "b1",
	wordReg: ".*?",
	rightDelimiter: _right,
	type: "b1",
	block: {
		type: "start"
	}
}, {
	leftDelimiter: _left + "\\s*\\/b1(?=(" + _right + ")|\\s)",
	wordReg: ".*?",
	rightDelimiter: _right,
	type: "b1",
	block: {
		type: "end",
	}
}, {
	leftDelimiter: _left + "b2",
	wordReg: ".*?",
	rightDelimiter: _right,
	type: "b2",
	block: {
		type: "start"
	}
}, {
	leftDelimiter: _left + "\\s*\\/b2(?=(" + _right + ")|\\s)",
	wordReg: ".*?",
	rightDelimiter: _right,
	type: "b2",
	block: {
		type: "end"
	}
}, {
	leftDelimiter: _left + "\\s*include(?=(" + _right + ")|\\s)",
	wordReg: ".*?",
	rightDelimiter: _right,
	type: "include"
}]);


var tokenTree = tokenSpliter.buildTokenTree(source);
console.log(tokenTree);
```
Result is a root of a tree.

how to use hanuman
--------------------------------------------------------
On the whole, example code contains two parts:
### create a tokenSpliter

TokenSpliter instance is a text handling tool which is responsible for building a token tree. When we create a tokenSpliter, we are describe the ability of tokenSpliter, it includes these aspect:
* should recognition which tokens.
* the strcture of a token
* it's an inline token or a block token. A block token needs end-tag, an inline token does not.<br>
Let's see what do we need when we create a tokenSpliter. A list which contains a group of object.
These object looks like:
```
{
	leftDelimiter: _left + "b1",
	wordReg: ".*?",
	rightDelimiter: _right,
	type: "b1",
	block: {
		type: "start"
	}
}
```
* leftDelimiter --------------------------- left delimiter regexp<br>
* wordReg --------------------------------- token's word's regexp<br>
* rightDelimiter -------------------------- right delimiter regexp<br>
* type ------------------------------------ define a type for your token<br>
* block ----------------------------------- block config<br>

