/*! --------------------------------------------------------------------------- *
 *                                                                              *
 *      ___  _        __ __                        ___  __  __                  *
 *     / _ )(_)__ _  / // /__  ___________  ____  / _ |/ /_/ /  ___ ___  ___    *
 *    / _  / / _ `/ / _  / _ \/ __/ __/ _ \/ __/ / __ / __/ _ \/ -_) _ \(_-<    *
 *   /____/_/\_, / /_//_/\___/_/ /_/  \___/_/   /_/ |_\__/_//_/\__/_//_/___/    *
 *          /___/                                                               *
 *                                                                              *
 * ---------------------------------------------------------------------------- *
 * Created & Maintained with love by the Big Horror Athens dev team             *
 * Interested in working with us? Send us your CV at cv@bighorrorathens.com.    *
 * ---------------------------------------------------------------------------! */
"use strict";
//# sourceMappingURL=credits.js.map

"use strict";

/*!
 * VERSION: 0.5.6
 * DATE: 2016-10-28
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * SplitText is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = typeof module !== "undefined" && module.exports && typeof global !== "undefined" ? global : undefined || window; //helps ensure compatibility with AMD/RequireJS and CommonJS/Node
(function (window) {

	"use strict";

	var _globals = window.GreenSockGlobals || window,
	    _namespace = function _namespace(ns) {
		var a = ns.split("."),
		    p = _globals,
		    i;
		for (i = 0; i < a.length; i++) {
			p[a[i]] = p = p[a[i]] || {};
		}
		return p;
	},
	    pkg = _namespace("com.greensock.utils"),
	    _getText = function _getText(e) {
		var type = e.nodeType,
		    result = "";
		if (type === 1 || type === 9 || type === 11) {
			if (typeof e.textContent === "string") {
				return e.textContent;
			} else {
				for (e = e.firstChild; e; e = e.nextSibling) {
					result += _getText(e);
				}
			}
		} else if (type === 3 || type === 4) {
			return e.nodeValue;
		}
		return result;
	},
	    _doc = document,
	    _getComputedStyle = _doc.defaultView ? _doc.defaultView.getComputedStyle : function () {},
	    _capsExp = /([A-Z])/g,
	    _getStyle = function _getStyle(t, p, cs, str) {
		var result;
		if (cs = cs || _getComputedStyle(t, null)) {
			t = cs.getPropertyValue(p.replace(_capsExp, "-$1").toLowerCase());
			result = t || cs.length ? t : cs[p]; //Opera behaves VERY strangely - length is usually 0 and cs[p] is the only way to get accurate results EXCEPT when checking for -o-transform which only works with cs.getPropertyValue()!
		} else if (t.currentStyle) {
			cs = t.currentStyle;
			result = cs[p];
		}
		return str ? result : parseInt(result, 10) || 0;
	},
	    _isArrayLike = function _isArrayLike(e) {
		return e.length && e[0] && (e[0].nodeType && e[0].style && !e.nodeType || e[0].length && e[0][0]) ? true : false; //could be an array of jQuery objects too, so accommodate that.
	},
	    _flattenArray = function _flattenArray(a) {
		var result = [],
		    l = a.length,
		    i,
		    e,
		    j;
		for (i = 0; i < l; i++) {
			e = a[i];
			if (_isArrayLike(e)) {
				j = e.length;
				for (j = 0; j < e.length; j++) {
					result.push(e[j]);
				}
			} else {
				result.push(e);
			}
		}
		return result;
	},
	    _stripExp = /(?:\r|\n|\t\t)/g,
	    //find carriage returns, new line feeds and double-tabs.
	_multipleSpacesExp = /(?:\s\s+)/g,
	    _emojiStart = 0xD800,
	    _emojiEnd = 0xDBFF,
	    _emojiLowStart = 0xDC00,
	    _emojiRegionStart = 0x1F1E6,
	    _emojiRegionEnd = 0x1F1FF,
	    _emojiModStart = 0x1f3fb,
	    _emojiModEnd = 0x1f3ff,
	    _emojiPairCode = function _emojiPairCode(s) {
		return (s.charCodeAt(0) - _emojiStart << 10) + (s.charCodeAt(1) - _emojiLowStart) + 0x10000;
	},
	    _isOldIE = _doc.all && !_doc.addEventListener,
	    _divStart = " style='position:relative;display:inline-block;" + (_isOldIE ? "*display:inline;*zoom:1;'" : "'"),
	    //note: we must use both display:inline-block and *display:inline for IE8 and earlier, otherwise it won't flow correctly (and if we only use display:inline, IE won't render most of the property tweens - very odd).
	_cssClassFunc = function _cssClassFunc(cssClass, tag) {
		cssClass = cssClass || "";
		var iterate = cssClass.indexOf("++") !== -1,
		    num = 1;
		if (iterate) {
			cssClass = cssClass.split("++").join("");
		}
		return function () {
			return "<" + tag + _divStart + (cssClass ? " class='" + cssClass + (iterate ? num++ : "") + "'>" : ">");
		};
	},
	    SplitText = pkg.SplitText = _globals.SplitText = function (element, vars) {
		if (typeof element === "string") {
			element = SplitText.selector(element);
		}
		if (!element) {
			throw "cannot split a null element.";
		}
		this.elements = _isArrayLike(element) ? _flattenArray(element) : [element];
		this.chars = [];
		this.words = [];
		this.lines = [];
		this._originals = [];
		this.vars = vars || {};
		this.split(vars);
	},
	    _swapText = function _swapText(element, oldText, newText) {
		var type = element.nodeType;
		if (type === 1 || type === 9 || type === 11) {
			for (element = element.firstChild; element; element = element.nextSibling) {
				_swapText(element, oldText, newText);
			}
		} else if (type === 3 || type === 4) {
			element.nodeValue = element.nodeValue.split(oldText).join(newText);
		}
	},
	    _pushReversed = function _pushReversed(a, merge) {
		var i = merge.length;
		while (--i > -1) {
			a.push(merge[i]);
		}
	},
	    _slice = function _slice(a) {
		//don't use Array.prototype.slice.call(target, 0) because that doesn't work in IE8 with a NodeList that's returned by querySelectorAll()
		var b = [],
		    l = a.length,
		    i;
		for (i = 0; i !== l; b.push(a[i++])) {}
		return b;
	},
	    _isBeforeWordDelimiter = function _isBeforeWordDelimiter(e, root, wordDelimiter) {
		var next;
		while (e && e !== root) {
			next = e._next || e.nextSibling;
			if (next) {
				return next.textContent.charAt(0) === wordDelimiter;
			}
			e = e.parentNode || e._parent;
		}
		return false;
	},
	    _deWordify = function _deWordify(e) {
		var children = _slice(e.childNodes),
		    l = children.length,
		    i,
		    child;
		for (i = 0; i < l; i++) {
			child = children[i];
			if (child._isSplit) {
				_deWordify(child);
			} else {
				if (i && child.previousSibling.nodeType === 3) {
					child.previousSibling.nodeValue += child.nodeType === 3 ? child.nodeValue : child.firstChild.nodeValue;
				} else if (child.nodeType !== 3) {
					e.insertBefore(child.firstChild, child);
				}
				e.removeChild(child);
			}
		}
	},
	    _setPositionsAfterSplit = function _setPositionsAfterSplit(element, vars, allChars, allWords, allLines, origWidth, origHeight) {
		var cs = _getComputedStyle(element),
		    paddingLeft = _getStyle(element, "paddingLeft", cs),
		    lineOffsetY = -999,
		    borderTopAndBottom = _getStyle(element, "borderBottomWidth", cs) + _getStyle(element, "borderTopWidth", cs),
		    borderLeftAndRight = _getStyle(element, "borderLeftWidth", cs) + _getStyle(element, "borderRightWidth", cs),
		    padTopAndBottom = _getStyle(element, "paddingTop", cs) + _getStyle(element, "paddingBottom", cs),
		    padLeftAndRight = _getStyle(element, "paddingLeft", cs) + _getStyle(element, "paddingRight", cs),
		    lineThreshold = _getStyle(element, "fontSize") * 0.2,
		    textAlign = _getStyle(element, "textAlign", cs, true),
		    charArray = [],
		    wordArray = [],
		    lineArray = [],
		    wordDelimiter = vars.wordDelimiter || " ",
		    tag = vars.span ? "span" : "div",
		    types = vars.type || vars.split || "chars,words,lines",
		    lines = allLines && types.indexOf("lines") !== -1 ? [] : null,
		    words = types.indexOf("words") !== -1,
		    chars = types.indexOf("chars") !== -1,
		    absolute = vars.position === "absolute" || vars.absolute === true,
		    linesClass = vars.linesClass,
		    iterateLine = (linesClass || "").indexOf("++") !== -1,
		    i,
		    j,
		    l,
		    node,
		    nodes,
		    isChild,
		    curLine,
		    addWordSpaces,
		    style,
		    lineNode,
		    lineWidth,
		    offset;
		if (lines && element.children.length === 1 && element.children[0]._isSplit) {
			//lines are always split on the main element (not inside nested elements), so if there's only one child, bust apart lines inside that rather than forcing it all into one big line. Like <div><div>lots of stuff</div></div> - if they split the outer one, it'd all be in one line.
			element = element.children[0];
		}
		if (iterateLine) {
			linesClass = linesClass.split("++").join("");
		}

		//copy all the descendant nodes into an array (we can't use a regular nodeList because it's live and we may need to renest things)
		j = element.getElementsByTagName("*");
		l = j.length;
		nodes = [];
		for (i = 0; i < l; i++) {
			nodes[i] = j[i];
		}

		//for absolute positioning, we need to record the x/y offsets and width/height for every <div>. And even if we're not positioning things absolutely, in order to accommodate lines, we must figure out where the y offset changes so that we can sense where the lines break, and we populate the lines array.
		if (lines || absolute) {
			for (i = 0; i < l; i++) {
				node = nodes[i];
				isChild = node.parentNode === element;
				if (isChild || absolute || chars && !words) {
					offset = node.offsetTop;
					if (lines && isChild && Math.abs(offset - lineOffsetY) > lineThreshold && node.nodeName !== "BR") {
						//we found some rare occasions where a certain character like &#8209; could cause the offsetTop to be off by 1 pixel, so we build in a threshold.
						curLine = [];
						lines.push(curLine);
						lineOffsetY = offset;
					}
					if (absolute) {
						//record offset x and y, as well as width and height so that we can access them later for positioning. Grabbing them at once ensures we don't trigger a browser paint & we maximize performance.
						node._x = node.offsetLeft;
						node._y = offset;
						node._w = node.offsetWidth;
						node._h = node.offsetHeight;
					}
					if (lines) {
						if (node._isSplit && isChild || !chars && isChild || words && isChild || !words && node.parentNode.parentNode === element && !node.parentNode._isSplit) {
							curLine.push(node);
							node._x -= paddingLeft;
							if (_isBeforeWordDelimiter(node, element, wordDelimiter)) {
								node._wordEnd = true;
							}
						}
						if (node.nodeName === "BR" && node.nextSibling && node.nextSibling.nodeName === "BR") {
							//two consecutive <br> tags signify a new [empty] line.
							lines.push([]);
						}
					}
				}
			}
		}

		for (i = 0; i < l; i++) {
			node = nodes[i];
			isChild = node.parentNode === element;
			if (node.nodeName === "BR") {
				if (lines || absolute) {
					element.removeChild(node);
					nodes.splice(i--, 1);
					l--;
				} else if (!words) {
					element.appendChild(node);
				}
				continue;
			}

			if (absolute) {
				style = node.style;
				if (!words && !isChild) {
					node._x += node.parentNode._x;
					node._y += node.parentNode._y;
				}
				style.left = node._x + "px";
				style.top = node._y + "px";
				style.position = "absolute";
				style.display = "block";
				//if we don't set the width/height, things collapse in older versions of IE and the origin for transforms is thrown off in all browsers.
				style.width = node._w + 1 + "px"; //IE is 1px short sometimes. Avoid wrapping
				style.height = node._h + "px";
			}

			if (!words && chars) {
				//we always start out wrapping words in their own <div> so that line breaks happen correctly, but here we'll remove those <div> tags if necessary and renest the characters directly into the element rather than inside the word <div>
				if (node._isSplit) {
					node._next = node.nextSibling;
					node.parentNode.appendChild(node); //put it at the end to keep the order correct.
				} else if (node.parentNode._isSplit) {
					node._parent = node.parentNode;
					if (!node.previousSibling && node.firstChild) {
						node.firstChild._isFirst = true;
					}
					node._next = node.nextSibling && node.nextSibling._isFirst ? null : node.nextSibling;
					node.parentNode.removeChild(node);
					nodes.splice(i--, 1);
					l--;
				} else if (!isChild) {
					offset = !node.nextSibling && _isBeforeWordDelimiter(node.parentNode, element, wordDelimiter); //if this is the last letter in the word (and we're not breaking by lines and not positioning things absolutely), we need to add a space afterwards so that the characters don't just mash together
					if (node.parentNode._parent) {
						node.parentNode._parent.appendChild(node);
					}
					if (offset) {
						node.parentNode.appendChild(_doc.createTextNode(" "));
					}
					if (vars.span) {
						node.style.display = "inline"; //so that word breaks are honored properly.
					}
					charArray.push(node);
				}
			} else if (node.parentNode._isSplit && !node._isSplit && node.innerHTML !== "") {
				wordArray.push(node);
			} else if (chars && !node._isSplit) {
				if (vars.span) {
					node.style.display = "inline";
				}
				charArray.push(node);
			}
		}

		if (lines) {
			//the next 7 lines just give us the line width in the most reliable way and figure out the left offset (if position isn't relative or absolute). We must set the width along with text-align to ensure everything works properly for various alignments.
			if (absolute) {
				lineNode = _doc.createElement(tag);
				element.appendChild(lineNode);
				lineWidth = lineNode.offsetWidth + "px";
				offset = lineNode.offsetParent === element ? 0 : element.offsetLeft;
				element.removeChild(lineNode);
			}
			style = element.style.cssText;
			element.style.cssText = "display:none;"; //to improve performance, set display:none on the element so that the browser doesn't have to worry about reflowing or rendering while we're renesting things. We'll revert the cssText later.
			//we can't use element.innerHTML = "" because that causes IE to literally delete all the nodes and their content even though we've stored them in an array! So we must loop through the children and remove them.
			while (element.firstChild) {
				element.removeChild(element.firstChild);
			}
			addWordSpaces = wordDelimiter === " " && (!absolute || !words && !chars);
			for (i = 0; i < lines.length; i++) {
				curLine = lines[i];
				lineNode = _doc.createElement(tag);
				lineNode.style.cssText = "display:block;text-align:" + textAlign + ";position:" + (absolute ? "absolute;" : "relative;");
				if (linesClass) {
					lineNode.className = linesClass + (iterateLine ? i + 1 : "");
				}
				lineArray.push(lineNode);
				l = curLine.length;
				for (j = 0; j < l; j++) {
					if (curLine[j].nodeName !== "BR") {
						node = curLine[j];
						lineNode.appendChild(node);
						if (addWordSpaces && node._wordEnd) {
							lineNode.appendChild(_doc.createTextNode(" "));
						}
						if (absolute) {
							if (j === 0) {
								lineNode.style.top = node._y + "px";
								lineNode.style.left = paddingLeft + offset + "px";
							}
							node.style.top = "0px";
							if (offset) {
								node.style.left = node._x - offset + "px";
							}
						}
					}
				}
				if (l === 0) {
					//if there are no nodes in the line (typically meaning there were two consecutive <br> tags, just add a non-breaking space so that things display properly.
					lineNode.innerHTML = "&nbsp;";
				} else if (!words && !chars) {
					_deWordify(lineNode);
					_swapText(lineNode, String.fromCharCode(160), " ");
				}
				if (absolute) {
					lineNode.style.width = lineWidth;
					lineNode.style.height = node._h + "px";
				}
				element.appendChild(lineNode);
			}
			element.style.cssText = style;
		}

		//if everything shifts to being position:absolute, the container can collapse in terms of height or width, so fix that here.
		if (absolute) {
			if (origHeight > element.clientHeight) {
				element.style.height = origHeight - padTopAndBottom + "px";
				if (element.clientHeight < origHeight) {
					//IE8 and earlier use a different box model - we must include padding and borders
					element.style.height = origHeight + borderTopAndBottom + "px";
				}
			}
			if (origWidth > element.clientWidth) {
				element.style.width = origWidth - padLeftAndRight + "px";
				if (element.clientWidth < origWidth) {
					//IE8 and earlier use a different box model - we must include padding and borders
					element.style.width = origWidth + borderLeftAndRight + "px";
				}
			}
		}
		_pushReversed(allChars, charArray);
		_pushReversed(allWords, wordArray);
		_pushReversed(allLines, lineArray);
	},
	    _splitRawText = function _splitRawText(element, vars, wordStart, charStart) {
		var tag = vars.span ? "span" : "div",
		    types = vars.type || vars.split || "chars,words,lines",
		    words = types.indexOf("words") !== -1,
		    chars = types.indexOf("chars") !== -1,
		    absolute = vars.position === "absolute" || vars.absolute === true,
		    wordDelimiter = vars.wordDelimiter || " ",
		    space = wordDelimiter !== " " ? "" : absolute ? "&#173; " : " ",
		    wordEnd = vars.span ? "</span>" : "</div>",
		    wordIsOpen = true,
		    text,
		    splitText,
		    i,
		    j,
		    l,
		    character,
		    hasTagStart,
		    emojiPair1,
		    emojiPair2,
		    container = _doc.createElement("div"),
		    parent = element.parentNode;

		parent.insertBefore(container, element);
		container.textContent = element.nodeValue;
		parent.removeChild(element);
		element = container;
		text = _getText(element);
		hasTagStart = text.indexOf("<") !== -1;

		if (vars.reduceWhiteSpace !== false) {
			text = text.replace(_multipleSpacesExp, " ").replace(_stripExp, "");
		}
		if (hasTagStart) {
			text = text.split("<").join("{{LT}}"); //we can't leave "<" in the string, or when we set the innerHTML, it can be interpreted as a node
		}
		l = text.length;
		splitText = (text.charAt(0) === " " ? space : "") + wordStart();
		for (i = 0; i < l; i++) {
			character = text.charAt(i);
			if (character === wordDelimiter && text.charAt(i - 1) !== wordDelimiter && i) {
				splitText += wordIsOpen ? wordEnd : "";
				wordIsOpen = false;
				while (text.charAt(i + 1) === wordDelimiter) {
					//skip over empty spaces (to avoid making them words)
					splitText += space;
					i++;
				}
				if (i === l - 1) {
					splitText += space;
				} else if (text.charAt(i + 1) !== ")") {
					splitText += space + wordStart();
					wordIsOpen = true;
				}
			} else if (character === "{" && text.substr(i, 6) === "{{LT}}") {
				splitText += chars ? charStart() + "{{LT}}" + "</" + tag + ">" : "{{LT}}";
				i += 5;
			} else if (character.charCodeAt(0) >= _emojiStart && character.charCodeAt(0) <= _emojiEnd || text.charCodeAt(i + 1) >= 0xFE00 && text.charCodeAt(i + 1) <= 0xFE0F) {
				//special emoji characters use 2 or 4 unicode characters that we must keep together.
				emojiPair1 = _emojiPairCode(text.substr(i, 2));
				emojiPair2 = _emojiPairCode(text.substr(i + 2, 2));
				j = emojiPair1 >= _emojiRegionStart && emojiPair1 <= _emojiRegionEnd && emojiPair2 >= _emojiRegionStart && emojiPair2 <= _emojiRegionEnd || emojiPair2 >= _emojiModStart && emojiPair2 <= _emojiModEnd ? 4 : 2;
				splitText += chars && character !== " " ? charStart() + text.substr(i, j) + "</" + tag + ">" : text.substr(i, j);
				i += j - 1;
			} else {
				splitText += chars && character !== " " ? charStart() + character + "</" + tag + ">" : character;
			}
		}
		element.outerHTML = splitText + (wordIsOpen ? wordEnd : "");
		if (hasTagStart) {
			_swapText(parent, "{{LT}}", "<"); //note: don't perform this on "element" because that gets replaced with all new elements when we set element.outerHTML.
		}
	},
	    _split = function _split(element, vars, wordStart, charStart) {
		var children = _slice(element.childNodes),
		    l = children.length,
		    absolute = vars.position === "absolute" || vars.absolute === true,
		    i,
		    child;

		if (element.nodeType !== 3 || l > 1) {
			vars.absolute = false;
			for (i = 0; i < l; i++) {
				child = children[i];
				if (child.nodeType !== 3 || /\S+/.test(child.nodeValue)) {
					if (absolute && child.nodeType !== 3 && _getStyle(child, "display", null, true) === "inline") {
						//if there's a child node that's display:inline, switch it to inline-block so that absolute positioning works properly (most browsers don't report offsetTop/offsetLeft properly inside a <span> for example)
						child.style.display = "inline-block";
						child.style.position = "relative";
					}
					child._isSplit = true;
					_split(child, vars, wordStart, charStart); //don't split lines on child elements
				}
			}
			vars.absolute = absolute;
			element._isSplit = true;
			return;
		}

		_splitRawText(element, vars, wordStart, charStart);
	},
	    p = SplitText.prototype;

	p.split = function (vars) {
		if (this.isSplit) {
			this.revert();
		}
		this.vars = vars = vars || this.vars;
		this._originals.length = this.chars.length = this.words.length = this.lines.length = 0;
		var i = this.elements.length,
		    tag = vars.span ? "span" : "div",
		    absolute = vars.position === "absolute" || vars.absolute === true,
		    wordStart = _cssClassFunc(vars.wordsClass, tag),
		    charStart = _cssClassFunc(vars.charsClass, tag),
		    origHeight,
		    origWidth,
		    e;
		//we split in reversed order so that if/when we position:absolute elements, they don't affect the position of the ones after them in the document flow (shifting them up as they're taken out of the document flow).
		while (--i > -1) {
			e = this.elements[i];
			this._originals[i] = e.innerHTML;
			origHeight = e.clientHeight;
			origWidth = e.clientWidth;
			_split(e, vars, wordStart, charStart);
			_setPositionsAfterSplit(e, vars, this.chars, this.words, this.lines, origWidth, origHeight);
		}
		this.chars.reverse();
		this.words.reverse();
		this.lines.reverse();
		this.isSplit = true;
		return this;
	};

	p.revert = function () {
		if (!this._originals) {
			throw "revert() call wasn't scoped properly.";
		}
		var i = this._originals.length;
		while (--i > -1) {
			this.elements[i].innerHTML = this._originals[i];
		}
		this.chars = [];
		this.words = [];
		this.lines = [];
		this.isSplit = false;
		return this;
	};

	SplitText.selector = window.$ || window.jQuery || function (e) {
		var selector = window.$ || window.jQuery;
		if (selector) {
			SplitText.selector = selector;
			return selector(e);
		}
		return typeof document === "undefined" ? e : document.querySelectorAll ? document.querySelectorAll(e) : document.getElementById(e.charAt(0) === "#" ? e.substr(1) : e);
	};
	SplitText.version = "0.5.6";
})(_gsScope);

//export to AMD/RequireJS and CommonJS/Node (precursor to full modular build system coming at a later date)
(function (name) {
	"use strict";

	var getGlobal = function getGlobal() {
		return (_gsScope.GreenSockGlobals || _gsScope)[name];
	};
	if (typeof define === "function" && define.amd) {
		//AMD
		define([], getGlobal);
	} else if (typeof module !== "undefined" && module.exports) {
		//node
		module.exports = getGlobal();
	}
})("SplitText");
//# sourceMappingURL=SplitText.js.map

"use strict";

/*!
 * VERSION: 0.2.0
 * DATE: 2016-11-04
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * This work is subject to the terms at http://greensock.com/standard-license or for
 * Club GreenSock members, the software agreement that was issued with your membership.
 *
 * @author: Jack Doyle, jack@greensock.com
 **/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : undefined || window;(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  _gsScope._gsDefine("easing.CustomEase", ["easing.Ease"], function (a) {
    var b = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        c = /[achlmqstvz]|(-?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
        d = /[\+\-]?\d*\.?\d+e[\+\-]?\d+/gi,
        e = /[cLlsS]/g,
        f = "CustomEase only accepts Cubic Bezier data.",
        g = function g(a, b, c, d, e, f, h, i, j, k, l) {
      var m,
          n = (a + c) / 2,
          o = (b + d) / 2,
          p = (c + e) / 2,
          q = (d + f) / 2,
          r = (e + h) / 2,
          s = (f + i) / 2,
          t = (n + p) / 2,
          u = (o + q) / 2,
          v = (p + r) / 2,
          w = (q + s) / 2,
          x = (t + v) / 2,
          y = (u + w) / 2,
          z = h - a,
          A = i - b,
          B = Math.abs((c - h) * A - (d - i) * z),
          C = Math.abs((e - h) * A - (f - i) * z);return k || (k = [{ x: a, y: b }, { x: h, y: i }], l = 1), k.splice(l || k.length - 1, 0, { x: x, y: y }), (B + C) * (B + C) > j * (z * z + A * A) && (m = k.length, g(a, b, n, o, t, u, x, y, j, k, l), g(x, y, v, w, r, s, h, i, j, k, l + 1 + (k.length - m))), k;
    },
        h = function h(a) {
      var b,
          e,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n,
          o,
          p = (a + "").replace(d, function (a) {
        var b = +a;return 1e-4 > b && b > -1e-4 ? 0 : b;
      }).match(c) || [],
          q = [],
          r = 0,
          s = 0,
          t = p.length,
          u = 2;for (b = 0; t > b; b++) {
        if (m = h, isNaN(p[b]) ? (h = p[b].toUpperCase(), i = h !== p[b]) : b--, e = +p[b + 1], g = +p[b + 2], i && (e += r, g += s), b || (k = e, l = g), "M" === h) j && j.length < 8 && (q.length -= 1, u = 0), r = k = e, s = l = g, j = [e, g], u = 2, q.push(j), b += 2, h = "L";else if ("C" === h) j || (j = [0, 0]), j[u++] = e, j[u++] = g, i || (r = s = 0), j[u++] = r + 1 * p[b + 3], j[u++] = s + 1 * p[b + 4], j[u++] = r += 1 * p[b + 5], j[u++] = s += 1 * p[b + 6], b += 6;else if ("S" === h) "C" === m || "S" === m ? (n = r - j[u - 4], o = s - j[u - 3], j[u++] = r + n, j[u++] = s + o) : (j[u++] = r, j[u++] = s), j[u++] = e, j[u++] = g, i || (r = s = 0), j[u++] = r += 1 * p[b + 3], j[u++] = s += 1 * p[b + 4], b += 4;else {
          if ("L" !== h && "Z" !== h) throw f;"Z" === h && (e = k, g = l, j.closed = !0), ("L" === h || Math.abs(r - e) > .5 || Math.abs(s - g) > .5) && (j[u++] = r + (e - r) / 3, j[u++] = s + (g - s) / 3, j[u++] = r + 2 * (e - r) / 3, j[u++] = s + 2 * (g - s) / 3, j[u++] = e, j[u++] = g, "L" === h && (b += 2)), r = e, s = g;
        }
      }return q[0];
    },
        i = function i(a) {
      var b,
          c = a.length,
          d = 999999999999;for (b = 1; c > b; b += 6) {
        +a[b] < d && (d = +a[b]);
      }return d;
    },
        j = function j(a, b, c) {
      c || 0 === c || (c = Math.max(+a[a.length - 1], +a[1]));var d,
          e = -1 * +a[0],
          f = -c,
          g = a.length,
          h = 1 / (+a[g - 2] + e),
          j = -b || (Math.abs(+a[g - 1] - +a[1]) < .01 * (+a[g - 2] - +a[0]) ? i(a) + f : +a[g - 1] + f);for (j = j ? 1 / j : -h, d = 0; g > d; d += 2) {
        a[d] = (+a[d] + e) * h, a[d + 1] = (+a[d + 1] + f) * j;
      }
    },
        k = function k(a) {
      var b = this.lookup[a * this.l | 0] || this.lookup[this.l - 1];return b.nx < a && (b = b.n), b.y + (a - b.x) / b.cx * b.cy;
    },
        l = function l(b, c, d) {
      this._calcEnd = !0, this.id = b, b && (a.map[b] = this), this.getRatio = k, this.setData(c, d);
    },
        m = l.prototype = new a();return m.constructor = l, m.setData = function (a, c) {
      a = a || "0,0,1,1";var d,
          i,
          k,
          l,
          m,
          n,
          o,
          p,
          q,
          r,
          s = a.match(b),
          t = 1,
          u = [];if (c = c || {}, r = c.precision || 1, this.data = a, this.lookup = [], this.points = u, this.fast = 1 >= r, (e.test(a) || -1 !== a.indexOf("M") && -1 === a.indexOf("C")) && (s = h(a)), d = s.length, 4 === d) s.unshift(0, 0), s.push(1, 1), d = 8;else if ((d - 2) % 6) throw f;for ((0 !== +s[0] || 1 !== +s[d - 2]) && j(s, c.height, c.originY), this.rawBezier = s, l = 2; d > l; l += 6) {
        i = { x: +s[l - 2], y: +s[l - 1] }, k = { x: +s[l + 4], y: +s[l + 5] }, u.push(i, k), g(i.x, i.y, +s[l], +s[l + 1], +s[l + 2], +s[l + 3], k.x, k.y, 1 / (2e5 * r), u, u.length - 1);
      }for (d = u.length, l = 0; d > l; l++) {
        o = u[l], p = u[l - 1] || o, o.x > p.x || p.y !== o.y && p.x === o.x || o === p ? (p.cx = o.x - p.x, p.cy = o.y - p.y, p.n = o, p.nx = o.x, this.fast && l > 1 && Math.abs(p.cy / p.cx - u[l - 2].cy / u[l - 2].cx) > 2 && (this.fast = !1), p.cx < t && (p.cx ? t = p.cx : p.cx = .001)) : (u.splice(l--, 1), d--);
      }if (d = 1 / t + 1 | 0, this.l = d, m = 1 / d, n = 0, o = u[0], this.fast) {
        for (l = 0; d > l; l++) {
          q = l * m, o.nx < q && (o = u[++n]), i = o.y + (q - o.x) / o.cx * o.cy, this.lookup[l] = { x: q, cx: m, y: i, cy: 0, nx: 9 }, l && (this.lookup[l - 1].cy = i - this.lookup[l - 1].y);
        }this.lookup[d - 1].cy = u[u.length - 1].y - i;
      } else for (l = 0; d > l; l++) {
        o.nx < l * m && (o = u[++n]), this.lookup[l] = o;
      }return this;
    }, m.getRatio = k, m.getSVGData = function (a) {
      return l.getSVGData(this, a);
    }, l.create = function (a, b, c) {
      return new l(a, b, c);
    }, l.version = "0.2.0", l.bezierToPoints = g, l.get = function (b) {
      return a.map[b];
    }, l.getSVGData = function (b, c) {
      c = c || {};var d,
          e,
          f,
          g,
          h,
          i,
          j,
          k,
          l,
          m,
          n = 1e3,
          o = c.width || 100,
          p = c.height || 100,
          q = c.x || 0,
          r = (c.y || 0) + p,
          s = c.path;if (c.invert && (p = -p, r = 0), b = b.getRatio ? b : a.map[b] || console.log("No ease found: ", b), b.rawBezier) {
        for (d = [], j = b.rawBezier.length, f = 0; j > f; f += 2) {
          d.push(((q + b.rawBezier[f] * o) * n | 0) / n + "," + ((r + b.rawBezier[f + 1] * -p) * n | 0) / n);
        }d[0] = "M" + d[0], d[1] = "C" + d[1];
      } else for (d = ["M" + q + "," + r], j = Math.max(5, 200 * (c.precision || 1)), g = 1 / j, j += 2, k = 5 / j, l = ((q + g * o) * n | 0) / n, m = ((r + b.getRatio(g) * -p) * n | 0) / n, e = (m - r) / (l - q), f = 2; j > f; f++) {
        h = ((q + f * g * o) * n | 0) / n, i = ((r + b.getRatio(f * g) * -p) * n | 0) / n, (Math.abs((i - m) / (h - l) - e) > k || f === j - 1) && (d.push(l + "," + m), e = (i - m) / (h - l)), l = h, m = i;
      }return s && ("string" == typeof s ? document.querySelector(s) : s).setAttribute("d", d.join(" ")), d.join(" ");
    }, l;
  }, !0);
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a) {
  "use strict";
  var b = function b() {
    return (_gsScope.GreenSockGlobals || _gsScope)[a];
  };"function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = b());
}("CustomEase");
//# sourceMappingURL=CustomEase.min.js.map

"use strict";

/*!
 * VERSION: 0.1.1
 * DATE: 2016-08-16
 * UPDATES AND DOCS AT: http://greensock.com
 *
 * @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 * DrawSVGPlugin is a Club GreenSock membership benefit; You must have a valid membership to use
 * this code without violating the terms of use. Visit http://greensock.com/club/ to sign up or get more details.
 * This work is subject to the software agreement that was issued with your membership.
 * 
 * @author: Jack Doyle, jack@greensock.com
 */
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : undefined || window;(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
  "use strict";
  function a(a, b, c, d, e, f) {
    return c = (parseFloat(c) - parseFloat(a)) * e, d = (parseFloat(d) - parseFloat(b)) * f, Math.sqrt(c * c + d * d);
  }function b(a) {
    return "string" != typeof a && a.nodeType || (a = _gsScope.TweenLite.selector(a), a.length && (a = a[0])), a;
  }function c(a, b, c) {
    var d,
        e,
        f = a.indexOf(" ");return -1 === f ? (d = void 0 !== c ? c + "" : a, e = a) : (d = a.substr(0, f), e = a.substr(f + 1)), d = -1 !== d.indexOf("%") ? parseFloat(d) / 100 * b : parseFloat(d), e = -1 !== e.indexOf("%") ? parseFloat(e) / 100 * b : parseFloat(e), d > e ? [e, d] : [d, e];
  }function d(c) {
    if (!c) return 0;c = b(c);var d,
        e,
        f,
        g,
        i,
        j,
        k,
        l = c.tagName.toLowerCase(),
        m = 1,
        n = 1;if ("non-scaling-stroke" === c.getAttribute("vector-effect") && (n = c.getScreenCTM(), m = n.a, n = n.d), "path" === l) {
      g = c.style.strokeDasharray, c.style.strokeDasharray = "none", d = c.getTotalLength() || 0, m !== n && console.log("Warning: <path> length cannot be measured accurately when vector-effect is non-scaling-stroke and the element isn't proportionally scaled."), d *= (m + n) / 2;try {
        e = c.getBBox();
      } catch (o) {}c.style.strokeDasharray = g;
    } else if ("rect" === l) d = 2 * c.getAttribute("width") * m + 2 * c.getAttribute("height") * n;else if ("line" === l) d = a(c.getAttribute("x1"), c.getAttribute("y1"), c.getAttribute("x2"), c.getAttribute("y2"), m, n);else if ("polyline" === l || "polygon" === l) for (f = c.getAttribute("points").match(h) || [], "polygon" === l && f.push(f[0], f[1]), d = 0, i = 2; i < f.length; i += 2) {
      d += a(f[i - 2], f[i - 1], f[i], f[i + 1], m, n) || 0;
    } else ("circle" === l || "ellipse" === l) && (j = parseFloat(c.getAttribute("circle" === l ? "r" : "rx")) * m, k = parseFloat(c.getAttribute("circle" === l ? "r" : "ry")) * n, d = Math.PI * (3 * (j + k) - Math.sqrt((3 * j + k) * (j + 3 * k))));return d || 0;
  }function e(a, c) {
    if (!a) return [0, 0];a = b(a), c = c || d(a) + 1;var e = g(a),
        f = e.strokeDasharray || "",
        h = parseFloat(e.strokeDashoffset),
        i = f.indexOf(",");return 0 > i && (i = f.indexOf(" ")), f = 0 > i ? c : parseFloat(f.substr(0, i)) || 1e-5, f > c && (f = c), [Math.max(0, -h), Math.max(0, f - h)];
  }var f,
      g = document.defaultView ? document.defaultView.getComputedStyle : function () {},
      h = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi;f = _gsScope._gsDefine.plugin({ propName: "drawSVG", API: 2, version: "0.1.1", global: !0, overwriteProps: ["drawSVG"], init: function init(a, b, f, g) {
      if (!a.getBBox) return !1;var h,
          i,
          j,
          k = d(a) + 1;return this._style = a.style, "function" == typeof b && (b = b(g, a)), b === !0 || "true" === b ? b = "0 100%" : b ? -1 === (b + "").indexOf(" ") && (b = "0 " + b) : b = "0 0", h = e(a, k), i = c(b, k, h[0]), this._length = k + 10, 0 === h[0] && 0 === i[0] ? (j = Math.max(1e-5, i[1] - k), this._dash = k + j, this._offset = k - h[1] + j, this._addTween(this, "_offset", this._offset, k - i[1] + j, "drawSVG")) : (this._dash = h[1] - h[0] || 1e-6, this._offset = -h[0], this._addTween(this, "_dash", this._dash, i[1] - i[0] || 1e-5, "drawSVG"), this._addTween(this, "_offset", this._offset, -i[0], "drawSVG")), !0;
    }, set: function set(a) {
      this._firstPT && (this._super.setRatio.call(this, a), this._style.strokeDashoffset = this._offset, 1 === a || 0 === a ? this._style.strokeDasharray = this._offset < .001 && this._length - this._dash <= 10 ? "none" : this._offset === this._dash ? "0px, 999999px" : this._dash + "px," + this._length + "px" : this._style.strokeDasharray = this._dash + "px," + this._length + "px");
    } }), f.getLength = d, f.getPosition = e;
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(), function (a) {
  "use strict";
  var b = function b() {
    return (_gsScope.GreenSockGlobals || _gsScope)[a];
  };"function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"), module.exports = b());
}("DrawSVGPlugin");
//# sourceMappingURL=DrawSVGPlugin.min.js.map

