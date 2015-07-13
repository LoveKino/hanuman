hanuman
=================================== 
Hanuman is token spliter which can build a token tree or a token array.
Hanuman is Highly configurable.

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
<#b1#> and <#/b1#> are a pair of tags. <#b2#> and <#/b2#> are a pair of tags. Obviously, when we analysis that text, we expect a structured object like next:
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
