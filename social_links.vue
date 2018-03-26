<template>
    <div>
        <a href="#"><i class="fa fa-facebook"></i></a>
    						    <a href="#"><i class="fa fa-twitter"></i></a>
    						    <a href="#"><i class="fa fa-pinterest"></i></a>
    						    <a href="#"><i class="fa fa-instagram"></i></a>
						        <a href="#"><i class="fa fa-google-plus"></i></a>
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