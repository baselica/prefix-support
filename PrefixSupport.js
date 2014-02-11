var PrefixSupport = function() {
    var div = document.createElement('div'),
        _browserVendor = null,
        _vendors = [
            '',
            'Ms',
            'O',
            'Moz',
            'Webkit',
            'Khtml'
        ];

    if (typeof String.prototype.capitalize === 'undefined') {
        /**
         * capitalize prototype for strings
         *
         * @returns {string}
         */
        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.substr(1);
        }
    }

    /**
     * @param vendor
     * @private
     */
    var _setVendor = function(vendor) {
        _browserVendor = vendor;
    };

    /**
     * Get property support with prefix (if needed)
     *
     * @param property	get prefixed css property
     * @returns {boolean|string}
     */
    this.getProperty = function(property) {
        property = property.capitalize();
        var vendor = this.getVendor();

        if (false === _browserVendor) {
            return false;
        }

        if (vendor + property in div.style) {
            return vendor + property;
        }

        return false;
    }

    /**
     * Get current _browserVendor in a particularly hackish way.
     *
     * @returns {PrefixSupport._browserVendor|*}
     */
    this.getVendor = function() {
        if (null !== _browserVendor) {
            return _browserVendor;
        }

        var property = 'Transition';
        for (var i = 0; i < _vendors.length; i++) {
            vendorProp = _vendors[i] + property;
            if (vendorProp in div.style) {
                _setVendor(_vendors[i]);
                return _browserVendor;
            }
        }
    };

    /**
     * Returns the css name for the _browserVendor specific
     * css property.
     *
     * @param property
     * @returns {boolean|string}
     */
    this.getCssProp = function(property) {
        if (!property) {
            return false;
        }

        property = this.getVendor() + property.capitalize();
        property = property.replace(/[A-Z]/g, function(match) {
            return '-' + match.toLowerCase();
        });

        return property;
    };

    /**
     * Get _browserVendor specific transition callback
     * @returns {boolean|string}
     */
    this.getTransitionCallback = function() {
        var vendor = this.getVendor();
        if (false === vendor) {
            return false;
        }

        //The joy of web.
        var eventName = '';
        switch (vendor) {
            case 'Webkit':
                eventName = 'webkitTransitionEnd';
                break;
            case 'Ms':
                eventName = 'MSTransitionEnd';
                break;
            case 'O':
                eventName = 'oTransitionEnd';
                break;
            default:
                eventName = 'transitionend';
                break;
        }

        return eventName;
    }
};
