import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "../generated/graphql-types";
import { Link, useNavigate } from "react-router-dom";
import { GET_USER_INFO } from "../graphql/queries";

const LoginPage = ({
  setShowLogin,
}: {
  setShowLogin: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [login] = useLoginMutation({
    refetchQueries: [{ query: GET_USER_INFO }],
  });
  const navigate = useNavigate();
  type Inputs = {
    login: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log("data", data);
    login({
      variables: { data: { email: data.login, password: data.password } },
      onCompleted: () => {
        setShowLogin(false);
        navigate("/");
      },
      onError: (error) => {
        console.log("error", error);
      },
    });
  };

  const handleLinkClick = (e: any) => {
    e.preventDefault(); 
    setShowLogin(false); 
    navigate("/forgotPassword"); 
  };

  const handleCloseModal = (e: any) => {
    e.preventDefault(); 
    setShowLogin(false); 
  };
  

  return (
    <div className="loginModalContainer">
      <div className="loginModalContent">
        <div className="headerModal">
        <h2>Login</h2>
        <button onClick={handleCloseModal}>X</button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="formContent">
          <input
            defaultValue={"john.doe@gmail.com"}
            placeholder="email"
            {...register("login", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <input
            defaultValue={"example"}
            placeholder="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}

          <input type="submit"  className="submitModal"/>
          </div>
          <div className="forgot">
          <Link to="/forgotPassword" onClick={handleLinkClick}>Mot de passe oublié ?</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
