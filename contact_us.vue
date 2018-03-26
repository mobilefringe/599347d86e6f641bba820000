<template>
    <div class=" page_container" id="promotions_container"> <!-- for some reason if you do not put an outer container div this component template will not render -->
        <div class="margin_25_across padding_top_40">
            <div class="row">
                <div class="col-md-5 col-sm-5">
                    <div class="col-md-12" v-if="currentPage">
                        <div class="description_text text_left" v-html="currentPage.body"></div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-7 hidden_phone">
                    <img style="margin-bottom:20px;" src="//codecloud.cdn.speedyrails.net/sites/5a1f136e6e6f6472c6240000/image/png/1512580269422/placeholder_contact_image.png" alt="plaza">
                </div> 
                <!--<vue-datepicker-local v-model="time" type="inline"></vue-datepicker-local>-->
            </div>
            <hr/>
            <div class="row"> 
                <div class="col-md-12 contact_contents padding_top_20">
                    <form class="form-horizontal" action="form-submit" @submit.prevent="validateBeforeSubmit">
                        <div class="form-group ">
                            <div class="col-sm-6 col-xs-12 text-left" :class="{'has-error': errors.has('name')}">
                                <label class="label" for="name">Name</label>
                                <input v-model="form_data.name" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="name" type="text" placeholder="Name" data-vv-delay="1000">
                                <span v-show="errors.has('name')" class="form-control-feedback">{{ errors.first('name') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-xs-12 text-left" :class="{'has-error': errors.has('email')}">
                                <label class="label" for="email">Email</label>
                                <input v-model="form_data.email" v-validate="'required|email'" class="form-control" :class="{'input': true}" name="email" type="email" placeholder="Email" data-vv-delay="1000">
                                <span v-show="errors.has('email')" class="form-control-feedback">{{ errors.first('email') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-sm-6 col-xs-12 text-left" :class="{'has-error': errors.has('phone')}">
                                <label class="label" for="phone">Phone</label>
                                <input v-model="form_data.phone" v-validate="'required|alpha_dash'" class="form-control" :class="{'input': true}" name="phone" type="phone" placeholder="Phone" data-vv-delay="1000">
                                <span v-show="errors.has('phone')" class="form-control-feedback">{{ errors.first('phone') }}</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-xs-12 text-left" :class="{'has-error': errors.has('message')}">
                                <label class="label" for="message">Message</label>
                                <input v-model="form_data.message" v-validate="'required|alpha_spaces'" class="form-control" :class="{'input': true}" name="message" type="text" placeholder="Message" data-vv-delay="1000">
                                <span v-show="errors.has('message')" class="form-control-feedback">{{ errors.first('message') }}</span>
                            </div>
                        </div>
                    
                        <div class="form-group account-btn text-left m-t-10">
                            <div class="col-xs-12 text-left">
                                <button class="newsletter_btn animated_btn" type="submit" :disabled="formSuccess">Submit</button>
                            </div>
                        </div>
                    </form>
                    
                    <div id="send_contact_success" class="alert alert-success" role="alert" v-show="formSuccess">
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span>
                        <span class="sr-only">Success</span>
                        Thank you for contacting us. A member from our team will contact you shortly.
                    </div>
                    <div id="send_contact_error" class="alert alert-danger" role="alert" v-show="formError">
                        <span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                        <span class="sr-only">Error:</span>
                        There was an error when trying to submit your request. Please try again later.
                    </div>
                    
                </div>
            </div>
            <div class="padding_top_40"></div>    
        </div>
    </div>
</template>

<script>
    define(["Vue", "vuex", "moment", "moment-timezone", "vue-moment", "vue-meta", 'vee-validate', 'utility'], function(Vue, Vuex, moment, tz, VueMoment, Meta, VeeValidate,Utility) {
        Vue.use(Meta);
        Vue.use(VeeValidate);
        return Vue.component("contact-us-component", {
            template: template, // the variable template will be injected
            data: function() {
                return {
                    form_data : {},
                    formSuccess : false,
                    formError: false,
                    validaNum: '',
                    correctValNum: null,
                    validNumError: false,
                    currentPage : null,
                    pageBanner: null
                }
            },
            created(){
                this.loadData().then(response => {
                    this.currentPage = response[0].data;
                    var temp_repo = this.findRepoByName('Contact Us Banner');
                    if(temp_repo) {
                        this.pageBanner = temp_repo.images[0];
                    }
                    // this.pageBanner = this.findRepoByName('Contact Us Banner').images[0];
                   console.log(this.pageBanner); 
                });
            },
            mounted () {
                //creating random validation num 
                this.correctValNum = Utility.rannumber();//this.rannumber;
                //ensuring the variables are created in this order for email
                this.form_data.name = null;
                this.form_data.email = null;
                this.form_data.phone = null;
                this.form_data.subject = this.property.name + ' Contact Us Form';
                this.form_data.message = null;
            },
            computed: {
                ...Vuex.mapGetters([
                    'property',
                    'timezone',
                ]),
            },
            methods: {
                validateBeforeSubmit() {
                    this.$validator.validateAll().then((result) => {
                    if (result && (this.correctValNum === this.validaNum)) {
                        this.validNumError = false;
                        let errors = this.errors;
                        send_data = {};
                        send_data.form_data = JSON.stringify(Utility.serializeObject(this.form_data));
                        this.$store.dispatch("CONTACT_US", send_data).then(res => {
                            this.formSuccess = true;
                        }).catch(error => {
                            try {
                                if (error.response.status == 401) {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                } 
                                else {
                                    console.log("Data load error: " + error.message);
                                    this.formError = true;
                                }
                            } 
                            catch (e) {
                                console.log("Data load error: " + error.message);
                                this.formError = true;
                            }
                        })
                        }
                    
                    })
                },
                loadData: async function() {
                    try {
                        // avoid making LOAD_META_DATA call for now as it will cause the entire Promise.all to fail since no meta data is set up.
                        let results = await Promise.all([this.$store.dispatch('LOAD_PAGE_DATA', {url: this.property.mm_host + "	/pages/twinpines-contact-us.json"})]);
                        return results;
                    } catch (e) {
                        console.log("Error loading data: " + e.message);
                    }
                },
            }
        });
    });
</script>