class AnTranslate {

	/**
	 * When connected, hook up listeners and setup the translation.
	 */
	connectedCallback () {
		this._setTranslation();

		// Listen for changed in the translation language
		document.addEventListener("translationChanged", this._setTranslation.bind(this));

		// Keep a reference to the old value for optimizations
		this.oldValue = this.value;
	}

	/**
	 * Clean up the attribute when disconnected.
	 */
	disconnectedCallback () {
		document.removeEventListener("translationChanged", this._setTranslation);
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
		this.ownerElement.textContent = window.anTranslateController.get(this.value || `{{${this.value}}}`);
	}
}

customAttributes.define("an-translate", AnTranslate);

