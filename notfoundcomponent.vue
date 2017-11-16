<template>
  <div class="page_container">
    <div class="">
      <h1>{{text}}</h1>
    </div>
  </div>
</template>

<script>
  define(["Vue"], function(Vue) {
    return Vue.component("not-found-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {"text": "Custom 404 Page"};
      }
    });
  });
</script>
