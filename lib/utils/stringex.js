'use strict';

String.prototype.GetNameWithoutSuff = function() {
	let str = this.toString();
	let nameRegex = /([^/\\]+)\.[a-zA-Z]+$/;
	let match = str.match( nameRegex );
	if ( !match || match.length === 0 ) {
		return '';
	}
	return match[1];
};

String.prototype.GetName = function() {
	let str = this.toString();
	let nameRegex = /[^/\\]+\.[a-zA-Z]+$/;
	let match = str.match( nameRegex );
	if ( !match || match.length === 0 ) {
		return '';
	}
	return match[0];
};

String.prototype.UnicoToUtf8 = function() {
	let str = this.toString();
	let result = str.replace( /\\/g, '%' );
	return unescape( result );
};