<template>
  <CDropdown
    inNav
    class="c-header-nav-items"
    placement="bottom-end"
    add-menu-classes="pt-0"
  >
    <template #toggler>
      <CHeaderNavLink>
        <div class="c-avatar">
          <img v-if="profileImg" :src="profileImg" class="c-avatar-img" />
        </div>
      </CHeaderNavLink>
    </template>

    <CDropdownItem @click="profile"> <CIcon name="cil-user" /> Profile </CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem> <CIcon name="cil-shield-alt" /> Lock Account </CDropdownItem>
    <CDropdownItem @click="logout">
      <CIcon name="cil-lock-locked" /> Logout
    </CDropdownItem>
  </CDropdown>
</template>

<script>
export default {
  name: "TheHeaderDropdownAccnt",
  data() {
    return {
      itemsCount: 42,
    };
  },
  computed: {
    profileImg() {
      return this.$store.getters.getProfileImg ?? "/img/avatars/placeholder.png";
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      return this.$router.push("/login");
    },
    profile() {
      const emp_id = localStorage.getItem("employee_id");
      if (emp_id !== "" || emp_id !== undefined) {
        this.$router.push("/profile/" + localStorage.getItem("employee_id"));
      } else {
        this.$router.dispatch("auto_logout");
      }
    },
  },
};
</script>

<style scoped>
.c-icon {
  margin-right: 0.3rem;
}
</style>
