export default {
  methods: {
    setTitle() {
      document.title = this.title;
    },
  },
  mounted() {
    this.setTitle();
  },
};
