// Pappa Fresh - Cookie Management Utilities

/**
 * Set a cookie with optional expiration
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} days - Expiration in days (optional)
 * @param {string} path - Cookie path (default: '/')
 */
export function setCookie(name, value, days = null, path = '/') {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        cookieString += `; expires=${date.toUTCString()}`;
    }
    
    cookieString += `; path=${path}`;
    
    document.cookie = cookieString;
}

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} - Cookie value or null if not found
 */
export function getCookie(name) {
    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = document.cookie.split(';');
    
    for (let cookie of cookies) {
        let c = cookie.trim();
        if (c.indexOf(nameEQ) === 0) {
            return decodeURIComponent(c.substring(nameEQ.length));
        }
    }
    return null;
}

/**
 * Remove a cookie by setting it to expire in the past
 * @param {string} name - Cookie name
 * @param {string} path - Cookie path (default: '/')
 */
export function removeCookie(name, path = '/') {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
}

/**
 * Check if cookies are supported
 * @returns {boolean} - True if cookies are supported
 */
export function cookiesSupported() {
    try {
        setCookie('test', 'test');
        const supported = getCookie('test') === 'test';
        removeCookie('test');
        return supported;
    } catch (e) {
        return false;
    }
}

/**
 * Get all cookies as an object
 * @returns {Object} - Object with cookie names as keys and values as values
 */
export function getAllCookies() {
    const cookies = {};
    const cookieArray = document.cookie.split(';');
    
    for (let cookie of cookieArray) {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
            cookies[decodeURIComponent(name)] = decodeURIComponent(value);
        }
    }
    
    return cookies;
}

/**
 * Set a JSON object as a cookie (with size check)
 * @param {string} name - Cookie name
 * @param {Object} obj - Object to store
 * @param {number} days - Expiration in days
 * @returns {boolean} - True if successful, false if too large
 */
export function setCookieJSON(name, obj, days = null) {
    try {
        const jsonString = JSON.stringify(obj);
        const encodedString = encodeURIComponent(jsonString);
        
        // Check if the cookie would be too large (4KB limit)
        if (encodedString.length > 4000) {
            console.warn(`Cookie ${name} is too large (${encodedString.length} bytes). Max size is 4KB.`);
            return false;
        }
        
        setCookie(name, jsonString, days);
        return true;
    } catch (e) {
        console.error(`Error setting cookie ${name}:`, e);
        return false;
    }
}

/**
 * Get a JSON object from a cookie
 * @param {string} name - Cookie name
 * @returns {Object|null} - Parsed object or null if not found/invalid
 */
export function getCookieJSON(name) {
    try {
        const cookieValue = getCookie(name);
        if (!cookieValue) return null;
        
        return JSON.parse(cookieValue);
    } catch (e) {
        console.error(`Error parsing cookie ${name}:`, e);
        return null;
    }
}
