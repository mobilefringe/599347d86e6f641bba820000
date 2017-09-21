<template>
  <div class="row page_container">
      <div class="col-md-4 home_shortcut">
          
      </div>
      <div class="col-md-4 home_shortcut">
          
      </div>
      <div class="col-md-4 home_shortcut">
          
      </div>

  </div>
</template>

<script>
  define(["Vue", "vue!today_hours", "vue!search-component"], function(Vue, TodayHoursComponent, SearchComponent) {
    return Vue.component("home-component", {
      template: template, // the variable template will be injected
      data: function() {
        return {
          title: "MM with Vue.js!",
          description: "An example of integration of Mall Maverick with Vue.js",
          suggestionAttribute: 'name',
          search: ''
        }
      },
      created () {
          this.feature_items
      }
      computed: {
        property(){
          return this.$store.getters.getProperty;
        },
        processedStores() {
          return this.$store.getters.processedStores;
        },
        feature_items(){
            
            console.log(this.$store.state.results);
            return this.$store.state.results;
        }
      },
      methods: {
        onOptionSelect(option) {
          console.log('Selected option:', option)
        }
      }
    })
  })
</script>
