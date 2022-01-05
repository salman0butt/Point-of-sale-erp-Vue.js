<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateOffer() : saveOffer()">
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
                label="Type"
                :value.sync="form.type"
                :options="options.types"
                :class="{ error: $v.form.type.$error }"
                @input="$v.form.type.$touch()"
              />
              <div v-if="$v.form.type.$error">
                <p v-if="!$v.form.type.required" class="errorMsg">Type is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Allowed Per Sale"
                type="number"
                placeholder="0"
                v-model="form.allowed_per_sale"
                :class="{ error: $v.form.allowed_per_sale.$error }"
                @input="$v.form.allowed_per_sale.$touch()"
              />
              <div v-if="$v.form.allowed_per_sale.$error">
                <p v-if="!$v.form.allowed_per_sale.required" class="errorMsg">
                  Allowed Per Sale is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Description"
                placeholder="Content..."
                v-model="form.description"
              />
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Start Date"
                type="date"
                v-model="form.start_date"
                :class="{ error: $v.form.start_date.$error }"
                @input="$v.form.start_date.$touch()"
              />
              <div v-if="$v.form.start_date.$error">
                <p v-if="!$v.form.start_date.required" class="errorMsg">
                  Start Date is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="End Date"
                type="date"
                v-model="form.end_date"
                :class="{ error: $v.form.end_date.$error }"
                @input="$v.form.end_date.$touch()"
              />
              <div v-if="$v.form.end_date.$error">
                <p v-if="!$v.form.end_date.required" class="errorMsg">
                  End Date is required
                </p>
              </div>
            </CCol>
          </CRow>
          <CRow>
            <CCol
              v-if="
                form.type === 'offer_buy_x_get_discount' ||
                form.type === 'offer_x_get_y_free'
              "
              sm="6"
              md="4"
              class="pt-2"
            >
              <CInput
                label="Quantity to Buy"
                type="number"
                placeholder="0"
                min="0"
                v-model="form.quantity_to_buy"
                :class="{ error: $v.form.quantity_to_buy.$error }"
                @input="$v.form.quantity_to_buy.$touch()"
              />
              <div v-if="$v.form.quantity_to_buy.$error">
                <p v-if="!$v.form.quantity_to_buy.required" class="errorMsg">
                  Quantity to Buy is required
                </p>
              </div>
            </CCol>
            <CCol v-if="form.type === 'offer_x_get_y_free'" sm="6" md="4" class="pt-2">
              <CInput
                label="Quantity to Get"
                type="number"
                placeholder="0"
                min="0"
                v-model="form.quantity_to_get"
                :class="{ error: $v.form.quantity_to_get.$error }"
                @input="$v.form.quantity_to_get.$touch()"
              />
              <div v-if="$v.form.quantity_to_get.$error">
                <p v-if="!$v.form.quantity_to_get.required" class="errorMsg">
                  Quantity to Get is required
                </p>
              </div>
            </CCol>
            <CCol
              v-if="form.type === 'offer_spend_x_get_discount'"
              sm="6"
              md="4"
              class="pt-2"
            >
              <CInput
                label="Spend Amount"
                type="number"
                placeholder="0.00"
                min="0"
                v-model="form.spend_amount"
                :class="{ error: $v.form.spend_amount.$error }"
                @input="$v.form.spend_amount.$touch()"
              />
              <div v-if="$v.form.spend_amount.$error">
                <p v-if="!$v.form.spend_amount.required" class="errorMsg">
                  Spend Amount is required
                </p>
              </div>
            </CCol>
            <CCol
              v-if="
                form.type === 'offer_buy_x_get_discount' ||
                form.type === 'offer_discount' ||
                form.type === 'offer_spend_x_get_discount'
              "
              sm="6"
              md="4"
              class="pt-2"
            >
              <CSelect
                label="Discount Type"
                :value.sync="form.discount_type"
                :options="options.discount_type"
                :class="{ error: $v.form.discount_type.$error }"
                @input="$v.form.discount_type.$touch()"
              />
              <div v-if="$v.form.discount_type.$error">
                <p v-if="!$v.form.discount_type.required" class="errorMsg">
                  Discount Type is required
                </p>
              </div>
            </CCol>
            <CCol
              v-if="
                form.type === 'offer_buy_x_get_discount' ||
                form.type === 'offer_discount' ||
                form.type === 'offer_spend_x_get_discount'
              "
              sm="6"
              md="4"
              class="pt-2"
            >
              <CInput
                label="Discount Amount"
                type="number"
                placeholder="0.00"
                min="0"
                v-model="form.discount_amount"
                :class="{ error: $v.form.discount_amount.$error }"
                @input="$v.form.discount_amount.$touch()"
              />
              <div v-if="$v.form.discount_amount.$error">
                <p v-if="!$v.form.discount_amount.required" class="errorMsg">
                  Discount Amount is required
                </p>
              </div>
            </CCol>
          </CRow>

          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Status"
                :options="options.status"
                :value.sync="form.status"
                :class="{ error: $v.form.status.$error }"
                @input="$v.form.status.$touch()"
              />
              <div v-if="$v.form.status.$error">
                <p v-if="!$v.form.status.required" class="errorMsg">Status is required</p>
              </div>
            </CCol>
          </CRow>
          <p v-if="$v.$anyError" class="errorMsg">Please Fill the required data</p>
          <CRow class="mt-4">
            <CButton
              progress
              timeout="2000"
              block
              color="success"
              style="float: right; width: 200px; margin-left: 20px"
              type="submit"
              @click="saveAndExit = false"
              >Save & Continue</CButton
            >
            <CButton
              timeout="2000"
              block
              color="danger"
              style="float: right; width: 140px; margin-left: 20px; margin-top: 0"
              @click="saveAndExit = true"
              type="submit"
              >Save & Exit</CButton
            >
          </CRow>
        </form>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import OfferService from "@/services/offers/OfferService";
