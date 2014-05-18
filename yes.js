/** 
// Yes v0.2 - Javascript framework 
// (c) Wallace Silva (wallacesilva.com)
// License: Free - MIT license.
// http://wallacesilva.github.io/yes.js
*/

function Yes(){};

Yes = {
    
    // About Yes is returned
    about = {
        Version: 0.2,
        Author: "Wallace Silva",
        Created: "May 2014",
        Updated: "18 May 2014"
    },

    // show errors 
    debug: false, 

    get: function(query)
    {   
        if (Yes.type(query) == 'string')
            return document.querySelector(query);

        return query;
    },

    type: function( obj ) 
    {
        //obj = document.querySelector(query);
        return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, "$1").toLowerCase();
    },

    isArray: function(obj){ return Array.isArray(obj) || (obj instanceof Array); },
    isFunction: function (value) { return type(value) == "function" },
    isWindow: function (obj)     { return obj != null && obj == obj.window },
    isDocument: function (obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE },
    isObject: function (obj)     { return type(obj) == "object" },
    isPlainObject: function (obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    },
    
    /**
     * elements: need to be Array
     * callback = function(element, iterator)
     */
    each: function(elements, callback)
    {   
        Array.prototype.forEach.call(elements, callback(el, i));
    },

    show: function(els)
    {
        Yes.get(el).style.display = '';
    },

    hide: function(els)
    {
        Yes.get(el).style.display = 'none';
    },

    fadeIn: function(el) 
    {
        el = Yes.get(el);

        el.style.opacity = 0;

        var last = +new Date();
        var tick = function() {
            el.style.opacity = +el.style.opacity + (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity < 1) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };

        tick();
    },

    fadeOut: function(el) 
    {
        el = Yes.get(el);

        el.style.opacity = 1;

        var last = +new Date();
        var tick = function() {
            el.style.opacity = +el.style.opacity - (new Date() - last) / 400;
            last = +new Date();

            if (+el.style.opacity > 0) {
                (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
            }
        };

        tick();
    },

    addClass: function(el, className)
    {
        el = Yes.get(el);

        if (el.classList)
          el.classList.add(className);
        else
          el.className += ' ' + className;
    },

    append: function(el_parent, el)
    {
        el_parent   = Yes.get(el);
        el          = Yes.get(el);

        el_parent.appendChild(el);
    },

    after: function(el, htmlString)
    {
        el = Yes.get(el);
        el.insertAdjacentHTML('afterend', htmlString);

    },

    before: function(el, htmlString)
    {
        el = Yes.get(el);
        el.insertAdjacentHTML('beforebegin', htmlString);
    },

    children: function(el) 
    {   
        el = Yes.get(el);
        return el.children;
    },

    click: function(el, callback)
    {   
        el = Yes.get(el);
        el.onclick = callback;
    },

    clone: function(el)
    {   
        el = Yes.get(el);
        return el.cloneNode(true);
    },

    contains: function(el, child)
    {   
        el      = Yes.get(el);
        child   = Yes.get(child);

        return (el !== child && el.contains(child));
    },

    // clear content of a element
    clear: function(el)
    { 
        el = Yes.get(el);
        el.innerHTML = '';
    },

    // alias: clear
    empty: function(el){ Yes.clear(el); },

    find: function(el, query)
    {
        el = Yes.get(el);
        return el.querySelectorAll(query);
    },

    attr: function(el, attr)
    {
        el = Yes.get(el);
        return el.getAttribute(attr);
    },

    html: function(el, htmlString)
    {
        el = Yes.get(el);

        // set new html code
        if (Yes.type(htmlString) == 'string')
            el.innerHTML = htmlString;

        return el.innerHTML;
    },

    text: function(el, string)
    {
        el = Yes.get(el);

        // set new text
        if (Yes.type(string) == 'string')
            el.textContent = string;

        return el.textContent;  
    },

    hasClass: function(el, className)
    {
        el = Yes.get(el);

        if (el.classList)
          el.classList.contains(className);
        else
          new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
    },

    next: function(el)
    {
        el = Yes.get(el);
        return el.nextElementSibling;
    },

    offset: function(el)
    {
        el = Yes.get(el);

        var rect = el.getBoundingClientRect()

        var offset = {
                      top: rect.top + document.body.scrollTop,
                      left: rect.left + document.body.scrollLeft
                    }

        return offset;
    },

    parent: function(el)
    {
        el = Yes.get(el);

        return el.parentNode;
    },

    /**
     * el: element to be inserted
     * parent: insert element inside this
     */
    prepend: function(el, parent)
    {
        el = Yes.get(el);
        parent = Yes.get(parent);

        parent.insertBefore(el, parent.firstChild);
    },

    prev: function(el)
    {
        el = Yes.get(el);
        return el.previousElementSibling;
    },

    remove: function(el)
    {
        el = Yes.get(el);
        el.parentNode.removeChild(el);
    },

    removeClass: function(el, className)
    {
        el = Yes.get(el);

        if (el.classList)
          el.classList.remove(className);
        else
          el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
      
    },

    toggleClass: function(el, className)
    {
        el = Yes.get(el);

        if (el.classList) {
          el.classList.toggle(className);
        } else {
          var classes = el.className.split(' ');
          var existingIndex = classes.indexOf(className);

          if (existingIndex >= 0)
            classes.splice(existingIndex, 1);
          else
            classes.push(className);

          el.className = classes.join(' ');
        }
    },

    notification: function()
    {
        
    },

    /**
     * Remove event to object/element
     */
    off: function(el, eventName, eventHandler)
    {
        el = Yes.get(el);
        
        el.removeEventListener(eventName, eventHandler);
    },

    /**
     * add event to object/element
     */
    on: function(el, eventName, eventHandler)
    {
        el = Yes.get(el);

        el.addEventListener(eventName, eventHandler);
    },

    /**
     * on document loaded
     */
    ready: function(callback)
    {
        document.addEventListener('DOMContentLoaded', callback);
    }

};