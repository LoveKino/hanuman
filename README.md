hanuman
=================================== 
Hanuman is token spliter which can build a token tree or a token array.

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
Here, we imitate directory structure to express tree.
