import { useForm, SubmitHandler } from "react-hook-form";
import { usePasswordResetMutation } from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [passwordReset] = usePasswordResetMutation();
  const navigate = useNavigate();
  type Inputs = {
    email: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    passwordReset({
      variables: { email: data.email },
      onCompleted: () => {
        navigate("/");

        toast.success("Email was confirmed, please login");
      },
      onError: () => {
        toast.error("Error");
      },
    });
  };

  return (
    <>
    <h2>Réinitialiser son mot de passe</h2>
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="formContent">
        <input
          className="inputForm"
          defaultValue={"john.doe@gmail.com"}
          placeholder="email"
          {...register("email", { required: true })}
        />
        {errors.email && <span>This field is required</span>}

        <input type="submit" />
      </div>
    </form>
    </>
  );
};

export default ForgotPassword;
