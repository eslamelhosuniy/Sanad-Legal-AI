

function Login() {
  return (
    <div className="login-form  min-h-screen bg-gray-50 dark:bg-neutral-darker text-neutral-medium dark:text-neutral-light">
        <form className="text-xl text-neutral-medium dark:text-neutral-light mb-12 max-w-xl mx-auto leading-relaxed">
    <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
        اسم المستخدم 
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
        />
      </div>
     <div className="mb-3">
        <label htmlFor="exampleFormControlInput2" className="form-label">
          كلمة المرور
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleFormControlInput2"
        
        />
      </div>

 
        </form>
    </div>
  );
}

export default Login;
