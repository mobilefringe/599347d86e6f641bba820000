<template>
    <div>
        <a href="https://www.twitter.com/pinecentre" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a>
        <a href="https://www.facebook.com/pinecentre" target="_blank"><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
        <a href="https://www.instagram.com/pine_centre_mall" target="_blank"><i class="fa fa-instagram" aria-hidden="true"></i></a>
         
    </div>
    
</template>
<script>
    define(["Vue", "vuex", "lightbox"], function(Vue, Vuex, Lightbox) {
        Vue.use(Lightbox);
        return Vue.component("social-links", {
            template: template, // the variable template will be injected,
        });
    });
</script>