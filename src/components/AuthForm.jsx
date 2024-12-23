import {
    Form,
    Link,
    useSearchParams,
    useActionData,
    useNavigation,
  } from 'react-router-dom';
  
  import classes from './AuthForm.module.css';
  
  function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();
  
    const [searchParams] = useSearchParams();
    const isLogin = searchParams.get('mode') === 'login';
    const isSubmitting = navigation.state === 'submitting';
  
    return (
      <>
        <Form method="post" className={classes.form}>
          <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
          {data && data.errors && (
            <ul className={classes.errorMessage}>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <p>{data.message}</p>}
          <p>
            <label htmlFor="email">Email</label>
            <input id="email" type="email" name="email" required />
          </p>
          <p>
            <label htmlFor="image">Password</label>
            <input id="password" type="password" name="password" required />
          </p>
          {!isLogin &&
          <div>
            <p>
            <label htmlFor="name">Name</label>
            <input id="name" type="name" name="name" required />
          </p>
          <div>
            <label>User Type</label>
            <div className={classes.radioGroup}>
              <div className={classes.radioOption}>
                <input
                  type="radio"
                  id="developer"
                  name="userType"
                  value="developer"
                  required
                />
                <label htmlFor="developer">Developer</label>
              </div>
              <div className={classes.radioOption}>
                <input
                  type="radio"
                  id="manager"
                  name="userType"
                  value="manager"
                  required
                />
                <label htmlFor="manager">Manager</label>
              </div>
              <div className={classes.radioOption}>
                <input
                  type="radio"
                  id="qa"
                  name="userType"
                  value="qa"
                  required
                />
                <label htmlFor="qa">QA</label>
              </div>
            </div>
          </div>
          </div>
          }

          <div className={classes.actions}>
            <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
              {isLogin ? "Create new user" : "Login"}
            </Link>
            <button disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Save"}
            </button>
          </div>
        </Form>
      </>
    );
  }
  
  export default AuthForm;
  