"use strict";(globalThis.webpackChunkburst_statistics=globalThis.webpackChunkburst_statistics||[]).push([[898],{6898:(t,s,e)=>{e.r(s),e.d(s,{default:()=>d});var a=e(9307),i=e(9196),r=e(5778),o=e(5736),n=e(5234);const u=[{title:(0,o.__)("Welcome to Burst Statistics","burst-statistics"),text:"<p>"+(0,o.__)("The plugin is now active.","burst-statistics")+" "+(0,o.__)("Follow a quick tour and make sure everything works.","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{type:"cancel",classes:"burst-button burst-button--secondary",text:(0,o.__)("Exit tour","burst-statistics")},{classes:"burst-button burst-button--primary",text:(0,o.__)("Start tour","burst-statistics"),action(){return window.location.hash="dashboard",this.next()}}]},{title:(0,o.__)("Your dashboard","burst-statistics"),text:"<p>"+(0,o.__)("This is your Dashboard. This will give you an overview of notices, real time data, and settings.","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{classes:"burst-button burst-button--secondary",text:(0,o.__)("Previous","burst-statistics"),action(){return window.location.hash="dashboard",this.back()}},{classes:"burst-button burst-button--primary",text:(0,o.__)("Next","burst-statistics"),action(){return window.location.hash="dashboard",this.next()}}],attachTo:{element:".burst-progress",on:"auto"}},{title:(0,o.__)("Real time data","burst-statistics"),text:"<p>"+(0,o.__)("This block will show you real time visitors.","burst-statistics")+" "+(0,o.__)("To make sure Burst Statistics is setup properly, try visiting this website on another device or open a private window.","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{classes:"burst-button burst-button--secondary",text:(0,o.__)("Previous","burst-statistics"),action(){return window.location.hash="dashboard",this.back()}},{classes:"burst-button burst-button--primary",text:(0,o.__)("Next","burst-statistics"),action(){return window.location.hash="statistics",this.next()}}],attachTo:{element:".burst-today",on:"auto"}},{title:(0,o.__)("Your website statistics","burst-statistics"),text:"<p>"+(0,o.__)("This page is probably quite empty at the moment. The data from your website will show up here in a few days. So be sure to come back soon.","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{classes:"burst-button burst-button--secondary",text:(0,o.__)("Previous","burst-statistics"),action(){return window.location.hash="dashboard",this.back()}},{classes:"burst-button burst-button--primary",text:(0,o.__)("Next","burst-statistics"),action(){return window.location.hash="statistics",this.next()}}]},{title:(0,o.__)("Changing the date range","burst-statistics"),text:"<p>"+(0,o.__)("Over here you can change the date range for the data being shown. Click on two different days or click twice on a single day to show the data for that period.","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{classes:"burst-button burst-button--secondary",text:(0,o.__)("Previous","burst-statistics"),action(){return window.location.hash="statistics",this.back()}},{classes:"burst-button burst-button--primary",text:(0,o.__)("Next","burst-statistics"),action(){return window.location.hash="settings",this.next()}}],attachTo:{element:".burst-date-range-container",on:"auto"}},{title:(0,o.__)("Your configuration","burst-statistics"),text:"<p>"+(0,o.__)("You can customize Burst to your liking. Change settings to meet your needs.","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{classes:"burst-button burst-button--secondary",text:(0,o.__)("Previous","burst-statistics"),action(){return window.location.hash="statistics",this.back()}},{classes:"burst-button burst-button--primary",text:(0,o.__)("Next","burst-statistics"),action(){return window.location.hash="settings",this.next()}}],attachTo:{element:".burst-general",on:"auto"}},{title:(0,o.__)("Support & feedback","burst-statistics"),text:"<p>"+(0,o.__)("Feel free to post your questions or feedback on the WordPress forums. We are happy to help!","burst-statistics")+"</p>",classes:"burst-shepherd",buttons:[{classes:"burst-button burst-button--secondary",text:(0,o.__)("Previous","burst-statistics"),action(){return window.location.hash="settings",this.back()}},{type:"cancel",classes:"burst-button burst-button--primary",text:(0,o.__)("Exit tour","burst-statistics")}]}];let c=!1;const b=()=>{if(!c){c=!0;let t=[];t.push({id:"burst_tour_shown_once",value:"1",type:"hidden"}),n.aj(t).then((t=>{c=!1}))}},h={defaultStepOptions:{cancelIcon:{enabled:!0},keyboardNavigation:!1},useModalOverlay:!1,margin:15};function l(){const t=(0,i.useContext)(r.yP);return t.on("cancel",b),(0,i.useEffect)((()=>{t&&t.start()}),[t]),(0,a.createElement)(a.Fragment,null)}const d=()=>(0,a.createElement)(r.u4,{steps:u,tourOptions:h},(0,a.createElement)(l,null))}}]);