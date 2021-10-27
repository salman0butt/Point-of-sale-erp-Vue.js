<script>
export default {
  name: "nav",
  data() {
    return {
      sideBarItems: [],
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
        this.sideBarItems.push(
          {
            _name: "CSidebarNavItem",
            name: "Merchant",
            to: "/merchant",
            icon: "cil-institution",
          },
          {
            _name: "CSidebarNavItem",
            _attrs: { class: "hide-me" },
            name: "Branches",
            to: "/branches",
            icon: "cil-lan",
          },

          {
            _name: "CSidebarNavItem",
            name: "Profile",
            to: "/profile/" + localStorage.getItem("employee_id") ?? "",
            icon: "cil-lan",
          },
          {
            _name: "CSidebarNavDropdown",
            name: "HR",
            icon: "cil-lan",
            _children: [
              {
                _name: "CSidebarNavItem",
                name: "Departments",
                to: "/departments/index",
                // icon: "cil-laptop",
                permission: "department-read",
              },
              {
                _name: "CSidebarNavItem",
                name: "Designations",
                to: "/designations/index",
                // icon: "cil-moon",
              },
              {
                _name: "CSidebarNavItem",
                name: "Letter Templates",
                to: "/letterTemplates/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Employees",
                to: "/employees/index",
                // icon: "cil-people",
              },
              {
                _name: "CSidebarNavItem",
                name: "Attendance",
                to: "/attendance/index",
                // icon: "cil-bell",
              },
              {
                _name: "CSidebarNavItem",
                name: "Leaves",
                to: "/leaves/index",
                // icon: "cil-userFollow",
              },
              {
                _name: "CSidebarNavItem",
                name: "Salary",
                to: "/salary/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Complains",
                to: "/complains/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Warnings",
                to: "/warnings/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Resignations",
                to: "/resignations/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Assets",
                to: "/assets/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Awards",
                to: "/awards/index",
                // icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Grades",
                to: "/grades/index",
                // icon: "cil-basket",
              },
              {
                _name: "CSidebarNavItem",
                name: "Terminations",
                to: "/terminations/index",
                // icon: "cil-chartPie",
              },
              {
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
              },
              {
                _name: "CSidebarNavItem",
                name: "Transfers",
                to: "/transfers/index",
                // icon: "cil-lan",
              },
              {
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
              },
              {
                _name: "CSidebarNavItem",
                name: "Courses",
                to: "/courses/index",
                // icon: "cil-lan",
              },
            ],
          },
          {
            _name: "CSidebarNavDropdown",
            name: "Accounting",
            icon: "cil-lan",
            items: [
              {
                _name: "CSidebarNavItem",
                name: "Accounts",
                to: "/accounting/accounts/index",
                icon: "cil-lan",
              },
              {
                _name: "CSidebarNavItem",
                name: "Payment Methods",
                to: "/accounting/paymentMethods/index",
                icon: "cil-lan",
              },
            ],
          },
          {
            _name: "CSidebarNavItem",
            name: "Settings",
            to: "/settings",
            icon: "cil-settings",
          },
          {
            _name: "CSidebarNavItem",
            name: "Roles & Permissions",
            to: { name: "Index Roles" },
            icon: "cil-lan",
          },
          {
            _name: "CSidebarNavItem",
            name: "Customers",
            to: { name: "Index Customers" },
            icon: "cil-lan",
          }
        );
      }
    },
  },
};
</script>
