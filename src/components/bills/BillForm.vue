<template>
  <div>
    <CRow>
      <CCol xs="12" lg="12">
        <form @submit.prevent="isEditing ? updateBill() : saveBill()">
          <CRow>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Supplier"
                :options="options.suppliers"
                :value.sync="form.supplier_id"
                :class="{ error: $v.form.supplier_id.$error }"
                @input="$v.form.supplier_id.$touch()"
              />
              <div v-if="$v.form.supplier_id.$error">
                <p v-if="!$v.form.supplier_id.required" class="errorMsg">
                  Supplier is required
                </p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CInput
                label="Date"
                type="date"
                v-model="form.date"
                :class="{ error: $v.form.date.$error }"
                @input="$v.form.date.$touch()"
              />
              <div v-if="$v.form.date.$error">
                <p v-if="!$v.form.date.required" class="errorMsg">Date is required</p>
              </div>
            </CCol>
            <CCol sm="6" md="4" class="pt-2">
              <CSelect
                label="Bill Status"
                :options="options.receiving_status"
                :value.sync="form.receiving_status"
              />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CTextarea
                label="Delevery Notes"
                placeholder="Content..."
                v-model="form.reference_id"
              />
            </CCol>
          </CRow>
          <SearchProduct searchType="receivings" :itemsData="form.items" />
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <CInput
                label="Total Cost"
                type="number"
                v-model="form.total_cost"
                :class="{ error: $v.form.total_cost.$error }"
                @input="$v.form.total_cost.$touch()"
              />
              <div v-if="$v.form.total_cost.$error">
                <p v-if="!$v.form.total_cost.required" class="errorMsg">
                  Total Cost is required
                </p>
              </div>
            </CCol>

            <CCol sm="12" md="12" class="pt-2">
              <CTextarea label="Note" placeholder="Content..." v-model="form.note" />
            </CCol>
          </CRow>
          <CRow>
            <CCol sm="12" md="12" class="pt-2">
              <app-upload ref="fileUpload" @file:changed="handleFile" />

              <div class="attachment-display">
                <ul class="mt-5 d-flex">
                  <li
                    v-for="(img, index) in display_images"
                    v-bind:key="index"
                    class="display-attachment-row"
                  >
                    <div>
                      <span>
                        <img
                          v-bind:src="img.path"
                          class="name-attachment"
                          style="max-width: 80px"
                        />
                      </span>
                    </div>
                    <span
                      >{{ img.name }}
                      <a
                        @click.prevent="deleteAttachment(img.uuid)"
                        class="delete-attachment"
                      >
                        <CIcon :content="$options.cilTrash" /> </a
                    ></span>
                  </li>
                </ul>
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
import BillService from "@/services/bills/BillService";
import { required } from "vuelidate/lib/validators";
import { cilTrash } from "@coreui/icons-pro";
import SearchProduct from "@/components/layouts/SearchProduct";
import AppUpload from "@/components/uploads/Upload.vue";

