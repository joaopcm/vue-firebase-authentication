<template>
  <div class="card shadow">
    <div class="card-body">
      <div class="card-title">
        <h1 v-if="!user.id" class="h3 mb-3 font-weight-normal">
          Please sign in
        </h1>
        <h1 v-else class="h3 mb-3 font-weight-normal">
          Logged in! Your id is {{ user.id }}
        </h1>
      </div>
      <div v-if="!user.id" class="row">
        <div class="col">
          <button @click="onSignInWithFacebook" class="btn btn-primary my-4">
            <i class="fab fa-facebook-square"></i>
          </button>
          <button @click="onSignInWithGoogle" class="btn btn-danger my-4 ml-1">
            <i class="fab fa-google"></i>
          </button>
        </div>
      </div>
      <p v-if="!user.id" class="text-muted">
        Or sign in using your email address
      </p>
      <div class="row">
        <div class="col">
          <form
            v-if="!user.id && signupMode"
            @submit.prevent="onSignup"
            class="form-signin"
          >
            <label for="inputEmail" class="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              v-model="email"
              required
              autofocus
            />
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              id="inputPassword"
              :class="'form-control ' + (comparePasswords ? 'is-invalid' : '')"
              placeholder="Password"
              v-model="password"
              required
            />
            <label for="inputConfirmPassword" class="sr-only"
              >Confirm password</label
            >
            <input
              v-if="signupMode"
              type="password"
              id="inputConfirmPassword"
              :class="'form-control ' + (comparePasswords ? 'is-invalid' : '')"
              placeholder="Confirm password"
              v-model="confirmPassword"
              required
            />
            <div v-if="comparePasswords" class="invalid-feedback">
              {{ comparePasswords }}
            </div>
            <button
              :disabled="comparePasswords !== ''"
              class="btn btn-lg btn-primary btn-block mt-4"
              type="submit"
            >
              {{ signupMode ? "Sign up" : "Sign in" }}
            </button>
          </form>
          <form
            v-if="!user.id && !signupMode"
            @submit.prevent="onSignin"
            class="form-signin"
          >
            <label for="inputEmail" class="sr-only">Email address</label>
            <input
              type="email"
              id="inputEmail"
              class="form-control"
              placeholder="Email address"
              v-model="email"
              required
              autofocus
            />
            <label for="inputPassword" class="sr-only">Password</label>
            <input
              type="password"
              id="inputPassword"
              class="form-control"
              placeholder="Password"
              v-model="password"
              required
            />
            <button
              :disabled="comparePasswords !== ''"
              class="btn btn-lg btn-primary btn-block mt-4"
              type="submit"
            >
              {{ signupMode ? "Sign up" : "Sign in" }}
            </button>
          </form>
          <div class="form-signin">
            <button
              v-if="!user.id"
              @click="signupMode = !signupMode"
              class="btn btn-secondary btn-block mb-4"
              type="button"
            >
              {{
                signupMode
                  ? "Sign in using your email address"
                  : "Create an account"
              }}
            </button>
            <button
              v-if="user.id"
              @click="onSignout"
              class="btn btn-danger btn-block mb-4"
              type="button"
            >
              Sign out
            </button>
          </div>
          <p class="text-muted">&copy; 2019, by João Melo</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      signupMode: false,
      email: "",
      password: "",
      confirmPassword: ""
    };
  },
  computed: {
    comparePasswords() {
      if (this.password.length < 6) {
        return "Password should be at least 6 characters.";
      } else if (this.password !== this.confirmPassword && this.signupMode) {
        return "Passwords do not match.";
      } else {
        return "";
      }
    },
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    onSignup() {
      this.$store.dispatch("signUserUp", {
        email: this.email,
        password: this.password
      });
    },
    onSignin() {
      this.$store.dispatch("signUserIn", {
        email: this.email,
        password: this.password
      });
    },
    onSignout() {
      this.$store.dispatch("signUserOut");
    },
    onSignInWithFacebook() {
      this.$store.dispatch("signUserInWithSocialMedia", "facebook");
    },
    onSignInWithGoogle() {
      this.$store.dispatch("signUserInWithSocialMedia", "google");
    }
  }
};
</script>

<style scoped>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input {
  margin-bottom: 5px;
}
</style>
