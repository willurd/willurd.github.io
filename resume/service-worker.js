"use strict";var precacheConfig=[["/resume/index.html","15b0dbcb0ec209a1488ab714bf6c5bc5"],["/resume/static/css/main.01d1b32f.css","f328052b1f40d5427935b9d1d9537b3a"],["/resume/static/js/main.b7432abc.js","f2600a53e405e1f0890fd8835e35b72b"],["/resume/static/media/bg2.00642e96.png","00642e962f9f3d4394133e81b060d737"],["/resume/static/media/clark-valberg.8c12473f.jfif","8c12473f1db24e870889f038d2157417"],["/resume/static/media/coursera.7bea6190.svg","7bea6190856d1a346f1545ccadcb048d"],["/resume/static/media/david-chatsuthiphan.b2e04702.jfif","b2e0470284d86ea82e4414a710afb09f"],["/resume/static/media/geoff-schuller.cda5b6a0.jfif","cda5b6a0cc47c562d92da2f4351bc3bf"],["/resume/static/media/james-tyack.d7efcfd4.jfif","d7efcfd4c51a547b2996e3a8f12366cb"],["/resume/static/media/justin-white.6a420017.jfif","6a4200178b03668ca69ca4e6b83ed7ac"],["/resume/static/media/kevin-behan.aee4a396.jfif","aee4a3965dea9849f7dd9e08dc1c2496"],["/resume/static/media/me.8f48f369.jpg","8f48f369e403eb071c714bf74840024e"],["/resume/static/media/phil-cayting.35c4da8e.jfif","35c4da8efe9303bd835d5866a39f868c"],["/resume/static/media/rahul-kothari.a5383b9f.jfif","a5383b9fab2ee067493d58627ee55101"],["/resume/static/media/rohan-benkar.6bf4e259.jfif","6bf4e2596ccf443cdbadc796473f161a"],["/resume/static/media/sashi-penta.534845dc.jfif","534845dcab891eff141dc68dbdd4a026"],["/resume/static/media/stephen-wexler.ec2ae4f1.jfif","ec2ae4f1f670ae5aebbeabf6e677b6c0"],["/resume/static/media/trail.fdd1a401.jpg","fdd1a4018b668d60d2a1c313153345e7"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(t){return t.redirected?("body"in t?Promise.resolve(t.body):t.blob()).then(function(e){return new Response(e,{headers:t.headers,status:t.status,statusText:t.statusText})}):Promise.resolve(t)},createCacheKey=function(e,t,a,r){var n=new URL(e);return r&&n.pathname.match(r)||(n.search+=(n.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),n.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(t){return a.every(function(e){return!e.test(t[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],r=new URL(t,self.location),n=createCacheKey(r,hashParamName,a,/\.\w{8}\./);return[r.toString(),n]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var e=new Request(t,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+t+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(t,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(t){return t.keys().then(function(e){return Promise.all(e.map(function(e){if(!a.has(e.url))return t.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(t){if("GET"===t.request.method){var e,a=stripIgnoredUrlParameters(t.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,r),e=urlsToCacheKeys.has(a));var n="/resume/index.html";!e&&"navigate"===t.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],t.request.url)&&(a=new URL(n,self.location).toString(),e=urlsToCacheKeys.has(a)),e&&t.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',t.request.url,e),fetch(t.request)}))}});