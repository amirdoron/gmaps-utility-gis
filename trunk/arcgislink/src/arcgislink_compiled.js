/*
 http://google-maps-utility-library-v3.googlecode.com
*/
(function(){function p(a,b,c){var d=b===""?0:a.indexOf(b);c=c===""?a.length:a.indexOf(c,d+b.length);return a.substring(d+b.length,c)}function D(a){return a&&typeof a==="string"}function q(a){return a&&a.splice}function m(a,b,c){if(a&&b){var d;for(d in a)if(c||!(d in b))b[d]=a[d]}return b}function E(){i.event.trigger.apply(this,arguments)}function t(a,b){a&&b&&b.error&&a(b.error)}function Z(a,b){var c="";if(a)c+=a.getTime()-a.getTimezoneOffset()*6E4;if(b)c+=", "+(b.getTime()-b.getTimezoneOffset()*
6E4);return c}function F(a,b){b=Math.min(Math.max(b,0),1);if(a){var c=a.style;if(typeof c.opacity!=="undefined")c.opacity=b;if(typeof c.filters!=="undefined")c.filters.alpha.opacity=Math.floor(100*b);if(typeof c.filter!=="undefined")c.filter="alpha(opacity:"+Math.floor(b*100)+")"}}function T(a){var b="";for(var c in a)if(a.hasOwnProperty(c)){if(b.length>0)b+=";";b+=c+":"+a[c]}return b}function ja(){if(typeof XMLHttpRequest==="undefined"){try{return new ActiveXObject("Msxml2.XMLHTTP.6.0")}catch(a){}try{return new ActiveXObject("Msxml2.XMLHTTP.3.0")}catch(b){}try{return new ActiveXObject("Msxml2.XMLHTTP")}catch(c){}throw new Error("This browser does not support XMLHttpRequest.");
}else return new XMLHttpRequest}function P(a){var b=a;if(q(a)&&a.length>0)b=a[0];if(b instanceof i.LatLng||b instanceof i.Marker)return q(a)&&a.length>1?r.MULTIPOINT:r.POINT;else if(b instanceof i.Polyline)return r.POLYLINE;else if(b instanceof i.Polygon)return r.POLYGON;else if(b instanceof i.LatLngBounds)return r.ENVELOPE;else if(b.x!==undefined&&b.y!==undefined)return r.POINT;else if(b.points)return r.MULTIPOINT;else if(b.paths)return r.POLYLINE;else if(b.rings)return r.POLYGON;return null}function U(a){var b=
a;if(q(a)&&a.length>0)b=a[0];if(q(b)&&b.length>0)b=b[0];if(b instanceof i.LatLng||b instanceof i.Marker||b instanceof i.Polyline||b instanceof i.Polygon||b instanceof i.LatLngBounds)return true;return false}function K(a){if(!a)return null;return isNumber(a)?a:a.wkid?a.wkid:a.toJSON()}function $(a,b){for(var c=[],d,e=0,f=a.getLength();e<f;e++){d=a.getAt(e);c.push("["+d.lng()+","+d.lat()+"]")}b&&c.length>0&&c.push("["+a.getAt(0).lng()+","+a.getAt(0).lat()+"]");return c.join(",")}function G(a){var b,
c,d,e="{";switch(P(a)){case r.POINT:b=q(a)?a[0]:a;if(b instanceof i.Marker)b=b.getPosition();e+="x:"+b.lng()+",y:"+b.lat();break;case r.MULTIPOINT:d=[];for(c=0;c<a.length;c++){b=a[c]instanceof i.Marker?a[c].getPosition():a[c];d.push("["+b.lng()+","+b.lat()+"]")}e+="points: ["+d.join(",")+"]";break;case r.POLYLINE:d=[];a=q(a)?a:[a];for(c=0;c<a.length;c++)d.push("["+$(a[c].getPath())+"]");e+="paths:["+d.join(",")+"]";break;case r.POLYGON:d=[];b=q(a)?a[0]:a;a=b.getPaths();for(c=0;c<a.getLength();c++)d.push("["+
$(a.getAt(c),true)+"]");e+="rings:["+d.join(",")+"]";break;case r.ENVELOPE:b=q(a)?a[0]:a;e+="xmin:"+b.getSouthWest().lng()+",ymin:"+b.getSouthWest().lat()+",xmax:"+b.getNorthEast().lng()+",ymax:"+b.getNorthEast().lat();break}e+=", spatialReference:{wkid:4326}";e+="}";return e}function ka(a){function b(e){for(var f=[],g=0,h=e.length;g<h;g++)f.push("["+e[g][0]+","+e[g][1]+"]");return"["+f.join(",")+"]"}function c(e){for(var f=[],g=0,h=e.length;g<h;g++)f.push(b(e[g]));return"["+f.join(",")+"]"}var d=
"{";if(a.x)d+="x:"+a.x+",y:"+a.y;else if(a.xmin)d+="xmin:"+a.xmin+",ymin:"+a.ymin+",xmax:"+a.xmax+",ymax:"+a.ymax;else if(a.points)d+="points:"+b(a.points);else if(a.paths)d+="paths:"+c(a.paths);else if(a.rings)d+="rings:"+c(a.rings);d+="}";return d}function aa(a){var b=y[a.spatialReference.wkid||a.spatialReference.wkt];b=b||H;var c=b.inverse([a.xmin,a.ymin]);a=b.inverse([a.xmax,a.ymax]);return new i.LatLngBounds(new i.LatLng(c[1],c[0]),new i.LatLng(a[1],a[0]))}function I(a,b){var c=null,d,e,f,g,
h,j,L,Q;b=b||{};if(a){c=[];if(a.x){d=new i.Marker(m(b.markerOptions||b,{position:new i.LatLng(a.y,a.x)}));c.push(d)}else{h=a.points||a.paths||a.rings;if(!h)return c;var ba=[];e=0;for(f=h.length;e<f;e++){j=h[e];if(a.points){d=new i.Marker(m(b.markerOptions||b,{position:new i.LatLng(j[1],j[0])}));c.push(d)}else{Q=[];d=0;for(g=j.length;d<g;d++){L=j[d];Q.push(new i.LatLng(L[1],L[0]))}if(a.paths){d=new i.Polyline(m(b.polylineOptions||b,{path:Q}));c.push(d)}else a.rings&&ba.push(Q)}}if(a.rings){d=new i.Polygon(m(b.polygonOptions||
b,{paths:ba}));c.push(d)}}}return c}function ca(a,b){if(a){var c,d,e;c=0;for(d=a.length;c<d;c++){e=a[c];if(e.geometry)e.geometry=I(e.geometry,b)}}}function V(a){var b;if(typeof a==="object")if(q(a)){b=[];for(var c=0,d=a.length;c<d;c++)b.push(V(a[c]));return"["+b.join(",")+"]"}else if(U(a))return G(a);else if(a.toJSON)return a.toJSON();else{b="";for(c in a)if(a.hasOwnProperty(c)){if(b.length>0)b+=", ";b+=c+":"+V(a[c])}return"{"+b+"}"}return a.toString()}function da(a){var b,c,d,e=[];b=0;for(c=a.length;b<
c;b++){d=a[b];if(d instanceof i.Marker)d=d.getPosition();e.push({geometry:{x:d.lng(),y:d.lat(),spatialReference:{wkid:4326}}})}return{type:'"features"',features:e,doNotLocateOnRestrictedElements:false}}function ea(a){var b={};if(!a)return null;var c=[],d,e;if(a.geometries&&a.geometries.length>0){d=a.geometries[0];e=U(d);for(var f=0,g=a.geometries.length;f<g;f++)e?c.push(G(a.geometries[f])):c.push(ka(a.geometries[f]))}if(!a.geometryType)a.geometryType=P(d);if(e)b.inSR=H.wkid;else if(a.inSpatialReference)b.inSR=
K(a.inSpatialReference);if(a.outSpatialReference)b.outSR=K(a.outSpatialReference);b.geometries='{geometryType:"'+a.geometryType+'", geometries:['+c.join(",")+"]}";return b}function fa(a){var b="";if(a){a.f=a.f||"json";for(var c in a)if(a.hasOwnProperty(c)&&a[c]!==null&&a[c]!==undefined){var d=V(a[c]);b+=c+"="+(escape?escape(d):encodeURIComponent(d))+"&"}}return b}function o(a,b,c,d){var e="ags_jsonp"+la++ +"_"+Math.floor(Math.random()*1E6),f=null;b=fa(b);b+=(c||"callback")+"=ags_jsonp."+e;var g=document.getElementsByTagName("head")[0];
if(!g)throw new Error("document must have header tag");R.ags_jsonp[e]=function(){delete R.ags_jsonp[e];f&&g.removeChild(f);f=null;d.apply(null,arguments);E(z,"jsonpend",e)};if((b+a).length<2E3&&!M.alwaysUseProxy){f=document.createElement("script");f.src=a+(a.indexOf("?")===-1?"?":"&")+b;f.id=e;g.appendChild(f)}else{c=window.location;c=c.protocol+"//"+c.hostname+(!c.port||c.port===80?"":":"+c.port+"/");var h=true;if(a.toLowerCase().indexOf(c.toLowerCase())!==-1)h=false;if(M.alwaysUseProxy)h=true;if(h&&
!M.proxyUrl)throw new Error("No proxyUrl property in Config is defined");var j=ja();j.onreadystatechange=function(){if(j.readyState===4)if(j.status===200)eval(j.responseText);else throw new Error("Error code "+j.status);};j.open("POST",h?M.proxyUrl+"?"+a:a,true);j.setRequestHeader("Content-Type","application/x-www-form-urlencoded");j.send(b)}E(z,"jsonpstart",e);return e}function l(a){a=a||{};this.wkid=a.wkid;this.wkt=a.wkt}function S(a){a=a||{};l.call(this,a)}function u(a){a=a||{};l.call(this,a);
var b=a.inverse_flattening,c=a.standard_parallel_1*k,d=a.standard_parallel_2*k,e=a.latitude_of_origin*k;this.a_=a.semi_major/a.unit;this.lamda0_=a.central_meridian*k;this.FE_=a.false_easting;this.FN_=a.false_northing;a=1/b;b=2*a-a*a;this.e_=Math.sqrt(b);a=this.calc_m_(c,b);b=this.calc_m_(d,b);e=this.calc_t_(e,this.e_);c=this.calc_t_(c,this.e_);d=this.calc_t_(d,this.e_);this.n_=Math.log_(a/b)/Math.log_(c/d);this.F_=a/(this.n_*Math.pow(c,this.n_));this.rho0_=this.calc_rho_(this.a_,this.F_,e,this.n_)}
function A(a){a=a||{};l.call(this,a);this.a_=a.semi_major/a.unit;var b=a.inverse_flattening;this.k0_=a.scale_factor;var c=a.latitude_of_origin*k;this.lamda0_=a.central_meridian*k;this.FE_=a.false_easting;this.FN_=a.false_northing;a=1/b;this.es_=2*a-a*a;this.ep4_=this.es_*this.es_;this.ep6_=this.ep4_*this.es_;this.eas_=this.es_/(1-this.es_);this.M0_=this.calc_m_(c,this.a_,this.es_,this.ep4_,this.ep6_)}function B(a){a=a||{};l.call(this,a);this.a_=(a.semi_major||6378137)/(a.unit||1);this.lamda0_=(a.central_meridian||
0)*k}function v(a){a=a||{};l.call(this,a);var b=a.inverse_flattening,c=a.standard_parallel_1*k,d=a.standard_parallel_2*k,e=a.latitude_of_origin*k;this.a_=a.semi_major/a.unit;this.lamda0_=a.central_meridian*k;this.FE_=a.false_easting;this.FN_=a.false_northing;a=1/b;b=2*a-a*a;this.e_=Math.sqrt(b);a=this.calc_m_(c,b);b=this.calc_m_(d,b);c=this.calc_q_(c,this.e_);d=this.calc_q_(d,this.e_);e=this.calc_q_(e,this.e_);this.n_=(a*a-b*b)/(d-c);this.C_=a*a+this.n_*c;this.rho0_=this.calc_rho_(this.a_,this.C_,
this.n_,e)}function C(a){this.url=a;this.definition=null}function n(a,b){this.url=a;this.loaded_=false;var c=a.split("/");this.name=c[c.length-2].replace(/_/g," ");b=b||{};b.deferLoad||this.load()}function N(a){this.url=a;this.loaded=false;var b=this;o(a,{},"",function(c){b.init_(c)})}function W(a){this.url=a}function ga(a){this.url=a;this.loaded=false;var b=this;o(a,{},"",function(c){m(c,b);b.loaded=true;triggerEvent(b,"load")})}function ha(a){this.url=a}function w(a){this.lods_=a?a.lods:null;this.spatialReference_=
a?y[a.spatialReference.wkid||a.spatialReference.wkt]:O;if(!this.spatialReference_)throw new Error("unsupported Spatial Reference");this.resolution0_=a?a.lods[0].resolution:156543.033928;this.minZoom=Math.floor(Math.log_(this.spatialReference_.getCircum()/this.resolution0_/256)/Math.LN2+0.5);this.maxZoom=a?this.minZoom+this.lods_.length-1:20;if(i.Size)this.tileSize_=a?new i.Size(a.cols,a.rows):new i.Size(256,256);this.scale_=Math.pow(2,this.minZoom)*this.resolution0_;this.originX_=a?a.origin.x:-2.0037508342787E7;
this.originY_=a?a.origin.y:2.0037508342787E7;if(a)for(var b,c=0;c<a.lods.length-1;c++){b=a.lods[c].resolution/a.lods[c+1].resolution;if(b>2.001||b<1.999)throw new Error("This type of map cache is not supported in V3. \nScale ratio between zoom levels must be 2");}}function x(a,b){b=b||{};if(b.opacity){this.opacity_=b.opacity;delete b.opacity}m(b,this);this.mapService_=a instanceof n?a:new n(a);if(b.hosts){var c=p(this.mapService_.url,"","://"),d=p(this.mapService_.url,"://","/");d=p(this.mapService_.url,
c+"://"+d,"");this.urlTemplate_=c+"://"+b.hosts+d;this.numOfHosts_=parseInt(p(b.hosts,"[","]"),10)}this.name=this.name||this.mapService_.name;this.maxZoom=this.maxZoom||19;this.minZoom=this.minZoom||0;if(this.mapService_.loaded)this.init_(b);else{var e=this;i.event.addListenerOnce(this.mapService_,"load",function(){e.init_(b)})}this.tiles_={};this.map_=b.map}function J(a,b){b=b||{};var c;if(b.opacity){this.opacity_=b.opacity;delete b.opacity}m(b,this);var d=a;if(D(a))d=[new x(a,b)];else if(a instanceof
n)d=[new x(a,b)];else if(a instanceof x)d=[a];else if(a.length>0&&D(a[0])){d=[];for(c=0;c<a.length;c++)d[c]=new x(a[c],b)}this.tileLayers_=d;this.tiles_={};if(b.maxZoom!==undefined)this.maxZoom=b.maxZoom;else{var e=0;for(c=0;c<d.length;c++)e=Math.max(e,d[c].maxZoom);this.maxZoom=e}if(d[0].projection_){this.tileSize=d[0].projection_.tileSize_;this.projection=d[0].projection_}else this.tileSize=new i.Size(256,256);if(!this.name)this.name=d[0].name}function s(a,b){b=b||{};this.mapService_=a instanceof
n?a:new n(a);this.opacity_=b.opacity||1;this.exportOptions_=b.exportOptions||{};this.needsNewRefresh_=this.drawing_=false;this.div_=null;b.map&&this.setMap(b.map)}var k=Math.PI/180,la=0,R=window;R.ags_jsonp=R.ags_jsonp||{};var ia={},i=google.maps,H,X,O,Y,M={proxyUrl:null,alwaysUseProxy:false},y={},z={},r={POINT:"esriGeometryPoint",MULTIPOINT:"esriGeometryMultipoint",POLYLINE:"esriGeometryPolyline",POLYGON:"esriGeometryPolygon",ENVELOPE:"esriGeometryEnvelope"};z.getJSON_=function(a,b,c,d){o(a,b,c,
d)};z.addToMap=function(a,b){if(q(b))for(var c,d=0,e=b.length;d<e;d++){c=b[d];if(q(c))z.addToMap(a,c);else U(c)&&c.setMap(a)}};z.removeFromMap=function(a,b){z.addToMap(null,a);if(b)a.length=0};l.prototype.forward=function(a){return a};l.prototype.inverse=function(a){return a};l.prototype.getCircum=function(){return 360};l.prototype.toJSON=function(){return"{"+(this.wkid?" wkid:"+this.wkid:"wkt: '"+this.wkt+"'")+"}"};S.prototype=new l;u.prototype=new l;u.prototype.calc_m_=function(a,b){var c=Math.sin(a);
return Math.cos(a)/Math.sqrt(1-b*c*c)};u.prototype.calc_t_=function(a,b){var c=b*Math.sin(a);return Math.tan(Math.PI/4-a/2)/Math.pow((1-c)/(1+c),b/2)};u.prototype.calc_rho_=function(a,b,c,d){return a*b*Math.pow(c,d)};u.prototype.calc_phi_=function(a,b,c){c=b*Math.sin(c);return Math.PI/2-2*Math.atan(a*Math.pow((1-c)/(1+c),b/2))};u.prototype.solve_phi_=function(a,b,c){var d=0;c=c;for(var e=this.calc_phi_(a,b,c);Math.abs(e-c)>1.0E-9&&d<10;){d++;c=e;e=this.calc_phi_(a,b,c)}return e};u.prototype.forward=
function(a){var b=a[0]*k;a=this.calc_rho_(this.a_,this.F_,this.calc_t_(a[1]*k,this.e_),this.n_);b=this.n_*(b-this.lamda0_);return[this.FE_+a*Math.sin(b),this.FN_+this.rho0_-a*Math.cos(b)]};u.prototype.inverse=function(a){var b=a[0]-this.FE_,c=a[1]-this.FN_;a=Math.atan(b/(this.rho0_-c));b=Math.pow((this.n_>0?1:-1)*Math.sqrt(b*b+(this.rho0_-c)*(this.rho0_-c))/(this.a_*this.F_),1/this.n_);b=this.solve_phi_(b,this.e_,Math.PI/2-2*Math.atan(b));return[(a/this.n_+this.lamda0_)/k,b/k]};u.prototype.getCircum=
function(){return Math.PI*2*this.a_};A.prototype=new l;A.prototype.calc_m_=function(a,b,c,d,e){return b*((1-c/4-3*d/64-5*e/256)*a-(3*c/8+3*d/32+45*e/1024)*Math.sin(2*a)+(15*d/256+45*e/1024)*Math.sin(4*a)-35*e/3072*Math.sin(6*a))};A.prototype.forward=function(a){var b=a[1]*k,c=a[0]*k;a=this.a_/Math.sqrt(1-this.es_*Math.pow(Math.sin(b),2));var d=Math.pow(Math.tan(b),2),e=this.eas_*Math.pow(Math.cos(b),2);c=(c-this.lamda0_)*Math.cos(b);var f=this.calc_m_(b,this.a_,this.es_,this.ep4_,this.ep6_);return[this.FE_+
this.k0_*a*(c+(1-d+e)*Math.pow(c,3)/6+(5-18*d+d*d+72*e-58*this.eas_)*Math.pow(c,5)/120),this.FN_+this.k0_*(f-this.M0_)+a*Math.tan(b)*(c*c/2+(5-d+9*e+4*e*e)*Math.pow(c,4)/120+(61-58*d+d*d+600*e-330*this.eas_)*Math.pow(c,6)/720)]};A.prototype.inverse=function(a){var b=a[0],c=a[1];a=(1-Math.sqrt(1-this.es_))/(1+Math.sqrt(1-this.es_));c=(this.M0_+(c-this.FN_)/this.k0_)/(this.a_*(1-this.es_/4-3*this.ep4_/64-5*this.ep6_/256));a=c+(3*a/2-27*Math.pow(a,3)/32)*Math.sin(2*c)+(21*a*a/16-55*Math.pow(a,4)/32)*
Math.sin(4*c)+151*Math.pow(a,3)/6*Math.sin(6*c)+1097*Math.pow(a,4)/512*Math.sin(8*c);c=this.eas_*Math.pow(Math.cos(a),2);var d=Math.pow(Math.tan(a),2),e=this.a_/Math.sqrt(1-this.es_*Math.pow(Math.sin(a),2)),f=this.a_*(1-this.es_)/Math.pow(1-this.es_*Math.pow(Math.sin(a),2),1.5);b=(b-this.FE_)/(e*this.k0_);e=a-e*Math.tan(a)/f*(b*b/2-(5+3*d+10*c-4*c*c-9*this.eas_)*Math.pow(b,4)/24+(61+90*d+28*c+45*d*d-252*this.eas_-3*c*c)*Math.pow(b,6)/720);return[(this.lamda0_+(b-(1+2*d+c)*Math.pow(b,3)/6+(5-2*c+28*
d-3*c*c+8*this.eas_+24*d*d)*Math.pow(b,5)/120)/Math.cos(a))/k,e/k]};A.prototype.getCircum=function(){return Math.PI*2*this.a_};B.prototype=new l;B.prototype.forward=function(a){var b=a[1]*k;return[this.a_*(a[0]*k-this.lamda0_),this.a_/2*Math.log_((1+Math.sin(b))/(1-Math.sin(b)))]};B.prototype.inverse=function(a){return[(a[0]/this.a_+this.lamda0_)/k,(Math.PI/2-2*Math.atan(Math.exp(-a[1]/this.a_)))/k]};v.prototype=new l;v.prototype.calc_m_=function(a,b){var c=Math.sin(a);return Math.cos(a)/Math.sqrt(1-
b*c*c)};v.prototype.calc_q_=function(a,b){var c=b*Math.sin(a);return(1-b*b)*(Math.sin(a)/(1-c*c)-1/(2*b)*Math.log_((1-c)/(1+c)))};v.prototype.calc_rho_=function(a,b,c,d){return a*Math.sqrt(b-c*d)/c};v.prototype.calc_phi_=function(a,b,c){var d=b*Math.sin(c);return c+(1-d*d)*(1-d*d)/(2*Math.cos(c))*(a/(1-b*b)-Math.sin(c)/(1-d*d)+Math.log_((1-d)/(1+d))/(2*b))};v.prototype.solve_phi_=function(a,b,c){var d=0;c=c;for(var e=this.calc_phi_(a,b,c);Math.abs(e-c)>1.0E-8&&d<10;){d++;c=e;e=this.calc_phi_(a,b,
c)}return e};v.prototype.forward=function(a){var b=a[0]*k;a=this.calc_rho_(this.a_,this.C_,this.n_,this.calc_q_(a[1]*k,this.e_));b=this.n_*(b-this.lamda0_);return[this.FE_+a*Math.sin(b),this.FN_+this.rho0_-a*Math.cos(b)]};v.prototype.inverse=function(a){var b=a[0]-this.FE_,c=a[1]-this.FN_;a=Math.sqrt(b*b+(this.rho0_-c)*(this.rho0_-c));var d=this.n_>0?1:-1;b=Math.atan(d*b/(d*this.rho0_-d*c));a=(this.C_-a*a*this.n_*this.n_/(this.a_*this.a_))/this.n_;a=this.solve_phi_(a,this.e_,Math.asin(a/2));return[(b/
this.n_+this.lamda0_)/k,a/k]};v.prototype.getCircum=function(){return Math.PI*2*this.a_};B.prototype.getCircum=function(){return Math.PI*2*this.a_};H=new S({wkid:4326});X=new S({wkid:4269});O=new B({wkid:102113,semi_major:6378137,central_meridian:0,unit:1});Y=new B({wkid:102100,semi_major:6378137,central_meridian:0,unit:1});y={"4326":H,"4269":X,"102113":O,"102100":Y};l.WGS84=H;l.NAD83=X;l.WEB_MERCATOR=O;l.WEB_MERCATOR_AUX=Y;l.register=function(a,b){var c=y[""+a];if(c)return c;if(b instanceof l)c=
y[""+a]=b;else{c=b||a;var d={wkt:a};if(a===parseInt(a,10))d={wkid:a};var e=p(c,'PROJECTION["','"]'),f=p(c,"SPHEROID[","]").split(",");if(e!==""){d.unit=parseFloat(p(p(c,"PROJECTION",""),"UNIT[","]").split(",")[1]);d.semi_major=parseFloat(f[1]);d.inverse_flattening=parseFloat(f[2]);d.latitude_of_origin=parseFloat(p(c,'"Latitude_Of_Origin",',"]"));d.central_meridian=parseFloat(p(c,'"Central_Meridian",',"]"));d.false_easting=parseFloat(p(c,'"False_Easting",',"]"));d.false_northing=parseFloat(p(c,'"False_Northing",',
"]"))}switch(e){case "":c=new l(d);break;case "Lambert_Conformal_Conic":d.standard_parallel_1=parseFloat(p(c,'"Standard_Parallel_1",',"]"));d.standard_parallel_2=parseFloat(p(c,'"Standard_Parallel_2",',"]"));c=new u(d);break;case "Transverse_Mercator":d.scale_factor=parseFloat(p(c,'"Scale_Factor",',"]"));c=new A(d);break;case "Albers":d.standard_parallel_1=parseFloat(p(c,'"Standard_Parallel_1",',"]"));d.standard_parallel_2=parseFloat(p(c,'"Standard_Parallel_2",',"]"));c=new v(d);break;default:throw new Error(e+
"  not supported");}if(c)y[""+a]=c}return c};C.prototype.load=function(){var a=this;this.loaded_||o(this.url,{},"",function(b){m(b,a);a.loaded_=true;E(a,"load")})};C.prototype.isInScale=function(a){if(this.maxScale&&this.maxScale>a)return false;if(this.minScale&&this.minScale<a)return false;return true};C.prototype.query=function(a,b,c){if(a){var d=m(a,{});if(a.geometry&&!D(a.geometry)){d.geometry=G(a.geometry);d.geometryType=P(a.geometry);d.inSR=4326}if(a.spatialRelationship){d.spatialRel=a.spatialRelationship;
delete d.spatialRelationship}if(a.outFields&&!q(a.outFields))d.outFields=a.outFields.join(",");if(a.objectIds)d.objectIds=a.objectIds.join(",");if(a.time)d.time=Z(a.time,a.endTime);d.outSR=4326;d.returnGeometry=a.returnGeometry===false?false:true;d.returnIdsOnly=a.returnIdsOnly===true?true:false;delete d.overlayOptions;o(this.url+"/query",d,"",function(e){ca(e.features,a.overlayOptions);b(e,e.error);t(c,e)})}};C.prototype.queryRelatedRecords=function(a,b,c){if(a){a=m(a,{});a.f=a.f||"json";if(a.outFields&&
!D(a.outFields))a.outFields=a.outFields.join(",");a.returnGeometry=a.returnGeometry===false?false:true;o(this.url+"/query",a,"",function(d){t(c,d);b(d)})}};n.prototype.load=function(){var a=this;o(this.url,{},"",function(b){a.init_(b)})};n.prototype.init_=function(a){var b=this;m(a,this);this.spatialReference=a.spatialReference.wkt?l.register(a.spatialReference.wkt):y[a.spatialReference.wkid];a.tables!==undefined?o(this.url+"/layers",{},"",function(c){b.initLayers_(c)}):b.initLayers_(a)};n.prototype.initLayers_=
function(a){var b=[],c=[];this.layers_=b;if(a.tables)this.tables_=c;var d,e,f,g;e=0;for(f=a.layers.length;e<f;e++){g=a.layers[e];d=new C(this.url+"/"+g.id);m(g,d);d.visible=d.defaultVisibility;b.push(d)}if(a.tables){e=0;for(f=a.tables.length;e<f;e++){g=a.tables[e];d=new C(this.url+"/"+g.id);m(g,d);c.push(d)}}e=0;for(f=b.length;e<f;e++){d=b[e];if(d.subLayerIds){d.subLayers=[];a=0;for(c=d.subLayerIds.length;a<c;a++){g=this.getLayer(d.subLayerIds[a]);d.subLayers.push(g);g.parentLayer=d}}}this.loaded_=
true;E(this,"load")};n.prototype.getLayer=function(a){var b=this.layers_;if(b)for(var c=0,d=b.length;c<d;c++){if(a===b[c].id)return b[c];if(D(a)&&b[c].name.toLowerCase()===a.toLowerCase())return b[c]}return null};n.prototype.getLayerDefs_=function(){var a={};if(this.layers_)for(var b=0,c=this.layers_.length;b<c;b++){var d=this.layers_[b];if(d.definition)a[String(d.id)]=d.definition}return a};n.prototype.hasLoaded=function(){return this.loaded_};n.prototype.getVisibleLayerIds_=function(){var a=[];
if(this.layers_){var b,c,d;c=0;for(d=this.layers_.length;c<d;c++){b=this.layers_[c];if(b.subLayers)for(var e=0,f=b.subLayers.length;e<f;e++)if(b.subLayers[e].visible===false){b.visible=false;break}}c=0;for(d=this.layers_.length;c<d;c++){b=this.layers_[c];b.visible===true&&a.push(b.id)}}return a};n.prototype.getInitialBounds=function(){if(this.initialExtent)return aa(this.initialExtent);return null};n.prototype.getLayers=function(){return this.layers_};n.prototype.getTables=function(){return this.tables_};
n.prototype.exportMap=function(a,b,c){if(a&&a.bounds){var d={};d.f=a.f;var e=a.bounds;d.bbox=""+e.getSouthWest().lng()+","+e.getSouthWest().lat()+","+e.getNorthEast().lng()+","+e.getNorthEast().lat();d.size=""+a.width+","+a.height;d.dpi=a.dpi;if(a.imageSR)d.imageSR=a.imageSR.wkid?a.imageSR.wkid:"{wkt:"+a.imageSR.wkt+"}";d.bboxSR="4326";d.format=a.format;e=a.layerDefinitions;if(e===undefined)e=this.getLayerDefs_();d.layerDefs=T(e);e=a.layerIds;var f=a.layerOption||"show";if(e===undefined)e=this.getVisibleLayerIds_();
if(e.length>0)d.layers=f+":"+e.join(",");else if(this.loaded_&&b){b({href:null});return}d.transparent=a.transparent===false?false:true;if(a.time)d.time=Z(a.time,a.endTime);d.layerTimeOptions=a.layerTimeOptions;if(d.f==="image")return this.url+"/export?"+fa(d);else o(this.url+"/export",d,"",function(g){if(g.extent){g.bounds=aa(g.extent);delete g.extent;b(g)}else t(c,g.error)})}};n.prototype.identify=function(a,b,c){if(a){var d={};d.geometry=G(a.geometry);d.geometryType=P(a.geometry);d.mapExtent=G(a.bounds);
d.tolerance=a.tolerance||2;d.sr=4326;d.imageDisplay=""+a.width+","+a.height+","+(a.dpi||96);d.layers=a.layerOption||"all";if(a.layerIds)d.layers+=":"+a.layerIds.join(",");if(a.layerDefs)d.layerDefs=T(a.layerDefs);d.maxAllowableOffset=a.maxAllowableOffset;d.returnGeometry=a.returnGeometry===false?false:true;o(this.url+"/identify",d,"",function(e){var f,g,h;if(e.results)for(f=0;f<e.results.length;f++){g=e.results[f];h=I(g.geometry,a.overlayOptions);g.feature={geometry:h,attributes:g.attributes};delete g.attributes}b(e);
t(c,e)})}};n.prototype.find=function(a,b,c){if(a){var d=m(a,{});if(a.layerIds){d.layers=a.layerIds.join(",");delete d.layerIds}if(a.searchFields)d.searchFields=a.searchFields.join(",");d.contains=a.contains===false?false:true;if(a.layerDefinitions){d.layerDefs=T(a.layerDefinitions);delete d.layerDefinitions}d.sr=4326;d.returnGeometry=a.returnGeometry===false?false:true;o(this.url+"/find",d,"",function(e){var f,g,h;if(e.results)for(f=0;f<e.results.length;f++){g=e.results[f];h=I(g.geometry,a.overlayOptions);
g.feature={geometry:h,attributes:g.attributes};delete g.attributes}b(e);t(c,e)})}};n.prototype.queryLayer=function(a,b,c,d){(a=this.getLayer(a))&&a.query(b,c,d)};N.prototype.init_=function(a){m(a,this);if(a.spatialReference)this.spatialReference=y[a.spatialReference.wkid||a.spatialReference.wkt]||H;this.loaded=true;E(this,"load")};N.prototype.findAddressCandidates=function(a,b,c){a=m(a,{});if(a.inputs){m(a.inputs,a);delete a.inputs}if(q(a.outFields))a.outFields=a.outFields.join(",");a.outSR=4326;
var d=this;o(this.url+"/findAddressCandidates",a,"",function(e){if(e.candidates)for(var f,g,h=0;h<e.candidates.length;h++){f=e.candidates[h];g=f.location;if(!isNaN(g.x)&&!isNaN(g.y)){g=[g.x,g.y];if(d.spatialReference)g=d.spatialReference.inverse(g);f.location=new i.LatLng(g[1],g[0])}}b(e);t(c,e)})};N.prototype.geocode=function(a,b){this.findAddressCandidates(a,b)};N.prototype.reverseGeocode=function(a,b,c){if(!D(a.location))a.location=G(a.location);a.outSR=4326;var d=this;o(this.url+"/reverseGeocode",
a,"",function(e){if(e.location){var f=e.location;if(!isNaN(f.x)&&!isNaN(f.y)){f=[f.x,f.y];if(d.spatialReference)f=d.spatialReference.inverse(f);e.location=new i.LatLng(f[1],f[0])}}b(e);t(c,e)})};W.prototype.project=function(a,b,c){var d=ea(a);o(this.url+"/project",d,"callback",function(e){var f=[];if(a.outSpatialReference===4326||a.outSpatialReference.wkid===4326){for(var g=0,h=e.geometries.length;g<h;g++)f.push(I(e.geometries[g]));e.geometries=f}b(e);t(c,e)})};W.prototype.buffer=function(a,b,c){var d=
ea(a);if(a.bufferSpatialReference)d.bufferSR=K(a.bufferSpatialReference);d.outSR=4326;d.distances=a.distances.join(",");if(a.unit)d.unit=a.unit;o(this.url+"/buffer",d,"callback",function(e){var f=[];if(e.geometries)for(var g=0,h=e.geometries.length;g<h;g++)f.push(I(e.geometries[g],a.overlayOptions));e.geometries=f;b(e);t(c,e)})};ga.prototype.execute=function(a,b,c){var d={};a.parameters&&m(a.parameters,d);d["env:outSR"]=a.outSpatialReference?K(a.outSpatialReference):4326;if(a.processSpatialReference)d["env:processSR"]=
K(a.processSpatialReference);o(this.url+"/execute",d,"",function(e){if(e.results)for(var f,g,h=0;h<e.results.length;h++){f=e.results[h];if(f.dataType==="GPFeatureRecordSetLayer")for(var j=0,L=f.value.features.length;j<L;j++){g=f.value.features[j];if(g.geometry)g.geometry=I(g.geometry,a.overlayOptions)}}b(e);t(c,e)})};ha.prototype.solve=function(a,b,c){if(a){var d=m(a,{});if(q(a.stops))d.stops=da(a.stops);if(q(a.barriers))if(a.barriers.length>0)d.barriers=da(a.barriers);else delete d.barriers;d.returnRoutes=
a.returnRoutes===false?false:true;d.returnDirections=a.returnDirections===true?true:false;d.returnBarriers=a.returnBarriers===true?true:false;d.returnStops=a.returnStops===true?true:false;o(this.url+"/solve",d,"",function(e){e.routes&&ca(e.routes.features,a.overlayOptions);b(e);t(c,e)})}};w.prototype.fromLatLngToPoint=function(a,b){if(!a||isNaN(a.lat())||isNaN(a.lng()))return null;var c=this.spatialReference_.forward([a.lng(),a.lat()]),d=b||new i.Point(0,0);d.x=(c[0]-this.originX_)/this.scale_;d.y=
(this.originY_-c[1])/this.scale_;return d};w.prototype.fromPointToLatLng=function(a){if(a===null)return null;a=this.spatialReference_.inverse([a.x*this.scale_+this.originX_,this.originY_-a.y*this.scale_]);return new i.LatLng(a[1],a[0])};w.prototype.getScale=function(a){a=a-this.minZoom;var b=0;if(this.lods_[a])b=this.lods_[a].scale;return b};w.WEB_MECATOR=new w;x.prototype.init_=function(a){if(this.mapService_.tileInfo){this.projection_=new w(this.mapService_.tileInfo);this.minZoom=a.minZoom||this.projection_.minZoom;
this.maxZoom=a.maxZoom||this.projection_.maxZoom}};x.prototype.getTileUrl=function(a,b){var c=b-(this.projection_?this.projection_.minZoom:this.minZoom),d="";if(!isNaN(a.x)&&!isNaN(a.y)&&c>=0&&a.x>=0&&a.y>=0){d=this.mapService_.url;if(this.urlTemplate_)d=this.urlTemplate_.replace("["+this.numOfHosts_+"]",""+(a.y+a.x)%this.numOfHosts_);if(this.mapService_.singleFusedMapCache===false){c=this.projection_||this.map_?this.map_.getProjection():w.WEB_MECATOR;if(!c instanceof w)c=w.WEB_MECATOR;d=c.tileSize_;
var e=1<<b,f=new i.Point(a.x*d.width/e,(a.y+1)*d.height/e);e=new i.Point((a.x+1)*d.width/e,a.y*d.height/e);f=new i.LatLngBounds(c.fromPointToLatLng(f),c.fromPointToLatLng(e));e={f:"image"};e.bounds=f;e.width=d.width;e.height=d.height;e.imageSR=c.spatialReference_;d=this.mapService_.exportMap(e)}else d=d+"/tile/"+c+"/"+a.y+"/"+a.x}return d};x.prototype.setOpacity=function(a){this.opacity_=a;var b=this.tiles_;for(var c in b)b.hasOwnProperty(c)&&F(b[c],a)};x.prototype.getOpacity=function(){return this.opacity_};
x.prototype.getMapService=function(){return this.mapService_};J.prototype.getTile=function(a,b,c){for(var d=c.createElement("div"),e="_"+a.x+"_"+a.y+"_"+b,f=0;f<this.tileLayers_.length;f++){var g=this.tileLayers_[f];if(b<=g.maxZoom&&b>=g.minZoom){var h=g.getTileUrl(a,b);if(h){var j=c.createElement(document.all?"img":"div");j.style.border="0px none";j.style.margin="0px";j.style.padding="0px";j.style.overflow="hidden";j.style.position="absolute";j.style.top="0px";j.style.left="0px";j.style.width=""+
this.tileSize.width+"px";j.style.height=""+this.tileSize.height+"px";if(document.all)j.src=h;else j.style.backgroundImage="url("+h+")";d.appendChild(j);g.tiles_[e]=j;if(g.opacity_!==undefined)F(j,g.opacity_);else this.opacity_!==undefined&&F(j,this.opacity_)}}}this.tiles_[e]=d;d.setAttribute("tid",e);return d};J.prototype.releaseTile=function(a){if(a.getAttribute("tid")){a=a.getAttribute("tid");this.tiles_[a]&&delete this.tiles_[a];for(var b=0;b<this.tileLayers_.length;b++){var c=this.tileLayers_[b];
c.tiles_[a]&&delete c.tiles_[a]}}};J.prototype.setOpacity=function(a){this.opacity_=a;var b=this.tiles_;for(var c in b)if(b.hasOwnProperty(c))for(var d=b[c].childNodes,e=0;e<d.length;e++)F(d[e],a)};J.prototype.getOpacity=function(){return this.opacity_};J.prototype.getTileLayers=function(){return this.tileLayers_};if(i.OverlayView)s.prototype=new i.OverlayView;s.prototype.onAdd=function(){var a=document.createElement("div");a.style.position="absolute";a.style.border="none";a.style.position="absolute";
this.div_=a;this.getPanes().overlayLayer.appendChild(a);this.opacity_&&F(a,this.opacity_);var b=this;this.boundsChangedListener_=i.event.addListener(this.getMap(),"bounds_changed",function(){b.refresh()})};s.prototype.onRemove=function(){i.event.removeListener(this.boundsChangedListener_);this.div_.parentNode.removeChild(this.div_);this.div_=null};s.prototype.draw=function(){if(!this.drawing_||this.needsNewRefresh_===true)this.refresh()};s.prototype.getOpacity=function(){return this.opacity_};s.prototype.setOpacity=
function(a){this.opacity_=a=Math.min(Math.max(a,0),1);F(this.div_,a)};s.prototype.getMapService=function(){return this.mapService_};s.prototype.refresh=function(){if(this.drawing_===true)this.needsNewRefresh_=true;else{var a=this.getMap(),b=a?a.getBounds():null;if(b){var c=this.exportOptions_;c.bounds=b;b=O;var d=a.getDiv();c.width=d.offsetWidth;c.height=d.offsetHeight;if((a=a.getProjection())&&a instanceof w)b=a.spatialReference_;c.imageSR=b;triggerEvent(this,"drawstart");var e=this;this.drawing_=
true;this.div_.style.backgroundImage="";this.mapService_.exportMap(c,function(f){e.drawing_=false;if(e.needsNewRefresh_===true){e.needsNewRefresh_=false;e.refresh()}else{if(f.href){var g=e.getProjection(),h=f.bounds,j=g.fromLatLngToDivPixel(h.getSouthWest());g=g.fromLatLngToDivPixel(h.getNorthEast());h=e.div_;h.style.left=j.x+"px";h.style.top=g.y+"px";h.style.width=g.x-j.x+"px";h.style.height=j.y-g.y+"px";e.div_.style.backgroundImage="url("+f.href+")";e.setOpacity(e.opacity_)}triggerEvent(e,"drawend")}})}}};
s.prototype.isHidden=function(){return!(this.visible_&&this.isInZoomRange_())};s.prototype.isInZoomRange_=function(){var a=this.getMap().getZoom();if(this.minZoom!==undefined&&a<this.minZoom||this.maxZoom!==undefined&&a>this.maxZoom)return false;return true};s.prototype.show=function(){this.visible_=true;this.div_.style.visibility="visible";this.refresh()};s.prototype.hide=function(){this.visible_=false;this.div_.style.visibility="hidden"};ia.ags={SpatialReference:l,Geographic:S,Albers:v,LambertConformalConic:u,
SphereMercator:B,TransverseMercator:A,SpatialRelationship:{INTERSECTS:"esriSpatialRelIntersects",CONTAINS:"esriSpatialRelContains",CROSSES:"esriSpatialRelCrosses",ENVELOPE_INTERSECTS:"esriSpatialRelEnvelopeIntersects",INDEX_INTERSECTS:"esriSpatialRelIndexIntersects",OVERLAPS:"esriSpatialRelOverlaps",TOUCHES:"esriSpatialRelTouches",WITHIN:"esriSpatialRelWithin"},GeometryType:r,SRUnit:{METER:9001,FOOT:9002,SURVEY_FOOT:9003,SURVEY_MILE:9035,KILLOMETER:9036,RADIAN:9101,DEGREE:9102},Catalog:function(a){this.url=
a;var b=this;o(a,{},"",function(c){m(c,b);E(b,"load")})},MapService:n,Layer:C,GeocodeService:N,GeometryService:W,GPService:function(a){this.url=a;this.loaded=false;var b=this;o(a,{},"",function(c){m(c,b);b.loaded=true;triggerEvent(b,"load")})},GPTask:ga,RouteTask:ha,Util:z,Config:M,Projection:w,TileLayer:x,MapOverlay:s,MapType:J};window.gmaps=ia})();