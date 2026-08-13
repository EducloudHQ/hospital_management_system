var Ke=Object.defineProperty;var qe=(t,e,n)=>e in t?Ke(t,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[e]=n;var re=(t,e,n)=>qe(t,typeof e!="symbol"?e+"":e,n);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();const Je="modulepreload",Fe=function(t){return"/"+t},ve={},Ge=function(e,n,r){let s=Promise.resolve();if(n&&n.length>0){let o=function(p){return Promise.all(p.map(f=>Promise.resolve(f).then(u=>({status:"fulfilled",value:u}),u=>({status:"rejected",reason:u}))))};document.getElementsByTagName("link");const d=document.querySelector("meta[property=csp-nonce]"),a=(d==null?void 0:d.nonce)||(d==null?void 0:d.getAttribute("nonce"));s=o(n.map(p=>{if(p=Fe(p),p in ve)return;ve[p]=!0;const f=p.endsWith(".css"),u=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${p}"]${u}`))return;const m=document.createElement("link");if(m.rel=f?"stylesheet":Je,f||(m.as="script"),m.crossOrigin="",m.href=p,a&&m.setAttribute("nonce",a),document.head.appendChild(m),f)return new Promise((c,h)=>{m.addEventListener("load",c),m.addEventListener("error",()=>h(new Error(`Unable to preload CSS for ${p}`)))})}))}function i(o){const d=new Event("vite:preloadError",{cancelable:!0});if(d.payload=o,window.dispatchEvent(d),!d.defaultPrevented)throw o}return s.then(o=>{for(const d of o||[])d.status==="rejected"&&i(d.reason);return e().catch(i)})},Ye="ApiError";class Ze extends Error{constructor(n,r,s){super(n,s!=null&&s.cause?{cause:s.cause}:void 0);re(this,"status");re(this,"retriable");this.name=(s==null?void 0:s.name)??Ye,this.status=r,this.retriable=(s==null?void 0:s.retriable)??!1}}const Xe="2.0";let Qe=1;function et(t,e,n){return JSON.stringify({jsonrpc:Xe,method:`${t}.${e}`,params:n,id:Qe++})}function tt(t){const e=t;if(e.error){const{code:n,message:r,data:s}=e.error,i=n>0?n:500;throw new Ze(r,i,{...s!=null&&s.name?{name:s.name}:{},...(s==null?void 0:s.retriable)===!0?{retriable:!0}:{}})}return e.result}var $={};const nt=typeof window>"u";function st(){if(!nt||typeof globalThis>"u")return;const t=globalThis.__BLOCKS_REQUEST_COOKIES_STORE__;if(!(!t||typeof t.getStore!="function"))return t.getStore()}let j=null,B=null;async function rt(){return j||B||(B=it().catch(t=>{throw B=null,t}),B)}async function it(){var n;if(j)return j;function t(r){if(!r||typeof r!="string"||!r.trim()||r==="undefined"||r.startsWith("undefined"))return!0;if(r.startsWith("/"))return!1;try{const s=new URL(r);return s.hostname==="undefined"||s.pathname==="/undefined"||s.pathname.startsWith("/undefined/")}catch{return!0}}function e(r,s){if(!r||typeof r!="string"||t(r))throw new Error(`Blocks API URL is not configured (source: ${s}). Ensure BLOCKS_API_URL environment variable is set or config.json is deployed. Run with --conditions=cdk during CDK synthesis.`);return j=r,r}if(typeof process<"u"&&($!=null&&$.BLOCKS_API_URL)){const r=$.BLOCKS_API_URL;if(/\$\{Token\[/.test(r))throw new Error("Blocks API URL contains unresolved CDK tokens. This usually means a Server Component is being statically prerendered during `next build` inside `cdk deploy`.\nFix: add `export const dynamic = 'force-dynamic';` to any page that calls the Blocks API so Next.js skips prerendering it.");const s=e(r,"env BLOCKS_API_URL");return console.log("[Blocks] Using API (env BLOCKS_API_URL):",s),s}if(typeof process<"u"&&($!=null&&$.BLOCKS_CONFIG))try{const r=JSON.parse($.BLOCKS_CONFIG),s=e(r.apiUrl,"env BLOCKS_CONFIG");return console.log("[Blocks] Using API (env BLOCKS_CONFIG):",s),s}catch{}if(typeof process<"u"&&((n=process.versions)!=null&&n.node))try{const r=await Ge(()=>import("./__vite-browser-external-BIHI7g3E.js"),[]),s=JSON.parse(r.readFileSync(".blocks-sandbox/config.json","utf-8")),i=e(s.apiUrl,"config.json file");return console.log("[Blocks] Using API (config.json file):",i),i}catch{}try{const r=await fetch("/.blocks-sandbox/config.json");if(r.ok){const s=await r.json(),i=e(s.apiUrl,"config.json fetch");return console.log("[Blocks] Using API (config.json fetch):",i),i}}catch{}throw new Error(`Blocks API URL not configured. Ensure:
1. You ran \`npm run deploy\` (deploys config.json)
2. SSR Lambda has BLOCKS_API_URL env var, OR
3. config.json exists at /.blocks-sandbox/config.json`)}const he=[];function Re(t){he.push(t)}async function ot(t){for(const e of he)if(e.onRequest){const n=await e.onRequest(t);n&&(t=n)}return t}function at(t){for(const e of he)e.onResponse&&(t=e.onResponse(t));return t}function Pe(t,e){return new Proxy({},{get(n,r){if(typeof r!="symbol")return async(...s)=>{const i=await rt();let o={apiNamespace:t,method:r,args:s,headers:{"Content-Type":"application/json"}};o=await ot(o);const d=st();if(d){const u="Cookie"in o.headers?"Cookie":"cookie"in o.headers?"cookie":null,m=u?o.headers[u]:void 0;if(u&&u!=="Cookie"&&delete o.headers[u],m){const c=new Set(m.split(";").filter(Boolean).map(g=>g.trim().split("=")[0])),h=d.split(";").filter(Boolean).filter(g=>!c.has(g.trim().split("=")[0])).join("; ");o.headers.Cookie=h?`${m}; ${h}`:m}else o.headers.Cookie=d}const p=await(await fetch(i,{method:"POST",headers:o.headers,credentials:"include",body:et(o.apiNamespace,o.method,o.args)})).json(),f=tt(p);return at(f)}}})}const Ae=new Map,ce=5,ct=3e4;function ee(t){let e=Ae.get(t);return e||(e={ws:void 0,isConnected:!1,reconnectAttempts:0,subscriptions:new Map,channelTokens:new Map,pendingSubs:[],pendingMessages:[],pendingEstablished:new Map,disconnectHandlers:new Set},Ae.set(t,e)),e}function Le(t){const e=ee(t);try{e.ws=new WebSocket(t),e.ws.onopen=()=>{e.isConnected=!0,e.reconnectAttempts=0;for(const n of e.subscriptions.keys())e.ws.send(JSON.stringify({action:"subscribe",channel:n,token:e.channelTokens.get(n)}));for(const{channel:n,token:r}of e.pendingSubs)e.subscriptions.has(n)||e.ws.send(JSON.stringify({action:"subscribe",channel:n,token:r}));e.pendingSubs.length=0;for(const n of e.pendingMessages)e.ws.send(n);e.pendingMessages.length=0},e.ws.onmessage=n=>{try{const r=JSON.parse(n.data);if(r.type==="subscribe_success"&&r.channel){const s=e.pendingEstablished.get(r.channel);s&&(s.forEach(i=>i.resolve()),e.pendingEstablished.delete(r.channel))}else if(r.type==="error"&&r.channel){const s=e.pendingEstablished.get(r.channel);if(s){const i=new Error(r.message||"Subscription rejected");i.name="ConnectionFailedException",s.forEach(o=>o.reject(i)),e.pendingEstablished.delete(r.channel)}e.subscriptions.delete(r.channel),e.channelTokens.delete(r.channel)}else if(r.type==="message"&&r.channel){const s=e.subscriptions.get(r.channel);s&&s.forEach(i=>{try{i(r.payload)}catch(o){console.error("[Realtime] Handler error:",o)}})}}catch(r){console.error("[Realtime] Parse error:",r)}},e.ws.onclose=()=>{e.isConnected=!1,e.disconnectHandlers.forEach(n=>{try{n("unknown")}catch{}}),e.disconnectHandlers.clear(),we(t)},e.ws.onerror=n=>{console.error("[Realtime] WS error:",n),e.disconnectHandlers.forEach(r=>{try{r("error")}catch{}})}}catch(n){console.error("[Realtime] Connection error:",n),we(t)}}function we(t){const e=ee(t);if(e.reconnectAttempts>=ce)return;e.reconnectAttempts++;const n=Math.min(1e3*2**(e.reconnectAttempts-1),ct);e.reconnectTimer=setTimeout(()=>Le(t),n)}function lt(t){const e=ee(t);e.ws&&(e.isConnected||e.reconnectAttempts<ce)||(e.reconnectAttempts>=ce&&(e.reconnectAttempts=0,e.ws=void 0),Le(t))}function dt(t,e,n,r,s){var p;const i=ee(t);lt(t),s&&i.disconnectHandlers.add(s);let o,d;const a=new Promise((f,u)=>{o=f,d=u});if(!i.subscriptions.has(e)){i.subscriptions.set(e,new Set),i.channelTokens.set(e,r);const f=JSON.stringify({action:"subscribe",channel:e,token:r});i.isConnected&&((p=i.ws)==null?void 0:p.readyState)===WebSocket.OPEN?i.ws.send(f):i.pendingSubs.push({channel:e,token:r})}return i.pendingEstablished.has(e)||i.pendingEstablished.set(e,[]),i.pendingEstablished.get(e).push({resolve:o,reject:d}),i.subscriptions.get(e).add(n),{unsubscribe(){var u;if(s){try{s("client")}catch{}i.disconnectHandlers.delete(s)}const f=i.subscriptions.get(e);f&&(f.delete(n),f.size===0&&(i.subscriptions.delete(e),i.channelTokens.delete(e),i.isConnected&&((u=i.ws)==null?void 0:u.readyState)===WebSocket.OPEN&&i.ws.send(JSON.stringify({action:"unsubscribe",channel:e}))))},established:a,connection:i.ws}}function ut(t){return typeof t=="object"&&t!==null&&t.__blocks==="realtime/channel"&&typeof t.wsUrl=="string"}function le(t){if(ut(t)){const{channel:e,wsUrl:n,token:r}=t;return{subscribe(s){const i=typeof s=="function"?s:s.onMessage,o=typeof s=="function"?void 0:s.onDisconnect;return dt(n,e,i,r,o)}}}if(Array.isArray(t))return t.map(le);if(typeof t=="object"&&t!==null){const e={};for(const[n,r]of Object.entries(t))e[n]=le(r);return e}return t}Re({onResponse:le});function pt(t){if(typeof t!="object"||t===null)return!1;const e=t;return e.__blocks==="file-bucket/download"&&typeof e.url=="string"}function ht(t){if(typeof t!="object"||t===null)return!1;const e=t;return e.__blocks==="file-bucket/upload"&&typeof e.url=="string"}function de(t){if(pt(t)){const{url:e}=t;return{async download(){const n=await fetch(e);if(!n.ok)throw new Error(`Download failed: ${n.status}`);return n.blob()},getUrl(){return e},toJSON(){return{__blocks:"file-bucket/download",url:e}}}}if(ht(t)){const{url:e,contentType:n}=t;return{async upload(r){const s={};n&&(s["Content-Type"]=n);const i=await fetch(e,{method:"PUT",body:r,headers:s});if(!i.ok)throw new Error(`Upload failed: ${i.status}`)},getUrl(){return e},toJSON(){return{__blocks:"file-bucket/upload",url:e,contentType:n}}}}if(Array.isArray(t))return t.map(de);if(typeof t=="object"&&t!==null){const e={};for(const[n,r]of Object.entries(t))e[n]=de(r);return e}return t}Re({onResponse:de});const v=Pe("api"),fe=Pe("authApi"),ft="blocks-auth",ue="blocks-auth-change";let ie=null;function X(){return ie||(ie=new BroadcastChannel(ft)),ie}const xe=new WeakMap;function J(t){let e=xe.get(t);return e||(e={state:null,hydrating:null,listeners:new Set},xe.set(t,e)),e}async function He(t){const e=J(t);return e.state?e.state:(e.hydrating||(e.hydrating=t.getAuthState().then(n=>(e.state=n,e.hydrating=null,n)).catch(n=>{throw e.hydrating=null,n})),e.hydrating)}function V(t,e){const n=J(t);n.state=e;for(const r of n.listeners)r(e)}function Be(t,e){const n=J(t);return n.listeners.add(e),()=>{n.listeners.delete(e)}}function te(t){const e={type:"auth-change",user:t};X().postMessage(e),window.dispatchEvent(new CustomEvent(ue,{detail:e}))}function mt(t,e){if(t===e)return!0;if(t===null||e===null)return!1;const n=t,r=e,s=Object.keys(n),i=Object.keys(r);return s.length!==i.length?!1:s.every(o=>n[o]===r[o])}function me(t,e){var o;const n=d=>{var a;((a=d.data)==null?void 0:a.type)==="auth-change"&&e(d.data.user)};X().addEventListener("message",n);const r=d=>{const a=d.detail;(a==null?void 0:a.type)==="auth-change"&&e(a.user)};window.addEventListener(ue,r);const s=J(t);let i;return(s.state||!s.hydrating)&&(i=((o=s.state)==null?void 0:o.user)??null,e(i)),He(t).then(d=>{const a=d.user??null;i!==void 0&&mt(a,i)||e(a)}).catch(()=>{}),()=>{X().removeEventListener("message",n),window.removeEventListener(ue,r)}}function gt(t,e){const n=document.createElement("div");return me(t,r=>{r?n.replaceChildren(e(r)):n.replaceChildren()}),n}function yt(t,e){const n=document.createElement("div");n.style.cssText="max-width: 400px; font-family: system-ui, sans-serif;";const r={};function s(o){var d;if(n.replaceChildren(bt(t,o,s,r)),o.actions.length===1&&((d=o.actions[0])==null?void 0:d.name)==="autoSignIn"){const a=o.actions[0],p={};for(const f of a.fields)f.defaultValue!==void 0&&(p[f.name]=f.defaultValue);t.setAuthState({action:"autoSignIn",...p}).then(f=>{V(t,f),te(f.user??null)}).catch(f=>{s({state:"signedOut",actions:[],error:(f==null?void 0:f.message)??"Auto sign-in failed. Please sign in manually."})})}}const i=J(t).state;return i&&s(i),He(t).then(o=>{o!==i&&s(o)}).catch(()=>{}),Be(t,s),X().addEventListener("message",o=>{var d;((d=o.data)==null?void 0:d.type)==="auth-change"&&t.getAuthState().then(a=>V(t,a))}),n}function bt(t,e,n,r){var d,a,p,f;const s=document.createElement("div");s.style.cssText="border: 1px solid #ddd; padding: 20px; border-radius: 8px;";const i=new Set(r.hideActions??[]),o=e.actions.filter(u=>!i.has(u.name));if(e.state==="signedIn"){const u=document.createElement("h3");u.style.cssText="margin-top: 0;",u.textContent=`Signed in as: ${e.user.username}`,s.appendChild(u)}else{const u=o[0],m=u?(a=(d=r.actions)==null?void 0:d[u.name])==null?void 0:a.heading:void 0,c=(p=r.headings)==null?void 0:p[e.state],h=document.createElement("h3");h.style.cssText="margin-top: 0;",h.textContent=m??c??"Authentication",s.appendChild(h)}if(e.error){const u=document.createElement("div");u.style.cssText="color: red; font-size: 14px; margin-bottom: 12px;",u.textContent=e.error,s.appendChild(u)}for(const u of o){const m=(f=r.actions)==null?void 0:f[u.name];if(m!=null&&m.render){const c=async h=>{try{const g=await t.setAuthState({action:u.name,...h});if(g.retriable===!0){n({...e,error:g.error||"An error occurred"});return}V(t,g),te(g.user??null)}catch(g){n({state:"signedOut",actions:[u],error:(g==null?void 0:g.message)||"An error occurred"})}};s.appendChild(m.render(u,{submit:c}));continue}u.url?s.appendChild(wt(u)):s.appendChild(vt(t,e,u,n,m))}return s}function vt(t,e,n,r,s){var m;const i=document.createElement("div");i.style.cssText="margin-bottom: 16px;";const o={},d=(s==null?void 0:s.fields)??{},a=n.fields.map((c,h)=>{var g;return{f:c,i:h,order:(g=d[c.name])==null?void 0:g.order}}).sort((c,h)=>c.order!=null&&h.order!=null?c.order-h.order:c.order!=null?-1:h.order!=null?1:c.i-h.i).map(c=>c.f);for(const c of a){const h=d[c.name];if(h!=null&&h.render){const l=h.render({name:c.name,defaultValue:c.defaultValue});i.appendChild(l);const b=`input[name="${c.name.replace(/(["\\])/g,"\\$1")}"]`,w=i.querySelector(b);w&&(o[c.name]=w);continue}if(c.type==="hidden"){const l=document.createElement("input");l.type="hidden",l.name=c.name,l.value=c.defaultValue??"",o[c.name]=l,i.appendChild(l);continue}if(h!=null&&h.hidden){if(c.defaultValue!==void 0){const l=document.createElement("input");l.type="hidden",l.name=c.name,l.value=c.defaultValue,o[c.name]=l,i.appendChild(l)}continue}const g=(h==null?void 0:h.type)??(c.type==="email"?"email":c.type==="password"?"password":"text"),M=(h==null?void 0:h.label)??c.label,N=(h==null?void 0:h.placeholder)??M,x=document.createElement("input");if(x.name=c.name,x.placeholder=N,x.type=g,h!=null&&h.autocomplete&&(x.autocomplete=h.autocomplete),x.style.cssText="width: 100%; padding: 8px; margin-bottom: 4px; box-sizing: border-box;",c.defaultValue&&(x.value=c.defaultValue),o[c.name]=x,i.appendChild(x),h!=null&&h.hint){const l=document.createElement("div");l.textContent=h.hint,l.style.cssText="font-size: 12px; color: #666; margin: 0 0 8px 2px;",i.appendChild(l)}}const p=document.createElement("button");p.textContent=(s==null?void 0:s.submitLabel)??n.label,p.style.cssText="padding: 8px 16px; cursor: pointer; margin-right: 8px;";const f=async()=>{const c={};for(const[h,g]of Object.entries(o))c[h]=g.value;if(n.capability==="webauthn-get"||n.capability==="webauthn-create")try{const h=n.capability==="webauthn-get"?c.credentialRequestOptions:c.credentialCreationOptions;if(!h)throw new Error("Missing WebAuthn options");const g=await At(n.capability,h);c.credential=g,o.credential&&(o.credential.value=g)}catch(h){r({...e,error:(h==null?void 0:h.message)||"Passkey ceremony failed"});return}try{const h=await t.setAuthState({action:n.name,...c});if(h.retriable===!0){r({...e,error:h.error||"An error occurred"});return}V(t,h),te(h.user??null)}catch(h){(h==null?void 0:h.retriable)===!0?r({...e,error:h.message||"An error occurred"}):r({state:"signedOut",actions:[n],error:h.message||"An error occurred"})}};return p.addEventListener("click",f),i.appendChild(p),(m=Object.values(o).filter(c=>c.type!=="hidden").at(-1))==null||m.addEventListener("keydown",c=>{c.key==="Enter"&&f()}),i}async function At(t,e){var i,o;if(typeof navigator>"u"||!navigator.credentials)throw new Error("This browser does not support WebAuthn");const n=JSON.parse(e);if(t==="webauthn-get"){const d=((i=PublicKeyCredential==null?void 0:PublicKeyCredential.parseRequestOptionsFromJSON)==null?void 0:i.call(PublicKeyCredential,n))??Ce(n,"get"),a=await navigator.credentials.get({publicKey:d});if(!a)throw new Error("No credential returned");return $e(a)}const r=((o=PublicKeyCredential==null?void 0:PublicKeyCredential.parseCreationOptionsFromJSON)==null?void 0:o.call(PublicKeyCredential,n))??Ce(n,"create"),s=await navigator.credentials.create({publicKey:r});if(!s)throw new Error("No credential returned");return $e(s)}function $e(t){var s;const e=t.toJSON;if(typeof e=="function")return JSON.stringify(e.call(t));const n=t.response,r={id:t.id,rawId:S(t.rawId),type:t.type,authenticatorAttachment:t.authenticatorAttachment,clientExtensionResults:((s=t.getClientExtensionResults)==null?void 0:s.call(t))??{}};return"attestationObject"in n?r.response={clientDataJSON:S(n.clientDataJSON),attestationObject:S(n.attestationObject)}:r.response={clientDataJSON:S(n.clientDataJSON),authenticatorData:S(n.authenticatorData),signature:S(n.signature),userHandle:n.userHandle?S(n.userHandle):void 0},JSON.stringify(r)}function Ce(t,e){var r;const n={...t};return typeof n.challenge=="string"&&(n.challenge=Z(n.challenge)),e==="get"&&Array.isArray(n.allowCredentials)&&(n.allowCredentials=n.allowCredentials.map(s=>({...s,id:typeof s.id=="string"?Z(s.id):s.id}))),e==="create"&&((r=n.user)!=null&&r.id&&typeof n.user.id=="string"&&(n.user={...n.user,id:Z(n.user.id)}),Array.isArray(n.excludeCredentials)&&(n.excludeCredentials=n.excludeCredentials.map(s=>({...s,id:typeof s.id=="string"?Z(s.id):s.id})))),n}function S(t){const e=t instanceof ArrayBuffer?new Uint8Array(t):new Uint8Array(t.buffer,t.byteOffset,t.byteLength);let n="";for(let r=0;r<e.length;r++)n+=String.fromCharCode(e[r]);return btoa(n).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}function Z(t){const e=t.replace(/-/g,"+").replace(/_/g,"/").padEnd(t.length+(4-t.length%4)%4,"="),n=atob(e),r=new Uint8Array(n.length);for(let s=0;s<n.length;s++)r[s]=n.charCodeAt(s);return r.buffer}function wt(t){const e=document.createElement("form");e.method=t.method??"GET",e.action=t.url,e.style.cssText="margin-bottom: 8px;";for(const r of t.fields){const s=document.createElement("input");s.type="hidden",s.name=r.name,s.value=r.defaultValue??"",e.appendChild(s)}const n=document.createElement("button");return n.type="submit",n.textContent=t.label,n.style.cssText="padding: 8px 16px; cursor: pointer; width: 100%;",e.appendChild(n),e}function xt(t){const e=document.createElement("div");function n(r){const s=document.createElement("div");if(s.style.cssText="display: flex; justify-content: flex-end; align-items: center; gap: 12px; padding: 12px 20px; background: #f5f5f5; border-bottom: 1px solid #ddd; font-family: system-ui, sans-serif;",r){const i=document.createElement("span");i.textContent=`👤 ${r.username}`,i.style.cssText="font-size: 14px;";const o=document.createElement("button");o.textContent="Sign Out",o.style.cssText="padding: 8px 16px; cursor: pointer;",o.addEventListener("click",async()=>{const d=await t.setAuthState({action:"signOut"});V(t,d),te(d.user??null)}),s.appendChild(i),s.appendChild(o)}else{const i=document.createElement("button");i.textContent="Sign In",i.style.cssText="padding: 8px 16px; cursor: pointer;",i.addEventListener("click",()=>{const o=document.createElement("div");o.style.cssText="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;";const d=document.createElement("div");d.style.cssText="background: white; border-radius: 8px; padding: 20px; max-width: 400px; position: relative;";const a=document.createElement("button");a.textContent="✕",a.style.cssText="position: absolute; top: 8px; right: 8px; border: none; background: none; font-size: 20px; cursor: pointer; padding: 0; width: 24px; height: 24px;",a.addEventListener("click",()=>o.remove()),d.appendChild(a),d.appendChild(yt(t)),o.appendChild(d),o.addEventListener("click",f=>{f.target===o&&o.remove()});const p=Be(t,f=>{f.user&&(o.remove(),p())});document.body.appendChild(o)}),s.appendChild(i)}e.replaceChildren(s)}return me(t,n),e}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,_e=t=>t,Q=D.trustedTypes,Ee=Q?Q.createPolicy("lit-html",{createHTML:t=>t}):void 0,Oe="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,Ue="?"+_,$t=`<${Ue}>`,T=document,W=()=>T.createComment(""),z=t=>t===null||typeof t!="object"&&typeof t!="function",ge=Array.isArray,Ct=t=>ge(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",oe=`[ 	
\f\r]`,O=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Se=/-->/g,ke=/>/g,k=RegExp(`>|${oe}(?:([^\\s"'>=/]+)(${oe}*=${oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ie=/'/g,Te=/"/g,je=/^(?:script|style|textarea|title)$/i,_t=t=>(e,...n)=>({_$litType$:t,strings:e,values:n}),y=_t(1),K=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),Me=new WeakMap,I=T.createTreeWalker(T,129);function De(t,e){if(!ge(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ee!==void 0?Ee.createHTML(e):e}const Et=(t,e)=>{const n=t.length-1,r=[];let s,i=e===2?"<svg>":e===3?"<math>":"",o=O;for(let d=0;d<n;d++){const a=t[d];let p,f,u=-1,m=0;for(;m<a.length&&(o.lastIndex=m,f=o.exec(a),f!==null);)m=o.lastIndex,o===O?f[1]==="!--"?o=Se:f[1]!==void 0?o=ke:f[2]!==void 0?(je.test(f[2])&&(s=RegExp("</"+f[2],"g")),o=k):f[3]!==void 0&&(o=k):o===k?f[0]===">"?(o=s??O,u=-1):f[1]===void 0?u=-2:(u=o.lastIndex-f[2].length,p=f[1],o=f[3]===void 0?k:f[3]==='"'?Te:Ie):o===Te||o===Ie?o=k:o===Se||o===ke?o=O:(o=k,s=void 0);const c=o===k&&t[d+1].startsWith("/>")?" ":"";i+=o===O?a+$t:u>=0?(r.push(p),a.slice(0,u)+Oe+a.slice(u)+_+c):a+_+(u===-2?d:c)}return[De(t,i+(t[n]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class q{constructor({strings:e,_$litType$:n},r){let s;this.parts=[];let i=0,o=0;const d=e.length-1,a=this.parts,[p,f]=Et(e,n);if(this.el=q.createElement(p,r),I.currentNode=this.el.content,n===2||n===3){const u=this.el.content.firstChild;u.replaceWith(...u.childNodes)}for(;(s=I.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes())for(const u of s.getAttributeNames())if(u.endsWith(Oe)){const m=f[o++],c=s.getAttribute(u).split(_),h=/([.?@])?(.*)/.exec(m);a.push({type:1,index:i,name:h[2],strings:c,ctor:h[1]==="."?kt:h[1]==="?"?It:h[1]==="@"?Tt:ne}),s.removeAttribute(u)}else u.startsWith(_)&&(a.push({type:6,index:i}),s.removeAttribute(u));if(je.test(s.tagName)){const u=s.textContent.split(_),m=u.length-1;if(m>0){s.textContent=Q?Q.emptyScript:"";for(let c=0;c<m;c++)s.append(u[c],W()),I.nextNode(),a.push({type:2,index:++i});s.append(u[m],W())}}}else if(s.nodeType===8)if(s.data===Ue)a.push({type:2,index:i});else{let u=-1;for(;(u=s.data.indexOf(_,u+1))!==-1;)a.push({type:7,index:i}),u+=_.length-1}i++}}static createElement(e,n){const r=T.createElement("template");return r.innerHTML=e,r}}function L(t,e,n=t,r){var o,d;if(e===K)return e;let s=r!==void 0?(o=n._$Co)==null?void 0:o[r]:n._$Cl;const i=z(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==i&&((d=s==null?void 0:s._$AO)==null||d.call(s,!1),i===void 0?s=void 0:(s=new i(t),s._$AT(t,n,r)),r!==void 0?(n._$Co??(n._$Co=[]))[r]=s:n._$Cl=s),s!==void 0&&(e=L(t,s._$AS(t,e.values),s,r)),e}class St{constructor(e,n){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=n}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:n},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??T).importNode(n,!0);I.currentNode=s;let i=I.nextNode(),o=0,d=0,a=r[0];for(;a!==void 0;){if(o===a.index){let p;a.type===2?p=new F(i,i.nextSibling,this,e):a.type===1?p=new a.ctor(i,a.name,a.strings,this,e):a.type===6&&(p=new Mt(i,this,e)),this._$AV.push(p),a=r[++d]}o!==(a==null?void 0:a.index)&&(i=I.nextNode(),o++)}return I.currentNode=T,s}p(e){let n=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,n),n+=r.strings.length-2):r._$AI(e[n])),n++}}class F{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,n,r,s){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=n,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const n=this._$AM;return n!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=n.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,n=this){e=L(this,e,n),z(e)?e===A||e==null||e===""?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==K&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Ct(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(T.createTextNode(e)),this._$AH=e}$(e){var i;const{values:n,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=q.createElement(De(r.h,r.h[0]),this.options)),r);if(((i=this._$AH)==null?void 0:i._$AD)===s)this._$AH.p(n);else{const o=new St(s,this),d=o.u(this.options);o.p(n),this.T(d),this._$AH=o}}_$AC(e){let n=Me.get(e.strings);return n===void 0&&Me.set(e.strings,n=new q(e)),n}k(e){ge(this._$AH)||(this._$AH=[],this._$AR());const n=this._$AH;let r,s=0;for(const i of e)s===n.length?n.push(r=new F(this.O(W()),this.O(W()),this,this.options)):r=n[s],r._$AI(i),s++;s<n.length&&(this._$AR(r&&r._$AB.nextSibling,s),n.length=s)}_$AR(e=this._$AA.nextSibling,n){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,n);e!==this._$AB;){const s=_e(e).nextSibling;_e(e).remove(),e=s}}setConnected(e){var n;this._$AM===void 0&&(this._$Cv=e,(n=this._$AP)==null||n.call(this,e))}}class ne{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,n,r,s,i){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=n,this._$AM=s,this.options=i,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=A}_$AI(e,n=this,r,s){const i=this.strings;let o=!1;if(i===void 0)e=L(this,e,n,0),o=!z(e)||e!==this._$AH&&e!==K,o&&(this._$AH=e);else{const d=e;let a,p;for(e=i[0],a=0;a<i.length-1;a++)p=L(this,d[r+a],n,a),p===K&&(p=this._$AH[a]),o||(o=!z(p)||p!==this._$AH[a]),p===A?e=A:e!==A&&(e+=(p??"")+i[a+1]),this._$AH[a]=p}o&&!s&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class kt extends ne{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}}class It extends ne{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}}class Tt extends ne{constructor(e,n,r,s,i){super(e,n,r,s,i),this.type=5}_$AI(e,n=this){if((e=L(this,e,n,0)??A)===K)return;const r=this._$AH,s=e===A&&r!==A||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,i=e!==A&&(r===A||s);s&&this.element.removeEventListener(this.name,this,r),i&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var n;typeof this._$AH=="function"?this._$AH.call(((n=this.options)==null?void 0:n.host)??this.element,e):this._$AH.handleEvent(e)}}class Mt{constructor(e,n,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=n,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){L(this,e)}}const ae=D.litHtmlPolyfillSupport;ae==null||ae(q,F),(D.litHtmlVersions??(D.litHtmlVersions=[])).push("3.3.3");const Ve=(t,e,n)=>{const r=e;let s=r._$litPart$;return s===void 0&&(r._$litPart$=s=new F(e.insertBefore(W(),null),null,void 0,{})),s._$AI(t),s};let Nt=0;function U(){return`msg-${++Nt}-${Date.now()}`}function Rt(t){let e=[],n=!1,r=null,s=null,i=null,o="";function d(p){var f,u,m,c,h,g,M,N,x;if((f=t.onChunk)==null||f.call(t,p),p.type==="text-delta"&&p.text&&i&&(o+=p.text,e=e.map(l=>l.id===i?{...l,content:o}:l),(u=t.onMessagesChange)==null||u.call(t,e)),p.type==="done"&&(p.text&&i&&(e=e.map(l=>l.id===i?{...l,content:p.text}:l),(m=t.onMessagesChange)==null||m.call(t,e)),n=!1,(c=t.onLoadingChange)==null||c.call(t,n)),p.type==="error"&&(n=!1,(h=t.onLoadingChange)==null||h.call(t,n),(g=t.onError)==null||g.call(t,p.error??"Unknown error")),p.type==="interrupt"&&p.interrupts){if(i){const l=e.find(b=>b.id===i);l&&!l.content&&(e=e.filter(b=>b.id!==i),(M=t.onMessagesChange)==null||M.call(t,e))}i=null,n=!1,(N=t.onLoadingChange)==null||N.call(t,n),(x=t.onInterrupt)==null||x.call(t,p.interrupts)}}async function a(p){s&&(s.unsubscribe(),s=null);const f=await t.subscribe(p,d);try{await f.established}catch(u){console.warn("Subscription failed, retrying with fresh token:",u),f.unsubscribe();const m=await t.subscribe(p,d);await m.established,s=m;return}s=f}return{async sendMessage(p){var m,c;if(n)return;r||(r=(await t.api.createConversation()).conversationId,await a(r)),s||await a(r);const f={id:U(),role:"user",content:p},u={id:U(),role:"assistant",content:""};i=u.id,o="",e=[...e,f,u],(m=t.onMessagesChange)==null||m.call(t,e),n=!0,(c=t.onLoadingChange)==null||c.call(t,n),await t.api.sendMessage(r,p,r)},async respondToInterrupt(p){var u,m;if(n)return;if(!r)throw new Error("No active conversation");for(const c of p)e=[...e,{id:U(),role:"approval",content:c.approved?"Approved":"Denied",metadata:{approved:c.approved,trust:c.trust,toolName:c.toolName,input:c.input}}];const f=e.find(c=>c.role==="assistant"&&!c.content);if(f)i=f.id;else{const c={id:U(),role:"assistant",content:""};i=c.id,e=[...e,c]}if(o="",(u=t.onMessagesChange)==null||u.call(t,e),n=!0,(m=t.onLoadingChange)==null||m.call(t,n),!t.api.resume)throw new Error("respondToInterrupt requires api.resume to be configured");await t.api.resume(r,p,r)},getMessages(){return e},isLoading(){return n},getConversationId(){return r},async loadConversation(p){var u,m;r=p,await a(p);const{messages:f}=await t.api.getConversation(p);if(e=f.filter(c=>c.role==="user"||c.role==="assistant"||c.role==="approval").map(c=>({id:U(),role:c.role,content:c.content,metadata:c.metadata})),(u=t.onMessagesChange)==null||u.call(t,e),t.api.getPendingInterrupts){const{interrupts:c}=await t.api.getPendingInterrupts(p);c.length&&((m=t.onInterrupt)==null||m.call(t,c))}},destroy(){s&&(s.unsubscribe(),s=null)}}}const Pt=document.getElementById("menu-bar");Pt.appendChild(xt(fe));const We=document.getElementById("chat-toggle"),ze=document.getElementById("chat-drawer"),ye=document.getElementById("chat-backdrop"),Ne=document.getElementById("dev-banner"),Lt=document.getElementById("active-role-text"),pe=document.getElementById("role-select");function be(){ze.classList.toggle("open"),ye.classList.toggle("open")}We.onclick=be;document.getElementById("chat-close").onclick=be;ye.onclick=be;me(fe,async t=>{const e=t!=null;if(document.getElementById("signInMessage").style.display=e?"none":"",We.style.display=e?"":"none",e)try{const n=await v.getUserProfile();Ne.style.display="",Lt.innerText=n.role.toUpperCase(),pe.value=n.role,Ht(t.username)}catch(n){console.error("Error fetching user profile",n)}else Ne.style.display="none",ze.classList.remove("open"),ye.classList.remove("open")});pe.onchange=async()=>{const t=pe.value;try{await v.setUserRole(t),window.location.reload()}catch(e){alert("Failed to switch role: "+e.message)}};let C=null;function Ht(t){C&&C.destroy();const e=document.getElementById("chat-messages"),n=document.getElementById("chat-input"),r=document.getElementById("chat-send");function s(o){Ve(y`
      <div class="chat-bubble chat-bubble-assistant">
        👋 Welcome to the Hope Valley AI Assistant. Ask me about doctors, hospital guidelines, ER wait times, or ask me to book/cancel an appointment for you!
      </div>
      ${o.map(d=>y`
        <div class="chat-bubble chat-bubble-${d.role}">
          ${d.content.split(`
`).map(a=>y`<p style="margin-bottom: 6px;">${a}</p>`)}
        </div>
      `)}
      ${C!=null&&C.isLoading()?y`
        <div class="chat-bubble chat-bubble-assistant" style="opacity: 0.6; display: flex; align-items: center; gap: 8px;">
          <span style="font-style: italic;">Assistant is typing...</span>
        </div>
      `:""}
    `,e),e.scrollTop=e.scrollHeight}C=Rt({api:{sendMessage:(o,d,a)=>v.sendChatMessage(o,d,a),createConversation:()=>v.createChatConversation(),getConversation:o=>v.getChatConversation(o)},subscribe:async(o,d)=>(await v.getChatChannel(o)).subscribe(d),onMessagesChange:o=>{s(o)},onLoadingChange:()=>{s(C.getMessages())}});async function i(){const o=n.value.trim();o&&(n.value="",await C.sendMessage(o))}r.onclick=i,n.onkeydown=o=>{o.key==="Enter"&&i()},s([])}document.getElementById("app").appendChild(gt(fe,t=>{const e=document.createElement("div");let n="patient",r=[],s=[],i=[],o={visitingHours:"",erWaitTime:"",bedCapacity:"",announcement:""},d="appointments";async function a(){try{n=(await v.getUserProfile()).role,i=await v.listDoctors(),o=await v.getHospitalSettings(),n==="patient"?(r=await v.listMyAppointments(),s=await v.listMedicalRecords(),d="appointments"):n==="doctor"?(r=await v.listDoctorAppointments(),d="appointments"):n==="admin"&&(d="settings"),g()}catch(l){console.error("Error loading dashboard data",l)}}async function p(l){l.preventDefault();const b=e.querySelector("#book-doctor"),w=e.querySelector("#book-date"),R=e.querySelector("#book-time"),E=e.querySelector("#book-notes"),P=b.value,H=w.value,G=R.value,Y=E.value.trim();if(!H){alert("Please select a date.");return}try{await v.bookAppointment(P,H,G,Y),E.value="",alert("Appointment scheduled successfully!"),await a()}catch(se){alert("Booking failed: "+se.message)}}async function f(l){l.preventDefault();const b=e.querySelector("#rec-patient"),w=e.querySelector("#rec-diagnosis"),R=e.querySelector("#rec-treatment"),E=e.querySelector("#rec-prescription"),P=b.value.trim(),H=w.value.trim(),G=R.value.trim(),Y=E.value.trim();if(!P||!H||!G||!Y){alert("Please fill out all fields.");return}try{await v.addMedicalRecord(P,H,G,Y),b.value="",w.value="",R.value="",E.value="",alert("Medical record added successfully!"),await a()}catch(se){alert("Failed to save medical record: "+se.message)}}async function u(l,b){if(confirm("Are you sure you want to cancel this appointment?"))try{await v.cancelAppointment(l,b),await a()}catch(w){alert("Cancellation failed: "+w.message)}}async function m(l,b){if(confirm("Are you sure you want to accept this appointment?"))try{await v.acceptAppointment(l,b),await a()}catch(w){alert("Failed to accept appointment: "+w.message)}}async function c(l,b){if(confirm("Are you sure you want to mark this appointment as completed?"))try{await v.completeAppointment(l,b),await a()}catch(w){alert("Failed to complete appointment: "+w.message)}}async function h(l){l.preventDefault();const b=e.querySelector("#settings-hours").value,w=e.querySelector("#settings-wait").value,R=e.querySelector("#settings-capacity").value,E=e.querySelector("#settings-announce").value;try{await v.updateHospitalSettings({visitingHours:b,erWaitTime:w,bedCapacity:R,announcement:E}),alert("Hospital settings updated successfully!"),await a()}catch(P){alert("Update failed: "+P.message)}}function g(){Ve(y`
        <!-- Announcement Banner -->
        <div class="welcome-section">
          <div class="welcome-title">🏥 Hope Valley Care Portal</div>
          <div class="welcome-subtitle">${o.announcement||"Connecting you to your clinical care team."}</div>
        </div>

        <!-- Metrics Row (KV Store visualization) -->
        <div class="dashboard-grid" style="grid-template-columns: repeat(3, 1fr); margin-bottom: 30px;">
          <div class="card" style="padding: 16px; display: flex; align-items: center; gap: 16px;">
            <div style="background-color: var(--accent-light); padding: 12px; border-radius: 8px; color: var(--accent-color);">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 500;">ER ESTIMATED WAIT</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent-color);">${o.erWaitTime||"15 minutes"}</div>
            </div>
          </div>
          <div class="card" style="padding: 16px; display: flex; align-items: center; gap: 16px;">
            <div style="background-color: var(--accent-light); padding: 12px; border-radius: 8px; color: var(--accent-color);">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 500;">VISITING HOURS</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent-color);">${o.visitingHours||"9am - 8pm"}</div>
            </div>
          </div>
          <div class="card" style="padding: 16px; display: flex; align-items: center; gap: 16px;">
            <div style="background-color: var(--accent-light); padding: 12px; border-radius: 8px; color: var(--accent-color);">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9M10 8v9"></path>
              </svg>
            </div>
            <div>
              <div style="font-size: 0.75rem; color: var(--text-secondary); font-weight: 500;">BED CAPACITY</div>
              <div style="font-size: 1.2rem; font-weight: 700; color: var(--accent-color);">${o.bedCapacity||"95% available"}</div>
            </div>
          </div>
        </div>

        <!-- Role-Specific Views -->
        ${n==="patient"?M():""}
        ${n==="doctor"?N():""}
        ${n==="admin"?x():""}
      `,e)}function M(){return y`
        <div class="tabs-nav">
          <button class="tab-btn ${d==="appointments"?"active":""}" @click=${()=>{d="appointments",g()}}>Appointments</button>
          <button class="tab-btn ${d==="medical-records"?"active":""}" @click=${()=>{d="medical-records",g()}}>Medical Records</button>
        </div>

        ${d==="appointments"?y`
          <div class="dashboard-grid">
            <!-- Book Appointment Form -->
            <div class="card">
              <h3 class="card-title">🗓️ Book an Appointment</h3>
              <form @submit=${p}>
                <div style="margin-bottom: 12px;">
                  <label for="book-doctor">Choose Doctor & Specialty</label>
                  <select id="book-doctor">
                    ${i.map(l=>y`<option value="${l.id}">${l.name} (${l.specialty})</option>`)}
                  </select>
                </div>
                <div style="margin-bottom: 12px;">
                  <label for="book-date">Appointment Date</label>
                  <input type="date" id="book-date" min="${new Date().toISOString().split("T")[0]}" />
                </div>
                <div style="margin-bottom: 12px;">
                  <label for="book-time">Time Slot</label>
                  <select id="book-time">
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:30 AM">10:30 AM</option>
                    <option value="01:00 PM">01:00 PM</option>
                    <option value="02:30 PM">02:30 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                  </select>
                </div>
                <div style="margin-bottom: 16px;">
                  <label for="book-notes">Reason/Symptoms</label>
                  <textarea id="book-notes" placeholder="Explain your symptoms or reasons for visit..." rows="3"></textarea>
                </div>
                <button type="submit" class="btn-primary" style="width: 100%;">Schedule Appointment</button>
              </form>
            </div>

            <!-- List Appointments -->
            <div class="card" style="grid-column: span 2;">
              <h3 class="card-title">📝 Scheduled Consultations</h3>
              <div class="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Status</th>
                      <th>Reason</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${r.length===0?y`
                      <tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No appointments scheduled.</td></tr>
                    `:r.map(l=>y`
                      <tr>
                        <td><strong>${l.doctorName}</strong></td>
                        <td>${l.date}</td>
                        <td>${l.timeSlot}</td>
                        <td><span class="badge badge-${l.status}">${l.status}</span></td>
                        <td style="color: var(--text-secondary); font-size: 0.85rem;">${l.notes||"N/A"}</td>
                        <td>
                          ${l.status==="scheduled"||l.status==="accepted"?y`
                            <button class="btn-danger" style="padding: 4px 8px; font-size: 0.8rem;" @click=${()=>u(l.patientId,l.appointmentId)}>Cancel</button>
                          `:"—"}
                        </td>
                      </tr>
                    `)}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        `:""}

        ${d==="medical-records"?y`
          <div class="card">
            <h3 class="card-title">📂 Medical History & Prescriptions</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Diagnosis</th>
                    <th>Treatment Plan</th>
                    <th>Prescriptions</th>
                    <th>Doctor</th>
                  </tr>
                </thead>
                <tbody>
                  ${s.length===0?y`
                    <tr><td colspan="5" style="text-align: center; color: var(--text-secondary);">No clinical medical history records found.</td></tr>
                  `:s.map(l=>y`
                    <tr>
                      <td>${l.date}</td>
                      <td><strong>${l.diagnosis}</strong></td>
                      <td>${l.treatment}</td>
                      <td><code style="background-color: #f1f5f9; padding: 2px 6px; border-radius: 4px; color: var(--accent-color); font-weight: 500;">${l.prescription}</code></td>
                      <td>${l.doctorName}</td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          </div>
        `:""}
      `}function N(){return y`
        <div class="dashboard-grid">
          <!-- Add Diagnosis / Record Form -->
          <div class="card">
            <h3 class="card-title">📝 Log Medical Diagnosis</h3>
            <form @submit=${f}>
              <div style="margin-bottom: 12px;">
                <label for="rec-patient">Patient Username/Email</label>
                <input type="text" id="rec-patient" placeholder="patient@example.com" />
              </div>
              <div style="margin-bottom: 12px;">
                <label for="rec-diagnosis">Diagnosis Summary</label>
                <input type="text" id="rec-diagnosis" placeholder="e.g. Acute Bronchitis" />
              </div>
              <div style="margin-bottom: 12px;">
                <label for="rec-treatment">Treatment Plan</label>
                <input type="text" id="rec-treatment" placeholder="e.g. Rest, hydration, steam inhalation" />
              </div>
              <div style="margin-bottom: 16px;">
                <label for="rec-prescription">Prescriptions</label>
                <textarea id="rec-prescription" placeholder="e.g. Albuterol Inhaler 90mcg - 2 puffs every 4-6 hours as needed" rows="3"></textarea>
              </div>
              <button type="submit" class="btn-primary" style="width: 100%;">Save Clinical Record</button>
            </form>
          </div>

          <!-- Schedule Consultations List -->
          <div class="card" style="grid-column: span 2;">
            <h3 class="card-title">📅 Consultation Schedule</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${r.length===0?y`
                    <tr><td colspan="6" style="text-align: center; color: var(--text-secondary);">No patients scheduled.</td></tr>
                  `:r.map(l=>y`
                    <tr>
                      <td><strong>${l.patientName}</strong> (${l.patientId})</td>
                      <td>${l.date}</td>
                      <td>${l.timeSlot}</td>
                      <td><span class="badge badge-${l.status}">${l.status}</span></td>
                      <td style="color: var(--text-secondary); font-size: 0.85rem;">${l.notes||"—"}</td>
                      <td>
                        <div style="display: flex; gap: 6px;">
                          ${l.status==="scheduled"?y`
                            <button style="padding: 4px 8px; font-size: 0.8rem; background-color: #22c55e; border: none; border-radius: 4px; color: white; cursor: pointer; font-weight: 500;" @click=${()=>m(l.patientId,l.appointmentId)}>Accept</button>
                            <button class="btn-danger" style="padding: 4px 8px; font-size: 0.8rem;" @click=${()=>u(l.patientId,l.appointmentId)}>Cancel</button>
                          `:""}
                          ${l.status==="accepted"?y`
                            <button style="padding: 4px 8px; font-size: 0.8rem; background-color: #3b82f6; border: none; border-radius: 4px; color: white; cursor: pointer; font-weight: 500;" @click=${()=>c(l.patientId,l.appointmentId)}>Complete</button>
                            <button class="btn-danger" style="padding: 4px 8px; font-size: 0.8rem;" @click=${()=>u(l.patientId,l.appointmentId)}>Cancel</button>
                          `:""}
                          ${l.status!=="scheduled"&&l.status!=="accepted"?y`
                            <span style="color: var(--text-secondary); font-size: 0.85rem;">—</span>
                          `:""}
                        </div>
                      </td>
                    </tr>
                  `)}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      `}function x(){return y`
        <div class="card" style="max-width: 600px; margin: 0 auto;">
          <h3 class="card-title">⚙️ Hospital Parameters & Settings</h3>
          <form @submit=${h}>
            <div style="margin-bottom: 12px;">
              <label for="settings-hours">Visiting Hours Description</label>
              <input type="text" id="settings-hours" .value="${o.visitingHours}" />
            </div>
            <div style="margin-bottom: 12px;">
              <label for="settings-wait">ER Estimated Wait Time</label>
              <input type="text" id="settings-wait" .value="${o.erWaitTime}" />
            </div>
            <div style="margin-bottom: 12px;">
              <label for="settings-capacity">Bed Capacity Status</label>
              <input type="text" id="settings-capacity" .value="${o.bedCapacity}" />
            </div>
            <div style="margin-bottom: 16px;">
              <label for="settings-announce">Portal Care Announcement</label>
              <textarea id="settings-announce" rows="3" .value="${o.announcement}"></textarea>
            </div>
            <button type="submit" class="btn-primary" style="width: 100%;">Update System Settings</button>
          </form>
        </div>
      `}return(async()=>{try{await(await v.subscribeHospital()).subscribe(()=>{console.log("Real-time notification received, reloading data..."),a()}).established}catch(l){console.warn("Realtime updates subscription not supported locally",l)}})(),a(),e}));
