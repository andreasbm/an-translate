# an-translate

This is a cool showcase of how web components and custom attributes can be used for translations.

## 👍 Step 1 - Create a JSON file with your strings
```json
{
	"title": "Hello World!",
	"subtitle": "This is a cool showcase of how web components and custom attributes can be used for translations.",
	"language": {
		"danish": "Danish",
		"english": "English"
	}
}

```

## 👊 Step 2 - Load the translation strings through an-translate-controller

Can either be in markup.

```html
<an-translate-controller src="strings/en.json"></an-translate-controller>
```

Or in Javascript.

```js
const translate = document.querySelector("an-translate-controller");
translate.src = "strings/en.json";
```

## 💪 Step 3 - Use the an-translate attribute to get the translated strings

```html
<h1 an-translate="title"></h1>
<h1 an-translate="language.english"></h1>
```

Will result in:

```
Hello World!
English
```

The strings will of course update themselves whenever you change the attribute value or the strings source.

## 🤘 Step 4 - Use placeholders and fill them out on run time

If you want to use placeholders, that is possible. Use the double brackets syntax {{ key }} in your strings (the spaces are optional) and interpolate them in the attribute value using the ":" character followed by key-value pairs. Like this:
```json
{
	"title": "Hello {{ name }}!",
	...
}

```

```html
<h1 an-translate='title:{ "name": "World"}'></h1>
<h1 an-translate='title:{ "name": "Andreas"}'></h1>
```

Will result in:

```
Hello World!
Hellow Andreas
```

# 👏 Licence
MIT