export default {
  name: "BillForm",
  components: {
    SearchProduct,
    AppUpload,
  },
  cilTrash,
  data: () => ({
    isEditing: false,
    saveAndExit: false,
    form: {
      id: "",
      supplier_id: "",
      date: "",
      note: "",
      reference_id: "",
      total_cost: "",
      receiving_status: "",
      items: [],
      product_id: "",
      images: [],
    },
    display_images: [],
    options: {
      suppliers: [{ value: "", label: "Choose Supplier", disabled: true, selected: "" }],
      receiving_status: [
        {
          value: "",
          label: "Choose Bill Status",
          disabled: true,
          selected: "",
        },
        { value: "pending", label: "Pending" },
        { value: "completed", label: "Completed" },
      ],
    },
  }),
  validations() {
    return {
      form: {
        supplier_id: { required },
        date: { required },
        total_cost: { required },
      },
    };
  },
  created() {
    this.form.id = this.$route.params.id;
    this.getAllSuppliers();
    if (this.form.id !== "" && this.form.id !== undefined) {
      this.isEditing = true;
      this.getBill();
    }
  },
  computed: {
    total_cost() {
      return this.$store.getters.getTotalBillsCost;
    },
    receivingItems() {
      return this.$store.getters.getSearchProductItems;
    },
  },
  beforeDestroy() {
    this.$store.commit("set_search_product_items", []);
  },
  watch: {
    total_cost(val) {
      this.form.total_cost = val;
    },
    receivingItems(val) {
      this.form.items = val;
    },
  },
  methods: {
    getAllSuppliers() {
      BillService.getAllSuppliers()
        .then(({ data }) => {
          if (data !== undefined && data !== "") {
            data.data.map((supplier) => {
              this.options.suppliers.push({
                value: supplier.uuid,
                label: supplier.name,
              });
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    saveBill() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = this.formData();
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        BillService.create(formData, config)
          .then((res) => {
            if (res.status == 201) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bill Added Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              this.displayData(res.data);
              this.$store.commit("close_loader");

              if (this.saveAndExit) {
                this.$router.push({ path: "/bills/index" });
              } else {
                this.$router.push({
                  path: "/bills/edit/" + res.data.uuid,
                });
              }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    updateBill() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.$store.commit("set_loader");
        let formData = this.formData(true);
        const config = {
          headers: { "Content-Type": "multipart/form-data" },
        };
        BillService.update(this.form.id, formData, config)
          .then((res) => {
            if (res.status == 200) {
              this.$swal.fire({
                icon: "success",
                title: "Success",
                text: "Bill Updated Successfully",
                timer: 3600,
              });
              this.$v.$reset();
              this.resetForm();
              this.displayData(res.data);
              this.$store.commit("close_loader");
              if (this.saveAndExit) {
                this.$router.push({ path: "/bills/index" });
              }
              //  else {
              //   this.$router.push({
              //     path: "/receivings/edit/" + res.data.uuid,
              //   });
              // }
            }
          })
          .catch((error) => {
            console.log(error);
            this.$store.commit("close_loader");
            this.$swal.fire({
              icon: "error",
              title: "Error",
              text: "Something Went Wrong.",
              timer: 3600,
            });
          });
      }
    },
    formData(update = false) {
      let formData = new FormData();
      formData.append("supplier_id", this.form.supplier_id);
      formData.append("date", this.form.date);
      formData.append("note", this.form.note);
      formData.append("reference_id", this.form.reference_id);
      formData.append("total_cost", this.form.total_cost);
      formData.append("receiving_status", this.form.receiving_status);
      formData.append("items", JSON.stringify(this.form.items));

      if (this.form.images && this.form.images.length > 0) {
        this.form.images.map((image) => {
          formData.append("images[]", image);
        });
      }

      if (update) {
        formData.append("_method", "PATCH");
      }
      return formData;
    },
    getBill() {
      BillService.get(this.form.id)
        .then(({ data }) => {
          this.displayData(data);
        })
        .catch((error) => {
          console.log(error);
          this.isEditing = false;
          this.$router.push({ path: "/bills/index" });
        });
    },
    displayData(data = null) {
      if (data != null && data != "") {
        this.isEditing = true;
        this.form.id = data.uuid;
        this.form.supplier_id = data.supplier.uuid;
        this.form.date = data.date;
        this.form.note = data.note;
        this.form.reference_id = data.reference_id;
        this.form.total_cost = data.total_cost;
        this.form.receiving_status = data.receiving_status;

        this.display_images = [];
        if (data.images && data.images.length > 0) {
          let display_images = this.display_images;
          data.images.map(function (item) {
            display_images.push(item);
          });
        }

        if (data.items && data.items.length > 0) {
          data.items.map((item) => {
            if (item && item.product_variation && item.product_variation.uuid) {
              this.form.items.push({
                uuid: item.product_variation.uuid,
                type: "variation",
                name:
                  item.product.name +
                  " (" +
                  JSON.parse(item.product_variation.name).en +
                  ")",
                cost_price: item.price?.cost_price ?? 0,
                selling_price: item.price?.selling_price_without_tax ?? 0,
                qty: item.qty,
                expiry_date: item.inventory?.expiry_date ?? "",
              });
            } else {
              this.form.items.push({
                uuid: item.product.uuid,
                type: "product",
                name: item.product.name,
                cost_price: item.price?.cost_price ?? 0,
                selling_price: item.price?.selling_price_without_tax ?? 0,
                qty: item.qty,
                expiry_date: item.inventory?.expiry_date ?? "",
              });
            }
          });
          // this.$store.commit("set_search_product_items", itemsData);
        }
      }
    },
    handleFile(files) {
      this.form.images = Object.values(files);
    },
    deleteAttachment(uuid) {
      this.$swal
        .fire({
          title: "Do you want to delete this Attachment",
          text: "This will be Deleted from Database",
          showCancelButton: true,
          confirmButtonColor: "#e55353",
          confirmButtonText: "Yes, remove it it!",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$store
              .dispatch("deleteAttachment", uuid)
              .then((res) => {
                if (res.status == 200) {
                  this.$swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Attachment Deleted Successfully",
                    timer: 3600,
                  });
                  this.display_images = this.display_images.filter(
                    (item) => item.uuid != uuid
                  );
                }
              })
              .catch((err) => {
                this.$swal.fire({
                  icon: "error",
                  title: "Error",
                  text: "Something went Wrong",
                  timer: 3600,
                });
                console.log(err);
              });
          }
        });
    },
    resetForm() {
      for (let index in this.form) {
        this.form[index] = "";
      }
      this.isEditing = false;
      this.form.items = [];
      this.form.images = [];
      this.display_images = [];
      this.$refs.fileUpload.reset();
    },
  },
};
</script>
