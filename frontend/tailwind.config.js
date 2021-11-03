module.exports = {
  purge: ["./src/**/*.js", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    height: {
      500: '500px'
    },
    fontFamily: {
      sans: ["Roboto", "sans-serif"],
      serif: ['"Roboto Slab"', "serif"],
      body: ["Roboto", "sans-serif"],
    },
    extend: {
      backgroundImage: () => ({
        "login-background":
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1280.jpg')",
        "landing-background":
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url(https://www.gb-advisors.com/wp-content/uploads/2020/05/paper-3213924_1920.jpg)",
        "profile-background":
          "linear-gradient(rgba(0,0,0, 0.75), rgba(0,0,0, 0.75)), url('/src/assets/img/background-1920x1080.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