import { required } from "vuelidate/lib/validators";

export default {
  name: "OfferForm",
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      name: "",
      type: "",
      description: "",
      start_date: "",
      end_date: "",
      allowed_per_sale: "",
      status: "",
      quantity_to_buy: "",
      discount_type: "",
      discount_amount: "",
      spend_amount: "",
      quantity_to_get: "",
    },
    options: {
      status: [
        { value: "", label: "Choose Status", disabled: true, selected: "" },
        { value: "active", label: "Active" },
        { value: "inactive", label: "InActive" },
      ],
      types: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "offer_buy_x_get_discount", label: "Offer Buy X Get Discount" },
        { value: "offer_spend_x_get_discount", label: "Offer Spend X Get Discount" },
        { value: "offer_x_get_y_free", label: "Offer X Get Y Free" },
        { value: "offer_discount", label: "Offer Discount" },
      ],
      discount_type: [
        { value: "", label: "Choose Type", disabled: true, selected: "" },
        { value: "percentage", label: "Percentage" },
        { value: "fixed", label: "Fixed" },
      ],
    },
  }),
  validations() {
    if (this.form.type === "offer_buy_x_get_discount") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          allowed_per_sale: { required },
          status: { required },
          quantity_to_buy: { required },
          discount_type: { required },
          discount_amount: { required },
        },
      };
    } else if (this.form.type === "offer_spend_x_get_discount") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          allowed_per_sale: { required },
          status: { required },
          spend_amount: { required },
          discount_type: { required },
          discount_amount: { required },
        },
      };
    } else if (this.form.type === "offer_discount") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          allowed_per_sale: { required },
          status: { required },
          discount_type: { required },
          discount_amount: { required },
        },
      };
    } else if (this.form.type === "offer_x_get_y_free") {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          allowed_per_sale: { required },
          status: { required },
          quantity_to_buy: { required },
          quantity_to_get: { required },
        },
      };
    } else {
      return {
        form: {
          name: { required },
          type: { required },
          description: { required },
          start_date: { required },
          end_date: { required },
          allowed_per_sale: { required },
          status: { required },
        },
      };
    }
  },
  created() {
    this.form.id = this.$route.params.id;
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getOffer();
    }
  },
  methods: {
    saveOffer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        OfferService.create(data)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Offer Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              // this.displayData(data);

              if (this.saveAndExit) {
                this.$router.push({ path: "/offers/index" });
              } else {
                this.$router.push({
                  path: "/offers/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateOffer() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        let data = this.form;
        OfferService.update(this.form.id, data)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Offer Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.displayData(res.data);
              if (this.saveAndExit) {
                this.$router.push({ path: "/offers/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/offers/edit/" + res.data.uuid,
              //   });
              // }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    getOffer() {
      OfferService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/offers/index" });
        });
    },
    displayData(data = null) {
      if (data != null && data != "") {
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.name = data.name;
        this.form.type = data.type;
        this.form.description = data.description;
        this.form.start_date = data.start_date;
        this.form.end_date = data.end_date;
        this.form.allowed_per_sale = data.allowed_per_sale;
        this.form.status = data.status;
        if (data.type == "offer_buy_x_get_discount") {
          this.form.quantity_to_buy = data.detail.quantity_to_buy;
          this.form.discount_type = data.detail.discount_type;
          this.form.discount_amount = data.detail.discount_amount;
        }
        if (data.type == "offer_spend_x_get_discount") {
          this.form.spend_amount = data.detail.spend_amount;
          this.form.quantity_to_get = data.detail.quantity_to_get;
          this.form.discount_type = data.detail.discount_type;
          this.form.discount_amount = data.detail.discount_amount;
        }
        if (data.type == "offer_x_get_y_free") {
          this.form.quantity_to_buy = data.detail.quantity_to_buy;
          this.form.quantity_to_get = data.detail.quantity_to_get;
        }
        if (data.type == "offer_discount") {
          this.form.discount_type = data.detail.discount_type;
          this.form.discount_amount = data.detail.discount_amount;
        }
      }
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
    },
  },
};
</script>
