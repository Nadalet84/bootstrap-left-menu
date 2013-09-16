(function() {
	
	
	var sp = String.prototype;
	
	
	/**
     * 'Hello world'.isEmpty() -> false
     * ''.isEmpty() -> true
     * '\n'.isEmpty() -> false
     * '    '.isEmpty() -> false
     */
	sp.isEmpty = function () {
        return !this.length;
    };
    
    
    /**
     * 'Hello world'.isNotEmpty() -> true
     * ''.isNotEmpty() -> false
     * '\n'.isNotEmpty() -> true
     * '    '.isNotEmpty() -> true
     */
    sp.isNotEmpty = function () {
        return !this.isEmpty();
    };
    
    
    /**
     * 'Hello world'.isBlank() -> false
     * ''.isBlank() -> true
     * '\n'.isBlank() -> true
     * '    '.isBlank() -> true
     */
    sp.isBlank = function () {
        return (/^\s*$/).test(this);
    };
    
    
    /**
     * 'Hello world'.isNotBlank() -> true
     * ''.isNotBlank() -> false
     * '\n'.isNotBlank() -> false
     * '    '.isNotBlank() -> false
     */
    sp.isNotBlank = function () {
        return !this.isBlank();
    };
    
    
    /**
     * '  Hello       world   '.clean() -> Hello world
     */
    sp.clean = function () {
        return this.trim().replace(/\s+/g, ' ');
    };
    
    
    /**
     * Equal to str == str2
     */
    sp.equals = function (str) {
        return this == str;
    };
    
    
    /**
     * 'Hello world'.equalsIgnoreCase('hELLo WoRlD') -> true
     */
	sp.equalsIgnoreCase = function (str) {
		return str != null ? this.toLowerCase() == String(str).toLowerCase() : false;
    };
    
    
    /**
     * 'Hello world'.contains('world') -> true
     * 'Hello world'.contains('wOrLd') -> false
     * 'Hello world'.contains('') -> true
     * 'Hello world'.contains() -> false
     */
    sp.contains = function (str) {
        return str != null && str.length <= this.length ? this.indexOf(str) != -1 : false;
    };
    
    
    /**
     * 'Hello world'.countIgnoreCase('world') -> true
     * 'Hello world'.countIgnoreCase('wOrLd') -> true
     * 'Hello world'.countIgnoreCase('') -> true
     * 'Hello world'.countIgnoreCase() -> false
     */
    sp.containsIgnoreCase = function (str) {
		str = String(str);
        return str != null && str.length <= this.length ? this.toLowerCase().indexOf(str.toLowerCase()) != -1 : false;
    };
    
    
    /**
     * 'Hello world'.count('l') -> 3
     * 'Hello world'.count('L') -> 0
     * 'Hello World'.count('llo') -> 1
     * 'Hello world'.count('') -> 12
     * 'Hello world'.count() -> 0
     */
    sp.count = function (str) {
		if (str == null) return 0;
		str = String(str);
		var count = 0, pos = 0, length = str.length;
		while (true) {
			pos = this.indexOf(str, pos);
			if (pos === -1 || count > this.length) break;
			count++;
			pos += length;
		}
		return count;
    };
    
    
    /**
     * 'Hello world'.countIgnoreCase('l') -> 3
     * 'Hello world'.countIgnoreCase('L') -> 3
     * 'Hello World'.countIgnoreCase('LLo') -> 1
     * 'Hello world'.countIgnoreCase('') -> 12
     * 'Hello world'.countIgnoreCase() -> 0
     */
    sp.countIgnoreCase = function (str) {
        if (str == null) return 0;
		str = String(str).toLowerCase();
		var count = 0, pos = 0, length = str.length, self = this.toLowerCase();
		while (true) {
			pos = self.indexOf(str, pos);
			if (pos === -1 || count > self.length) break;
			count++;
			pos += length;
		}
		return count;
    };
    
    
    /**
     * 'Hello world'.remove('llo') -> He world
     * 'Hello world'.remove('LLo') -> Hello world
     * 'Hello world'.remove() -> Hello world
     * 'Hello 2 world'.remove(2) -> Hello world
     */
    sp.remove = function (str) {
        return this.replace(new RegExp(str, 'g'), '');
    };
    
    
    /**
     * 'Hello world'.removeIgnoreCase('llo') -> He world
     * 'Hello world'.removeIgnoreCase('LLo') -> He world
     * 'Hello world'.removeIgnoreCase() -> Hello world
     * 'Hello 2 world'.removeIgnoreCase(2) -> Hello world
     */
    sp.removeIgnoreCase = function (str) {
        return this.replace(new RegExp(str, 'gi'), '');
    };
    
    
    /**
     * 'hello world'.capitalize() -> Hello world
     */
    sp.capitalize = function () {
		return this.charAt(0).toUpperCase() + this.slice(1);
    };
    
    
    /**
     * 'Hello world'.uncapitalize() -> hello world
     */
    sp.uncapitalize = function () {
		return this.charAt(0).toLowerCase() + this.substring(1);
    };
    
    
    /**
     * 'Hello world, how are you?'.truncate() -> Hello world, how are you?
     * 'Hello world, how are you?'.truncate(-2) -> Hello world, how are you?
     * 'Hello world, how are you?'.truncate(2) -> He...
     * 'Hello world, how are you?'.truncate(22) -> Hello world, how are y...
     * 'Hello world, how are you?'.truncate(22, ' >>') -> Hello world, how are y >>
     * 'Hello world, how are you?'.truncate(5000) -> Hello world, how are you?
     * '3.14159265358979323846264338327'.truncate(5) -> 3.141...
     */
    sp.truncate = function (maxWidth, str) {
        return this.length > maxWidth && maxWidth > 0 ? this.substring(0, maxWidth) + (str || '...') : this;
    };
    
    
    /**
     * 'Hello world, how are you?'.abbreviate() -> Hello world, how are you?
     * 'Hello world, how are you?'.abbreviate(-2) -> Hello...
     * 'Hello world, how are you?'.abbreviate(2) -> Hello...
     * 'Hello world, how are you?'.abbreviate(22) -> Hello world, how are...
     * 'Hello world, how are you?'.abbreviate(22, ' >>') -> Hello world, how are >>
     * 'Hello world, how are you?'.abbreviate(5000) -> Hello world, how are you?
     * '3.14159265358979323846264338327'.abbreviate(5) -> 3.14159265358979323846264338327
     */
    sp.abbreviate = function (maxWidth, str) {
        var self = this, indxOf = self.indexOf(' ');
        str = str || '...';
        if(indxOf === -1) return self;
        if (maxWidth < indxOf) return self.substring(0, indxOf) + str;
		while(self[maxWidth] != ' ' && maxWidth < self.length && maxWidth > 0) maxWidth--;
        return self.length > maxWidth ? self.substring(0, maxWidth) + str : self;
    };
    
    
    /**
     * 'Hello world'.startsWith() -> false
     * 'Hello world'.startsWith('') -> true
     * 'Hello world'.startsWith('hel') -> false
     * 'Hello world'.startsWith('Hel') -> true
     */
    sp.startsWith = function (str) {
		str = String(str);
		return str == null || str.length > this.length ? false : this.substring(0, str.length) == str;
    };
    
    
    /**
     * 'Hello world'.startsWithIgnoreCase() -> false
     * 'Hello world'.startsWithIgnoreCase('') -> true
     * 'Hello world'.startsWithIgnoreCase('hel') -> true
     * 'Hello world'.startsWithIgnoreCase('HeL') -> true
     */
    sp.startsWithIgnoreCase = function (str) {
		str = String(str);
        return str == null || str.length > this.length ? false : this.substring(0, str.length).equalsIgnoreCase(str);
    };
    
    
    /**
     * 'Hello world'.endsWith() -> false
     * 'Hello world'.endsWith('') -> true
     * 'Hello world'.endsWith('orld') -> true
     * 'Hello world'.endsWith('OrLd') -> false
     */
    sp.endsWith = function (str) {
		str = String(str);
		return str == null || str.length > this.length ? false : this.substring(this.length - str.length, this.length) == str;
    };
    
    
    /**
     * 'Hello world'.endsWithIgnoreCase() -> false
     * 'Hello world'.endsWithIgnoreCase('') -> true
     * 'Hello world'.endsWithIgnoreCase('orld') -> true
     * 'Hello world'.endsWithIgnoreCase('OrLd') -> true
     */
    sp.endsWithIgnoreCase = function (str) {
		str = String(str);
		return str == null || str.length > this.length ? false : this.substring(this.length - str.length, this.length).equalsIgnoreCase(str);
    };
    
    
    /**
     * 'Hello world'.reverse() -> dlrow olleH
     */
    sp.reverse = function () {
        var res = '';
        for(var i = this.length-1; i >= 0; --i) res += this[i];
        return res;
    };
    
    
    /**
     * 'Hello world'.reverseWords() -> world Hello
     */
    sp.reverseWords = function () {
        return this.split(' ').reverse().join(' ');
    };
    
    
    /**
     * 'Hello world'.words() -> ['Hello', 'world']
     * '   Hello     world    '.words() -> ['Hello', 'world']
     * ''.words() -> []
     */
    sp.words = function () {
        return this.isBlank() ? [] : this.clean().split(' ');
    };    
    
    
    /**
     * '-1'.isNumeric() -> true
     * '-1.5'.isNumeric() -> true
     * '0'.isNumeric() -> true
     * '0.89'.isNumeric() -> true
     * '.89'.isNumeric() -> true
     * '3,14'.isNumeric() -> false
     * '0x89f'.isNumeric() -> true
     * 'hello'.isNumeric() -> false
     * '3.14.15'.isNumeric() -> false
     * ''.isNumeric() -> false
     */
    sp.isNumeric = function () {
        return this.isBlank() ? false : !isNaN(this);
    };    
    
    
    /**
     * '-1'.isNumeric() -> false
     * '-1.5'.isNumeric() -> false
     * '0'.isNumeric() -> false
     * '0.89'.isNumeric() -> false
     * '.89'.isNumeric() -> false
     * '3,14'.isNumeric() -> true
     * '0x89f'.isNumeric() -> false
     * 'hello'.isNumeric() -> true
     * '3.14.15'.isNumeric() -> true
     * ''.isNumeric() -> true
     */
    sp.isNotNumeric = function () {
		return !this.isNumeric();
    };
    
    
    /**
     * ''.toNumber() -> NaN
     * '1707'.toNumber() -> 1707
     * '1707.2509'.toNumber() -> 1707.2509
     * '1707.2509'.toNumber(2) -> 1707.25
     * '1707.25.09'.toNumber() -> NaN
     */
    sp.toNumber = function (decimals) {
        return this.isNumeric() ? parseFloat(this).toFixed(decimals || this.countRight('.')) : NaN;
    };
    
    
    /**
     * ''.toNumberRound() -> NaN
     * '1707'.toNumberRound() -> 1707
     * '1707.5509'.toNumberRound() -> 1708
     * '1707.2509'.toNumberRound(2) -> 1707
     * '1707.25.09'.toNumberRound() -> NaN
     */
    sp.toNumberRound = function () {
        return this.isNumeric() ? Math.round(parseFloat(this)) : NaN;
    };
    
    
    /**
     * ''.countRight() -> 0
     * '1707'.countRight('') -> 0
     * '1707.25099'.countRight('.') -> 5
     * '1707.2509'.countRight('blah') -> 0
     */
    sp.countRight = function (str) {
        return str ? this.length - this.indexOf(str) -1 : 0;
    };
    
    
    /**
     * ''.countLeft() -> 0
     * '1707'.countLeft('') -> 0
     * '1707.25099'.countLeft('.') -> 4
     * '1707.2509'.countLeft('blah') -> 0
     */
    sp.countLeft = function (str) {
        return str && this.indexOf(str) != -1 ? this.indexOf(str) : 0;
    };
    
    
    /**
     * 'Hello world!'.repeat() -> Hello world!
     * 'Hello world!'.repeat('') -> Hello world!
     * 'Hello world!'.repeat(3) -> Hello world!Hello world!Hello world!
     * 'Hello world!'.repeat('3') -> Hello world!Hello world!Hello world!
     * 'Hello world!'.repeat('blah') -> Hello world!
     */
    sp.repeat = function (n) {
        if(!n || isNaN(n)) return this;
        for(var i = 0, str = ''; i < n; i++) str += this;
        return str;
    };

    
})();
