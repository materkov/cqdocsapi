/*
Copyright 2008-2013 Concur Technologies, Inc.

Licensed under the Apache License, Version 2.0 (the "License"); you may
not use this file except in compliance with the License. You may obtain
a copy of the License at

  http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
License for the specific language governing permissions and limitations
under the License.
*/
!function(a){function n(a){$("#lang-selector a").removeClass("active"),$("#lang-selector a[data-language-name='"+a+"']").addClass("active");for(var n=0;n<e.length;n++)$(".highlight."+e[n]).hide();$(".highlight."+a).show()}function t(a){var t=(a[0],localStorage.getItem("language"));e=a,""!=location.search.substr(1)&&-1!=jQuery.inArray(location.search.substr(1),e)?(n(location.search.substr(1)),localStorage.setItem("language",location.search.substr(1))):n(null!==t&&-1!=jQuery.inArray(t,e)?t:e[0]),$("#lang-selector a").bind("click",function(){return window.location.replace("?"+$(this).data("language-name")+window.location.hash),!1})}var e=[];a.setupLanguages=t,a.activateLanguage=n,$(function(){$("#lang-selector a").on("click",function(){var a=$(this).data("language-name"),t=window.location.hash;return t&&(t=t.replace(/^#+/,"")),history&&history.pushState({},"","?"+a+"#"+t),n(a),!1}),window.onpopstate=function(){n(window.location.search.substr(1))}})}(window);