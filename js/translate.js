import {AnTranslateController} from "./translate-controller.js";

class AnTranslate {

	/**
	 * When connected, hook up listeners and setup the translation.
	 */
	connectedCallback () {
		this._setTranslation();

		// Listen for changed in the translation language
		document.addEventListener(AnTranslateController.translationChangedEventName, this._setTranslation.bind(this));

		// Keep a reference to the old value for optimizations
		this.oldValue = this.value;
	}

	/**
	 * Clean up the attribute when disconnected.
	 */
	disconnectedCallback () {
		document.removeEventListener(AnTranslateController.translationChangedEventName, this._setTranslation);
	}

	/**
	 * Set the translation each time the attributes value has changed.
	 */
	changedCallback () {
		if (this.oldValue === this.value) return;
		this._setTranslation();
	}

	/**
	 * Sets the translation based on the value of the attribute.
	 * @private
	 */
	_setTranslation () {

		// Find the parts of the translation
		const atoms = this.value.split(/:(.*)/);
		const key = atoms.length > 0 ? atoms[0] : null;
		const obj = atoms.length > 1 ? JSON.parse(atoms[1]) : null;

		const translation = window.anTranslateController.get(key, obj);
		this.ownerElement.textContent = translation || `{{${this.value}}}`;
	}
}

customAttributes.define("an-translate", AnTranslate);

