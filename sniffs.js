'use strict';

const puppeteer = require('puppeteer');

function sniffDetector() {
  const userAgent = window.navigator.userAgent;
  const platform = window.navigator.platform;

  window.navigator.__defineGetter__('userAgent', function () {
    window.navigator.sniffed = true;
    return userAgent;
  });

  window.navigator.__defineGetter__('platform', function () {
    window.navigator.sniffed = true;
    return platform;
  });
}


