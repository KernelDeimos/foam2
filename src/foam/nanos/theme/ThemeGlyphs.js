/**
 * @license
 * Copyright 2020 The FOAM Authors. All Rights Reserved.
 * http://www.apache.org/licenses/LICENSE-2.0
 */


foam.CLASS({
  package: 'foam.nanos.theme',
  name: 'ThemeGlyphs',

  documentation: `
    Stores svgs for standard glyphs.
    SVG properties can have variables and fallback values. Look at fill properties for formatting.
  `,

  requires: [
    'foam.core.Glyph'
  ],

  properties: [
    {
      name: 'checkmark',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="/*%FILL%*/ #ffffff"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16.2l-3.5-3.5c-.39-.39-1.01-.39-1.4 0-.39.39-.39 1.01 0 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7c.39-.39.39-1.01 0-1.4-.39-.39-1.01-.39-1.4 0L9 16.2z"/></svg>
        ` };
      }
    },
    {
      name: 'exclamation',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="/*%FILL%*/ #ffffff" viewBox="0 0 24 24">
            <path fill-rule="nonzero" d="M 12 0 z m 0 13.2 c -0.66 0 -1.2 -0.54 -1.2 -1.2 V 7.2 c 0 -0.66 0.54 -1.2 1.2 -1.2 c 0.66 0 1.2 0.54 1.2 1.2 V 12 c 0 0.66 -0.54 1.2 -1.2 1.2 z m 1.2 4.8 h -2.4 v -2.4 h 2.4 V 18 z"/>
        </svg>
        ` };
      }
    },
    {
      name: 'pending',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg width="14px" height="14px" viewBox="0 0 14 14" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Ablii" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Enum" transform="translate(-1490.000000, -409.000000)">
                    <g id="Group-33" transform="translate(1490.000000, 409.000000)">
                        <path d="M8.66666667,3 C9.08974359,3 9.4418146,3.30674556 9.49347595,3.7000091 L9.5,3.8 L9.5,5.072 C9.5,5.24866667 9.43923611,5.41977778 9.3273534,5.55987037 L9.25416667,5.64 L7.83333333,7 L9.25833333,8.372 C9.38680556,8.49533333 9.46898148,8.65755556 9.49280478,8.83088889 L9.5,8.936 L9.5,10.2 C9.5,10.6061538 9.18047337,10.944142 8.77082385,10.9937369 L8.66666667,11 L5.33333333,11 C4.91025641,11 4.5581854,10.6932544 4.50652405,10.2999909 L4.5,10.2 L4.5,8.936 C4.5,8.75933333 4.56076389,8.58822222 4.67023534,8.44812963 L4.74166667,8.368 L6.16666667,7 L4.74583333,5.636 C4.61388889,5.50933333 4.53113426,5.34655556 4.50721451,5.17312963 L4.5,5.068 L4.5,3.8 C4.5,3.39384615 4.81952663,3.05585799 5.22917615,3.00626309 L5.33333333,3 L8.66666667,3 Z M7,7.2 L5.33333333,8.8 L5.33333333,9.8 C5.33333333,9.9925 5.47688802,10.154375 5.66630046,10.1918359 L5.75,10.2 L8.25,10.2 C8.45052083,10.2 8.61914062,10.0621875 8.65816243,9.88035156 L8.66666667,9.8 L8.66666667,8.8 L7,7.2 Z M7,6.8 L5.33333333,5.2 L5.33333333,4.2 C5.33333333,3.98 5.52083333,3.8 5.75,3.8 L8.25,3.8 C8.47916667,3.8 8.66666667,3.98 8.66666667,4.2 L8.66666667,5.2 L7,6.8 Z" id="Shape" fill="/*%FILL%*/ #FFFFFF"></path>
                    </g>
                </g>
            </g>
        </svg>
        ` };
      }
    },
    {
      name: 'helpIcon',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg width="20" height="20" viewBox="0 0 20 20" fill="/*%FILL%*/ #ffffff" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16H11V14H9V16ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM10 18C5.59 18 2 14.41 2 10C2 5.59 5.59 2 10 2C14.41 2 18 5.59 18 10C18 14.41 14.41 18 10 18ZM10 4C7.79 4 6 5.79 6 8H8C8 6.9 8.9 6 10 6C11.1 6 12 6.9 12 8C12 10 9 9.75 9 13H11C11 10.75 14 10.5 14 8C14 5.79 12.21 4 10 4Z" />
        </svg>
        ` };
      }
    },
    {
      name: 'networkError',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function () {
        return { template: `
          <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="/*%FILL%*/ #ffffff">
            <g><path d="M0,0h24v24H0V0z" fill="none"/></g>
            <g>
              <g>
                <path d="M12,4C7.31,4,3.07,5.9,0,8.98L12,21l5-5.01V8h5.92C19.97,5.51,16.16,4,12,4z"/>
                <rect height="2" width="2" x="19" y="18"/><rect height="6" width="2" x="19" y="10"/>
              </g>
            </g>
          </svg>
        ` };
      }
    },
    {
      name: 'plus',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 24 24" fill="/*%FILL%*/ #FFFFFF"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        ` };
      }
    },
    {
      name: 'trash',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg width="24" height="24" fill="/*%FILL%*/ #B2B6BD" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8.46 11.88L9.87 10.47L12 12.59L14.12 10.47L15.53 11.88L13.41 14L15.53 16.12L14.12 17.53L12 15.41L9.88 17.53L8.47 16.12L10.59 14L8.46 11.88ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z" />
        </svg>
        ` };
      }
    },
    {
      name: 'progress',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg width="28" height="32" viewBox="0 0 28 32" fill="/*%FILL%*/ #406DEA" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.0002 5.33331V0.333313L7.3335 6.99998L14.0002 13.6666V8.66665C19.5168 8.66665 24.0002 13.15 24.0002 18.6666C24.0002 23.6166 20.3835 27.7166 15.6668 28.5166V31.8833C22.2502 31.0666 27.3335 25.4666 27.3335 18.6666C27.3335 11.3 21.3668 5.33331 14.0002 5.33331Z" />
          <path d="M4.00008 18.6667C4.00008 15.9167 5.11675 13.4167 6.93342 11.6L4.56675 9.23334C2.16675 11.65 0.666748 14.9833 0.666748 18.6667C0.666748 25.4667 5.75008 31.0667 12.3334 31.8833V28.5167C7.61675 27.7167 4.00008 23.6167 4.00008 18.6667Z"/>
        </svg>
        ` };
      }
    },
    {
      name: 'back',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24"  viewBox="0 0 24 24" width="100%" fill="/*%FILL%*/ #ffffff"><rect fill="none" height="24" width="24"/><g><polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12"/></g></svg>
        ` };
      }
    },
    {
      name: 'copy',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: function() {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" fill="/*%FILL%*/ #ffffff" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z"/>
        </svg>`
        };
      }
    },
    {
      name: 'edit',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="/*%FILL%*/ #ffffff" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 17.2496V20.9996H6.75L17.81 9.93957L14.06 6.18957L3 17.2496ZM20.71 7.03957C21.1 6.64957 21.1 6.01957 20.71 5.62957L18.37 3.28957C17.98 2.89957 17.35 2.89957 16.96 3.28957L15.13 5.11957L18.88 8.86957L20.71 7.03957V7.03957Z"/>
        </svg>
        ` };
      }
    },
    {
      name: 'users',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M16.5,12 C17.88,12 18.99,10.88 18.99,9.5 C18.99,8.12 17.88,7 16.5,7 C15.12,7 14,8.12 14,9.5 C14,10.88 15.12,12 16.5,12 Z M9,11 C10.66,11 11.99,9.66 11.99,8 C11.99,6.34 10.66,5 9,5 C7.34,5 6,6.34 6,8 C6,9.66 7.34,11 9,11 Z M16.5,14 C14.67,14 11,14.92 11,16.75 L11,18 C11,18.55 11.45,19 12,19 L21,19 C21.55,19 22,18.55 22,18 L22,16.75 C22,14.92 18.33,14 16.5,14 Z M9,13 C6.67,13 2,14.17 2,16.5 L2,18 C2,18.55 2.45,19 3,19 L9,19 L9,16.75 C9,15.9 9.33,14.41 11.37,13.28 C10.5,13.1 9.66,13 9,13 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'dashboard',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 12 12" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M0.666666667,6.66666667 L4.66666667,6.66666667 C5.03333333,6.66666667 5.33333333,6.36666667 5.33333333,6 L5.33333333,0.666666667 C5.33333333,0.3 5.03333333,0 4.66666667,0 L0.666666667,0 C0.3,0 0,0.3 0,0.666666667 L0,6 C0,6.36666667 0.3,6.66666667 0.666666667,6.66666667 Z M0.666666667,12 L4.66666667,12 C5.03333333,12 5.33333333,11.7 5.33333333,11.3333333 L5.33333333,8.66666667 C5.33333333,8.3 5.03333333,8 4.66666667,8 L0.666666667,8 C0.3,8 0,8.3 0,8.66666667 L0,11.3333333 C0,11.7 0.3,12 0.666666667,12 Z M7.33333333,12 L11.3333333,12 C11.7,12 12,11.7 12,11.3333333 L12,6 C12,5.63333333 11.7,5.33333333 11.3333333,5.33333333 L7.33333333,5.33333333 C6.96666667,5.33333333 6.66666667,5.63333333 6.66666667,6 L6.66666667,11.3333333 C6.66666667,11.7 6.96666667,12 7.33333333,12 Z M6.66666667,0.666666667 L6.66666667,3.33333333 C6.66666667,3.7 6.96666667,4 7.33333333,4 L11.3333333,4 C11.7,4 12,3.7 12,3.33333333 L12,0.666666667 C12,0.3 11.7,0 11.3333333,0 L7.33333333,0 C6.96666667,0 6.66666667,0.3 6.66666667,0.666666667 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'bankaccount',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 16 16" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M2.66666667,7.66666667 L2.66666667,10.3333333 C2.66666667,10.8866667 3.11333333,11.3333333 3.66666667,11.3333333 C4.22,11.3333333 4.66666667,10.8866667 4.66666667,10.3333333 L4.66666667,7.66666667 C4.66666667,7.11333333 4.22,6.66666667 3.66666667,6.66666667 C3.11333333,6.66666667 2.66666667,7.11333333 2.66666667,7.66666667 Z M6.66666667,7.66666667 L6.66666667,10.3333333 C6.66666667,10.8866667 7.11333333,11.3333333 7.66666667,11.3333333 C8.22,11.3333333 8.66666667,10.8866667 8.66666667,10.3333333 L8.66666667,7.66666667 C8.66666667,7.11333333 8.22,6.66666667 7.66666667,6.66666667 C7.11333333,6.66666667 6.66666667,7.11333333 6.66666667,7.66666667 Z M2.33333333,14.6666667 L13,14.6666667 C13.5533333,14.6666667 14,14.22 14,13.6666667 C14,13.1133333 13.5533333,12.6666667 13,12.6666667 L2.33333333,12.6666667 C1.78,12.6666667 1.33333333,13.1133333 1.33333333,13.6666667 C1.33333333,14.22 1.78,14.6666667 2.33333333,14.6666667 Z M10.6666667,7.66666667 L10.6666667,10.3333333 C10.6666667,10.8866667 11.1133333,11.3333333 11.6666667,11.3333333 C12.22,11.3333333 12.6666667,10.8866667 12.6666667,10.3333333 L12.6666667,7.66666667 C12.6666667,7.11333333 12.22,6.66666667 11.6666667,6.66666667 C11.1133333,6.66666667 10.6666667,7.11333333 10.6666667,7.66666667 Z M7.04666667,0.993333333 L1.78,3.76666667 C1.50666667,3.90666667 1.33333333,4.19333333 1.33333333,4.5 C1.33333333,4.96 1.70666667,5.33333333 2.16666667,5.33333333 L13.1733333,5.33333333 C13.6266667,5.33333333 14,4.96 14,4.5 C14,4.19333333 13.8266667,3.90666667 13.5533333,3.76666667 L8.28666667,0.993333333 C7.9,0.786666667 7.43333333,0.786666667 7.04666667,0.993333333 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'payables',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M19,3.5 L14.82,3.5 C14.4,2.34 13.3,1.5 12,1.5 C10.7,1.5 9.6,2.34 9.18,3.5 L5,3.5 C3.9,3.5 3,4.4 3,5.5 L3,19.5 C3,20.6 3.9,21.5 5,21.5 L19,21.5 C20.1,21.5 21,20.6 21,19.5 L21,5.5 C21,4.4 20.1,3.5 19,3.5 Z M12.9371316,7.5 L12.9371316,8.83833333 C14.1689587,9.15 14.7878193,10.1155556 14.8290766,11.1666667 L14.8290766,11.1666667 L13.5265226,11.1666667 C13.4911591,10.4027778 13.1021611,9.88333333 12.0530452,9.88333333 C11.0569745,9.88333333 10.4616896,10.3477778 10.4616896,11.0138889 C10.4616896,11.5944444 10.891945,11.9672222 12.2298625,12.3277778 C13.56778,12.6883333 15,13.2811111 15,15.0166667 C15,16.2694444 14.086444,16.96 12.9371316,17.1861111 L12.9371316,17.1861111 L12.9371316,18.5 L11.1689587,18.5 L11.1689587,17.1738889 C10.0373281,16.9233333 9.07072692,16.1716667 9,14.8333333 L9,14.8333333 L10.2966601,14.8333333 C10.3614931,15.5544444 10.8388998,16.1166667 12.0530452,16.1166667 C13.3555992,16.1166667 13.6444008,15.4444444 13.6444008,15.0227778 C13.6444008,14.4544444 13.3497053,13.9166667 11.8762279,13.55 C10.2318271,13.1405556 9.10609037,12.4377778 9.10609037,11.0261111 C9.10609037,9.84666667 10.0255403,9.07666667 11.1689587,8.82 L11.1689587,8.82 L11.1689587,7.5 L12.9371316,7.5 Z M12,3.5 C12.55,3.5 13,3.95 13,4.5 C13,5.05 12.55,5.5 12,5.5 C11.45,5.5 11,5.05 11,4.5 C11,3.95 11.45,3.5 12,3.5 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'receivables',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M19,3.5 L14.82,3.5 C14.4,2.34 13.3,1.5 12,1.5 C10.7,1.5 9.6,2.34 9.18,3.5 L5,3.5 C3.9,3.5 3,4.4 3,5.5 L3,19.5 C3,20.6 3.9,21.5 5,21.5 L19,21.5 C20.1,21.5 21,20.6 21,19.5 L21,5.5 C21,4.4 20.1,3.5 19,3.5 Z M12,3.5 C12.55,3.5 13,3.95 13,4.5 C13,5.05 12.55,5.5 12,5.5 C11.45,5.5 11,5.05 11,4.5 C11,3.95 11.45,3.5 12,3.5 Z M9.29,16.79 L6.7,14.2 C6.31,13.81 6.31,13.18 6.7,12.79 C7.09,12.4 7.72,12.4 8.11,12.79 L10,14.67 L15.88,8.79 C16.27,8.4 16.9,8.4 17.29,8.79 C17.68,9.18 17.68,9.81 17.29,10.2 L10.7,16.79 C10.32,17.18 9.68,17.18 9.29,16.79 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'businesses',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M20,6 L16,6 L16,4 C16,2.89 15.11,2 14,2 L10,2 C8.89,2 8,2.89 8,4 L8,6 L4,6 C2.89,6 2.01,6.89 2.01,8 L2,19 C2,20.11 2.89,21 4,21 L20,21 C21.11,21 22,20.11 22,19 L22,8 C22,6.89 21.11,6 20,6 Z M14,6 L10,6 L10,4 L14,4 L14,6 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'transactions',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M20,4 L4,4 C2.89,4 2.01,4.89 2.01,6 L2,18 C2,19.11 2.89,20 4,20 L20,20 C21.11,20 22,19.11 22,18 L22,6 C22,4.89 21.11,4 20,4 Z M19,18 L5,18 C4.45,18 4,17.55 4,17 L4,12 L20,12 L20,17 C20,17.55 19.55,18 19,18 Z M20,8 L4,8 L4,6 L20,6 L20,8 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'accountBalance',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M10,16 L10,8 C10,6.9 10.89,6 12,6 L21,6 L21,5 C21,3.9 20.1,3 19,3 L5,3 C3.89,3 3,3.9 3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,18 L12,18 C10.89,18 10,17.1 10,16 Z M13,8 C12.45,8 12,8.45 12,9 L12,15 C12,15.55 12.45,16 13,16 L22,16 L22,8 L13,8 Z M16,13.5 C15.17,13.5 14.5,12.83 14.5,12 C14.5,11.17 15.17,10.5 16,10.5 C16.83,10.5 17.5,11.17 17.5,12 C17.5,12.83 16.83,13.5 16,13.5 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'charges',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M18 17H6V15H18V17ZM18 13H6V11H18V13ZM18 9H6V7H18V9ZM3 22L4.5 20.5L6 22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2L4.5 3.5L3 2V22Z"/>
        </svg>
        ` };
      }
    },
    {
      name: 'reports',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M14,2 L6,2 C4.9,2 4.01,2.9 4.01,4 L4,20 C4,21.1 4.89,22 5.99,22 L18,22 C19.1,22 20,21.1 20,20 L20,8 L14,2 Z M16,18 L8,18 L8,16 L16,16 L16,18 Z M16,14 L8,14 L8,12 L16,12 L16,14 Z M13,9 L13,3.5 L18.5,9 L13,9 Z"></path>
        </svg>
        ` };
      }
    },
    {
      name: 'extension',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M20.5 11H19V7C19 5.9 18.1 5 17 5H13V3.5C13 2.12 11.88 1 10.5 1C9.12 1 8 2.12 8 3.5V5H4C2.9 5 2.01 5.9 2.01 7V10.8H3.5C4.99 10.8 6.2 12.01 6.2 13.5C6.2 14.99 4.99 16.2 3.5 16.2H2V20C2 21.1 2.9 22 4 22H7.8V20.5C7.8 19.01 9.01 17.8 10.5 17.8C11.99 17.8 13.2 19.01 13.2 20.5V22H17C18.1 22 19 21.1 19 20V16H20.5C21.88 16 23 14.88 23 13.5C23 12.12 21.88 11 20.5 11Z"/>
        </svg>
        ` };
      }
    },
    {
      name: 'supportTickets',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path class="st0" d="M21.4,11c0.5,0,0.9-0.4,0.9-0.9V7c0-1.2-0.9-2.2-2.2-2.2H4C2.7,4.8,1.8,5.7,1.8,7v3c0,0.6,0.3,0.9,0.9,1
            c0.2,0,0.4,0.1,0.6,0.3c0.3,0.3,0.4,0.7,0.3,1.1c-0.2,0.3-0.5,0.6-1,0.6s-0.9,0.4-0.9,0.9c0,1,0,2.1,0,3.2c0,0.4,0.1,0.8,0.4,1.2
            c0.4,0.6,1.1,0.9,1.9,0.9l0,0c2,0,4,0,6,0h4.4c1.9,0,3.8,0,5.6,0c1.3,0,2.2-0.9,2.2-2.2v-3c0-0.6-0.3-0.9-0.9-1c-0.6,0-1-0.5-1-1
            C20.4,11.4,20.8,11,21.4,11z M18.6,12c0,1.2,0.7,2.2,1.9,2.6c0,0.4,0,0.9,0,1.3v1c0,0.3-0.1,0.4-0.4,0.4H4c-0.3,0-0.5-0.1-0.5-0.5
            V16c0-0.5,0-1,0-1.5c1.1-0.4,1.9-1.4,1.9-2.6S4.6,9.7,3.5,9.3c0-0.5,0-1,0-1.5V7.1c0-0.3,0.1-0.5,0.5-0.5h16c0.3,0,0.5,0.1,0.5,0.5
            V8c0,0.5,0,0.9,0,1.4C19.4,9.8,18.6,10.8,18.6,12z"/>
          <g>
            <path class="st0" d="M15.1,7.6c-0.2,0-0.4-0.2-0.4-0.4v-1c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4v1C15.4,7.5,15.3,7.6,15.1,7.6z"/>
            <path class="st0" d="M15.1,15.4c-0.2,0-0.4-0.2-0.4-0.4v-1.9c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4V15
              C15.4,15.2,15.3,15.4,15.1,15.4z M15.1,11.5c-0.2,0-0.4-0.2-0.4-0.4V9.2c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4v1.9
              C15.4,11.3,15.3,11.5,15.1,11.5z"/>
            <path class="st0" d="M15.1,18.3c-0.2,0-0.4-0.2-0.4-0.4v-1c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4v1C15.4,18.1,15.3,18.3,15.1,18.3
              z"/>
          </g>
          <g>
            <path class="st0" d="M10.7,14.2c0-0.1,0-0.2,0.1-0.4c0,0,0-0.1,0-0.1C9.9,12.8,8.9,11.9,8,11c0,0-0.1,0-0.1,0
              c-0.8,0.2-1.6-0.3-1.7-1.1c0-0.1,0-0.2,0-0.2c0-0.1,0-0.2,0.1-0.2c0.1,0,0.2,0,0.2,0C6.7,9.7,6.8,9.8,7,9.9
              c0.2,0.2,0.5,0.2,0.8,0.1C8,9.8,8.1,9.4,7.8,9.1C7.7,9,7.5,8.8,7.4,8.7c-0.1-0.1-0.1-0.1,0-0.2c0-0.1,0.1-0.1,0.2-0.1
              c0.1,0,0.2,0,0.3,0c0.8,0.2,1.2,0.9,1,1.7c0,0,0,0.1,0,0.1c0.9,0.9,1.8,1.8,2.7,2.7c0,0,0.1,0,0.1,0c0.9-0.2,1.7,0.4,1.7,1.3
              c0,0.1,0,0.2-0.1,0.2c-0.1,0-0.2,0-0.2-0.1c-0.1-0.1-0.3-0.3-0.4-0.4c-0.3-0.3-0.9-0.2-1,0.3c-0.1,0.2,0,0.4,0.2,0.6
              c0.1,0.1,0.3,0.3,0.4,0.4c0.1,0.1,0.1,0.1,0.1,0.2c0,0.1-0.1,0.1-0.2,0.1C11.3,15.6,10.7,15,10.7,14.2z"/>
            <path class="st0" d="M9.7,13.1c0,0-0.1,0-0.1,0c-0.2,0-0.3,0.3-0.2,0.4c0,0.1,0,0.1,0,0.2c-0.5,0.5-1,1-1.5,1.5
              c-0.5,0.5-1.4,0.3-1.6-0.4c-0.1-0.3,0-0.7,0.2-0.9c0.5-0.5,1-1,1.5-1.5c0,0,0.1-0.1,0.1,0c0.2,0.1,0.5,0,0.5-0.3c0,0,0,0,0,0
              C9,12.4,9.4,12.8,9.7,13.1z"/>
            <path class="st0" d="M10.7,11.5c-0.2-0.2-0.3-0.3-0.5-0.5c0,0,0,0,0.1,0c0.5-0.5,1-1,1.5-1.5c0,0,0-0.1,0.1-0.1
              c0-0.1,0-0.2,0.1-0.2c0,0,0-0.1,0.1-0.1c0.4-0.2,0.7-0.5,1.1-0.7c0,0,0.1,0,0.1,0c0.1,0.1,0.1,0.1,0.2,0.2c0,0,0,0.1,0,0.1
              C13.2,9,13,9.4,12.7,9.8c0,0-0.1,0-0.1,0.1c0,0-0.1,0-0.1,0c-0.1,0-0.3,0.1-0.4,0.2C11.7,10.5,11.2,11,10.7,11.5
              C10.7,11.5,10.7,11.5,10.7,11.5z"/>
          </g>
        </svg>
        ` };
      }
    },
    {
      name: 'coupons',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path class="st0" d="M21.4,11c0.5,0,0.9-0.4,0.9-0.9V7c0-1.2-0.9-2.2-2.2-2.2H4c-1.3,0-2.2,0.9-2.2,2.2v3c0,0.6,0.3,0.9,0.9,1
            c0.2,0,0.4,0.1,0.6,0.3c0.3,0.3,0.4,0.7,0.3,1.1C3.4,12.7,3.1,13,2.6,13c-0.5,0-0.9,0.4-0.9,0.9c0,1,0,2.1,0,3.2
            c0,0.4,0.1,0.8,0.4,1.2c0.4,0.6,1.1,0.9,1.9,0.9c0,0,0,0,0,0c2,0,4,0,6,0l4.4,0c1.9,0,3.8,0,5.6,0c1.3,0,2.2-0.9,2.2-2.2V14
            c0-0.6-0.3-0.9-0.9-1c-0.6,0-1-0.5-1-1C20.4,11.4,20.8,11,21.4,11z M18.6,12c0,1.2,0.7,2.2,1.9,2.6c0,0.4,0,0.9,0,1.3l0,1
            c0,0.3-0.1,0.4-0.4,0.4H4c-0.3,0-0.5-0.1-0.5-0.5v-0.8c0-0.5,0-1,0-1.5c1.1-0.4,1.9-1.4,1.9-2.6c0-1.2-0.8-2.2-1.9-2.6
            c0-0.5,0-1,0-1.5V7.1c0-0.3,0.1-0.5,0.5-0.5H20c0.3,0,0.5,0.1,0.5,0.5l0,0.9c0,0.5,0,0.9,0,1.4C19.4,9.8,18.6,10.8,18.6,12z"/>
          <g>
            <path class="st0" d="M15.6,7.5c-0.2,0-0.4-0.2-0.4-0.4v-1c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4v1C15.9,7.4,15.8,7.5,15.6,7.5z"/>
            <path class="st0" d="M15.6,15.3c-0.2,0-0.4-0.2-0.4-0.4V13c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4v1.9
              C15.9,15.1,15.8,15.3,15.6,15.3z M15.6,11.4c-0.2,0-0.4-0.2-0.4-0.4V9.1c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4V11
              C15.9,11.2,15.8,11.4,15.6,11.4z"/>
            <path class="st0" d="M15.6,18.2c-0.2,0-0.4-0.2-0.4-0.4v-1c0-0.2,0.2-0.4,0.4-0.4s0.4,0.2,0.4,0.4v1C15.9,18,15.8,18.2,15.6,18.2z"
              />
          </g>
          <path class="st0" d="M8.3,15.8c-0.3,0-0.6-0.3-0.4-0.7c0.8-1.7,1.6-3.4,2.5-5c0.2-0.5,0.5-1,0.7-1.5c0.1-0.3,0.4-0.4,0.7-0.3
            C12,8.4,12.1,8.7,12,9c-0.8,1.5-1.5,3.1-2.3,4.6c-0.3,0.6-0.6,1.2-0.9,1.8C8.7,15.6,8.6,15.8,8.3,15.8z"/>
          <path class="st0" d="M9.2,10.5c0,0.2,0,0.4,0,0.6c0,0.7-0.3,1.1-1,1.2c-0.4,0.1-0.8,0-1.2-0.2c-0.3-0.2-0.4-0.4-0.5-0.7
            c0-0.6,0-1.3,0-1.9c0-0.5,0.3-0.7,0.8-0.9c0.4-0.1,0.9-0.1,1.3,0.1c0.4,0.2,0.6,0.5,0.6,0.9C9.2,9.9,9.2,10.2,9.2,10.5
            C9.2,10.5,9.2,10.5,9.2,10.5z M7.3,10.5C7.3,10.5,7.3,10.5,7.3,10.5c0,0.2,0,0.4,0,0.7c0,0.3,0.1,0.4,0.4,0.4c0.3,0,0.5-0.1,0.5-0.4
            c0-0.5,0-0.9,0-1.4c0-0.3-0.2-0.4-0.5-0.4c-0.3,0-0.4,0.1-0.4,0.4C7.3,10.1,7.3,10.3,7.3,10.5z"/>
          <path class="st0" d="M10.7,13.5c0-0.3,0-0.5,0-0.8c0-0.6,0.3-0.9,0.9-1c0.5-0.1,0.9-0.1,1.4,0.2c0.3,0.2,0.5,0.4,0.5,0.8
            c0,0.6,0,1.2,0,1.8c0,0.5-0.3,0.8-0.8,0.9c-0.4,0.1-0.9,0.1-1.3,0c-0.4-0.2-0.6-0.5-0.7-0.9C10.6,14,10.7,13.7,10.7,13.5
            C10.7,13.5,10.7,13.5,10.7,13.5z M12.5,13.5C12.5,13.5,12.5,13.5,12.5,13.5c0-0.2,0-0.4,0-0.6c0-0.3-0.1-0.4-0.4-0.4
            c-0.3,0-0.5,0.1-0.5,0.4c0,0.4,0,0.9,0,1.3c0,0.1,0.1,0.3,0.2,0.3c0.1,0.1,0.3,0.1,0.5,0c0.2-0.1,0.2-0.2,0.2-0.4
            C12.5,13.9,12.5,13.7,12.5,13.5z"/>
        </svg>
        ` };
      }
    },
    {
      name: 'accounts',
      class: 'GlyphProperty',
      of: 'foam.core.Glyph',
      factory: () => {
        return { template: `
        <svg width="100%" viewBox="0 0 24 24" version="1.1" fill-rule="nonzero" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <path d="M3,5 L3,19 C3,20.1 3.89,21 5,21 L19,21 C20.1,21 21,20.1 21,19 L21,5 C21,3.9 20.1,3 19,3 L5,3 C3.89,3 3,3.9 3,5 Z M15,9 C15,10.66 13.66,12 12,12 C10.34,12 9,10.66 9,9 C9,7.34 10.34,6 12,6 C13.66,6 15,7.34 15,9 Z M6,17 C6,15 10,13.9 12,13.9 C14,13.9 18,15 18,17 L18,18 L6,18 L6,17 Z"></path>
        </svg>
        ` };
      }
    }
  ]
});
