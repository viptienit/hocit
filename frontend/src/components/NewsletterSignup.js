import classes from "./NewsletterSignup.module.css";
// import { useFetcher } from "react-router-dom";
function NewsletterSignup() {
  // const fetcher = useFetcher;
  // const { data, state } = fetcher;

  return (
    <form
      // action="/newsletter"
      method="post"
      className={classes.newsletter}
    >
      <input
        type="email"
        placeholder="Sign up for newsletter..."
        aria-label="Sign up for newsletter"
      />
      <button>Sign up</button>
    </form>
  );
}

export default NewsletterSignup;