'use strict';

/* ======================================================================
 * HELPERS VARIABLES
 * ====================================================================== */

var app = {
  currentSection: "welcome",
  ease: {
    btnText: Elastic.easeOut.config(2.5, 1.5)
  },
  webgl: {
    shouldAnimate: true
  }
};

/* ======================================================================
 * HELPER FUNCTIONS
 * ====================================================================== */

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
  return Math.random() * (max - min) + min;
}

// Shuffles an array
function shuffle(array) {
  var currentIndex = array.length,
      temporaryValue,
      randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/**
 * Checks if variable in an integer
 * @link http://stackoverflow.com/a/3886106/1301647
 *
 * @param mixed n
 */
function isInt(n) {
  return Number(n) === n && n % 1 === 0;
}

// Padds a string
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

/* ======================================================================
 * JQUERY HELPERS
 * ====================================================================== */

(function ($) {

  $.fn.reverse = function () {
    return jQuery(this.get().reverse());
  };

  /* ======================================================================
   * BREAKPOINTS
   * ====================================================================== */

  window.winWidth = $(window).width();
  window.winHeight = $(window).height();

  var breakpoints = {
    zero: 0,
    mobile: 320,
    tabletPortrait: 768,
    tabletLandscape: 1024,
    laptop: 1280,
    desktopLarge: 1920
  };

  app.breakpoints = breakpoints;

  /**
   * Determines on which breakpoint our screen is.
   *
   * @param int width
   * @return string the key of the `breakpoints` object
   */
  function determineBreakpoint(width) {
    var bp;

    $.each(breakpoints, function (bpName, bpWidth) {
      if (width >= bpWidth) {
        bp = bpName;
      }
    });

    return bp;
  }

  /**
   * Determines whether we are at least on a specific device screen.
   *
   * @param string device
   */
  app.isScreenAL = function (device) {
    return winWidth >= breakpoints[device];
  };

  /**
   * Determines whether we are exactly on a specific device screen.
   *
   * @param string device
   */
  app.isScreen = function (deviceMin, deviceMax) {
    return winWidth >= breakpoints[deviceMin] && winWidth < breakpoints[deviceMax];
  };

  var lastScreen = { width: null, breakpoint: null },
      currentScreen = { width: null, breakpoint: null };

  $(window).on('load resize', function (event) {
    winWidth = $(window).width();
    winHeight = $(window).height();

    currentScreen.width = $(this).width();
    currentScreen.breakpoint = determineBreakpoint(currentScreen.width);

    if (lastScreen.breakpoint !== null) {
      if (lastScreen.breakpoint !== currentScreen.breakpoint) {

        /*
         * trigger custom event when we're changing a breakpoint.
         * pass the old and the new breakpoint names as params to the 
         * custom event
         */
        $(window).trigger('breakpointChange', [lastScreen.breakpoint, currentScreen.breakpoint]);
      }
    }

    // Set the last screen object attributes
    lastScreen.width = currentScreen.width;
    lastScreen.breakpoint = currentScreen.breakpoint;
  });

  var nlTimeline = new TimelineMax();

  /**
   * Toggles the newsletter subscription form.
   */
  app.toggleNewsletter = function () {

    if (app.newsletterOpen) {
      nlTimeline.clear().to($('.site-footer, .site-wrapper, .site-header'), 0.2, { y: '0px', ease: Power2.easeOut }, 0).to($('.site-overlay'), 0.2, { opacity: '0', ease: Power0.easeNone }, 0).to($('.toggle-newsletter .icon-down'), 0.2, { autoAlpha: 1, ease: Power0.easeNone }, 0).to($('.toggle-newsletter .icon-close'), 0.2, { autoAlpha: 0, ease: Power0.easeNone }, 0).set($('.site-overlay'), { visibility: 'hidden' }, 0.2);
    } else {
      nlTimeline.clear().to($('.site-footer, .site-wrapper, .site-header'), 0.2, { y: '-60px', ease: Power2.easeOut }, 0).set($('.site-overlay'), { visibility: 'visible' }, 0).to($('.toggle-newsletter .icon-down'), 0.2, { autoAlpha: 0, ease: Power0.easeNone }, 0).to($('.toggle-newsletter .icon-close'), 0.2, { autoAlpha: 1, ease: Power0.easeNone }, 0).to($('.site-overlay'), 0.2, { opacity: '0.8', ease: Power0.easeNone }, 0);
      $('.site-footer').find('input[type="email"]').focus();
    }
    app.newsletterOpen = !app.newsletterOpen;
  };

  /* --------------------------------------------------
   * PROJECTS NAVIGATION
   * --------------------------------------------------
   * When going from one project to the other 
   * -------------------------------------------------- */

  app.ProjectNavigation = function () {

    var instance = this;

    // Nice little variables. A shitload of 'em.
    var activeProjectIndex = 1,
        totalProjectsCount = $('.project-content').length,
        $oldProject,
        $newProject,
        $oldLogoMask,
        $newLogoMask,
        $oldDesc,
        $newDesc,
        projectNavTimeline = new TimelineMax({}),
        navigating = false,
        tnsOrg_a,
        tnsOrg_b,
        $oldInners,
        $newInners;

    /**
     * Navigate from one project to another
     *
     * @param bool next
     * @param bool instant Whether we want to animate the navigation or just jump to prev/next project
     */
    this.goTo = function (next, instant) {

      instant = typeof instant !== 'undefined' ? instant : false;

      // Check if we're current navigating (=transitioning) 
      // from one project to another, and return if we are.
      if (navigating) {
        return;
      }

      // If we pass an integer as a parameter, go that specific index
      if (isInt(next) && !(next === 0 || next > totalProjectsCount)) {

        // Exit if we're trying to go to the index we're already on
        if (activeProjectIndex === next) {
          return;
        }

        activeProjectIndex = next;
        tnsOrg_a = 'top';
        tnsOrg_b = 'bottom';
      } else {

        // activeProjectIndex
        if (next) {
          if (activeProjectIndex < totalProjectsCount) {
            activeProjectIndex++;
          } else {
            activeProjectIndex = 1;
          }
          tnsOrg_a = 'top';
          tnsOrg_b = 'bottom';
        } else {
          if (activeProjectIndex > 1) {
            activeProjectIndex--;
          } else {
            activeProjectIndex = totalProjectsCount;
          }
          tnsOrg_a = 'bottom';
          tnsOrg_b = 'top';
        }
      }

      navigating = true;

      // DOM object caching
      $oldProject = $('.project-content.active').removeClass('active');
      $oldLogoMask = $oldProject.find('.shape-mask');
      $oldInners = $oldLogoMask.find('.inner');
      $oldDesc = $oldProject.find('.project-content__desc');

      $newProject = $('.project-content').eq(activeProjectIndex - 1).addClass('active');
      $newLogoMask = $newProject.find('.shape-mask');
      $newInners = $newLogoMask.find('.inner');
      $newDesc = $newProject.find('.project-content__desc');

      if (!next) {
        $oldInners = $oldInners.reverse();
        $newInners = $newInners.reverse();
      }

      /**
       * Behold! The might of spaghetti timelines!
       * Holy shit, everytime I look at it, it looks worse.
       */
      projectNavTimeline.clear()

      // Old content leaves
      .fromTo($oldDesc.find('.t-copy-xs .t-lined-pre span'), 0.6, { x: '0%', autoAlpha: 1 }, { x: '-100%', autoAlpha: 0, ease: Expo.easeIn }, 0.2).fromTo($oldDesc.find('.t-copy-xs .t-lined-pre__line'), 0.3, { scaleX: 1 }, { transformOrigin: 'left', scaleX: 0, ease: Power2.easeIn }, 0.2).staggerFromTo($oldDesc.find('.t-copy-xl .copy-line > span'), 0.6, { y: '-15%', autoAlpha: 1 }, { y: '-130%', autoAlpha: 0, ease: Power2.easeIn }, 0.15, 0).staggerFromTo($oldDesc.find('.t-copy-md .copy-line > span'), 0.6, { y: '0%', autoAlpha: 1 }, { y: '-100%', autoAlpha: 0, ease: Power2.easeInOut }, 0.05, 0).to($oldDesc.find('.btn'), 0.3, { autoAlpha: 0 }, 0)

      // New content comes in
      .set($newDesc, { autoAlpha: 1 }).add('someLabel').fromTo($newDesc.find('.t-copy-xs .t-lined-pre span'), 0.6, { x: '-100%', autoAlpha: 0 }, { x: '0%', autoAlpha: 1, ease: Expo.easeOut }, 'someLabel').fromTo($newDesc.find('.t-copy-xs .t-lined-pre__line'), 0.3, { scaleX: 0 }, { transformOrigin: 'left', scaleX: 1, ease: Power2.easeOut }, 'someLabel+=0.3').staggerFromTo($newDesc.find('.t-copy-xl .copy-line > span'), 0.6, { y: '100%', autoAlpha: 0 }, { y: '-15%', autoAlpha: 1, ease: Power2.easeOut }, 0.15, 'someLabel').staggerFromTo($newDesc.find('.t-copy-md .copy-line > span'), 0.6, { y: '100%', autoAlpha: 0 }, { y: '0%', autoAlpha: 1, ease: Power2.easeInOut }, 0.05, 'someLabel')

      // Button transitions
      .set($newDesc.find('.btn'), { autoAlpha: 1 }, 'someLabel').staggerFromTo($newDesc.find('.buttons-wrapper a:nth-child(1)').find('.btn__line'), 0.3, { transformOrigin: 'center bottom', scaleY: 0 }, { scaleY: 1, ease: Expo.easeIn }, 0.075, 'someLabel').staggerTo($newDesc.find('.buttons-wrapper a:nth-child(1)').find('.btn__line').reverse(), 0.3, { transformOrigin: 'center top', scaleY: 0.08, ease: Expo.easeOut }, 0.075, 'someLabel+=0.525').fromTo($newDesc.find('.buttons-wrapper a:nth-child(1)').find('.btn__text'), 1, { y: '150%' }, { y: '0%', ease: app.ease.btnText }, 'someLabel+=0.3').staggerFromTo($newDesc.find('.buttons-wrapper a:nth-child(2)').find('.btn__line'), 0.3, { transformOrigin: 'center bottom', scaleY: 0 }, { scaleY: 1, ease: Expo.easeIn }, 0.075, 'someLabel+=0.3').staggerTo($newDesc.find('.buttons-wrapper a:nth-child(2)').find('.btn__line').reverse(), 0.3, { transformOrigin: 'center top', scaleY: 0.08, ease: Expo.easeOut }, 0.075, 'someLabel+=0.825').fromTo($newDesc.find('.buttons-wrapper a:nth-child(2)').find('.btn__text'), 1, { y: '150%' }, { y: '0%', ease: app.ease.btnText }, 'someLabel+=0.6');

      if (Modernizr.backgroundblendmode) {
        projectNavTimeline
        // Logo Mask Transitions
        .set($oldLogoMask.find('.outer:nth-child(1), .outer:nth-child(3)').find('.inner'), { transformOrigin: tnsOrg_a + ' center' }, 'someLabel-=0.2').set($newLogoMask.find('.outer:nth-child(1), .outer:nth-child(3)').find('.inner'), { transformOrigin: tnsOrg_b + ' center' }, 'someLabel-=0.2').set($oldLogoMask.find('.outer:nth-child(2)').find('.inner'), { transformOrigin: tnsOrg_b + ' center' }, 'someLabel-=0.2').set($newLogoMask.find('.outer:nth-child(2)').find('.inner'), { transformOrigin: tnsOrg_a + ' center' }, 'someLabel-=0.2').set($newLogoMask.find('.inner'), { scaleY: '0' }, 'someLabel-=0.2').set($newLogoMask, { display: 'block', zIndex: 3 }, 0).staggerTo($oldInners, 0.7, { scaleY: '0', ease: Power2.easeInOut }, '0.25', 'someLabel-=0.2').staggerTo($newInners, 0.7, { scaleY: '1', ease: Power2.easeInOut }, '0.25', 'someLabel-=0.2').fromTo($oldLogoMask.find('img'), 1.2, { scale: 1 }, { scale: 0.95, ease: Power2.easeInOut }, 'someLabel-=0.2').fromTo($newLogoMask.find('img'), 1.2, { autoAlpha: '0.9', scale: 0.95 }, { autoAlpha: '1', scale: 1, ease: Power2.easeInOut }, 'someLabel-=0.2').set($newLogoMask, { zIndex: 2 }).set($oldLogoMask, { display: 'none' })

        // Finished Transitions, let's re-enable navigation
        .call(function () {
          navigating = false;
        });
      } else {
        projectNavTimeline
        // Logo Mask Transitions
        .to($oldLogoMask, 1, { opacity: '0' }, 'someLabel-=0.2').to($newLogoMask, 1, { opacity: '1' }, 'someLabel-=0.2')

        // Finished Transitions, let's re-enable navigation
        .call(function () {
          navigating = false;
        });
      }

      if (instant) {
        projectNavTimeline.seek('-=0', false);
      }
    };
  };
})(jQuery);
//# sourceMappingURL=helpers.js.map

'use strict';

(function ($) {

  /* ======================================================================
   * WEBGL SCENE
   * ====================================================================== */

  var camera, scene, renderer, composer, object;

  var spheresCount = 200,
      spheres = [],
      spheresTl;

  app.rotationModifier = 0.005;

  app.webglAvailable = isWebglAvailable();

  app.initWebGL = function () {
    if (app.webglAvailable) {
      renderer = new THREE.WebGLRenderer();
    } else {
      renderer = new THREE.CanvasRenderer();
    }

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // the default

    $('#scene-wrapper').append(renderer.domElement);

    camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 20000);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 3000;

    window.camera = camera;

    scene = new THREE.Scene();

    window.scene = scene;

    object = new THREE.Object3D();

    app.webgl.object = object;

    object.position.x = -200;

    scene.add(object);

    // var textureLoader = new THREE.TextureLoader();
    var material = new THREE.MeshPhongMaterial({
      color: 0x000000,
      shading: THREE.FlatShading,
      shininess: 100
    });

    for (var i = 0; i < spheresCount; i++) {
      var mesh = new THREE.Mesh(new THREE.SphereGeometry(0.3, getRandomInt(3, 3), getRandomInt(2, 2)), material);

      //mesh.position.set( getRandomInt(-2500, 2500), getRandomInt(-2500, 2500), getRandomInt(-2500, 2500) );

      mesh.position.set(getRandomInt(-1, 1), getRandomInt(-1, 1), getRandomInt(-1, 1)).normalize();
      mesh.position.multiplyScalar(Math.random() * 2500);

      mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

      spheres[i] = {
        positionY: -1,
        mesh: mesh,
        meshInitPosX: mesh.position.x,
        meshInitPosY: mesh.position.y,
        meshInitPosZ: mesh.position.z,
        meshInitRotY: mesh.rotation.y
      };

      mesh.scale.x = mesh.scale.y = mesh.scale.z = getRandomInt(20, 50);

      object.add(mesh);
    }

    spheresTl = new TimelineLite({ repeat: -1, yoyo: true });

    app.webgl.spheresTl = spheresTl;

    spheresTl.staggerFromTo(shuffle(spheres), 4, { positionY: -1 }, { positionY: 1, repeat: -1, yoyo: true, ease: Power1.easeInOut, onUpdate: function onUpdate(a) {
        a.target.mesh.position.y = a.target.meshInitPosY + (a.target.positionY + 1) * 200;
        a.target.mesh.rotation.y = a.target.meshInitRotY + (a.target.positionY + 1) * 3;
      }, onUpdateParams: ["{self}"] }, '0.01');

    if (app.webglAvailable) {
      // POSTPROCESSING
      // composer
      composer = new THREE.EffectComposer(renderer);
      composer.addPass(new THREE.RenderPass(scene, camera));

      var effect = new THREE.ShaderPass(THREE.RGBShiftShader);
      window.RGBeffect = effect;
      effect.uniforms['amount'].value = 0;
      effect.renderToScreen = true;
      composer.addPass(effect);
    }

    /**
     * Resize canvas and center scene on Window Resize
     */
    $(window).resize(function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      composer.setSize(window.innerWidth, window.innerHeight);
    });

    animate();
  };

  /**
   * Animate Loop
   */
  function animate() {

    requestAnimationFrame(animate);

    if (app.webgl.shouldAnimate) {
      // Rotate main object
      object.rotation.y += app.rotationModifier;

      // Required to keep the camera looking at the 
      // center of the scene when it's moved via
      // mousemove
      camera.lookAt(new THREE.Vector3(0, 0, 0));

      if (app.webglAvailable) {
        composer.render();
      } else {
        renderer.render(scene, camera);
      }
    }
  }
})(jQuery);

