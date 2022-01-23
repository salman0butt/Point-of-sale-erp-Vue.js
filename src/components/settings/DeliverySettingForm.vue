<template>
  <div>
    <CCard>
      <CCardHeader> Delivery </CCardHeader>
      <CCardBody>
        <Loader />
        <!-- <DeliveryForm />
        <DeliveryIndex /> -->
        <DeliveryTab />
      </CCardBody>
    </CCard>
  </div>
</template>
<script>
import Loader from "@/components/layouts/Loader";
// import DeliveryIndex from "@/components/delivery/DeliveryIndex";
// import DeliveryForm from "@/components/delivery/DeliveryForm";
import DeliveryTab from "@/components/delivery/DeliveryTab";
export default {
  name: "DeliverySettingForm",
  // components: { Loader, DeliveryIndex, DeliveryForm },
  components: { Loader, DeliveryTab },
  data: () => ({}),
};
</script>
