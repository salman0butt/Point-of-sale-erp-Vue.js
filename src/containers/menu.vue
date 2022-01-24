<script>
export default {
  name: "nav",
  data() {
    return {
      sideBarItems: [],
      sideBarItems_hr: [],
      sideBarItems_contacts: [],
      sideBarItems_accounting: [],
      sideBarItems_products: [],
      sideBarItems_sales: [],
      permissions: localStorage.getItem("permissions"),
    };
  },
  computed: {
    sidebarItems() {
      return [];
    },
    language() {
      return this.$store.getters.getLanguage;
    },
  },
  watch: {
    language() {
      this.sidebarItems.splice(0);
      this.sideBarItems = [];
      this.sideBarItems_hr = [];
      this.sideBarItems_contacts = [];
      this.sideBarItems_accounting = [];
      this.sideBarItems_products = [];
      this.sideBarItems_sales = [];
      this.pushingSideBarItems();
      this.sidebarItems.push({
        _name: "CSidebarNav",
        _children: this.sideBarItems,
      });
    },
  },
  created() {
    this.pushingSideBarItems();
    this.sidebarItems.push({
      _name: "CSidebarNav",
      _children: this.sideBarItems,
    });
  },
  methods: {
    pushingSideBarItems() {
      //dashboard
      if (this.permissions.includes("read dashboard")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: this.$t("menu.dashboard"),
          to: "/dashboard",
          icon: "cil-speedometer",
        });
      }

      // sales
      if (this.permissions.includes("read sales")) {
        if (this.permissions.includes("read quotations")) {
          this.sideBarItems_sales.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.sale.quotations"),
              to: "/sales/quotations",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read quotations")) {
          this.sideBarItems_sales.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.sale.invoices"),
              to: "/sales/invoices",
              icon: "cil-lan",
            },
          ]);
        }

        this.sideBarItems.push({
          _name: "CSidebarNavDropdown",
          name: this.$t("menu.sale.name"),
          icon: "cil-lan",
          items: this.sideBarItems_sales,
        });
      }
      // contacts
      if (this.permissions.includes("read contacts")) {
        // different modules of hr
        if (this.permissions.includes("read group")) {
          // this.sideBarItems_contacts.push({
          //   _name: "CSidebarNavItem",
          //   _attrs: { class: "hide-me" },
          //   name: "Groups",
          //   to: "/groups/index",
          //   icon: "cil-lan",
          // });
        }
        if (this.permissions.includes("read customers")) {
          this.sideBarItems_contacts.push({
            _name: "CSidebarNavItem",
            name: this.$t("menu.contacts.customers"),
            to: { name: "Index Customers" },
            icon: "cil-lan",
          });
        }

        if (this.permissions.includes("read suppliers")) {
          this.sideBarItems_contacts.push({
            _name: "CSidebarNavItem",
            name: this.$t("menu.contacts.suppliers"),
            to: { name: "Index Supplier" },
            icon: "cil-lan",
          });
        }

        this.sideBarItems.push({
          _name: "CSidebarNavDropdown",
          name: this.$t("menu.contacts.name"),
          icon: "cil-lan",
          _children: this.sideBarItems_contacts,
        });
      }

      // catalogs
      if (this.permissions.includes("read accounting")) {
        // different modules of Products
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_products.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.catalogs.brands"),
              to: "/catalogs/brands/index",
              icon: "cil-lan",
            },
          ]);
        }
        // different modules of Products
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_products.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.catalogs.categories"),
              to: "/catalogs/category/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_products.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.catalogs.products"),
              to: "/products/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_products.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.catalogs.receivings"),
              to: "/receivings/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_products.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.catalogs.damages"),
              to: "/catalogs/damages/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_products.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.catalogs.offers"),
              to: "/catalogs/offers/index",
              icon: "cil-lan",
            },
          ]);
        }
        // if (this.permissions.includes("read accounts")) {
        //   this.sideBarItems_products.push([
        //     {
        //       _name: "CSidebarNavItem",
        //       name: "Modifiers",
        //       to: "/modifiers/index",
        //       icon: "cil-lan",
        //     },
        //   ]);
        // }
        this.sideBarItems.push({
          _name: "CSidebarNavDropdown",
          name: this.$t("menu.catalogs.name"),
          icon: "cil-lan",
          items: this.sideBarItems_products,
        });
      }

      //Accounting
      if (this.permissions.includes("read accounting")) {
        // different modules of Accouning
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.accounting.name"),
              to: "/accounting/accounts/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read payment-methods")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.accounting.paymentMethods"),
              to: "/accounting/paymentMethods/index",
              icon: "cil-lan",
            },
          ]);
        }

        if (this.permissions.includes("read payment-methods")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.accounting.category"),
              to: "/accounting/category/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read payment-methods")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.accounting.income"),
              to: "/accounting/income/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read payment-methods")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.accounting.expense"),
              to: "/accounting/expense/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read payment-methods")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: this.$t("menu.accounting.transfer"),
              to: "/accounting/transfer/index",
              icon: "cil-lan",
            },
          ]);
        }
        // if (this.permissions.includes("read payment-methods")) {
        //   this.sideBarItems_accounting.push([
        //     {
        //       _name: "CSidebarNavItem",
        //       name: "Biller",
        //       to: "/accounting/biller/index",
        //       icon: "cil-lan",
        //     },
        //   ]);
        // }
        // if (this.permissions.includes("read payment-methods")) {
        //   this.sideBarItems_accounting.push([
        //     {
        //       _name: "CSidebarNavItem",
        //       name: "Payment Biller",
        //       to: "/accounting/paymentBiller/index",
        //       icon: "cil-lan",
        //     },
        //   ]);
        // }
        this.sideBarItems.push({
          _name: "CSidebarNavDropdown",
          name: this.$t("menu.accounting.name"),
          icon: "cil-lan",
          items: this.sideBarItems_accounting,
        });
      }

      // branches
      if (this.permissions.includes("read branches")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          _attrs: { class: "hide-me" },
          name: this.$t("menu.branches"),
          to: "/branches",
          icon: "cil-lan",
        });
      }

      // users
      if (this.permissions.includes("read Settings")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: this.$t("menu.users"),
          to: "/users/index",
          icon: "cil-settings",
        });
      }
      // merchant
      if (this.permissions.includes("read merchant")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: this.$t("menu.merchant"),
          to: "/merchant",
          icon: "cil-institution",
        });
      }

      // if (this.permissions.includes("read profile")) {
      //   this.sideBarItems.push({
      //     _name: "CSidebarNavItem",
      //     name: "Profile",
      //     to: "/profile/" + localStorage.getItem("employee_id") ?? "",
      //     icon: "cil-lan",
      //   });
      // }
      if (this.permissions.includes("read hr")) {
        // different modules of hr
        if (this.permissions.includes("read department")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Departments",
            to: "/departments/index",
            // icon: "cil-laptop",
            permission: "department-read",
          });
        }
        if (this.permissions.includes("read designation")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Designations",
            to: "/designations/index",
            // icon: "cil-moon",
          });
        }
        if (this.permissions.includes("read letter-templates")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Letter Templates",
            to: "/letterTemplates/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read employees")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Employees",
            to: "/employees/index",
            // icon: "cil-people",
          });
        }
        if (this.permissions.includes("read hr-attendance")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Attendance",
            to: "/attendance/index",
            // icon: "cil-bell",
          });
        }
        if (this.permissions.includes("read hr-leaves")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Leaves",
            to: "/leaves/index",
            // icon: "cil-userFollow",
          });
        }
        // if (this.permissions.includes("read hr-salary")) {
        this.sideBarItems_hr.push({
          _name: "CSidebarNavItem",
          name: "Salary",
          to: "/salary/index",
          // icon: "cil-lan",
        });
        // }
        // if (this.permissions.includes("read hr-salary")) {
        this.sideBarItems_hr.push({
          _name: "CSidebarNavItem",
          name: "Payments",
          to: "/payments/index",
          // icon: "cil-lan",
        });
        // }
        if (this.permissions.includes("read hr-complains")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Complains",
            to: "/complains/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-warnings")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Warnings",
            to: "/warnings/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-resignations")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Resignations",
            to: "/resignations/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-assets")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Assets",
            to: "/assets/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-awards")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Awards",
            to: "/awards/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-grades")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Grades",
            to: "/grades/index",
            // icon: "cil-basket",
          });
        }
        if (this.permissions.includes("read hr-terminations")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Terminations",
            to: "/terminations/index",
            // icon: "cil-chartPie",
          });
        }
        if (this.permissions.includes("read hr-recruitment")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavDropdown",
            name: "Recruitment",
            route: "/recruitment",
            // icon: "cil-speech",
            _children: [
              {
                _name: "CSidebarNavItem",
                name: "Job Category",
                to: "/recruitment/jobCategories/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Job Post",
                to: "/recruitment/jobPosts/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Job Candidates",
                to: "/recruitment/jobCandidates/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Job Interviewers",
                to: "/recruitment/jobInterviewers/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Job Interviewes",
                to: "/recruitment/jobInterviews/index",
                icon: "cil-lan",
              },
            ],
          });
        }
        if (this.permissions.includes("read hr-transfers")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Transfers",
            to: "/transfers/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-Trainings")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavDropdown",
            name: "Trainings",
            route: "/apps",
            // icon: "cil-layers",
            _children: [
              {
                _name: "CSidebarNavItem",
                name: "Traning Type",
                to: "/trainingTypes/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Trainers",
                to: "/trainers/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Training",
                to: "/trainings/index",
                icon: "cil-lan",
              },
            ],
          });
        }
        if (this.permissions.includes("read hr-transfers")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Courses",
            to: "/courses/index",
            // icon: "cil-lan",
          });
        }

        // this.sideBarItems.push({
        //   _name: "CSidebarNavDropdown",
        //   name: "HR",
        //   icon: "cil-lan",
        //   _children: this.sideBarItems_hr,
        // });
      }

      if (this.permissions.includes("read Settings")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: this.$t("menu.reports"),
          to: "/reports/index",
          icon: "cil-lan",
        });
      }
      if (this.permissions.includes("read Settings")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: this.$t("menu.settings"),
          to: "/settings",
          icon: "cil-settings",
        });
      }
      // if (this.permissions.includes("read role-and-permissions")) {
      //   this.sideBarItems.push({
      //     _name: "CSidebarNavItem",
      //     name: "Roles & Permissions",
      //     to: { name: "Index Roles" },
      //     icon: "cil-lan",
      //   });
      // }
    },
  },
};
</script>