function isWebglAvailable() {
  try {
    var canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}
//# sourceMappingURL=webgl.js.map

'use strict';

(function ($) {

  /**
   * Toggle no support for background blend, which is used to test 
   * mix-blend-mode since there is no Modernizr test for that one.
   * However the support of background blend and mix blend mode is 
   * very similar
   */
  // Modernizr.backgroundblendmode = false;
  // $( 'html' ).removeClass( 'backgroundblendmode' ).addClass( 'no-backgroundblendmode' );

  app.newsletterOpen = false;
  app.transitioningSections = false;

  var secTransTimeline;
  var $stripes;
  var stripesTimeline;
  var introTimeline;
  var lineTimeline;
  var buttonTimeline;
  var buttonHoverTimeline;

  var welcome, projects, about;

  var modX_a, modY_a, modX_b, modY_b;

  var roughEaseSlow;

  var projectNav;

  var initApp = function initApp() {

    app.initWebGL();

    /* ======================================================================
    * ANIMATIONS & SCENE TRANSITIONS
    * ====================================================================== */

    /* --------------------------------------------------
    * GLOBAL TIMELINES
    * -------------------------------------------------- */

    // STRIPES TIMELINE
    // The stripes that help transition from one section to the other

    $stripes = $('.stripes');

    stripesTimeline = new TimelineMax({ paused: true, onComplete: function onComplete() {
        // reset stripes to their default color
        TweenLite.set($('.stripe__inner'), { background: 'black' });
      } });

    stripesTimeline.set($stripes, { visibility: 'visible' }).staggerTo($('.stripe__inner'), 0.6, { scaleY: '1', ease: Power2.easeOut }, '0.2').set($('.stripe:nth-child(1), .stripe:nth-child(3)').find('.stripe__inner'), { transformOrigin: 'center top' }).set($('.stripe:nth-child(2)').find('.stripe__inner'), { transformOrigin: 'center bottom' }).staggerTo($('.stripe__inner').reverse(), 0.6, { scaleY: '0', ease: Power2.easeOut }, '0.2', 1.4).set($stripes, { visibility: 'hidden' });

    // INTRO TIMELINE
    // The loading screen
    introTimeline = new TimelineMax({ paused: true });

    introTimeline.fromTo($('.site-intro__line__inner'), 2.5, { scaleY: 0 }, { scaleY: 1, ease: Expo.easeInOut }).fromTo('.logo-triangle', 2, { drawSVG: '0%' }, { drawSVG: '100%', ease: Power3.easeOut }, 2).fromTo('.logo-triangle', 2, { opacity: 0 }, { opacity: 1, ease: Power0.easeNone }, 2).fromTo('.logo-triangle', 0.25, { fill: 'rgba(0,0,0,0)' }, { fill: 'rgba(0,0,0,1)', ease: Power0.easeNone }, 3.5).fromTo('#logo-triangle-top', 2, { y: '16%' }, { y: '0%', ease: Power3.easeOut }, 2).fromTo('#logo-triangle-bottom', 2, { y: '-16%' }, { y: '0%', ease: Power3.easeOut }, 2).staggerFromTo($('.intro-half--right .intro-half__fill').reverse(), 0.8, { transformOrigin: 'right center', scaleX: 1 }, { scaleX: 0, ease: Expo.easeIn }, 0.1, 4).staggerFromTo($('.intro-half--left .intro-half__fill').reverse(), 0.8, { transformOrigin: 'left center', scaleX: 1 }, { scaleX: 0, ease: Expo.easeIn }, 0.1, 4).to($('.site-intro'), 1, { opacity: 0 }, 5.4).to($('.site-logo'), 0.4, { autoAlpha: 1 }, 6.9).set($('.site-intro'), { visibility: 'hidden' }, 6.4);

    secTransTimeline = new TimelineMax({
      onComplete: function onComplete() {
        // set this to false so that we can navigate to another section after
        // transitions have finished
        app.transitioningSections = false;

        switch (app.currentSection) {
          case 'welcome':
            break;
          case 'projects':
            // Show header & footer
            TweenMax.to($('.site-menu, .site-footer'), 1, { y: '0px', autoAlpha: 1, ease: Power2.easeOut });
            break;
          case 'about':
            break;
        }
      },
      onStart: function onStart() {
        switch (app.currentSection) {
          case 'welcome':
            // Hide header & footer
            TweenMax.to($('.site-menu'), 1, { y: '-60px', autoAlpha: 0, ease: Power2.easeOut });
            TweenMax.to($('.site-footer'), 1, { y: '60px', autoAlpha: 0, ease: Power2.easeOut });
            break;
          case 'projects':
            break;
          case 'about':
            break;
        }
      }
    });

    /* --------------------------------------------------
    * WELCOME SECTION
    * -------------------------------------------------- */

    welcome = {
      // The animation for when entering the welcome section
      enterTimeline: new TimelineMax({ paused: true }),
      exitTimeline: new TimelineMax({ paused: true }),
      $section: $('#welcome'),

      // for welcome text "slideshow"
      textSlideshowTimeline: new TimelineMax({ repeat: -1, repeatDelay: 5, paused: true })
    };

    lineTimeline = new TimelineMax({ paused: true });

    // for rainbow buttons
    buttonTimeline = new TimelineMax({ paused: true,
      onComplete: function onComplete() {
        // becase the welcome enter timeline never ends (because of the text slideshow) and the "onComplete" callback
        // of secTransTimeline never gets invoked when we return to welcome section, we are adding the following here too
        // so that we can unlock section navigation again. See callback of secTransTimeline.
        app.transitioningSections = false;
        TweenLite.set(welcome.$section.find('.btn__line'), { height: '30px', bottom: '-30px', scaleY: 0.08 });
      },
      onStart: function onStart() {
        TweenLite.set(welcome.$section.find('.btn__line'), { height: '100px', bottom: '-100px' });
      }
    });

    buttonHoverTimeline = new TimelineMax({ paused: true });

    welcome.textSlideshowTimeline.staggerFromTo(welcome.$section.find('.t-copy-xl .copy-line > span:not(.next)'), 0.5, { y: '-15%', opacity: 1 }, { y: '-115%', opacity: 0, ease: Power2.easeOut }, 0.05, 0).staggerFromTo(welcome.$section.find('.t-copy-xl .copy-line > span.next'), 0.5, { y: '100%', opacity: 0 }, { y: '-15%', opacity: 1, ease: Power2.easeOut }, 0.05, 0).set(welcome.$section.find('.t-copy-xl .copy-line > span.next'), { y: '-15%', opacity: 1 }).set(welcome.$section.find('.t-copy-xl .copy-line > span:not(.next)'), { y: '100%', opacity: 0 }).staggerTo(welcome.$section.find('.t-copy-xl .copy-line > span.next'), 0.5, { y: '-115%', opacity: 0, ease: Power2.easeOut }, 0.05, 5).staggerTo(welcome.$section.find('.t-copy-xl .copy-line > span:not(.next)'), 0.5, { y: '-15%', opacity: 1, ease: Power2.easeOut }, 0.05, 5);

    // for pre-line
    lineTimeline.fromTo(welcome.$section.find('.t-copy-xs .t-lined-pre span'), 0.6, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, ease: Expo.easeOut }).fromTo(welcome.$section.find('.t-copy-xs .t-lined-pre__line'), 0.3, { scaleX: 0 }, { transformOrigin: 'left', scaleX: 1, ease: Power2.easeOut }, '-=0.3');

    buttonTimeline.staggerFromTo(welcome.$section.find('.btn__line'), 0.3, { transformOrigin: 'center bottom', scaleY: 0 }, { scaleY: 1, ease: Expo.easeIn }, 0.075).staggerTo(welcome.$section.find('.btn__line').reverse(), 0.3, { transformOrigin: 'center top', scaleY: 0.02, ease: Expo.easeOut }, 0.075).fromTo(welcome.$section.find('.btn__text'), 1, { y: '150%' }, { y: '0%', ease: app.ease.btnText }, '-=0.3').call(function () {
      // Check if there are already tweens in the timeline.
      // Don't want to add them when reversing
      if (buttonHoverTimeline.totalDuration() === 0) {
        buttonHoverTimeline.staggerFromTo(welcome.$section.find('.btn__line'), 0.3, { transformOrigin: 'center top', scaleY: 0.02 }, { scaleY: 0.08, ease: Expo.easeOut }, 0.075);
      }
    });

    // When entering the "Welcome" section
    welcome.enterTimeline

    // Bring up rubble
    .fromTo(app.webgl.object.position, 6, { y: -4000 }, { y: 0, ease: Elastic.easeOut.config(2, 2) }, 0)

    // Show big copy
    .staggerFromTo(welcome.$section.find('.t-copy-xl .copy-line > span:not(.next)'), 1, { y: '100%' }, { y: '-15%', ease: Power2.easeInOut }, 0.15, 0)

    // Show tiny copy
    .add(lineTimeline.play(), 2).add(buttonTimeline.play(), 2.6).add(welcome.textSlideshowTimeline.play(), 9);

    // When leaving the "Welcome" section
    welcome.exitTimeline.to(app, 2, { rotationModifier: 1, ease: Expo.easeIn }, 0).to(app.webgl.object.position, 2, { y: 4000, ease: Expo.easeIn }, 0).to($('#scene-wrapper'), 2, { autoAlpha: 0 }, 0).to($('#view-projects'), 0.4, { autoAlpha: 0 }, 0).to(welcome.$section.find('.t-copy-xs .t-lined-pre span'), 0.6, { x: '-100%', opacity: 0, ease: Expo.easeIn }, 0).to(welcome.$section.find('.t-copy-xs .t-lined-pre__line'), 0.3, { transformOrigin: 'left', scaleX: 0, ease: Power2.easeIn }, 0).staggerTo(welcome.$section.find('.t-copy-xl .copy-line > span:not(.next)'), 1, { y: '-130%', ease: Expo.easeInOut }, 0.15, 0);

    /* --------------------------------------------------
    * PROJECTS SECTION
    * -------------------------------------------------- */

    var arrowLinesArray = $('.arrow-line-diagonal');
    arrowLinesArray.push($('#svg-arrow-next').find('.arrow-line-vertical, .arrow-line-horizontal')); // used for tweening
    arrowLinesArray.push($('#svg-arrow-prev').find('.arrow-line-vertical, .arrow-line-horizontal')); // used for tweening
    projects = {
      $section: $('#projects'),
      $firstProj: $('.project-content').first(),
      arrowLinesArray: arrowLinesArray,
      enterTimeline: new TimelineMax({ paused: true })
    };

    // SplitText
    var split = new SplitText($('.project-content__desc p'), { type: 'lines', linesClass: 'copy-line' });
    $('.project-content__desc p .copy-line').wrapInner('<span></span>');
    TweenMax.set($('.project-content__desc'), { autoAlpha: 0 });
    TweenMax.set($('.project-content__desc').first(), { autoAlpha: 1 });

    projects.enterTimeline

    // Lined copy
    .fromTo(projects.$section.find('.t-copy-xs .t-lined-pre span').reverse(), .6, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, ease: Expo.easeOut }, 0).fromTo(projects.$section.find('.t-copy-xs .t-lined-pre__line'), .3, { scaleX: 0 }, { transformOrigin: 'left', scaleX: 1, ease: Power2.easeOut }, 0.3)

    // Masks
    .add('masks', 0.5)

    // Big + Medium copy
    .staggerFromTo(projects.$section.find('.t-copy-xl .copy-line > span'), 1, { y: '100%', opacity: 0 }, { y: '-15%', opacity: 1, ease: Power2.easeInOut }, 0.15, 0).staggerFromTo(projects.$section.find('.t-copy-md .copy-line > span'), 0.6, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: Power2.easeInOut }, 0.05, 0).add('someLabel', '-=1.525')

    // Button 1
    .staggerFromTo(projects.$firstProj.find('.buttons-wrapper a:nth-child(1)').find('.btn__line'), .3, { transformOrigin: 'center bottom', scaleY: 0 }, { scaleY: 1, ease: Expo.easeIn }, 0.075, 'someLabel').staggerTo(projects.$firstProj.find('.buttons-wrapper a:nth-child(1)').find('.btn__line').reverse(), .3, { transformOrigin: 'center top', scaleY: 0.08, ease: Expo.easeOut }, 0.075, 'someLabel+=0.525').fromTo(projects.$firstProj.find('.buttons-wrapper a:nth-child(1)').find('.btn__text'), 1, { y: '150%' }, { y: '0%', ease: app.ease.btnText }, 'someLabel+=0.3')

    // Button 2
    .staggerFromTo(projects.$firstProj.find('.buttons-wrapper a:nth-child(2)').find('.btn__line'), .3, { transformOrigin: 'center bottom', scaleY: 0 }, { scaleY: 1, ease: Expo.easeIn }, 0.075, 'someLabel+=0.3').staggerTo(projects.$firstProj.find('.buttons-wrapper a:nth-child(2)').find('.btn__line').reverse(), .3, { transformOrigin: 'center top', scaleY: 0.08, ease: Expo.easeOut }, 0.075, 'someLabel+=0.825').fromTo(projects.$firstProj.find('.buttons-wrapper a:nth-child(2)').find('.btn__text'), 1, { y: '150%' }, { y: '0%', ease: app.ease.btnText }, 'someLabel+=0.6')

    // Animate Nav Arrows
    .staggerFromTo(projects.arrowLinesArray, 0.4, { drawSVG: '0% 0%' }, { drawSVG: '0% 100%', ease: Power2.easeOut }, 0.2, 'someLabel+=1');

    if (Modernizr.backgroundblendmode) {
      projects.enterTimeline.set($('.shape-mask').first().find('.outer:nth-child(1), .outer:nth-child(3)').find('.inner'), { transformOrigin: 'bottom center' }, 'masks').set($('.shape-mask').first().find('.outer:nth-child(2)').find('.inner'), { transformOrigin: 'top center' }, 'masks').staggerTo($('.shape-mask').first().find('.shape-mask__screen .inner'), 0.7, { scaleY: '1', ease: Power2.easeInOut }, '0.2333', 'masks');
    } else {
      projects.enterTimeline.to($('.shape-mask').first(), 1, { opacity: '1', ease: Power0.easeNone }, 'masks');
    }

    projectNav = new app.ProjectNavigation();

    /* --------------------------------------------------
    * ABOUT SECTION
    * -------------------------------------------------- */

    about = {
      enterTimeline: new TimelineMax({ paused: true }),
      exitTimeline: new TimelineMax({ paused: true }),
      $section: $('#about'),
      $left: $('.about-content__left'),
      $right: $('.about-content__right'),
      easeText: Power2.easeOut
    };

    var splitText = new SplitText(about.$left.find('p'), { type: 'lines', linesClass: 'copy-line' });
    about.$left.find('.copy-line').wrapInner('<span></span>');

    about.exitTimeline

    // Colors
    .fromTo($('.site-logo polygon'), 0.4, { fill: 'white' }, { fill: 'black' }, 0).fromTo($('.site-menu ul'), 0.4, { color: 'white' }, { color: 'black' }, 0).fromTo($('.site-menu a span'), 0.4, { borderColor: 'white' }, { borderColor: 'black' }, 0).fromTo($('.site-footer, .site-footer a'), 0.4, { color: 'white' }, { color: 'black' }, 0).fromTo($('.site-footer .line'), 0.4, { borderColor: 'white' }, { borderColor: 'black' }, 0).fromTo($('.site-overlay'), 0.4, { backgroundColor: 'black' }, { backgroundColor: 'white' }, 0).set(about.$section, { autoAlpha: 0 }, 1.4);

    about.enterTimeline.fromTo(about.$section, 0.4, { autoAlpha: 0 }, { autoAlpha: 1, zIndex: 13 }).set(about.$section, { zIndex: 11 }, 1.4).set(projects.$section, { autoAlpha: 0 })

    // Colors
    .fromTo($('.site-logo polygon'), 0.4, { fill: 'black' }, { fill: 'white' }, 0).fromTo($('.site-menu ul'), 0.4, { color: 'black' }, { color: 'white' }, 0).fromTo($('.site-menu a span'), 0.4, { borderColor: 'black' }, { borderColor: 'white' }, 0).fromTo($('.site-footer, .site-footer a'), 0.4, { color: 'black' }, { color: 'white' }, 0).fromTo($('.site-footer .line'), 0.4, { borderColor: 'black' }, { borderColor: 'white' }, 0).fromTo($('.site-overlay'), 0.4, { backgroundColor: 'white' }, { backgroundColor: 'black' }, 0).fromTo(about.$left.find('.t-copy-xs .t-lined-pre span'), 0.6, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, ease: Expo.easeOut }, 1).fromTo(about.$left.find('.t-copy-xs .t-lined-pre__line'), 0.3, { scaleX: 0 }, { transformOrigin: 'left', scaleX: 1, ease: about.easeText }, 1.3).staggerFromTo(about.$left.find('.t-copy-xl .copy-line > span'), 0.6, { y: '100%' }, { y: '-15%', ease: about.easeText }, 0.15, 1.6).staggerFromTo(about.$left.find('.t-copy-md .copy-line > span'), 0.6, { y: '100%', opacity: 0 }, { y: '0%', opacity: 1, ease: about.easeText }, 0.15, 1.6).fromTo(about.$right.find('.t-copy-xs .t-lined-pre span'), 0.6, { x: '-100%', opacity: 0 }, { x: '0%', opacity: 1, ease: Expo.easeOut }, 2.2).fromTo(about.$right.find('.t-copy-xs .t-lined-pre__line'), 0.3, { scaleX: 0 }, { transformOrigin: 'left', scaleX: 1, ease: about.easeText }, 2.5).staggerFromTo(about.$right.find('li'), 0.6, { opacity: 0, x: '-40px' }, { opacity: 1, x: '0%', ease: about.easeText }, 0.2, 2.5);

    /* ======================================================================
    * SECTION ROUTING
    * ====================================================================== */

    /**
     * Manages routing from one section to another.
     *
     * @param string section the section we want to go to
     */
    app.goToSection = function (section) {

      // Exit if we're trying to go to the section we're currently in
      // or if we are already navigating from one section to another
      if (app.currentSection === section || app.transitioningSections) {
        return;
      }

      app.transitioningSections = true;
      secTransTimeline.clear();

      // console.log( 'Switching sections: %c' + app.currentSection + '%c → %c' + section, 'color:yellow', 'color:default', 'color:green' );

      switch (section) {
        case 'welcome':
          if (app.currentSection === 'projects') {
            projectsTwdWelcome();
          } else if (app.currentSection === 'about') {
            aboutTwdWelcome();
          }
          break;
        case 'projects':
          if (app.currentSection === 'about') {
            aboutTwdProjects();
          } else if (app.currentSection === 'welcome') {
            welcomeTwdProjects();
          }
          break;
        case 'about':
          projectsTwdAbout();
          break;
      }

      app.currentSection = section;
    };

    /**
     * Page Transition: WELCOME -> PROJECTS
     */
    var welcomeTwdProjects = function welcomeTwdProjects() {

      projects.enterTimeline.seek(0);

      secTransTimeline.add(stripesTimeline.play(), 0).to($('#welcome'), 0.4, { autoAlpha: 0 }, 1).to($('#projects'), 0.4, { autoAlpha: 1 }, 1).call(function () {
        // Pause WebGl execution
        app.webgl.shouldAnimate = false;
      }, null, null, 2).add(projects.enterTimeline.play(), 1.5);

      // Pause some timelines to save some cpu & memory
      app.webgl.spheresTl.pause();
      welcome.textSlideshowTimeline.pause();
    };

    /**
     * Page Transition: PROJECTS -> WELCOME
     */
    var projectsTwdWelcome = function projectsTwdWelcome() {

      welcome.enterTimeline.seek(0);

      secTransTimeline.add(stripesTimeline.play(), 0).to(welcome.$section, 0.4, { autoAlpha: 1 }, 1).to(projects.$section, 0.4, { autoAlpha: 0 }, 1).call(function () {
        // Resume WebGl execution
        app.webgl.shouldAnimate = true;
        projectNav.goTo(1, true);
      }, null, null, 1).add(welcome.enterTimeline.play(), 1.5);

      // Resume paused timelines
      app.webgl.spheresTl.resume();
      welcome.textSlideshowTimeline.restart();
    };

    /**
     * Page Transition: PROJECTS -> ABOUT
     */
    var projectsTwdAbout = function projectsTwdAbout() {

      secTransTimeline.add(stripesTimeline.play()).add(about.enterTimeline.play(), 1);
    };

    /**
     * Page Transition: ABOUT -> PROJECTS 
     */
    var aboutTwdProjects = function aboutTwdProjects() {

      projectNav.goTo(1, true);

      secTransTimeline.set($('.stripe__inner'), { background: 'white' }).add(stripesTimeline.play()).set(projects.$section, { zIndex: 13 }, 1).to(projects.$section, 0.4, { autoAlpha: 1 }, 1).add(about.exitTimeline.play(), 1).add(projects.enterTimeline.restart(), 1.4).set(projects.$section, { zIndex: 11 }, 2.4);
    };

    /**
     * Page Transition: ABOUT -> WELCOME 
     */
    var aboutTwdWelcome = function aboutTwdWelcome() {

      welcome.enterTimeline.seek(0);

      secTransTimeline.set($('.stripe__inner'), { background: 'white' }).add(stripesTimeline.play()).set(welcome.$section, { zIndex: 13 }, 1).to(welcome.$section, 0.4, { autoAlpha: 1 }, 1).call(function () {
        // Resume WebGl execution
        app.webgl.shouldAnimate = true;
      }, null, null, 1).add(about.exitTimeline.play(), 1).add(welcome.enterTimeline.play(), 1).set(welcome.$section, { zIndex: 11 }, 2.4);

      // Resume paused timelines
      app.webgl.spheresTl.resume();
      welcome.textSlideshowTimeline.restart();
    };

    /* ======================================================================
     * MOUSE EVENTS
     * ====================================================================== */

    /**
     * Handle js-links
     */
    $('body').on('click', '.js-link', function (event) {
      if ($(this).attr('href') === '#') {
        event.preventDefault();
      }
      var fnName = $(this).data('fn');
      var fnParams = $(this).data('prm');

      var fn = app[fnName];

      if (typeof fn === 'function') {
        fn.apply(null, fnParams);
      }
    });

    /**
     * Projects Navigation
     */
    $('.projects-nav').on('click', 'a', function (event) {
      event.stopPropagation();
      projectNav.goTo($(this).hasClass('arrow-next'));
    });

    /**
     * Buttons mouseover
     */
    var $btn;
    var btnHoverTween;
    $('.btn').hover(function () {
      $btn = $(this);
      if (!app.transitioningSections) {
        btnHoverTween = TweenMax.staggerFromTo($btn.find('.btn__line'), 0.3, { scaleY: 0.08, zIndex: '+=1' }, { scaleY: 1, ease: Expo.easeOut, repeat: -1, yoyo: true, repeatDelay: 0.225 }, 0.075);
      }
    }, function () {
      $btn = $(this);
      // TweenMax.killAll();
      $.each(btnHoverTween, function (i, tween) {
        tween.kill();
      });
      btnHoverTween = TweenMax.to($btn.find('.btn__line'), 0.3, { scaleY: 0.08, zIndex: 1, ease: Expo.easeOut });
    });

    /**
     * Arrows mouseover
     */
    var $arrow;
    var arrowHoverTimeline = new TimelineMax({ autoRemoveChildren: true });
    $('.projects-nav a').hover(function () {
      var $diagonal = $(this).find('.arrow-line-diagonal');
      var $vertical = $(this).find('.arrow-line-vertical');
      var $horizontal = $(this).find('.arrow-line-horizontal');
      arrowHoverTimeline.staggerFromTo([$diagonal, [$horizontal, $vertical]], 0.4, { drawSVG: '0% 100%' }, { drawSVG: '100% 100%', ease: Power2.easeIn }, 0.4, 0).staggerTo([$diagonal, [$horizontal, $vertical]], 0.001, { drawSVG: '0% 0%' }, 0.4, 0.4).staggerTo([$diagonal, [$horizontal, $vertical]], 0.4, { drawSVG: '0% 100%', ease: Power2.easeOut }, 0.4, 0.401);
    }, function () {
      arrowHoverTimeline.seek('-=0').clear();
    });

    /**
     * Menu mouseover
     */
    var $mmenuItem;
    var mmenuItemTween;
    $('.site-menu a').hover(function () {
      $mmenuItem = $(this);
      if (!app.transitioningSections) {
        mmenuItemTween = TweenMax.fromTo($mmenuItem.find('span'), 0.3, { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, ease: Expo.easeOut });
      }
    }, function () {
      $mmenuItem = $(this);
      // TweenMax.killAll();
      // $.each( mmenuItemTween, function( i, tween ) {
      mmenuItemTween.kill();
      // } );
      mmenuItemTween = TweenMax.to($mmenuItem.find('span'), 0.3, { scaleX: 0, transformOrigin: 'right', ease: Expo.easeOut });
    });

    /* --------------------------------------------------
    * ROTATE SCENE & LOGO MASKS ON MOUSEMOVE
    * -------------------------------------------------- */

    $(window).mousemove(function (event) {

      if (app.newsletterOpen) {
        return;
      }

      if (app.currentSection === 'welcome') {
        modX_a = (event.clientX - window.innerWidth / 2) / window.innerWidth * 2 * 2000 * 1;
        modY_a = (event.clientY - window.innerHeight / 2) / window.innerHeight * 2 * 2000 * -1;
        TweenLite.to(window.camera.position, 1, { y: modY_a, x: modX_a, ease: Power2.easeOut });
      }

      if (app.currentSection === 'projects') {
        modX_b = (event.clientX * 2 - window.innerWidth) / window.innerWidth;
        modY_b = (event.clientY * 2 - window.innerHeight) / window.innerHeight;

        if (Modernizr.backgroundblendmode) {
          TweenLite.to($('.shape-mask'), 0.6, {
            x: modX_b * -10 + 'px',
            y: modY_b * -10 + 'px',
            ease: Power2.easeOut
          });
          TweenLite.to($('.shape-mask img'), 0.6, {
            x: modX_b * -4 - 10 + '% ',
            y: modY_b * -4 - 10 + '%',
            ease: Power2.easeOut
          });
        } else {
          TweenLite.to($('.shape-mask img'), 0.6, {
            x: (modX_b + 1) * 3 + '% ',
            y: (modY_b + 1) * 3 + '%',
            ease: Power2.easeOut
          });
          console.log(modX_b, modY_b);
        }
      }
    });

    /* --------------------------------------------------
    * GLITCH SCENE OBJECTS ON CLICK
    * -------------------------------------------------- */

    roughEaseSlow = RoughEase.ease.config({ template: Power0.easeNone, strength: 8, points: 50, taper: 'none', randomize: true, clamp: false });

    app.tl2 = new TimelineLite({ paused: true, repeat: -1, yoyo: true });

    if (app.webglAvailable) {
      app.tl2.to(RGBeffect.uniforms.amount, 2, { value: 0.003, repeat: -1, yoyo: true, ease: roughEaseSlow });
    }

    $('body').mousedown(function (event) {
      if ($(event.target).closest('a').length !== 0) {
        return;
      }
      app.tl2.play();
      TweenLite.to(camera.position, 1.2, { z: 1500, ease: Elastic.easeOut.config(0.8, 1) });
    });

    $('body').mouseup(function (event) {
      app.tl2.restart().pause();
      TweenLite.to(camera.position, 1.6, { z: 3000, ease: Elastic.easeOut.config(1.2, 1) });
    });

    /* ======================================================================
     * DEVICE ORIENTATION EVENTS
     * ====================================================================== */

    function handleOrientation(event) {
      var a = Math.ceil(event.alpha); // In degree in the range [-180,180]
      var b = Math.ceil(event.beta); // In degree in the range [-180,180]
      var c = Math.ceil(event.gamma); // In degree in the range [-90,90]

      // Because we don't want to have the device upside down
      // We constrain the x value to the range [-90,90]
      if (b >= 90) {
        b = 0;
      };
      if (b <= -90) {
        b = 0;
      };

      var output = 'alpha : ' + a + '<br/>' + 'beta : ' + b + '<br/>' + 'gamma: ' + c;

      if (app.currentSection === 'welcome') {
        TweenLite.to(window.camera.position, 1, { y: (Math.abs(c) - 90) * 60, x: b * -100, ease: Power2.easeOut });
      }
    }

    window.addEventListener('deviceorientation', handleOrientation);

    /* ======================================================================
     * TEMP
     * ====================================================================== */

    // Go directly to projects section
    // welcome.enterTimeline.seek('-=0');
    // app.goToSection( 'projects' );
    // $( '#site-intro' ).hide();


    introTimeline.add(welcome.enterTimeline.play(), 5.4).play();
  };

  $(window).load(function () {

    if (app.isScreenAL('tabletPortrait')) {
      initApp();
    }
  });

  $(window).on('breakpointChange', function (event, lastBP, currentBP) {
    if ($.inArray('mobile', [lastBP, currentBP]) !== -1) {
      window.location.reload();
    }
  });
})(jQuery);
//# sourceMappingURL=main.js.map
