<template>
  <CRow>
    <CCol xs="12" lg="12">
      <form @submit.prevent="isEditing ? updateDelivery() : createDelivery()">
        <CRow>
          <CCol sm="6" md="4" class="pt-2">
            <CInput
              label="Name"
              v-model="form.name"
              :class="{ error: $v.form.name.$error }"
              @input="$v.form.name.$touch()"
            />
            <div v-if="$v.form.name.$error">
              <p v-if="!$v.form.name.required" class="errorMsg">Name is required</p>
            </div>
          </CCol>

          <CCol sm="6" md="4" class="pt-2">
            <CSelect
              label="Tax"
              :value.sync="form.tax_id"
              :options="options.taxes"
              :class="{ error: $v.form.tax_id.$error }"
              @input="$v.form.tax_id.$touch()"
            />
            <div v-if="$v.form.tax_id.$error">
              <p v-if="!$v.form.tax_id.required" class="errorMsg">Tax is required</p>
            </div>
          </CCol>
          <CCol sm="6" md="4" class="pt-2">
            <CInput
              label="Rate on US"
              v-model="form.rate_on_us"
              type="number"
              placeholder="0"
              :class="{ error: $v.form.rate_on_us.$error }"
              @input="$v.form.rate_on_us.$touch()"
            />
            <div v-if="$v.form.rate_on_us.$error">
              <p v-if="!$v.form.rate_on_us.required" class="errorMsg">
                Rate on US is required
              </p>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6" md="4" class="pt-2">
            <CInput
              label="Rate on Customer"
              type="number"
              placeholder="0"
              v-model="form.rate_on_customer"
              :class="{ error: $v.form.rate_on_customer.$error }"
              @input="$v.form.rate_on_customer.$touch()"
            />
            <div v-if="$v.form.rate_on_customer.$error">
              <p v-if="!$v.form.rate_on_customer.required" class="errorMsg">
                Rate on Customer is required
              </p>
            </div>
          </CCol>

          <CCol sm="6" md="4" class="pt-2">
            <CInput
              label="Delivery Time in Day"
              type="number"
              placeholder="0"
              v-model="form.delivery_time_in_day"
              :class="{ error: $v.form.delivery_time_in_day.$error }"
              @input="$v.form.delivery_time_in_day.$touch()"
            />
            <div v-if="$v.form.delivery_time_in_day.$error">
              <p v-if="!$v.form.delivery_time_in_day.required" class="errorMsg">
                Delivery Time in Day is required
              </p>
            </div>
          </CCol>

          <CCol sm="6" md="4" class="pt-2">
            <!-- <CInput
              label="Area"
              v-model="form.area"
              :class="{ error: $v.form.area.$error }"
              @input="$v.form.area.$touch()"
            /> -->
            <label for="area">Area</label>
            <vue-tags-input
              id="area"
              v-model="area"
              placeholder="Add Area"
              :tags="areas"
              @tags-changed="(newTags) => (areas = newTags)"
              :class="{ error: $v.form.area.$error }"
              @input="$v.form.area.$touch()"
            />

            <div v-if="$v.form.area.$error">
              <p v-if="!$v.form.area.required" class="errorMsg">Area is required</p>
            </div>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="12" md="12" class="pt-2">
            <label class="typo__label"> Description</label>
            <vue-editor v-model="form.description"></vue-editor>
          </CCol>
        </CRow>
        <CRow>
          <CCol sm="6" md="4" class="pt-2">
            <CSelect
              label="Is Default"
              :value.sync="form.is_default"
              :options="options.is_default"
              :class="{ error: $v.form.is_default.$error }"
              @input="$v.form.is_default.$touch()"
            />
            <div v-if="$v.form.is_default.$error">
              <p v-if="!$v.form.is_default.required" class="errorMsg">
                Is Default is required
              </p>
            </div>
          </CCol>

          <CCol sm="6" md="4" class="pt-2">
            <CSelect
              label="Status"
              :value.sync="form.status"
              :options="options.status"
              :class="{ error: $v.form.status.$error }"
              @input="$v.form.status.$touch()"
            />
            <div v-if="$v.form.status.$error">
              <p v-if="!$v.form.status.required" class="errorMsg">Status is required</p>
            </div>
          </CCol>
        </CRow>
        <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
        <CRow>
          <CCol sm="2" md="2" class="pt-2">
            <CButton
              class="pt-2"
              progress
              timeout="2000"
              block
              color="success"
              style="float: left; margin-top: 27px"
              type="submit"
              >Save</CButton
            >
          </CCol>
        </CRow>
      </form>
    </CCol>
  </CRow>
