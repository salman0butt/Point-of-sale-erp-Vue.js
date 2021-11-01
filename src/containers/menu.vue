<script>
export default {
  name: "nav",
  data() {
    return {
      sideBarItems: [],
      sideBarItems_hr: [],
      sideBarItems_accounting: [],
      permissions: localStorage.getItem("permissions"),
    };
  },
  computed: {
    sidebarItems() {
      return [];
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
      if (this.permissions.includes("read dashboard")) {
        // this.sideBarItems.push({
        //   _name: "CSidebarNavItem",
        //   name: this.$t("menu.dashboard"),
        //   to: "/dashboard",
        //   icon: "cil-speedometer",
        // });
      }
      if (this.permissions.includes("read merchant")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: "Merchant",
          to: "/merchant",
          icon: "cil-institution",
        });
      }
      if (this.permissions.includes("read branches")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          _attrs: { class: "hide-me" },
          name: "Branches",
          to: "/branches",
          icon: "cil-lan",
        });
      }
      if (this.permissions.includes("read profile")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: "Profile",
          to: "/profile/" + localStorage.getItem("employee_id") ?? "",
          icon: "cil-lan",
        });
      }
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
        if (this.permissions.includes("read hr-salary")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Salary",
            to: "/salary/index",
            // icon: "cil-lan",
          });
        }
        if (this.permissions.includes("read hr-salary")) {
          this.sideBarItems_hr.push({
            _name: "CSidebarNavItem",
            name: "Payments",
            to: "/payments/index",
            // icon: "cil-lan",
          });
        }
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
        this.sideBarItems.push({
          _name: "CSidebarNavDropdown",
          name: "HR",
          icon: "cil-lan",
          _children: this.sideBarItems_hr,
        });
      }
      if (this.permissions.includes("read accounting")) {
        // different modules of Accouning
        if (this.permissions.includes("read accounts")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: "Accounts",
              to: "/accounting/accounts/index",
              icon: "cil-lan",
            },
          ]);
        }
        if (this.permissions.includes("read payment-methods")) {
          this.sideBarItems_accounting.push([
            {
              _name: "CSidebarNavItem",
              name: "Payment Methods",
              to: "/accounting/paymentMethods/index",
              icon: "cil-lan",
            },
          ]);
        }
        this.sideBarItems.push({
          _name: "CSidebarNavDropdown",
          name: "Accounting",
          icon: "cil-lan",
          items: this.sideBarItems_accounting,
        });
      }
      if (this.permissions.includes("read Settings")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: "Settings",
          to: "/settings",
          icon: "cil-settings",
        });
      }
      if (this.permissions.includes("read role-and-permissions")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: "Roles & Permissions",
          to: { name: "Index Roles" },
          icon: "cil-lan",
        });
      }
      if (this.permissions.includes("read customers")) {
        this.sideBarItems.push({
          _name: "CSidebarNavItem",
          name: "Customers",
          to: { name: "Index Customers" },
          icon: "cil-lan",
        });
      }
    },
  },
};
</script>
