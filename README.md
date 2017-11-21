# an-translate

This is a cool showcase of how web components and custom attributes can be used for translations.

```
<an-translate-controller src="strings/en.json"></an-translate-controller>
<h1 an-translate="title"></h1>
```

Do you prefer querying your elements? No problems!

```
const translate = document.querySelector("an-translate-controller");
translate.src = "strings/en.json";
```