</template>
<script>
import { required } from "vuelidate/lib/validators";
import DeliveryService from "@/services/delivery/DeliveryService";
import { VueEditor } from "vue2-editor";
import { VueTagsInput } from "@johmun/vue-tags-input";

export default {
  name: "DeliveryForm",
  components: { VueEditor, VueTagsInput },
  data: () => ({
    updatedObj: "",
    area: "",
    areas: [],
    form: {
      id: "",
      tax_id: "",
      name: "",
      rate_on_us: "",
      rate_on_customer: "",
      delivery_time_in_day: "",
      area: "",
      description: "",
      is_default: "",
      status: "",
    },
    options: {
      taxes: [
        {
          value: "",
          label: "Choose Delivery",
          disabled: true,
          selected: "",
        },
      ],
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      is_default: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "1", label: "Yes" },
        { value: "0", label: "No" },
      ],
    },
    isEditing: false,
  }),
  watch: {
    areas(newVal) {
      this.form.area = newVal
        .map(function (item) {
          return item.text;
        })
        .join(",");
    },
  },
  validations() {
    return {
      form: {
        name: { required },
        tax_id: { required },
        rate_on_us: { required },
        rate_on_customer: { required },
        delivery_time_in_day: { required },
        area: { required },
        is_default: { required },
        status: { required },
      },
    };
  },
  computed: {
    loading() {
      return this.$store.getters.loading;
    },
  },
  created() {
    this.getTaxes();
  },
  methods: {
    getDelivery(uuid) {
      this.$store.commit("set_loader");
      DeliveryService.get(uuid)
        .then(({ data }) => {
          if (data) {
            this.form.id = data.uuid;
            this.form.tax_id = data.tax?.uuid;
            this.form.name = data.name;
            this.form.rate_on_us = data.rate_on_us;
            this.form.rate_on_customer = data.rate_on_customer;
            this.form.delivery_time_in_day = data.delivery_time_in_day;
            if (data.area) {
              let splt_areas = data.area.split(",");
              splt_areas.forEach((element) => {
                this.areas.push({
                  text: element,
                  tiClasses: ["ti-valid"],
                });
              });
            }
            this.form.description = data.description;
            this.form.is_default = data.is_default == 0 ? "0" : "1";
            this.form.status = data.status;
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          this.isEditing = false;
          console.log(error);
        });
    },
    getTaxes() {
      this.$store.commit("set_loader");
      DeliveryService.getAllTaxes()
        .then(({ data }) => {
          if (data && data.data) {
            this.options.taxes = data.data.map((tax) => {
              return {
                value: tax.uuid,
                label: tax.name,
              };
            });
            this.options.taxes.unshift({
              value: "",
              label: "Choose Tax",
              disabled: true,
              selected: "",
            });
          }
          this.$store.commit("close_loader");
        })
        .catch((error) => {
          this.$store.commit("close_loader");
          console.log(error);
        });
    },
    createDelivery() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.form;
        DeliveryService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Delivery Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.$store.commit("close_loader");
              // this.updatedObj = { type: "store", payload: res.data };
              this.$emit("update-delivery");
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    updateDelivery() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        this.$store.commit("set_loader");
        let data = this.form;
        if (this.form.id === "" || this.form.id === undefined) {
          this.createDelivery();
        }
        DeliveryService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Delivery Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.isEditing = false;
              this.$store.commit("close_loader");
              this.$emit("update-delivery");
              // this.updatedObj = { type: "update", payload: res.data };
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something went Wrong",
              timer: 3600,
            });
          });
      }
    },
    resetForm() {
      this.$v.$reset();
      for (let key in this.form) {
        this.form[key] = "";
      }
      this.areas = [];
    },
    getEditData(uuid) {
      this.isEditing = true;
      this.getDelivery(uuid);
    },
  },
};
</script>
