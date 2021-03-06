// @ts-check

export class AnTranslateController extends HTMLElement {

	static get translationChangedEventName () {
		return "translationChanged";
	}

	static get observedAttributes () {
		return ["src"];
	}

	set src (value) {
		this.setAttribute("src", value);
	}

	get src () {
		return this.getAttribute("src");
	}

	constructor () {
		super();

		this.cachedStrings = new Map();
		this.strings = {};
	}

	/**
	 * Update the language each time the src attribute changes.
	 * @param attr
	 * @param oldValue
	 * @param newValue
	 * @returns {Promise<void>}
	 */
	async attributeChangedCallback (attr, oldValue, newValue) {
		if (attr === "src" && oldValue !== newValue) {
			await this._updateLanguage();
		}
	}

	/**
	 * Updates the language based on the current src.
	 * @returns {Promise<void>}
	 * @private
	 */
	async _updateLanguage () {
		const src = this.src;
		let strings = {};

		// If the strings has not been cached already, fetch them.
		if (!this.cachedStrings.has(src)) {
			strings = await this._loadJSON(src);
			this.cachedStrings.set(src, strings);

		} else {
			strings = this.cachedStrings.get(src);
		}

		this.strings = strings;

		// Notify the listeners that the translation has changed.
		const event = new CustomEvent(AnTranslateController.translationChangedEventName, {
			detail: {
				strings: strings,
				src: src
			}
		});

		document.dispatchEvent(event);
	}

	/**
	 * Returns whether an object is empty or null.
	 * @param obj
	 * @returns {boolean}
	 * @private
	 */
	_isNullOrEmpty (obj) {
		return obj == null || Object.keys(obj).length === 0;
	}

	/**
	 * Loads a JSON file.
	 * @param src
	 * @returns {Promise<any>}
	 * @private
	 */
	async _loadJSON (src) {
		return await fetch(src).then(res => res.json());
	}

	/**
	 * Finds the corresponding translation in the current strings based on a key.
	 * @param key
	 * @param obj
	 * @returns {*}
	 */
	get (key, obj = null) {
		if (this._isNullOrEmpty(this.strings) || key == null) {
			return null;
		}

		// Split the key in parts (example: hello.world)
		const parts = key.split(".");

		// Find the translation by traversing through the strings
		let translation = this.strings;
		while (parts.length > 0) {
			translation = translation[parts.shift()];

			// Do not continue if the key or translation is not defined
			if (this._isNullOrEmpty(translation)) return null;
		}

		// Replace the placeholders
		if (obj != null) {
			for (const key in obj) {
				if (obj.hasOwnProperty(key)) {
					translation = translation.replace(new RegExp(`{{( )*${key}( )*}}`), obj[key]);
				}
			}
		}

		return translation;
	}
}

window.customElements.define("an-translate-controller", AnTranslateController);